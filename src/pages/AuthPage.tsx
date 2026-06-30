import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

type AuthMode = 'login' | 'register'
type AuthPageProps = {
  authError: string | null
  signUp: (email: string, password: string) => void | Promise<void>
  signIn: (email: string, password: string) => void | Promise<void>
}

export default function AuthPage({ authError, signUp, signIn }: AuthPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm , setPasswordConfirm ] = useState('')
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [errorInput, setErrorInput] = useState('')

async function handleDemoLogin() {
  setErrorInput('')

  await signIn(
    'demo.expense.tracker@mail.com',
    '470858Omg+'
  )
}

async function handleSubmit() {
  setErrorInput('')

  if (email.trim() === '') {
    setErrorInput('Введите email')
    return
  }

  if (password.trim() === '') {
    setErrorInput('Введите пароль')
    return
  }

  if (authMode === 'register') {
    if (password !== passwordConfirm) {
      setErrorInput('Пароли не совпадают')
      return
    }

    await signUp(email, password)

    return
  }

  await signIn(email, password)

}

  return (
    <div>
      {authMode==='login'&&<h1>Вход в аккаунт</h1>}
      {authMode==='register'&&<h1>Регистрация</h1>}
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="Введите email"
        />
      </div>

      <div className="form-control">
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="Введите пароль"
        />
        {authMode==='login'&&<Link to="/reset-password">Забыли пароль?</Link>}
        {errorInput && <p className="error">{errorInput}</p>}
      </div>
      {authMode === 'register' && (
        <div className="form-control">
          <label htmlFor="passwordConfirm">Повторите пароль</label>
          <input
            id="passwordConfirm"
            type="password"
            className="passwordConfirm"
            value={passwordConfirm}
            onChange={event => setPasswordConfirm(event.target.value)}
            placeholder="Повторите пароль"
          />
        </div>
      )}
      {authError && <p className="error">{authError}</p>}

      <button className='authButtonSingIn' type="button" onClick={handleSubmit}>
        {authMode === 'login' ? 'Войти' : 'Создать аккаунт'}
      </button>
      {authMode === 'login' && (
        <div className="demo-login-card">
          <div>
            <p className="demo-login-title">Быстро посмотреть проект?</p>
            <p className="demo-login-text">
              Войдите в демо-аккаунт без регистрации.
            </p>
          </div>

          <button
            className="demo-login-button"
            type="button"
            onClick={handleDemoLogin}
          >
            Демо
          </button>
        </div>
      )}
      {authMode==='login'&&<div className='registrerOrlogin'><p>Нет аккаунта?</p> <button className='authButtonSingIn' type="button" onClick={() => {
        setAuthMode('register')
        setErrorInput('')
        setPasswordConfirm('')
      }}>Зарегистрироваться</button></div>}
      {authMode==='register'&&<div className='registrerOrlogin'><p>Есть аккаунт?</p> <button className='authButtonSingIn' type="button" onClick={() => {
        setAuthMode('login')
        setErrorInput('')
        setPasswordConfirm('')
      }}>Войти</button></div>}
    </div>
  )
}