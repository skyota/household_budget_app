"use client";

import { CategoryBudget } from "@/app/_hooks/useCategoryBudgets";
import { ComponentProps, forwardRef } from "react";

type Props = {
  label: string;
  name: string;
  options: CategoryBudget[];
  error?: string;
} & ComponentProps<"select">;

const CategorySelectFormItem = forwardRef<HTMLSelectElement, Props>(
  ({ label, name, options, error, ...rest }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        <label htmlFor={name} className="font-normal text-fontcolor">
          {label}
        </label>
        <select
          id={name}
          name={name}
          ref={ref}
          className="p-2 border border-gray rounded w-full font-normal bg-white"
          {...rest}
        >
          <option value="">選択してください</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }
);

export default CategorySelectFormItem;
