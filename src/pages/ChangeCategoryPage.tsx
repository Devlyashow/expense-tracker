
import { useParams } from "react-router-dom"
import {useTransactionsContext} from '../context/useTransactionsContext'
import CategoryForm from "../components/CategoryForm"
import type {Category,CategoryFormData,CategoryType} from '../types'
import { useNavigateInApp } from "../hooks/useNavigateInApp"

type ChangeCategoryPageProps = {
  editCategory: (updatedCategory: Category)=>void
  fixedType?: CategoryType;
}

export default function ChangeCategoryPage({editCategory, fixedType}:ChangeCategoryPageProps) {

const { backToLastPage } = useNavigateInApp()
const {categories, transactions} = useTransactionsContext()
const { categoryId } = useParams()

if (!categoryId) {
  return <div>Некорректный id категории</div>
}

const category = categories.find(cat => cat.id === categoryId)
if (!category) {
    return <div>Категория не найдена</div>
  }
const currentCategory: Category = category

const hasTransactionsWithThisCategory = transactions.some(txn => txn.category === currentCategory.key)

const initialData: CategoryFormData = {
  text: currentCategory.name,
  incomeOrExpense: currentCategory.type
}

function handleChangeCategory(data: CategoryFormData) {
if (!data.incomeOrExpense) return

  const updatedCategory: Category = {
    id: currentCategory.id,
    key: currentCategory.key,
    name: data.text,
    type: data.incomeOrExpense,
  }

  editCategory(updatedCategory)
  backToLastPage()
}

  return (
    <div>
    <CategoryForm
    initialData={initialData}
    mode='edit'
    onSubmit={handleChangeCategory}
    hasTransactionsWithThisCategory={hasTransactionsWithThisCategory}
    />
    </div>
  )
}
