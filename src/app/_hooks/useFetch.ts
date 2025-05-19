"use client";

import useSWR from "swr";
import { api } from "@/app/_utils/api";

const useFetch = <T,>(url: string) => {
  const fetcher = (url: string) => api.get<T>(url);
  const { data, error, isLoading } = useSWR<T>(url, fetcher);
  return { data, error, isLoading };
};

export default useFetch;
