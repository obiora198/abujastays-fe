import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useApolloClient } from '@apollo/client'
import { gql } from '@apollo/client'

type User = {
  id: string
  name: string
  email: string
  role: string
  isEmailVerified: boolean
  avatar?: string
  phone?: string
  emailNotifications?: boolean
}

type AuthContextType = {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  googleLogin: (idToken: string) => Promise<void>
  register: (userData: {
    name: string
    email: string
    password: string
    phone?: string
  }) => Promise<string>
  verifyEmail: (otp: string) => Promise<string>
  logout: () => void
  resendOtp: (email: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const client = useApolloClient()

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        try {
          const { data } = await client.query({
            query: gql`
              query CurrentUser {
                currentUser {
                  id
                  name
                  email
                  role
                  isEmailVerified
                  avatar
                  phone
                  emailNotifications
                }
              }
            `,
            context: {
              headers: {
                authorization: `Bearer ${storedToken}`
              }
            }
          })
          setUser(data.currentUser)
          setToken(storedToken)
        } catch (error) {
          localStorage.removeItem('token')
        }
      }
      setLoading(false)
    }
    initializeAuth()
  }, [client])

  const login = async (email: string, password: string) => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            token
            user {
              id
              name
              email
              role
              isEmailVerified
              avatar
              phone
              emailNotifications
            }
            message
          }
        }
      `,
      variables: {
        input: { email, password }
      }
    })
    
    localStorage.setItem('token', data.login.token)
    setToken(data.login.token)
    setUser(data.login.user)
  }

  const googleLogin = async (idToken: string) => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation LoginWithGoogle($idToken: String!) {
          loginWithGoogle(idToken: $idToken) {
            token
            user {
              id
              name
              email
              role
              isEmailVerified
              avatar
              phone
              emailNotifications
            }
          }
        }
      `,
      variables: { idToken }
    })

    localStorage.setItem('token', data.loginWithGoogle.token)
    setToken(data.loginWithGoogle.token)
    setUser(data.loginWithGoogle.user)
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
    phone?: string
  }) => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation Register($input: SignUpInput!) {
          register(input: $input) {
            token
            user {
              id
              name
              email
              role
              isEmailVerified
              avatar
              phone
              emailNotifications
            }
            message
          }
        }
      `,
      variables: {
        input: userData
      }
    })

    localStorage.setItem('token', data.register.token)
    setToken(data.register.token)
    setUser(data.register.user)
    return data.register.message
  }

  const verifyEmail = async (otp: string) => {
    const currentToken = localStorage.getItem('token'); // Get fresh token

    const { data } = await client.mutate({
      mutation: gql`
        mutation VerifyEmail($otp: String!) {
          verifyEmail(otp: $otp) {
            token
            user {
              id
              name
              email
              role
              isEmailVerified
              avatar
              phone
              emailNotifications
            }
            message
          }
        }
      `,
      variables: { otp },
      context: {
        headers: {
          authorization: `Bearer ${currentToken}` // Use directly from localStorage
        }
      }
    })

    localStorage.setItem('token', data.verifyEmail.token)
    setToken(data.verifyEmail.token)
    setUser(data.verifyEmail.user)
    return data.verifyEmail.message
  }

  const resendOtp = async (email: string) => {
    await client.mutate({
      mutation: gql`
        mutation ResendOTP($email: String!) {
          resendOTP(email: $email)
        }
      `,
      variables: { email }
    })
  }

  const forgotPassword = async (email: string) => {
    await client.mutate({
      mutation: gql`
        mutation ForgotPassword($email: String!) {
          forgotPassword(email: $email)
        }
      `,
      variables: { email }
    })
  }

  const resetPassword = async (token: string, password: string) => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation ResetPassword($token: String!, $password: String!) {
          resetPassword(token: $token, password: $password) {
            token
            user {
              id
              name
              email
              role
              isEmailVerified
              avatar
              phone
              emailNotifications
            }
            message
          }
        }
      `,
      variables: { token, password }
    })

    localStorage.setItem('token', data.resetPassword.token)
    setToken(data.resetPassword.token)
    setUser(data.resetPassword.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    client.resetStore()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        googleLogin,
        register,
        verifyEmail,
        logout,
        resendOtp,
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}