'use client'

import Image from 'next/image';
import Button from './_components/Button';

const Top: React.FC = () => {
  return (
    <div className='bg-[#EBF6F6]'>
      <section className='inner pt-24 pb-52 bg-contain bg-center bg-no-repeat bg-mv-pc md:bg-mv-sp md:pt-10 md:pb-14'>
        <div className='flex items-center justify-between flex-row-reverse md:block'>
          <div className='w-[42%] md:w-[70%] md:max-w-80 md:mx-auto'>
            <Image src="/images/mv-screen.png" alt="操作画面" width={500} height={320} />
          </div>
          <div className='flex flex-col justify-center gap-10 md:mt-5 md:items-center gap-7'>
            <h2 className='text-4xl text-fontcolor font-bold leading-relaxed md:text-2xl md:text-center'>家計を正しく整えるため<br />あなたに最適な予算を<br />自動で提案します。</h2>
            <Button as='link' href='/signup' variant='blue'>新規登録はこちら</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Top;
