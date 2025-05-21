import useFetch from "@/app/_hooks/useFetch";
import { ExpensesResponse } from "../api/expenses/month/route";

const useExpensesByMonth = (year: number, month: number) => useFetch<ExpensesResponse>(`/api/expenses/month?year=${year}&month=${month}`);

export default useExpensesByMonth;
