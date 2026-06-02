import { useContext } from 'react'
import {TransactionsContext} from './TransactionsContext'

export function useTransactionsContext() {
const context = useContext(TransactionsContext)

 if (!context) {
    throw new Error('useTransactionsContext должен использоваться внутри TransactionsProvider')
  }

 return context
}