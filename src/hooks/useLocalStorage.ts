import { useState, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'

type LocalStorageHook<T> = [T, Dispatch<SetStateAction<T>>]

function useLocalStorage<T>(
    key: string,
    initialValue: T): LocalStorageHook<T> {
// В useState ищем в хранилище массив данных. Если есть - задаем его как useState. Еcли нет - то по дефолту.
    const [value, setValue] = useState<T>(()=>{
    const savedValue = localStorage.getItem(key)
    
    if (!savedValue) {
        return initialValue
    } 
    try {return JSON.parse(savedValue) as T} catch {return initialValue}
}
)

// Сохраняем значение в localStorage при изменении value или key
    useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

return [value, setValue]
}

export default useLocalStorage