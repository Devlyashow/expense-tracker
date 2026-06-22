import { useEffect } from 'react'

type ToastType = 'success' | 'error' | 'info'

type ToastProps = {
  message: string
  type: ToastType
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timerId = setTimeout(() => {
      onClose()
    }, 3000)

    return () => {
      clearTimeout(timerId)
    }
  }, [onClose])

  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  )
}