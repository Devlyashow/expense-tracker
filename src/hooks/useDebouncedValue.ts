import { useEffect, useState } from "react";
// Учебный хук, который принимает какое-то значение и время. При изменении значения или времени хук меняет значение через State и возвращает новое через переданное в параметры время
export default function useDebouncedValue<T>(value: T, delay: number) : T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(()=>{
        const timerID = setTimeout(()=>{
            setDebouncedValue(value)
        }, delay)
        return ()=>clearTimeout(timerID)
    }, [value, delay])

    return debouncedValue
}