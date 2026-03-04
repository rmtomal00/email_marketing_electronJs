"use strict";
const electron = require("electron");
const listenerMap = /* @__PURE__ */ new Map();
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    const wrapped = (event, ...args2) => listener(event, ...args2);
    listenerMap.set(listener, wrapped);
    return electron.ipcRenderer.on(channel, wrapped);
  },
  off(...args) {
    const [channel, listener] = args;
    const wrapped = listenerMap.get(listener);
    if (wrapped) {
      electron.ipcRenderer.off(channel, wrapped);
      listenerMap.delete(listener);
    } else {
      electron.ipcRenderer.off(channel, listener);
    }
  },
  // ✅ ADD THIS (IMPORTANT for cleanup)
  removeAllListeners(channel) {
    electron.ipcRenderer.removeAllListeners(channel);
  },
  // ✅ OPTIONAL (useful)
  once(channel, listener) {
    electron.ipcRenderer.once(channel, (event, ...args) => listener(event, ...args));
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
});
