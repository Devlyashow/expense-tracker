import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import categoryLabels from '../constants/categoryLabels'

type CategoryLabelKey = keyof typeof categoryLabels;

export default function CategoryPage() {
// useParams 
    const navigate = useNavigate()
    const {categoryId} = useParams()
    const categoryName = categoryId && categoryId in categoryLabels
    ? categoryLabels[categoryId as CategoryLabelKey]
    : null;

    const [help, setHelp] = useState('')
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        setError(null)
        setHelp('')
        async function helpingCategories() {
        try {
            const response = await fetch('/helpCategory.json')
            if (!response.ok) {throw new Error('Ошибка сети')}
            const helpCategory = await response.json()
            if (!helpCategory) return
            if (!categoryId) return
            setHelp(helpCategory[categoryId])
        } catch(err) {
             if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Неизвестная ошибка')
            }
        }
        }

        if(categoryName) helpingCategories()
    }, [categoryId, categoryName])
    
    

  return (
<div>
{!categoryName ? (<p>Категория не найдена</p>) : 
    (
    <div>
    <h1>Ключ категории и её название</h1>
    <p>Ключ: {categoryId}</p>
    <p>Название: {categoryName}</p>
    <p>Подсказка по категории: {error ? error : help}</p>
  </div>
    )}
    <button onClick={()=>{navigate(-1)}}>Назад</button>
</div>
  )
}
