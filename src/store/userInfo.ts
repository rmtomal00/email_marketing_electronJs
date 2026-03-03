import { defineStore } from 'pinia'
import { StoreNames } from '../enums/storeTypes'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: { name: '', email: '' },
    settings: { theme: 'light' }
  }),
  actions: {
    async save(key: StoreNames, value: unknown) {
      await window.ipcRenderer.invoke('store-save', key, value)
    },
    async load(key: StoreNames) {
      return await window.ipcRenderer.invoke('store-load', key)
    },
    async loadUser() {
      const user = await this.load(StoreNames.User)
      if (user) this.user = user
    },
    async saveUser() {
      await this.save(StoreNames.User, this.user)
    }
  }
})