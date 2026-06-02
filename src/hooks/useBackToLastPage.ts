import { useNavigate } from 'react-router-dom'

export function useBackToLastPage () {
    const navigate = useNavigate()

    function backToLastPage() {
        navigate(-1)
    }
    function goToHome() {
        navigate('/?from=edit')
    }

    return { backToLastPage, goToHome }
}