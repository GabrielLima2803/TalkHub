import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugin/axios'
// import router from '../router';

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    user: {},
    token: '',
    message: ''
  })

  const registerUsers = async ({ username, email, password, confirmPassword }) => {
    const response = await api.post('/user/register', {
      username,
      email,
      password,
      confirmPassword
    })
    state.user = response.data.user

    console.log('User registered:', response.data)
  }

  const loginUser = async ({ identifier, password }) => {
    try {
      const response = await api.post('/user/login', {
        identifier,
        password
      })

      state.token = response.data.token
      console.log('User logged in:', response.data)
      return response
    } catch (error) {
      console.error('Erro durante o login:', error.response.data.msg)
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

  const resetPassword = async ({email, code, newPassword}) => {
    try {
      const response = await api.post('user/reset-password', {email, code, newPassword})
      console.log('Senha redefinida com sucesso', response.data)
      return response
    } catch (error) {
      console.error('Error reset password:')
      throw error
    }
  }

  const clearMessage = () => {
    state.message = ''
  }

  return {
    user: ref(state.user),
    message: ref(state.message),
    registerUsers,
    clearMessage,
    loginUser,
    sendResetCode,
    resetPassword
  }
})
