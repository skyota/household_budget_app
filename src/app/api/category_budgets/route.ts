import { getUser } from "@/app/_utils/getUser";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export interface CreateCategoryBudgetRequestBody {
  name: string;
  budgetAmount: number;
  displayColor: string;
}

export const GET = async (req: NextRequest) => {
  // 認証チェック
  const { data: { user }, error } = await getUser(req);
  if (error || !user) return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });

  try {
    const categoryBudgets = await prisma.categoryBudget.findMany({
      where: {
        user: {
          supabaseUserId: user.id,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ status: 'OK', categoryBudgets }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  // 認証チェック
  const { data: { user }, error } = await getUser(req);
  if (error || !user) return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });

  // ユーザー取得
  const dbUser = await prisma.user.findUnique({
    where: { supabaseUserId: user.id },
  });
  if (!dbUser) return NextResponse.json({ error: 'ユーザーが見つかりません' }, { status: 404 });

  try {
    const body = await req.json();
    const { name, budgetAmount, displayColor }: CreateCategoryBudgetRequestBody = body;

    const categoryBudget = await prisma.categoryBudget.create({
      data: {
        name,
        budgetAmount,
        displayColor,
        userId: dbUser.id,
      }
    });
    return NextResponse.json({ status: 'OK', message: 'カテゴリ予算を追加しました', categoryBudget }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
