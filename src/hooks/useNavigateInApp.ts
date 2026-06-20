import { useNavigate } from 'react-router-dom'

export function useNavigateInApp () {
    const navigate = useNavigate()

    function backToLastPage() {
        navigate(-1)
    }
    function goToHome() {
        navigate('/')
    }
    function goToTransactions() {
    navigate('/transactions')
    }
    function goToCategories() {
    navigate('/addCategories')
    }

    return { backToLastPage, goToHome, goToTransactions, goToCategories }
}