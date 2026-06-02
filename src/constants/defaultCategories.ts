const defaultCategories = [
{ id: 1, key: 'salary', name: 'Зарплата', type: 'income' },
{ id: 2, key: 'sideJob', name: 'Халтуры', type: 'income' },
{ id: 3, key: 'food', name: 'Еда', type: 'expense' },
{ id: 4, key: 'transport', name: 'Транспорт', type: 'expense' },
{ id: 5, key: 'utilities', name: 'ЖКХ/Связь', type: 'expense' },
{ id: 6, key: 'savings', name: 'Подушка безопасности', type: 'expense' },
{ id: 7, key: 'investments', name: 'Инвестиции', type: 'expense' },
{ id: 8, key: 'others', name: 'Другое', type: 'expense' },
] as const 

export default defaultCategories
