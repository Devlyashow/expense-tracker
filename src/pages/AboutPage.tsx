import ButtonsBottom from '../components/ButtonsBottom'


export default function AboutPage() {

  return (
    <main className="about-page">
      <section className="page-hero">
        <p className="hero-badge">About project</p>

        <h2>О приложении Expense Tracker</h2>

        <p className="hero-subtitle">
          Expense Tracker — portfolio-приложение для учёта доходов и расходов.
          Проект показывает работу с React, TypeScript, авторизацией,
          удалённой базой данных, приватными пользовательскими данными и деплоем.
        </p>
      </section>

      <section className="home-highlights">
        <article className="info-card">
          <h3>Что умеет приложение</h3>
          <ul>
            <li>Регистрация, вход и выход пользователя</li>
            <li>Создание категорий доходов и расходов</li>
            <li>CRUD транзакций</li>
            <li>Фильтрация, поиск и сортировка</li>
            <li>Статистика по периодам</li>
          </ul>
        </article>

        <article className="info-card">
          <h3>Технический фокус</h3>
          <ul>
            <li>React + TypeScript</li>
            <li>React Router</li>
            <li>Custom Hooks и Context</li>
            <li>Supabase Auth и Database</li>
            <li>Row Level Security</li>
            <li>Vercel deploy</li>
          </ul>
        </article>

        <article className="info-card">
          <h3>Почему это важно</h3>
          <p>
            В проекте реализован не только интерфейс, но и полный путь данных:
            от формы в React до защищённой записи в базе данных конкретного пользователя.
          </p>
        </article>
      </section>

      <ButtonsBottom/>
    </main>
  )
}
