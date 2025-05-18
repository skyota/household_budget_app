import useFetch from "@/app/_hooks/useFetch";

export interface CategoryBudget {
  id: number;
  name: string;
  budgetAmount: number;
  displayColor: string;
  createdAt: string;
  updatedAt: string;
}

const useCategoryBudgets = () => useFetch<{ categoryBudgets: CategoryBudget[] }>("/api/category_budgets");

export default useCategoryBudgets;
