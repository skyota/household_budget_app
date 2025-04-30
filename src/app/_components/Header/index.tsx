'use client'

import Link from "next/link";
import Image from 'next/image';
import { supabase } from "@/utils/supabase";
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { useState, useRef, useEffect } from 'react'

const Header: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/logout';
  }

  const { session, isLoading } = useSupabaseSession();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 外部クリックでメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="h-16 bg-white">
      <div className="h-[inherit] px-6">
        <ul className="flex items-center justify-between h-[inherit]">
          <li className="flex items-center gap-1">
            <Image src="/images/logo.png" alt="ロゴ" width={28} height={28} />
            {!isLoading && (
              <Link
                href={session ? "/mypage" : "/"}
                className="text-fontcolor text-3xl font-bold sm:text-2xl"
              >
                BudgetNavi
              </Link>
            )}
          </li>
          {!isLoading && (
            <li className="h-[inherit] flex items-center" ref={menuRef}>
              {session ? (
                <>
                  <div className="flex items-center h-[inherit] sm:hidden">
                    <Link href="/signup" className="text-fontcolor text-xl font-bold px-3 h-[inherit] block flex items-center">
                      支出一覧
                    </Link>
                    <Link href="/login" className="text-fontcolor text-xl font-bold px-3 h-[inherit] block flex items-center">
                      金額設定
                    </Link>
                    <Link href="/login" className="text-fontcolor text-xl font-bold px-3 h-[inherit] block flex items-center">
                      公開家計一覧
                    </Link>
                    <button onClick={handleLogout} className="text-fontcolor text-xl font-bold px-3 h-[inherit] block flex items-center">
                      ログアウト
                    </button>
                  </div>
                  <div className="hidden sm:block">
                    {isOpen && (
                      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" onClick={() => setIsOpen(false)}></div>
                    )}
                    <div className={`bg-white fixed top-0 right-0 w-60 h-[100vh] py-16 divide-y divide-gray z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                      <Link href="/signup" className="block text-fontcolor text-xl font-bold px-3 py-4">
                        支出一覧
                      </Link>
                      <Link href="/login" className="block text-fontcolor text-xl font-bold px-3 py-4">
                        金額設定
                      </Link>
                      <Link href="/login" className="block text-fontcolor text-xl font-bold px-3 py-4">
                        公開家計一覧
                      </Link>
                      <button onClick={handleLogout} className="block text-fontcolor text-xl font-bold px-3 py-4 w-full text-left">
                        ログアウト
                      </button>
                    </div>
                    {/* ハンバーガーボタン */}
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="z-[9999] relative w-10 h-10 flex flex-col justify-center items-center"
                      aria-label="メニューを開く"
                    >
                      <span
                        className={`block bg-mainBlue h-0.5 w-8 absolute transition-all duration-300 ease-in-out ${
                          isOpen ? 'rotate-45 top-1/2' : '-translate-y-2'
                        }`}
                      />
                      <span
                        className={`block bg-mainBlue h-0.5 w-8 absolute transition-all duration-300 ease-in-out ${
                          isOpen ? 'opacity-0' : ''
                        }`}
                      />
                      <span
                        className={`block bg-mainBlue h-0.5 w-8 absolute transition-all duration-300 ease-in-out ${
                          isOpen ? '-rotate-45 top-1/2' : 'translate-y-2'
                        }`}
                      />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center h-[inherit] sm:hidden">
                    <Link href="/signup" className="text-fontcolor text-xl font-bold px-3 h-[inherit] block flex items-center">
                      新規登録
                    </Link>
                    <Link href="/login" className="text-fontcolor text-xl font-bold px-3 h-[inherit] block flex items-center">
                      ログイン
                    </Link>
                  </div>
                  <div className="hidden sm:block">
                    {isOpen && (
                      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" onClick={() => setIsOpen(false)}></div>
                    )}
                    <div className={`bg-white fixed top-0 right-0 w-60 h-[100vh] py-16 divide-y divide-gray z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                      <Link href="/signup" className="block text-fontcolor text-xl font-bold px-3 py-4">
                        新規登録
                      </Link>
                      <Link href="/login" className="block text-fontcolor text-xl font-bold px-3 py-4">
                        ログイン
                      </Link>
                    </div>
                    {/* ハンバーガーボタン */}
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="z-[9999] relative w-10 h-10 flex flex-col justify-center items-center"
                      aria-label="メニューを開く"
                    >
                      <span
                        className={`block bg-mainBlue h-0.5 w-8 absolute transition-all duration-300 ease-in-out ${
                          isOpen ? 'rotate-45 top-1/2' : '-translate-y-2'
                        }`}
                      />
                      <span
                        className={`block bg-mainBlue h-0.5 w-8 absolute transition-all duration-300 ease-in-out ${
                          isOpen ? 'opacity-0' : ''
                        }`}
                      />
                      <span
                        className={`block bg-mainBlue h-0.5 w-8 absolute transition-all duration-300 ease-in-out ${
                          isOpen ? '-rotate-45 top-1/2' : 'translate-y-2'
                        }`}
                      />
                    </button>
                  </div>
                </>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Header;
