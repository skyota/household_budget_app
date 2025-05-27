'use client'

import Image from 'next/image';
import useExpensesByMonth from "@/app/_hooks/useExpensesByMonth";
import MonthNavigator from "./MonthNavigator";
import { useState } from "react";
import { Expense } from "@/app/_types/Expense";
import EditModal from './EditModal';

interface Props {
  selectedPeriod: {
    year: number;
    month: number;
  };
  onChange: (year: number, month: number) => void;
}

const ExpenseList = ({ selectedPeriod, onChange }: Props) => {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const { year, month } = selectedPeriod;

  const { data, error, isLoading } = useExpensesByMonth(year, month - 1);
  if (isLoading) return <p>読み込み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;
  if (!data) return <p>データが存在しません</p>;

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  return (
    <div className="flex flex-col items-center gap-5 px-5 py-4 bg-white w-full md:px-2">
      <MonthNavigator
        value={selectedPeriod}
        onChange={onChange}
      />
      <p className="text-xl font-bold text-fontcolor">{`${year}年${month}月の支出一覧`}</p>
      <table>
        <thead className="bg-bgBlue text-white">
          <tr>
            <th className="px-8 py-2 border-r border-white sm:px-4 sm:text-sm">日付</th>
            <th className="px-8 py-2 border-r border-white sm:px-4 sm:text-sm">カテゴリー</th>
            <th className="px-8 py-2 border-r border-white sm:px-4 sm:text-sm">金額</th>
            <th className="px-14 py-2 border-r border-white sm:hidden">内容</th>
            <th className="px-1 py-2 border-r border-white sm:px-4 sm:text-sm">編集</th>
          </tr>
        </thead>
        <tbody>
          {data.expenses.map(expense => (
            <tr key={expense.id} className="border-b border-b-bgGray">
              <td className="text-base text-fontcolor text-center py-3">{formatDate(expense.date)}</td>
              <td className="text-base text-fontcolor text-center py-3">{expense.category.name}</td>
              <td className="text-base text-fontcolor text-center py-3">¥{expense.amount.toLocaleString()}</td>
              <td className="text-base text-fontcolor text-center py-3 w-[145px] sm:hidden">{expense.note ?? ''}</td>
              <td className='text-center'>
                <button onClick={() => setEditingExpense(expense)}>
                  <Image src="/images/edit-pencil.png" alt="編集" width={24} height={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingExpense && (
        <EditModal
          isOpen={!!editingExpense}
          onClose={() => setEditingExpense(null)}
          expense={editingExpense}
        />
      )}
    </div>
  )
}

export default ExpenseList;
