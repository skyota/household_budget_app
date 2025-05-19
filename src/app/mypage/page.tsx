'use client'

import Title from "@/app/_components/Title";
import ExpenseForm from "./_components/ExpenseForm";
import CategoryBudgetChart from "./_components/CategoryBudgetChart";

const MyPage = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  return (
    <div className="inner flex gap-5 mt-10 mb-20 md:flex-col">
      <div className="flex flex-col items-center gap-3 w-96 md:w-full">
        <Title name="支出の入力" iconSrc="/images/pencil.png" />
        <ExpenseForm />
      </div>
      <div className="flex flex-col items-center gap-3 w-[calc(100%-404px)] md:w-full">
        <Title name={`${currentYear}年${currentMonth + 1}月の使用状況`} iconSrc="/images/category.png" />
        <CategoryBudgetChart />
      </div>
    </div>
  )
}

export default MyPage;
