import { useState } from 'react'
import { Link } from 'react-router-dom'

type ResetPasswordPageProps = {
    resetPassword: (email: string) => Promise<boolean>
    updatePassword: (newPassword: string) => Promise<boolean>;
    authError: string | null
    isPasswordRecovery: boolean
}

export default function ResetPasswordPage({resetPassword, updatePassword, authError, isPasswordRecovery}:ResetPasswordPageProps) {
const [email, setEmail] = useState('')
const [error, setError] = useState('')
const [success, setSuccess] = useState(false)
const [loading, setLoading] = useState(false)
const [newPassword, setNewPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [passwordUpdated, setPasswordUpdated] = useState(false)

const isSetNewPasswordMode = isPasswordRecovery

async function handleSubmit() {
  setError('')

  if (email.trim() === '') {
    setError('Введите email')
    return
  }

  setLoading(true)

  try {
    const isSuccess = await resetPassword(email)

    if (isSuccess) {
      setSuccess(true)
      return
    }

    setError('Не удалось отправить письмо. Проверьте email и попробуйте ещё раз.')
  } catch (error) {
    setError('Произошла неизвестная ошибка. Попробуйте позже.')

    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('Неизвестная ошибка')
    }
  } finally {
    setLoading(false)
  }
}

async function handleUpdatePassword() {
    setError('')
    if (newPassword.trim() === '') {
        setError('Введите новый пароль')
        return
    }
    if (confirmPassword.trim() === '') {
        setError('Повторите пароль')
        return
    }
    if (newPassword !== confirmPassword) {
        setError('Пароли не совпадают')
        return
    }
        setLoading(true)
        try {
            const isSuccess = await updatePassword(newPassword)

            if (isSuccess) {
            setPasswordUpdated(true)
            return
            }

            setError('Не удалось обновить пароль. Попробуйте ещё раз.')
        } catch (err) {
            setError('Произошла неизвестная ошибка. Попробуйте позже.')

            if (err instanceof Error) {
            console.error(err.message)
            } else {
            console.error('Неизвестная ошибка')
            }
        } finally {
            setLoading(false)
        }
    
}

if (passwordUpdated) {
  return (
    <div>
      <h1>Пароль успешно обновлён</h1>
      <h3>Теперь можно войти с новым паролем</h3>
      <Link to="/">← Вернуться ко входу</Link>
    </div>
  )
}

if (isSetNewPasswordMode) {
  return (
    <div>
      <h1>Новый пароль</h1>
      <h3>Введите новый пароль для аккаунта</h3>

      <div className="form-control">
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          value={newPassword}
          onChange={event => setNewPassword(event.target.value)}
          placeholder="Введите новый пароль"
        />
      </div>

      <div className="form-control">
        <label htmlFor="passwordConfirm">Повторите пароль</label>
        <input
          id="passwordConfirm"
          type="password"
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
          placeholder="Повторите новый пароль"
        />
      </div>

      {(error || authError) && <p className="error">{error || authError}</p>}

      <button
        className="authButtonSingIn"
        type="button"
        onClick={handleUpdatePassword}
        disabled={loading}
        >
        {loading ? 'Сохраняем...' : 'Сохранить новый пароль'}
       </button>

      <Link to="/">← Вернуться ко входу</Link>
    </div>
  )
}

if (success) {
  return (
    <div>
      <h1>Письмо отправлено на {email}</h1>
      <h3>Проверьте свою почту</h3>
      <Link to="/">← Вернуться ко входу</Link>
    </div>
  )
}

  return (
     <div>
    <h1>Восстановление пароля</h1>
    <h3>Введите email, и мы отправим ссылку для восстановления пароля.</h3>

    <input
      id="email"
      type="email"
      value={email}
      onChange={event => setEmail(event.target.value)}
      placeholder="Введите email"
    />

    {(error || authError) && <p className="error">{error || authError}</p>}

    <button
      className="authButtonSingIn"
      type="button"
      onClick={handleSubmit}
      disabled={loading}
    >
      {loading ? 'Отправляем...' : 'Отправить ссылку'}
    </button>

    <Link to="/">← Вернуться ко входу</Link>
  </div>
  )
}
