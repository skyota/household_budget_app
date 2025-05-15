import { getUser } from "@/app/_utils/getUser";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  // 認証チェック
  const { data: { user }, error } = await getUser(req);
  if (error || !user) return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });

  // ID検証
  const categoryBudgetId = parseInt(id);
  if (isNaN(categoryBudgetId)) return NextResponse.json({ error: '無効なIDです' }, { status: 400 });

  // 更新対象のcategoryBudgetが存在する、かつログインユーザーのものであることを確認
  const existing = await prisma.categoryBudget.findUnique({
    where: {
      id: categoryBudgetId,
      user: {
        supabaseUserId: user.id,
      },
    },
  });
  if (!existing) return NextResponse.json({ error: 'アクセス権がありません' }, { status: 403 });

  try {
    const body = await req.json();
    const { name, budgetAmount, displayColor } = body;

    const updated = await prisma.categoryBudget.update({
      where: { id: categoryBudgetId },
      data: {
        name,
        budgetAmount,
        displayColor,
      },
    });

    return NextResponse.json({ status: 'OK', message: 'カテゴリ予算を更新しました', categoryBudget: updated }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  // 認証チェック
  const { data: { user }, error } = await getUser(req);
  if (error || !user) return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });

  // ID認証
  const categoryBudgetId = parseInt(id);
  if (isNaN(categoryBudgetId)) return NextResponse.json({ error: '無効なIDです' }, { status: 400 });

  // 削除対象のcategoryBudgetが存在する、かつログインユーザーのものであることを確認
  const existing = await prisma.categoryBudget.findUnique({
    where: {
      id: categoryBudgetId,
      user: {
        supabaseUserId: user.id,
      },
    },
  });
  if (!existing) return NextResponse.json({ error: 'アクセス権がありません' }, { status: 403 });

  try {
    await prisma.categoryBudget.delete({
      where: { id: categoryBudgetId },
    });
    return NextResponse.json({ status: 'OK', message: 'カテゴリ予算を削除しました' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
