'use client'

import Image from 'next/image';
import Button from './_components/Button';
import SectionTitle from './_components/SectionTitle';

const Top: React.FC = () => {
  return (
    <div className='bg-[#EBF6F6]'>
      <section className='inner pt-24 pb-52 bg-contain bg-center bg-no-repeat bg-mv-pc md:bg-mv-sp md:pt-10 md:pb-14'>
        <div className='flex items-center justify-between flex-row-reverse md:block'>
          <div className='w-[42%] md:w-[70%] md:max-w-80 md:mx-auto'>
            <Image src="/images/mv-screen.png" alt="操作画面" width={500} height={320} />
          </div>
          <div className='flex flex-col justify-center gap-10 md:mt-5 md:items-center gap-7'>
            <p className='text-4xl text-fontcolor font-bold leading-relaxed md:text-2xl md:text-center'>家計を正しく整えるため<br />あなたに最適な予算を<br />自動で提案します。</p>
            <Button as='link' href='/signup' variant='blue'>新規登録はこちら</Button>
          </div>
        </div>
      </section>
      <section className='bg-white rounded-tr-[40px] rounded-bl-[40px]'>
        <div className='inner py-10 flex flex-col items-center gap-10 md:py-5 md:gap-8'>
          <SectionTitle title="BudgetNaviとは" englishTitle="about" />
          <p className='font-normal text-base leading-relaxed tracking-normal text-fontcolor text-center'>
            BudgetNaviは、年収や貯金目標、<br className="hidden md:block" />固定費などの情報をもとに<br />
            「今月どれくらい使っていいか」<br className="hidden md:block" />を自動で計算し、<br />
            カテゴリー別の予算を提案してくれる、<br className="hidden md:block" />新しい家計簿アプリです。<br />
            <br />
            面倒な設定や細かい仕分けをしなくても<br />
            必要な情報だけを入力するだけで、<br className="hidden md:block" />あなたに合った支出プランが完成します。
          </p>
          <div className="flex flex-col gap-2">
            <div className='flex items-center gap-5'>
              <div className="w-5 h-5 rounded border-2 border-gray flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-mainBlue"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-fontcolor text-base leading-relaxed">
                家計簿アプリを使いこなせない
              </p>
            </div>
            <div className='flex items-center gap-5'>
              <div className="w-5 h-5 rounded border-2 border-gray flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-mainBlue"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-fontcolor text-base leading-relaxed">
                いくらまで使っていいのかわからない
              </p>
            </div>
          </div>
          <p className="text-fontcolor text-base leading-relaxed">
            そんな人でも、すぐに安心して家計管理を始められるように設計されています
          </p>
        </div>
      </section>
    </div>
  )
}

export default Top;
