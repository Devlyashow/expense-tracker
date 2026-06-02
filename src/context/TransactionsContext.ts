import { createContext } from 'react'
import type {Transaction, Category, CreateTransactionData} from '../types'

export type TransactionsContextValue = {
    transactions: Transaction[],
    categories: Category[],
    addTransaction: (transaction: CreateTransactionData)=>void,
    editTransaction: (transaction: Transaction)=>void,
    deleteTransaction: (id:string)=>void,
}

export const  TransactionsContext = createContext<TransactionsContextValue | null>(null)