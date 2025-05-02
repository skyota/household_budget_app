'use client'

const ConfirmationPage = () => {
  return (
    <div className="py-16">
      <div className='inner'>
        <div className="bg-white px-6 py-12">
          <p className="font-normal text-fontcolor text-center">
            ご登録ありがとうございます。<br />
            <br />
            ご入力いただいたメールアドレス宛に、確認メールを送信しました。<br />
            メール内のリンクをクリックして、アカウントの登録を完了してください。<br />
            <br />
            ※メールが届かない場合は、迷惑メールフォルダをご確認ください。
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage;
