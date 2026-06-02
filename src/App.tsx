import useAuth from './hooks/useAuth'
import AuthPage from './pages/AuthPage'
import AuthenticatedApp from './AuthenticatedApp'

function App() {
const {
  user,
  authLoading,
  authError,
  signUp,
  signIn,
  signOut,
} = useAuth()

if (authLoading) {
  return <p>Проверяем сессию...</p>
}

if (!user) {
  return (
    <AuthPage
      authError={authError}
      signUp={signUp}
      signIn={signIn}
    />
  )
}

  return (
    <AuthenticatedApp
      userEmail={user.email}
      signOut={signOut}
    />
  )
}

export default App
