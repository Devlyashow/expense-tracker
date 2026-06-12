import { Link} from 'react-router-dom'

export default function HomePage() {
  return (
    <main className="portfolio-home">
      <section className="page-hero">
        <p className="hero-badge">Portfolio project</p>

        <h1>Expense Tracker</h1>

        <p className="hero-subtitle">
          Приложение для учёта личных доходов и расходов с авторизацией,
          приватными пользовательскими данными, категориями, фильтрами и статистикой.
        </p>

        <div className="hero-actions">
          <Link to="/transactions?from=home" className="buttonHomePage">
            Открыть приложение
          </Link>

          <Link to="/about" className="buttonHomePage">
            О проекте
          </Link>
        </div>
      </section>

      <section className="home-highlights">
        <article className="info-card">
          <h3>🔐 Приватные данные</h3>
          <p>
            Каждый пользователь видит только свои категории и транзакции.
            Доступ защищён через Supabase Auth и Row Level Security.
          </p>
        </article>

        <article className="info-card">
          <h3>💸 Реальный CRUD</h3>
          <p>
            В приложении можно создавать, редактировать и удалять категории
            и финансовые операции.
          </p>
        </article>

        <article className="info-card">
          <h3>📊 Статистика</h3>
          <p>
            Доходы и расходы отображаются в диаграммах с фильтрацией по периоду.
          </p>
        </article>
      </section>
    </main>
  )
}
