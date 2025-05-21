import useFetch from "@/app/_hooks/useFetch";
import { ExpensesResponse } from "../api/expenses/month/route";

const useExpenses = () => useFetch<ExpensesResponse>("/api/expenses");

export default useExpenses;
