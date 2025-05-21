'use client'

import useCategoryBudgetSummary from "@/app/_hooks/useCategoryBudgetSummary";

interface Props {
  selectedPeriod: {
    year: number;
    month: number;
  };
}

const CategoryBudgetChart = ({ selectedPeriod }: Props) => {
  const { year, month } = selectedPeriod;

  const { data, error, isLoading } = useCategoryBudgetSummary(year, month - 1);
  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;
  if (!data) return <p>データが存在しません</p>;

  return (
    <ul className="flex flex-wrap gap-10 px-[58px] py-7 bg-white w-full lg:px-4 md:px-4 md:py-3 sm:gap-5">
      {data.map(category => (
        <li key={category.categoryId} className="w-[calc(100%/2-40px/2)] lg:w-[calc(100%/3-40px*2/3)] md:w-[calc(100%/3-40px*2/3)] sm:w-[calc(100%/2-20px/2)]">
          <div className="relative w-full aspect-square rounded-full" style={{
          background: `conic-gradient(${category.isOver ? 'red' : category.displayColor} 0% ${Math.round(category.percent * 100)}%, #e5e7eb ${Math.round(category.percent * 100)}% 100%)`
          }}>
            <div className="absolute inset-4 rounded-full bg-white flex flex-col items-center justify-center text-center">
              <p className="text-sm text-black">{category.name}</p>
              <p className={`text-lg font-bold ${category.isOver ? 'text-red' : 'text-black'} md:text-base`}>¥{category.totalExpense.toLocaleString()}</p>
              <p className="text-xs text-black">/ {category.budgetAmount.toLocaleString()}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CategoryBudgetChart;
