'use client'

import Button from "../_components/Button";

const LogoutPage = () => {
  return (
    <div className="py-16">
      <div className='inner'>
        <div className="bg-white px-6 py-12">
          <div className="flex flex-col gap-6 items-center">
            <p className="font-normal text-fontcolor text-center">
              ログアウトしました。<br />
              <br />
              ご利用ありがとうございました。<br />
              またのご利用をお待ちしております。<br />
            </p>
            <Button as='link' href='/login' variant='blue'>ログイン画面に戻る</Button>
            <Button as='link' href='/' variant='yellow'>ホームに戻る</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutPage;
