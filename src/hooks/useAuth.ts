import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../services/supabaseClient'

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSession() {
      setAuthLoading(true)
      setAuthError(null)

      const { data, error } = await supabase.auth.getSession()

      if (error) {
        setAuthError(error.message)
        setAuthLoading(false)
        return
      }

      setUser(data.session?.user ?? null)
      setAuthLoading(false)
    }

    loadSession()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function resetPassword(email: string) {
  setAuthError(null)

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) {
    setAuthError(error.message)
    return false
  }

  return true
}

async function updatePassword(newPassword:string): Promise<boolean> {
  setAuthError(null)
  const { error } = await supabase.auth.updateUser({
  password: newPassword,
})
    if (error) {
    setAuthError(error.message)
    return false
  }

  return true
}

  async function signUp(email: string, password: string) {
    setAuthError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setAuthError(error.message)
    }
  }

  async function signIn(email: string, password: string) {
    setAuthError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setAuthError(error.message)
    }
  }

  async function signOut() {
    setAuthError(null)

    const { error } = await supabase.auth.signOut()

    if (error) {
      setAuthError(error.message)
    }
  }

  return {
    user,
    authLoading,
    authError,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword
  }
}