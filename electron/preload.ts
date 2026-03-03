import { ipcRenderer, contextBridge } from 'electron'

// ✅ ADD THIS MAP (store original -> wrapped)
const listenerMap = new Map<any, any>()

contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args

    // ✅ wrap the listener (same as before)
    const wrapped = (event: any, ...args: any[]) => listener(event, ...args)

    // ✅ store mapping so we can remove later
    listenerMap.set(listener, wrapped)

    return ipcRenderer.on(channel, wrapped)
  },

  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, listener] = args

    // ✅ get the wrapped function
    const wrapped = listenerMap.get(listener)

    if (wrapped) {
      ipcRenderer.off(channel, wrapped)
      listenerMap.delete(listener)
    } else {
      // fallback (in case mapping not found)
      ipcRenderer.off(channel, listener)
    }
  },

  // ✅ ADD THIS (IMPORTANT for cleanup)
  removeAllListeners(channel: string) {
    ipcRenderer.removeAllListeners(channel)
  },

  // ✅ OPTIONAL (useful)
  once(channel: string, listener: (...args: any[]) => void) {
    ipcRenderer.once(channel, (event, ...args) => listener(event, ...args))
  },

  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },

  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  }
})