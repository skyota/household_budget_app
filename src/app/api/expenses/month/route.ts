import { getUser } from "@/app/_utils/getUser";
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server";
import type { Expense } from "@/app/_types/Expense";

export type ExpensesResponse = {
  expenses: Expense[];
};

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const { data: { user }, error } = await getUser(req);
  if (error || !user) return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const year = Number(searchParams.get('year'));
  const month = Number(searchParams.get('month'));

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month+1, 1);

  try {
    const expenses = await prisma.expense.findMany({
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
      include: {
        category: true,
      },
      orderBy: [
        { date: "desc" },
        { createdAt: "desc" },
      ]
    });

    return NextResponse.json<ExpensesResponse>({ expenses });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
