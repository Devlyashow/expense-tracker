import { Link} from 'react-router-dom'

export default function HomePage() {

  return (
        <div>
            <h1>Добро пожаловать!</h1>
            <h2>Это трекер учета доходов и расходов</h2>
            <p>Приложение собрано на базе React. База данных - supabase.com</p>
            <p>В этом трекере вы можете добавлять собственные категории расходов, доходов и отслеживать статистику своего денежного потока за любой период времени</p>
            <Link to="/transactions?from=home" className='buttonHomePage'>К приложению</Link>
        </div>
  )
}
