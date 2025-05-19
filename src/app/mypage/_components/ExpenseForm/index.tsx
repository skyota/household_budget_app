'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import DateInputFormItem from "@/app/_components/DateInputFormItem";
import CategorySelectFormItem from "@/app/_components/CategorySelectFormItem";
import InputFormItem from "@/app/_components/InputFormItem";
import Button from "@/app/_components/Button";
import useCategoryBudgets from "@/app/_hooks/useCategoryBudgets";
import { api } from "@/app/_utils/api";

type ExpenseInput = {
  date: string;
  categoryId: number;
  amount: number;
  note?: string;
};

const ExpenseForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ExpenseInput>();
  const { data, error, isLoading } = useCategoryBudgets();

  const onSubmit: SubmitHandler<ExpenseInput> = async (data) => {
    try {
      const res = await api.post("/api/expenses", { ...data });
      if (!res.ok) throw new Error("登録に失敗しました");
      alert("支出を登録しました");
      reset();
    } catch (err) {
      console.error("送信エラー", err);
      alert("登録に失敗しました");
    }
  }

  if (isLoading) return <p>読み込み中...</p>;
  if (error || !data) return <p>カテゴリーの取得に失敗しました</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-7 w-full bg-white px-8 py-7">
      <DateInputFormItem
        label="日付"
        name="date"
        error={errors.date?.message}
        {...register("date", { required: "日付は必須です" })}
      />
      <CategorySelectFormItem
        label="カテゴリー"
        name="categoryId"
        options={data.categoryBudgets}
        error={errors.categoryId?.message}
        {...register("categoryId", {
          required: "カテゴリーは必須です",
          valueAsNumber: true,
        })}
      />
      <div className="flex items-end w-full gap-2">
        <InputFormItem
          label="金額"
          name="amount"
          type="number"
          error={errors.amount?.message}
          disabled={isSubmitting}
          {...register("amount", {
            required: "金額は必須です",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "1円以上を入力してください",
            },
          })}
        />
        <p className="font-normal text-fontcolor pb-2">円</p>
      </div>
      <InputFormItem
        label="内容"
        name="note"
        type="text"
        placeholder="使用用途を入力してください（任意）"
        error={errors.note?.message}
        disabled={isSubmitting}
        {...register("note")}
      />
      <Button type="submit" variant="blue">登録</Button>
    </form>
  );
}

export default ExpenseForm;
