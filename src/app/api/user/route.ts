import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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