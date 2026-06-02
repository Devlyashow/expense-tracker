import { useEffect, useRef } from 'react'
import type {Dispatch, SetStateAction} from 'react'
import {useSearchParams} from 'react-router-dom'
import { useTransactionsContext } from '../context/useTransactionsContext'
import type { SortOption } from '../constants/sortNames'

type UseTransactionsUrlSyncParams = {
  selectedCategory: string,
  setSelectedCategory: Dispatch<SetStateAction<string>>,
  searchTerm: string,
  setSearchTerm: Dispatch<SetStateAction<string>>,
  sortOption: SortOption,
  setSortOption: Dispatch<SetStateAction<SortOption>>,
  sortNames: readonly SortOption[]
}

type UseTransactionsUrlSyncResult = {
  from: string | null;
};

export default function useTransactionsUrlSync({
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  sortNames
}: UseTransactionsUrlSyncParams): UseTransactionsUrlSyncResult {
    const {categories} = useTransactionsContext()
    const [searchParams, setSearchParams] = useSearchParams()
    const from = searchParams.get('from')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort')
    const isValidCategory = categories.some(c => c.key === category)
    const isFirstCategorySync = useRef(true)
    const isFirstSearchSync = useRef(true)
    const isFirstSortSync = useRef(true)
    // Изменение ссылки через выбор фильтров категории и наоборот
        useEffect(()=>{
            if (isFirstCategorySync.current) {
            isFirstCategorySync.current = false
            return
        }
        setSearchParams((prevParams)=>{
            const nextParams = new URLSearchParams(prevParams)
                    if (selectedCategory === 'all') {
                    nextParams.delete('category')
                    } else {
                        nextParams.set('category', selectedCategory)
                    }
                return nextParams
            }) 
        }, [selectedCategory, setSearchParams])

        useEffect(() => {
        if (!category) {
            setSelectedCategory('all')
            return
        }

        if (isValidCategory) {
            setSelectedCategory(category)
            return
        }

        setSelectedCategory('all')
        }, [category, isValidCategory, setSelectedCategory])
    // Изменение ссылки через поиск внутри категории и наоборот
        useEffect(()=>{
            if (isFirstSearchSync.current) {
            isFirstSearchSync.current = false
            return
        }
        setSearchParams((prevParams)=>{
            const nextParams = new URLSearchParams(prevParams)
            if(searchTerm===''){
                nextParams.delete('search')
            } else nextParams.set('search', searchTerm)
            return nextParams
        })
        }, [searchTerm, setSearchParams])

        useEffect(() => {
        if (!search) {
            setSearchTerm('')
            return
        }

    setSearchTerm(search)
}, [search, setSearchTerm])
    // Изменение ссылки через сортировку и наоборот
        useEffect(()=>{
            if (isFirstSortSync.current) {
            isFirstSortSync.current = false
            return
        }
            setSearchParams((prevParams)=>{
                const nextParams = new URLSearchParams(prevParams)
                if (sortOption==='newest') {
                    nextParams.delete('sort')
                } else {
                    nextParams.set('sort', sortOption)
                }
                return nextParams
            })
        }, [sortOption, setSearchParams])

            useEffect(() => {
            if (!sort) {
                setSortOption('newest')
                return
            }

            if (!sortNames.includes(sort as SortOption)) {
                setSortOption('newest')
                return
            }

            setSortOption(sort as SortOption)
            }, [sort, sortNames, setSortOption])

  return {from}
  
}
