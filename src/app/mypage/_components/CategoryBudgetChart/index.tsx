'use client'

import useCategoryBudgets from "@/app/_hooks/useCategoryBudgets";
import useExpenses from "@/app/_hooks/useExpenses";

const CategoryBudgetChart = () => {
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useCategoryBudgets();

  const {
    data: expenseData,
    error: expenseError,
    isLoading: expenseLoading,
  } = useExpenses();

  if (categoryLoading || expenseLoading) return <p>読み込み中...</p>;
  if (categoryError || expenseError) return <p>エラーが発生しました</p>;
  if (!categoryData || !expenseData) return <p>データが存在しません。</p>;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  return (
    <ul className="flex flex-wrap gap-10 px-8 py-7 bg-white w-full md:px-4 md:py-3 sm:gap-5">
      {categoryData.categoryBudgets.map((category) => {
        const total = expenseData.expenses
          .filter((expense) => {
            const expenseDate = new Date(expense.date);
            return (
              expenseDate.getFullYear() === currentYear &&
              expenseDate.getMonth() === currentMonth &&
              expense.categoryId === category.id
            );
          })
          .reduce((sum, expense) => sum + expense.amount, 0);
  
        const percent = Math.min((total / category.budgetAmount) * 100, 100);

        return (
          <li key={category.id} className="w-[calc(100%/3-40px*2/3)] lg:w-[calc(100%/2-40px/2)] md:w-[calc(100%/3-40px*2/3)] sm:w-[calc(100%/2-20px/2)]">
            <div className="relative w-full aspect-square rounded-full" style={{
            background: `conic-gradient(${category.displayColor} 0% ${percent}%, #e5e7eb ${percent}% 100%)`
            }}>
              <div className="absolute inset-4 rounded-full bg-white flex flex-col items-center justify-center text-center">
                <p className="text-sm text-black">{category.name}</p>
                <p className="text-lg font-bold text-black md:text-base">¥{total.toLocaleString()}</p>
                <p className="text-xs text-black">/ {category.budgetAmount.toLocaleString()}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  );
}

export default CategoryBudgetChart;
