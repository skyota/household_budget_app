'use client'

import { ComponentProps, forwardRef } from "react"

type Props = {
  label: string;
  name: string;
  type: string;
  error?: string;
} & ComponentProps<"input">

const FormItem = forwardRef<HTMLInputElement, Props>(({ label, name, type, error, ...rest }, ref) => {
  return (
    <div className="w-full max-w-72 flex flex-col gap-2">
      <label
        htmlFor="email"
        className="font-normal text-fontcolor"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        ref={ref}
        className="p-2 border border-gray rounded w-full font-normal"
        {...rest}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
});

export default FormItem;
