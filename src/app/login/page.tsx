'use client'

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import FormItem from '@/app/_components/InfputFormItem';
import Button from '../_components/Button';
import Link from "next/link";

type LoginForm = {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    const  { email, password } = data;

    const { data: loginData, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("ログインに失敗しました");
    } else {
      const accessToken = loginData.session?.access_token;
      console.log('accessToken:', accessToken);
      if (accessToken) {
        await fetch('/api/user', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }

      reset();
      router.push('/mypage');
    }
  };

  return (
    <div className="py-16">
      <div className='inner'>
        <div className="bg-white px-6 py-12">
          <h2 className='text-xl font-bold text-fontcolor text-center'>ログイン</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-6 items-center">
            <div className="flex flex-col gap-6 w-full mx-auto items-center">
              <FormItem
                label="メールアドレス"
                name="email"
                type="email"
                placeholder="exmaple@mail.com"
                error={errors.email?.message}
                disabled={isSubmitting}
                {...register("email", {
                  required: "メールアドレスは必須です",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "正しいメールアドレスを入力してください",
                  },
                })}
              />
              <FormItem
                label="パスワード"
                name="password"
                type="password"
                placeholder="●●●●●●●"
                error={errors.password?.message}
                disabled={isSubmitting}
                {...register("password", {
                  required: "パスワードは必須です",
                })}
              />
            </div>
            <Button type='submit' variant='blue'>ログイン</Button>
            <Link href='/forget_password' className='text-fontcolor text-sm underline'>パスワードを忘れた方</Link>
            <div className='flex flex-col gap-2 items-center w-full'>
              <p className='font-bold text-fontcolor text-center md:text-sm'>アカウントをお持ちでない方</p>
              <Button as='link' href='/signup' variant='border'>新規登録</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
