'use client'

import Link from "next/link";
import Image from 'next/image';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { handleLogout } from "@/app/_utils/auth";

const Navigation: React.FC = () => {
  const { session, isLoading } = useSupabaseSession();

  return (
    <ul className="flex items-center justify-between md:flex-col md:gap-10">
      <li className="flex items-center gap-1">
        <Image src="/images/logo.png" alt="ロゴ" width={28} height={28} />
        {!isLoading && (
          <Link
            href={session ? "/mypage" : "/"}
            className="text-white text-3xl font-bold sm:text-2xl"
          >
            BudgetNavi
          </Link>
        )}
      </li>
      <li>
        <div>
          {session ? (
            <div className="flex items-center gap-16 md:flex-col md:gap-6">
              <div className="flex items-center gap-10 md:flex-col md:gap-3">
                <Link href="/expenses" className="text-white text-xl font-bold">支出一覧</Link>
                <Link href="/settings" className="text-white text-xl font-bold">金額設定</Link>
                <Link href="/households" className="text-white text-xl font-bold">公開家計一覧</Link>
                <button onClick={handleLogout} className="text-white text-xl font-bold px-3 block flex items-center">
                  ログアウト
                </button>
              </div>
              <Link href="https://www.instagram.com/sugi_engineer?igsh=MXBnOXJka3B3ZzY1OA%3D%3D&utm_source=qr" target="_blank" className="text-white text-xl font-bold">
                <Image src="/images/instagram.png" alt="インスタグラム" width={36} height={36} />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-16 md:flex-col md:gap-6">
              <div className="flex items-center gap-10">
                <Link href="/signup" className="text-white text-xl font-bold">新規登録</Link>
                <Link href="/login" className="text-white text-xl font-bold">ログイン</Link>
              </div>
              <Link href="https://www.instagram.com/sugi_engineer?igsh=MXBnOXJka3B3ZzY1OA%3D%3D&utm_source=qr" target="_blank" className="text-white text-xl font-bold">
                <Image src="/images/instagram.png" alt="インスタグラム" width={36} height={36} />
              </Link>
            </div>
          )}
        </div>
      </li>
    </ul>
  )
}

export default Navigation;
