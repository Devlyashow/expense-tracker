# 💰 Expense Tracker

**Expense Tracker** — приложение для учёта личных доходов и расходов с авторизацией, приватными пользовательскими данными, кастомными категориями, фильтрами и статистикой.

Проект сделан как portfolio-приложение: с удалённой базой данных, авторизацией, защитой данных через Supabase RLS, адаптивной вёрсткой и live-деплоем.

---

## 🚀 Live Demo

👉 **[Открыть приложение](https://expense-tracker-ashen-five-23.vercel.app/)**

---

## 🛠 Tech Stack

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-1E293B?style=for-the-badge&logo=typescript&logoColor=3178C6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-1E293B?style=for-the-badge&logo=vite&logoColor=646CFF" alt="Vite" />
  <img src="https://img.shields.io/badge/Supabase-1E293B?style=for-the-badge&logo=supabase&logoColor=3ECF8E" alt="Supabase" />
  <img src="https://img.shields.io/badge/React_Router-1E293B?style=for-the-badge&logo=reactrouter&logoColor=CA4245" alt="React Router" />
  <img src="https://img.shields.io/badge/Recharts-1E293B?style=for-the-badge&logo=chartdotjs&logoColor=FF6384" alt="Recharts" />
  <img src="https://img.shields.io/badge/Vercel-1E293B?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

---

## 📌 О проекте

Expense Tracker помогает пользователю вести личный финансовый учёт:

- создавать категории доходов и расходов;
- добавлять финансовые операции;
- фильтровать, искать и сортировать транзакции;
- смотреть баланс и статистику;
- работать только со своими личными данными после входа в аккаунт.

> Каждый пользователь видит только свои категории и транзакции.
> Приватность данных реализована через `user_id` и Supabase Row Level Security.

---

## ✨ Основные возможности

| Раздел             | Возможности                                                    |
| ------------------ | -------------------------------------------------------------- |
| 🔐 **Авторизация** | Регистрация, вход, выход, хранение пользовательской сессии     |
| 🛡 **Приватность** | Данные разделены по пользователям через `user_id`              |
| 📂 **Категории**   | Создание, редактирование и удаление категорий доходов/расходов |
| 💸 **Транзакции**  | Создание, редактирование и удаление финансовых операций        |
| 🔎 **Фильтры**     | Фильтрация по категории, поиск по названию, сортировка         |
| 🔗 **URL Sync**    | Синхронизация фильтров с query-параметрами                     |
| 📊 **Статистика**  | Диаграммы доходов и расходов, фильтрация по периодам           |
| 📱 **Адаптив**     | Мобильная версия, бургер-меню, тёмная тема                     |

---

## 🧩 Пользовательский flow

```txt
Регистрация / вход
        ↓
Загрузка приватных данных пользователя
        ↓
Создание категорий
        ↓
Добавление транзакций
        ↓
Фильтрация, поиск и сортировка
        ↓
Просмотр баланса и статистики
```

---

## 🏗 Архитектура

```txt
React UI
  ↓
Pages / Components
  ↓
Custom Hooks
  ↓
Supabase API layer
  ↓
Supabase Client
  ↓
Supabase Auth + Database + RLS
```

### Структура проекта

```txt
src/
  components/        UI-компоненты
  pages/             страницы приложения
  hooks/             кастомные хуки
  services/          работа с Supabase
  context/           React Context
  utils/             расчёты и подготовка данных
  types/             TypeScript-типы
  constants/         константы проекта
```

---

## 🗄 Основные сущности

### Category

```ts
type Category = {
  id: string;
  key: string;
  name: string;
  type: "income" | "expense";
};
```

### Transaction

```ts
type Transaction = {
  id: string;
  category: string;
  text: string;
  amount: number;
  date: string;
};
```

Связь между транзакциями и категориями построена через `category.key`.

---

## 🔐 Работа с Supabase

В проекте используются:

- **Supabase Auth** — регистрация и вход пользователей;
- **Supabase Database** — хранение категорий и транзакций;
- **Row Level Security** — защита данных пользователя;
- **auth.uid()** — автоматическая привязка записей к текущему пользователю.

Логика доступа:

```txt
Пользователь может читать, создавать, изменять и удалять только те строки,
у которых user_id совпадает с его auth.uid().
```

---

## ⚙️ Локальный запуск

Склонировать репозиторий:

```bash
git clone https://github.com/Devlyashow/expense-tracker.git
```

Перейти в папку проекта:

```bash
cd expense-tracker
```

Установить зависимости:

```bash
npm install
```

Создать файл `.env` в корне проекта:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Запустить проект:

```bash
npm run dev
```

Собрать проект:

```bash
npm run build
```

---

## 🌐 Деплой

Проект задеплоен на **Vercel**.

Для корректной работы на Vercel нужно добавить environment variables:

```env
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Для client-side routing используется `vercel.json`.

---

## ✅ Что реализовано

- [x] React + TypeScript
- [x] Supabase Auth
- [x] Supabase Database
- [x] Row Level Security
- [x] Приватные данные пользователей
- [x] CRUD категорий
- [x] CRUD транзакций
- [x] Поиск и фильтрация
- [x] Сортировка
- [x] Синхронизация фильтров с URL
- [x] Статистика с диаграммами
- [x] Адаптивная вёрстка
- [x] Бургер-меню
- [x] Тёмная тема
- [x] Деплой на Vercel

---

## 🔮 Что можно улучшить дальше

- [ ] Восстановление пароля
- [ ] Toast-уведомления
- [ ] Optimistic UI для CRUD-операций
- [ ] Demo account
- [ ] Выбор валюты
- [ ] Экспорт данных
- [ ] Цвета категорий
- [ ] Тесты
- [ ] Улучшение UX формы авторизации

---

## 🎯 Цель проекта

Проект создан для практики полного frontend-flow:

- работа с формами;
- управление состоянием;
- маршрутизация;
- работа с удалённой базой;
- авторизация;
- защита пользовательских данных;
- типизация;
- адаптивный интерфейс;
- деплой production-like версии.

---

## 👤 Автор

**Сергей Девляшов**
Frontend Developer

GitHub: [Devlyashow](https://github.com/Devlyashow)
