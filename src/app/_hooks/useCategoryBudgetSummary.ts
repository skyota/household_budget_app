import useFetch from "@/app/_hooks/useFetch";

export interface CategoryBudgetSummary {
  categoryId: number;
  name: string;
  budgetAmount: number;
  displayColor: string;
  totalExpense: number;
  percent: number;
  isOver: boolean;
}

const useCategoryBudgetSummary = (year: number, month: number) => useFetch<CategoryBudgetSummary[]>(`/api/category_budgets/summary?year=${year}&month=${month}`);

export default useCategoryBudgetSummary;
