export interface Expense {
  id: number;
  categoryId: number;
  amount: number;
  date: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    budgetAmount: number;
    displayColor: string;
  };
}
