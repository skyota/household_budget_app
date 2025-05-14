import { getUser } from "@/app/_utils/getUser";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export interface CreateExpneseRequestBody {
  categoryId: number;
  amount: number;
  date: string;
  note?: string;
}

export const GET = async (req: NextRequest) => {
  // 認証チェック
  const { data: { user }, error } = await getUser(req);
  if (error || !user) return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        category: {
          user: {
            supabaseUserId: user.id,
          },
        },
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ status: 'OK', expenses }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  // 認証チェック
  const { data: { user }, error } = await getUser(req);
  if (error || !user) return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });

  // ユーザーを取得
  const dbUser = await prisma.user.findUnique({
    where: { supabaseUserId: user.id },
  });
  if (!dbUser) return NextResponse.json({ error: 'ユーザーが見つかりません' }, { status: 404 });

  try {
    const body = await req.json();
    const { categoryId, amount, date, note }: CreateExpneseRequestBody = body;

    const category = await prisma.categoryBudget.findUnique({
      where: {
        id: categoryId,
        user: {
          supabaseUserId: user.id,
        },
      },
    });
    if (!category) {
      return NextResponse.json({ error: '不正なカテゴリです' }, { status: 403 });
    }

    const expense = await prisma.expense.create({
      data: {
        categoryId,
        amount,
        date: new Date(date),
        note,
      },
    });

    return NextResponse.json({ status: 'OK', message: '支出を追加しました', expense }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
