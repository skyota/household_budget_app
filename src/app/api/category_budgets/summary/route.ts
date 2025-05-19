import { getUser } from "@/app/_utils/getUser";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  // 認証チェック
  const { data: { user }, error } = await getUser(req);
  if (error || !user) return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const year = Number(searchParams.get('year'));
  const month = Number(searchParams.get('month'));

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month+1, 1);

  const categoryBudgets = await prisma.categoryBudget.findMany({
    where: {
      user: {
        supabaseUserId: user.id,
      },
    },
  });

  const expenses = await prisma.expense.groupBy({
    by: ['categoryId'],
    where: {
      category: {
        user: {
          supabaseUserId: user.id,
        },
      },
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
    _sum: {
      amount: true,
    },
  });

  const result = categoryBudgets.map((category) => {
    const expense = expenses.find(e => e.categoryId === category.id);
    const totalExpense = expense?._sum.amount ?? 0;
    const rawPercent = category.budgetAmount > 0 ? totalExpense / category.budgetAmount : 0;
    const percent = Math.min(rawPercent, 1);
    const isOver = rawPercent >= 1;

    return {
      categoryId: category.id,
      name: category.name,
      budgetAmount: category.budgetAmount,
      displayColor: category.displayColor,
      totalExpense,
      percent,
      isOver,
    };
  });

  return NextResponse.json(result);
}
