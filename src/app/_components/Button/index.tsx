'use client'

import clsx from 'clsx';
import Link from 'next/link';

// ボタンの見た目の種類の定義
type Variant = "blue" | "yellow" | "border";

// 全ボタンに共通するプロパティの定義
type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

// <button>要素として使う場合の型
type ButtonAsButton = CommonProps & {
  as?: "button";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};
// <Link>要素として使う場合の型
type ButtonAsLink = CommonProps & {
  as: "link";
  href: string;
  target?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button: React.FC<ButtonProps> = ({ children, variant = "blue", className, ...rest }) => {
  // 全てのボタンに共通するクラスを定義
  const baseClasses = "w-full max-w-60 p-2 border-2 rounded-full text-center font-bold transition-all duration-300 ease-in-out";
  // variantによって異なるクラスを定義
  const variantClasses = {
    blue: "bg-mainBlue border-mainBlue text-white hover:bg-white hover:text-mainBlue hover:border-mainBlue",
    yellow: "bg-yellow-500 text-white hover:bg-yellow-600",
    border: "border-mainBlue text-mainBlue hover:bg-mainBlue hover:text-white",
  };
  // clsxを使ってクラス名を結合
  const combinedClassName = clsx(baseClasses, variantClasses[variant], className);

  if (rest.as === "link") {
    return <Link href={rest.href} target={rest.target} className={combinedClassName}>{ children }</Link>
  }
  return <button type={rest.type || 'button'} className={combinedClassName} {...rest}>{ children }</button>
}

export default Button;
