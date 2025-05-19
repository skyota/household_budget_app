import useFetch from "@/app/_hooks/useFetch";
import type { CategoryBudget } from "@/app/_types/CategoryBudget";

const useCategoryBudgets = () => useFetch<{ categoryBudgets: CategoryBudget[] }>("/api/category_budgets");

export default useCategoryBudgets;
