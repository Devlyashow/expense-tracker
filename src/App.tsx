import useAuth from './hooks/useAuth'
import AuthPage from './pages/AuthPage'
import AuthenticatedApp from './AuthenticatedApp'
import { Route, Routes, Navigate } from 'react-router-dom'
import ResetPasswordPage from './pages/ResetPasswordPage'

function App() {
const {
  user,
  authLoading,
  authError,
  signUp,
  signIn,
  signOut,
  resetPassword,
  updatePassword,
} = useAuth()

if (authLoading) {
  return <p>Проверяем сессию...</p>
}

  return (
  <Routes>
    <Route
      path="/reset-password"
      element={
        <ResetPasswordPage
          resetPassword={resetPassword}
          updatePassword={updatePassword}
          authError={authError}
        />
      }
    />

    {!user ? (
      <>
        <Route
          path="/"
          element={
            <AuthPage
              authError={authError}
              signUp={signUp}
              signIn={signIn}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    ) : (
      <Route
        path="/*"
        element={
          <AuthenticatedApp
            userEmail={user.email}
            signOut={signOut}
          />
        }
      />
    )}
  </Routes>
)
}

export default App
