import useFetch from "@/app/_hooks/useFetch";
import type { Expense } from "@/app/_types/Expense";

const useExpenses = () => useFetch<{ expenses: Expense[] }>("/api/expenses");

export default useExpenses;
