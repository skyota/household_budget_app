import useFetch from "@/app/_hooks/useFetch";
import type { Expense } from "@/app/_types/Expense";

const useExpensesByMonth = (year: number, month: number) => useFetch<{ expenses: Expense[] }>(`/api/expenses/month?year=${year}&month=${month}`);

export default useExpensesByMonth;
