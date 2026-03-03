import { app, BrowserWindow, ipcMain, } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import Store from 'electron-store'
import { Worker } from 'node:worker_threads'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

// --------- Store ---------
const store = new Store()

ipcMain.handle('store-save', (_event, key: string, value: unknown) => {
  store.set(key, value)
})

ipcMain.handle('store-load', (_event, key: string) => {
  return store.get(key)
})

ipcMain.handle('store-delete', (_event, key: string) => {
  store.delete(key)
})

//---------- Worker Thread ------------------
let activeWorker: Worker | null = null

ipcMain.handle('worker-start', (event, workerData) => {
  // Prevent multiple workers
  if (activeWorker) {
    console.log('Worker already running')
    return
  }

  const workerPath = path.join(__dirname, 'emailWorker.js')

  activeWorker = new Worker(workerPath)

  // Send initial data
  activeWorker.postMessage(workerData)

  // Send messages back to SAME renderer
  activeWorker.on('message', (message) => {
    event.sender.send('worker-message', message)
  })

  activeWorker.on('error', (error) => {
    event.sender.send('worker-message', {
      email: null,
      message: error.message,
      status: 'Not Send'
    })
  })

  activeWorker.on('exit', (code) => {
    event.sender.send('worker-exit', { code })
    activeWorker = null
  })
})

ipcMain.handle('worker-stop', () => {
  if (activeWorker) {
    // graceful stop (optional)
    activeWorker.postMessage({ action: false })

    setTimeout(() => {
      activeWorker?.terminate()
      activeWorker = null
    }, 500)
  }
})

// --------- Dialog ---------
ipcMain.handle('dialog-open', async (_event, options) => {
  const { dialog } = await import('electron')
  return dialog.showOpenDialog(win!, options)
})

ipcMain.handle('dialog-save', async (_event, options) => {
  const { dialog } = await import('electron')
  return dialog.showSaveDialog(win!, options)
})

ipcMain.handle('dialog-message', async (_event, options) => {
  const { dialog } = await import('electron')
  return dialog.showMessageBox(win!, options)
})

// --------- Window ---------
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
    
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


app.whenReady().then(createWindow)
