import { defineStore } from 'pinia'
const { init } = useToast()

type User = {
  id: number
  email: string
  name: string
  role: string
  department: string | null
  phone: string | null
  description: string | null
  lastAccess: string | null
  status: string
}

const initial: Partial<User> = {
  id: undefined,
  email: undefined,
  name: undefined,
  role: undefined,
  department: undefined,
  phone: undefined,
  description: undefined,
  lastAccess: undefined,
  status: undefined,
}

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      ...initial,
    }
  },
  actions: {
    async refresh() {
      const { data } = await useFetch<User, undefined>('/api/session', {
        method: 'GET',
        onResponse({ request, response, options }) {
          return response._data
        },
        onResponseError({ request, response, options }) {
          return undefined
        },
      })
      if (data.value) {
        this.id = data.value.id
        this.email = data.value.email
        this.name = data.value.name
        this.role = data.value.role
        this.department = data.value.department
        this.phone = data.value.phone
        this.description = data.value.description
        this.lastAccess = data.value.lastAccess
        this.status = data.value.status
      }
    },
    async login(email: string, password: string, redirectRouteName?: string) {
      const { data, pending, error, refresh } = await useFetch('/api/login', {
        method: 'POST',
        body: {
          email,
          password,
        },
        onResponseError({ request, response, options }) {
          init({ message: response.statusText, color: 'danger' })
        },
      })
    },
    async logout() {
      const { data } = await useFetch<Boolean, Boolean>('/api/logout', {
        method: 'DELETE',
        credentials: 'same-origin',
        onResponse({ request, response, options }) {
          return true
        },
        onResponseError({ request, response, options }) {
          init({ message: response.statusText, color: 'danger' })
          return false
        },
      })
      if (data) {
        this.$reset()
      }
    },
  },
  getters: {
    isActive: (state) => state.status == 'ACTIVE',
    getRole: (state) => state.role,
  },
})
