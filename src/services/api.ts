import type { Transaction, Category, CreateCategoryData, CreateTransactionData} from '../types'

const API_URL = import.meta.env.VITE_API_URL

async function handleResponse<T>(
      response: Response,
      errorMessage: string
    ): Promise<T> {
        if (!response.ok) {
        throw new Error(errorMessage)
  }
  return response.json()
}

function handleEmptyResponse(
  response: Response,
  errorMessage: string
): void {
  if (!response.ok) {
    throw new Error(errorMessage)
  }
}

// Функция для получения списка транзакций
export async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch(`${API_URL}/transactions`)

  return handleResponse<Transaction[]>(response, 'Не удалось загрузить транзакции')
}
// Функция для получения списка категорий
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`)

  return handleResponse<Category[]>(response, 'Не удалось загрузить категории')
}

// Функция для создания новой категории
export async function createCategory(
  category: CreateCategoryData
): Promise<Category> {
  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  })

  return handleResponse<Category>(response, 'Не удалось создать категорию')
}
// Функция для удаления категории по id
export async function deleteCategoryById(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
  })

  handleEmptyResponse(response, 'Не удалось удалить категорию')
}
// Функция для обновления категории
export async function updateCategory(category: Category): Promise<Category> {
  const response = await fetch(`${API_URL}/categories/${category.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  })

  return handleResponse<Category>(response, 'Не удалось обновить категорию')
}
//Функция для создания транзакции
export async function createTransaction(transaction: CreateTransactionData): Promise<Transaction> {
    const response = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(transaction)
    })
    

  return handleResponse<Transaction>(response, 'Не удалось создать транзакцию')
}
//Функция для удаления транзакции
export async function deleteTransactionById(id:string): Promise<void> {
    const response = await fetch(`${API_URL}/transactions/${id}`, {method: 'DELETE'})
    handleEmptyResponse(response, 'Не удалось удалить транзакцию')
  }
// Функуия для обновления транзакции
export async function updateTransaction(transaction: Transaction): Promise<Transaction> {
    const response = await fetch(`${API_URL}/transactions/${transaction.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(transaction)
    })
    return handleResponse<Transaction>(response, 'Не удалось обновить транзакцию')
}
