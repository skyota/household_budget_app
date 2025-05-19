'use client'

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { supabase } from "@/app/_utils/supabase";
import InputFormItem from '@/app/_components/InputFormItem';
import Button from '../_components/Button';

type SignupForm = {
  name: string;
  email: string;
  password: string;
}

const SignupPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<SignupForm>();

  const onSubmit: SubmitHandler<SignupForm> = async (data: SignupForm) => {
    const { name, email, password } = data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/login`
      },
    });

    if (error) {
      alert("登録に失敗しました");
    } else {
      reset();
      router.push('/signup/confirmation');
    }
  };

  return (
    <div className="py-16">
      <div className='inner'>
        <div className="bg-white px-6 py-12">
          <h2 className='text-xl font-bold text-fontcolor text-center'>新規登録</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-6 items-center">
            <div className="flex flex-col gap-6 w-full max-w-72 mx-auto items-center">
              <InputFormItem
                label="ユーザー名"
                name="name"
                type="text"
                placeholder="ユーザー名"
                error={errors.name?.message}
                disabled={isSubmitting}
                {...register("name", {
                  required: "ユーザー名は必須です",
                })}
              />
              <InputFormItem
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
              <InputFormItem
                label="パスワード"
                name="password"
                type="password"
                placeholder="●●●●●●●"
                error={errors.password?.message}
                disabled={isSubmitting}
                {...register("password", {
                  required: "パスワードは必須です",
                  minLength: {
                    value: 6,
                    message: "6文字以上で入力してください",
                  },
                })}
              />
            </div>
            <Button type='submit' variant='blue' disabled={isSubmitting}>新規登録</Button>
            <div className='flex flex-col gap-2 items-center w-full'>
              <p className='font-bold text-fontcolor text-center'>アカウントをお持ちの方</p>
              <Button as='link' href='/login' variant='border'>ログイン</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;
