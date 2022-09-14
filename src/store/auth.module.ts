import { acceptHMRUpdate, defineStore } from 'pinia'
import AuthService from '~/services/authService'

const storedUser = localStorage.getItem('user')

export const useAuthStore = defineStore('auth', () => {
  const status = storedUser ? { loggedIn: true } : { loggedIn: false }
  let user = storedUser ? JSON.parse(storedUser) : null

  function loginSuccess(userz: any): void {
    status.loggedIn = true
    user = userz
  }

  function loginFailure(): void {
    status.loggedIn = false
    user = null
  }

  function updateSuccess(userz: any): void {
    status.loggedIn = true
    user = userz
  }

  function logout(): void {
    status.loggedIn = false
    user = null
  }

  function login(data: any): Promise<any> {
    return AuthService.login(data.phone, data.password).then(
      (user) => {
        loginSuccess(user)
        return Promise.resolve(user)
      },
      (error) => {
        loginFailure()
        const message
          = (error.response && error.response.data && error.response.data.message)
          || error.message
          || error.toString()
        return Promise.reject(message)
      },
    )
  }

  function signOut(): void {
    AuthService.logout()
    logout()
  }

  function register(data: any): Promise<any> {
    return AuthService.register(data.phone, data.password).then(
      (user) => {
        loginSuccess(user)
        return Promise.resolve(user)
      },
      (error) => {
        loginFailure()
        const message
          = (error.response && error.response.data && error.response.data.message)
          || error.message
          || error.toString()
        return Promise.reject(message)
      },
    )
  }

  function update(data: any): Promise<any> {
    return AuthService.update(user.phone, data.phone, data.email, data.oldPassword, data.password).then(
      (user) => {
        updateSuccess(user)
        return Promise.resolve(user)
      },
      (error) => {
        const message
          = (error.response && error.response.data && error.response.data.message)
          || error.message
          || error.toString()
        return Promise.reject(message)
      },
    )
  }

  function isLoggedIn(): boolean {
    return status.loggedIn
  }

  function getUser() {
    return user
  }

  return {
    signOut,
    isLoggedIn,
    logout,
    register,
    getUser,
    login,
    update,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
