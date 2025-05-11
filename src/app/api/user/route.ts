import { supabase } from '@/app/_utils/supabase';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ error: 'アクセストークンがありません' }, { status: 401 });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { supabaseUserId: user.id },
    });
    return NextResponse.json({ status: 'OK', dbUser: dbUser }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

export const POST = async (req: NextRequest) => {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ error: 'アクセストークンがありません' }, { status: 401 });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });
  }

  // すでにユーザーが存在するか確認
  const existingUser = await prisma.user.findUnique({
    where: { supabaseUserId: user.id }
  });

  if (existingUser) {
    return NextResponse.json({ message: 'ユーザーは既に存在します' }, { status: 200 });
  }

  // Userテーブルに新規作成
  const createdUser = await prisma.user.create({
    data: {
      supabaseUserId: user.id,
      income: null,
      savingGoal: null,
    },
  });

  return NextResponse.json({ user: createdUser }, { status: 201 });
};

export const PATCH = async (req: NextRequest) => {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ error: 'アクセストークンがありません' }, { status: 401 });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if ( error || !user ) {
    return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });
  }

  const body = await req.json();
  const { income, savingGoal } = body;

  try {
    const updatedUser = await prisma.user.update({
      where: { supabaseUserId: user.id },
      data: {
        income: income ?? undefined,
        savingGoal: savingGoal ?? undefined,
      },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
