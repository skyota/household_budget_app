'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import { mutate } from 'swr';
import { Expense } from "@/app/_types/Expense"
import { api } from "@/app/_utils/api";
import useCategoryBudgets from "@/app/_hooks/useCategoryBudgets";
import DateInputFormItem from "@/app/_components/DateInputFormItem";
import CategorySelectFormItem from "@/app/_components/CategorySelectFormItem";
import InputFormItem from "@/app/_components/InputFormItem";
import Button from "@/app/_components/Button";
import Modal from "@/app/_components/Modal";

interface EditModalProps {
  isOpen: boolean
  onClose: () => void;
  expense: Expense;
}

interface EditFormValues {
  categoryId: number;
  amount: number;
  date: string;
  note?: string;
}

const EditModal = ({ isOpen, onClose, expense }: EditModalProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EditFormValues>({
    defaultValues: {
      date: expense.date.slice(0, 10),
      amount: expense.amount,
      note: expense.note ?? '',
      categoryId: expense.category.id,
    }
  });

  const { data, error, isLoading } = useCategoryBudgets();

  const onSubmit: SubmitHandler<EditFormValues> = async (data) => {
    try {
      await api.put<EditFormValues>(`/api/expenses/${expense.id}`,{...data});
      const updatedDate = new Date(expense.date);
      const year = updatedDate.getFullYear();
      const month = updatedDate.getMonth();
      await Promise.all([
        mutate(`/api/expenses/month?year=${year}&month=${month}`),
        mutate(`/api/category_budgets/summary?year=${year}&month=${month}`)
      ]);
      onClose();
    } catch (error) {
      console.log("送信中にエラーが発生しました", error);
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/api/expenses/${expense.id}`);
      const deletedDate = new Date(expense.date);
      const year = deletedDate.getFullYear();
      const month = deletedDate.getMonth();
      await Promise.all([
        mutate(`/api/expenses/month?year=${year}&month=${month}`),
        mutate(`/api/category_budgets/summary?year=${year}&month=${month}`)
      ]);
      onClose();
    } catch (error) {
      console.log("削除中にエラーが発生しました", error);
      alert("削除に失敗しました");
    }
  }

  if (isLoading) return <p>読み込み中...</p>;
  if (error || !data) return <p>カテゴリーの取得に失敗しました</p>;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 w-full">
        <DateInputFormItem
          label="日付"
          name="date"
          error={errors.date?.message}
          disabled={isSubmitting}
          {...register("date", { required: "日付は必須です" })}
        />
        <CategorySelectFormItem
          label="カテゴリー"
          name="categoryId"
          options={data.categoryBudgets}
          error={errors.categoryId?.message}
          disabled={isSubmitting}
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
        <Button
          variant="yellow"
          onClick={handleDelete}
        >
          削除
        </Button>
      </form>
    </Modal>
  )
}

export default EditModal;
