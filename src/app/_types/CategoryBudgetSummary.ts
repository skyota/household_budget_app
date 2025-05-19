export interface CategoryBudgetSummary {
  categoryId: number;
  name: string;
  budgetAmount: number;
  displayColor: string;
  totalExpense: number;
  percent: number;
  isOver: boolean;
}
