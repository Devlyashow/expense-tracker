import { useState } from 'react'

type AuthPageProps = {
  authError: string | null
  signUp: (email: string, password: string) => void | Promise<void>
  signIn: (email: string, password: string) => void | Promise<void>
}

export default function AuthPage({ authError, signUp, signIn }: AuthPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignUp() {
    await signUp(email, password)
  }

  async function handleSignIn() {
    await signIn(email, password)
  }

  return (
    <div>
      <h1>Вход в приложение</h1>

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
      </div>

      {authError && <p className="error">{authError}</p>}

      <button className='authButtonSingIn' type="button" onClick={handleSignIn}>
        Войти
      </button>

      <button type="button" onClick={handleSignUp}>
        Зарегистрироваться
      </button>
    </div>
  )
}