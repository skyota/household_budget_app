'use client'

import { useState } from "react";
import Title from "@/app/_components/Title";
import ExpenseList from "./_components/ExpenseList";
import CategoryBudgetChart from "./_components/CategoryBudgetChart";

const Expenses = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const [selectedPeriod, setSelectedPeriod] = useState({
    year: currentYear,
    month: currentMonth,
  })

  return (
    <div className="inner flex gap-5 mt-10 mb-20 lg:flex-col">
      <div className="flex flex-col items-center gap-3 w-[587px] lg:w-full">
        <Title name="支出一覧" iconSrc="/images/pencil.png" />
        <ExpenseList selectedPeriod={selectedPeriod} onChange={(year, month) => setSelectedPeriod({ year, month })} />
      </div>
      <div className="flex flex-col items-center gap-3 w-[calc(100%-602px)] lg:w-full">
        <Title name={`${selectedPeriod.year}年${selectedPeriod.month}月の使用状況`} iconSrc="/images/category.png" />
        <CategoryBudgetChart selectedPeriod={selectedPeriod} />
      </div>
    </div>
  )
}

export default Expenses;
