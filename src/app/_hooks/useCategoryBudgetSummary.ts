import useFetch from "@/app/_hooks/useFetch";
import type { CategoryBudgetSummary } from "@/app/_types/CategoryBudgetSummary";

const useCategoryBudgetSummary = (year: number, month: number) => useFetch<CategoryBudgetSummary[]>(`/api/category_budgets/summary?year=${year}&month=${month}`);

export default useCategoryBudgetSummary;
