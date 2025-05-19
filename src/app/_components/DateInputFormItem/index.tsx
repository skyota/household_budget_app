'use client'

import { ComponentProps, forwardRef } from "react"

type Props = {
  label: string;
  name: string;
  error?: string;
} & ComponentProps<"input">

const DateInputFormItem = forwardRef<HTMLInputElement, Props>(
  ({ label, name, error, ...rest }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        <label
          htmlFor={name}
          className="font-normal text-fontcolor"
        >
          {label}
        </label>
        <input
          id={name}
          name={name}
          type="date"
          ref={ref}
          className="p-2 border border-gray rounded w-full font-normal"
          {...rest}
        />
        {error && <p className="text-red">{error}</p>}
      </div>
    );
  }
);

export default DateInputFormItem;
