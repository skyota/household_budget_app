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
      <section className='inner py-20 flex flex-col items-center gap-10 md:py-10 md:gap-8'>
        <SectionTitle title="BudgetNaviでできること" englishTitle="Features" />
        <div className='flex flex-col gap-8 md:gap-7'>
          <div className='flex items-center justify-between px-20 pb-8 border-b-2 border-b-white gap-4 md:flex-col md:px-0 md:pb-7'>
            <div className='flex items-center w-[350px] md:w-full'>
              <div className='flex flex-col gap-4 md:gap-2'>
                <p className='text-6xl font-bold text-red md:text-5xl'>01</p>
                <p className='text-2xl font-bold text-fontcolor md:text-xl'>最適な予算を、自動で提案</p>
                <p className='text-base text-fontcolor leading-relaxed'>年収や貯金目標、固定費をもとに、あなたに合った月ごとの使える金額を自動で算出します。</p>
              </div>
            </div>
            <div className='w-[50%] md:w-[70%] md:max-w-80 md:mx-auto'>
              <Image src="/images/features1.png" alt="操作画面" width={500} height={320} />
            </div>
          </div>
          <div className='flex items-center justify-between px-20 pb-8 border-b-2 border-b-white gap-4 md:flex-col md:px-0 md:pb-7'>
            <div className='flex items-center w-[350px] md:w-full'>
              <div className='flex flex-col gap-4 md:gap-2'>
                <p className='text-6xl font-bold text-green md:text-5xl'>02</p>
                <p className='text-2xl font-bold text-fontcolor md:text-xl'>支出が見えるグラフ</p>
                <p className='text-base text-fontcolor leading-relaxed'>登録した支出は、カテゴリー別の円グラフで即時に可視化。バランスよくお金が使えているかが一目でわかります。</p>
              </div>
            </div>
            <div className='w-[50%] md:w-[70%] md:max-w-80 md:mx-auto'>
              <Image src="/images/features2.png" alt="操作画面" width={500} height={320} />
            </div>
          </div>
          <div className='flex items-center justify-between px-20 gap-4 md:flex-col md:px-0'>
            <div className='flex items-center w-[350px] md:w-full'>
              <div className='flex flex-col gap-4 md:gap-2'>
                <p className='text-6xl font-bold text-yellow md:text-5xl'>03</p>
                <p className='text-2xl font-bold text-fontcolor md:text-xl'>他の人の家計も参考に</p>
                <p className='text-base text-fontcolor leading-relaxed'>年収や生活スタイルが近い人の家計を比較。無理なく続けられる支出のヒントが見つかります。</p>
              </div>
            </div>
            <div className='w-[50%] md:w-[70%] md:max-w-80 md:mx-auto'>
              <Image src="/images/features3.png" alt="操作画面" width={500} height={320} />
            </div>
          </div>
        </div>
      </section>
      <section className='bg-white rounded-tl-[40px] rounded-tr-[40px]'>
        <div className='inner py-10 flex flex-col items-center gap-10 md:py-5 md:gap-7'>
          <p className='text-base text-fontcolor font-bold leading-relaxed text-center'>
            毎月の支出がなんとなくで<br className="hidden md:block" />終わっていませんか？<br />
            BudgetNaviなら、貯金ができる<br className="hidden md:block" />予算設計が今日から始められます
          </p>
          <Button as='link' href='/signup' variant='blue'>使ってみる</Button>
        </div>
      </section>
    </div>
  )
}

export default Top;
