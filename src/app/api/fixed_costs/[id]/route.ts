import { getUser } from "@/app/_utils/getUser";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  // 認証情報の取得
  const { data: { user }, error } = await getUser(req);
  if (error || !user) return NextResponse.json({ error: '認証情報が無効です' }, { status: 400 });

  // fixedCost IDの検証
  const fixedCostId = parseInt(id);
  if (isNaN(fixedCostId)) return NextResponse.json({ error: '無効なIDです' }, { status: 401 });

  // 削除対象のfixedCostが存在する、かつログインユーザーのものであることを確認
  const fixedCost = await prisma.fixedCost.findUnique({
    where: {
      id: fixedCostId,
      user: {
        supabaseUserId: user.id,
      },
    },
  });

  if (!fixedCost) return NextResponse.json({ error: '固定費が見つかりません' }, { status: 403 });

  try {
    await prisma.fixedCost.delete({
      where: {
        id: fixedCostId,
      },
    })
    return NextResponse.json({ status: 'OK', message: '削除しました' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  // 認証チェック
  const { data: {user}, error } = await getUser(req);
  if (error || !user) return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });

  // ID検証
  const fixedCostId = parseInt(id);
  if (isNaN(fixedCostId)) return NextResponse.json({ error: '無効なIDです' }, { status: 400 });

  // 対象レコードの所有権確認
  const existing = await prisma.fixedCost.findUnique({
    where: {
      id: fixedCostId,
      user: {
        supabaseUserId: user.id,
      },
    },
  });
  if (!existing) return NextResponse.json({ error: '固定費が見つかりません' }, { status: 403 });

  try {
    const body = await req.json();
    const { name, amount, billCycle } = body;

    const updated = await prisma.fixedCost.update({
      where: { id: fixedCostId },
      data: {
        name,
        amount,
        billCycle,
      },
    });
    return NextResponse.json({ status: 'OK', message: '更新しました', fixedCost: updated }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
