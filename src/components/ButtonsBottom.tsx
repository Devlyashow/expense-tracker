import { useNavigateInApp } from '../hooks/useNavigateInApp'
type ButtonsBottomProps = {
    fromTransaction?:boolean
}
export default function ButtonsBottom({fromTransaction}:ButtonsBottomProps)  {

        const {backToLastPage, goToHome, goToTransactions, goToCategories} = useNavigateInApp()

  return (
    <div className="aboutPageButtons">
            <button type="button" onClick={backToLastPage}>Назад</button>
            <button type="button" onClick={goToHome}>На главную</button>
            {fromTransaction?<button onClick={goToCategories}>К категориям</button>:<button onClick={goToTransactions}>К транзакциям</button>}
    </div>
  )
}
