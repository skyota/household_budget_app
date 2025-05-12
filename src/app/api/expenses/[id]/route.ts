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
  const expenseId = parseInt(id);
  if (isNaN(expenseId)) return NextResponse.json({ error: '無効なIDです' }, { status: 400 });

  // Supabase IDに対応するアプリ内ユーザーを取得
  const dbUser = await prisma.user.findUnique({
    where: { supabaseUserId: user.id },
  });
  if (!dbUser) return NextResponse.json({ error: 'ユーザーが見つかりません' }, { status: 404 });

  // 更新対象のexpenseが存在する、かつログインユーザーのものであることを確認
  const existing = await prisma.expense.findUnique({
    where: { id: expenseId },
    include: {
      category: true,
    },
  });
  if (!existing || existing.category.userId !== dbUser.id) return NextResponse.json({ error: 'アクセス権がありません' }, { status: 403 });

  try {
    const body = await req.json();
    const { categoryId, amount, date, note } = body;

    const updated = await prisma.expense.update({
      where: { id: expenseId },
      data: {
        categoryId,
        amount,
        date: new Date(date),
        note: note ?? undefined,
      },
    });

    return NextResponse.json({ status: 'OK', message: '支出を更新しました', expense: updated }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  // 認証チェック
  const { data: { user }, error } = await getUser(req);
  if (error || !user) return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });

  // ID検証
  const expenseId = parseInt(id);
  if (isNaN(expenseId)) return NextResponse.json({ error: '無効なIDです' }, { status: 400 });

  // Supabase IDに対応するアプリ内ユーザーを取得
  const dbUser = await prisma.user.findUnique({
    where: { supabaseUserId: user.id },
  });
  if (!dbUser) return NextResponse.json({ error: 'ユーザーが見つかりません' }, { status: 404 });

  // 削除対象のexpenseが存在する、かつログインユーザーのものであることを確認
  const existing = await prisma.expense.findUnique({
    where: { id: expenseId },
    include: {
      category: true,
    },
  });
  if (!existing || existing.category.userId !== dbUser.id) return NextResponse.json({ error: 'アクセス権がありません' }, { status: 403 });

  try {
    await prisma.expense.delete({
      where: { id: expenseId },
    });

    return NextResponse.json({ status: 'OK', message: '支出を削除しました' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
