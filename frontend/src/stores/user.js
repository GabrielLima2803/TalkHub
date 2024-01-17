import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import api from '@/plugin/axios'

export const useUserStore = defineStore('user', () => {
  const state = {
    loggedIn: useStorage('loggedIn', false),
    user: useStorage('user', {}),
    token: useStorage('token', ''),
  }

  const registerUsers = async ({ username, email, password, confirmPassword }) => {
    try {
      const response = await api.post('/user/register', {
        username,
        email,
        password,
        confirmPassword
      })
      state.user.value = response.data.user
      console.log('User registered:', response.data)
      return response
    } catch (error) {
      console.error('Error registering user:', error.response.data.error)
      throw error
    }
  }

  const loginUser = async ({ identifier, password }) => {
    try {
      const response = await api.post('/user/login', {
        identifier,
        password
      })
      state.loggedIn.value = true
      state.user.value = response.data.user
      state.token.value = response.data.token
      console.log('User logged in:', response.data)
      return response
    } catch (error) {
      console.error('Error during login:', error.response.data.msg)
      throw error
    }
  }

  const sendResetCode = async ({ email }) => {
    try {
      const response = await api.post('/user/forget-password', { email })
      console.log('Reset code sent successfully:', response.data)
      return response
    } catch (error) {
      console.error('Error sending reset code:', error.response.data.error)
      throw error
    }
  }

  const resetPassword = async ({ email, code, newPassword }) => {
    try {
      const response = await api.post('user/reset-password', { email, code, newPassword })
      console.log('Password reset successfully:', response.data)
      return response
    } catch (error) {
      console.error('Error resetting password:', error.response.data.error)
      throw error
    }
  }

  return {
    ...state,
    registerUsers,
    loginUser,
    sendResetCode,
    resetPassword
  }
})
