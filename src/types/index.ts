export type Transaction = {
    id: string;
    category: string;
    text: string;
    amount: number;
    date: string;
};

export type CategoryType = 'income' | 'expense' | null;
export type CategoryFormMode = 'create' | 'edit'


export type Category = {
    id: string;
    key: string;
    name: string;
    type: CategoryType;
};

export type CreateCategoryData = Omit<Category, 'id'>;

export type CreateTransactionData = Omit<Transaction, 'id'>;

export type CategoryStatsItem = {
    categoryKey: string;
    name: string;
    value: number;
    percent: number;
};
export type PeriodPreset =
  | 'all'
  | 'day'
  | 'week'
  | 'month'
  | 'lastMonth'
  | 'custom';

export type CategoryFormData = {
  text: string;
  incomeOrExpense: CategoryType | null;
}
 
