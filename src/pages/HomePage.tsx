import { Link, useLocation} from 'react-router-dom'

export default function HomePage() {

const location = useLocation()
  return (
        <div>
            <h1>Добро пожаловать!</h1>
            <h2>Это трекер учета доходов и расходов</h2>
            <p>Приложение собрано на базе React</p>
            <p>В нём можно добавлять и удалять свои транзакции в течение месяца и благодаря этому более качественно контролировать свой денежный поток.</p>
            <h3>Пример категорий, котрые могут присутствуют в трекере (для перехода используется useParams и useNavigate):</h3>
            <div className='homePage_Expenses-Income'>
                <div className='homePage_Expenses'>
                    <label>Статьи расходов</label>
                    <ul className='ulAboutPage'>
                        <li className='liAboutPage'><Link to="/categories/food" className='liHomePage-Link'>Еда</Link></li>
                        <li className='liAboutPage'><Link to="/categories/transport" className='liHomePage-Link'>Транспорт</Link></li>
                        <li className='liAboutPage'><Link to="/categories/utilities" className='liHomePage-Link'>ЖКХ/Связь</Link></li>
                        <li className='liAboutPage'><Link to="/categories/savings" className='liHomePage-Link'>Подушка безопасности</Link></li>
                        <li className='liAboutPage'><Link to="/categories/investments" className='liHomePage-Link'>Инвестиции</Link></li>
                        <li className='liAboutPage'><Link to="/categories/others" className='liHomePage-Link'>Прочие расходы</Link></li>
                    </ul>
                </div>
                <div className='homePage_Income'>
                        <label>Статьи доходов</label>
                        <ul className='ulAboutPage'>
                            <li className='liAboutPage'><Link to="/categories/salary" className='liHomePage-Link'>Основная работа</Link></li>
                            <li className='liAboutPage'><Link to="/categories/sideJob" className='liHomePage-Link'>Халтуры</Link></li>
                        </ul>
                    </div>
            </div>
            <Link to="/transactions?from=home" className='buttonHomePage'>К приложению</Link>
            <p>Текущий путь: {location.pathname}</p>
        </div>
  )
}
