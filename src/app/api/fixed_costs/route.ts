import { getUser } from "@/app/_utils/getUser";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export interface CreateFixedCostRequestBody {
  name: string;
  amount: number;
  billCycle: string;
}

export const GET = async (req: NextRequest) => {
  const { data: { user }, error } = await getUser(req);
  if (error || !user) return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });

  try {
    const fixedCosts = await prisma.fixedCost.findMany({
      where: {
        user: {
          supabaseUserId: user.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({ status: 'OK', fixedCosts: fixedCosts }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const POST = async (req: NextRequest) => {
  const { data: { user }, error } = await getUser(req);

  if (error || !user) return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });

  // Supabase IDに対応するDBのUser IDを取得
  const dbUser = await prisma.user.findUnique({
    where: { supabaseUserId: user.id },
  });

  if (!dbUser) return NextResponse.json({ error: 'ユーザーが見つかりません' }, { status: 404 });

  try {
    const body = await req.json();

    const { name, amount, billCycle }: CreateFixedCostRequestBody = body;

    const fixedCost = await prisma.fixedCost.create({
      data: {
        name,
        amount,
        billCycle,
        userId: dbUser.id,
      },
    })

    return NextResponse.json({ status: 'OK', message: '固定費を追加しました', fixedCost }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
