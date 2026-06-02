// Electron main process for the Lord of Hatred Leveling Strategium desktop app.
// The built static site (dist/) is served over a localhost port and loaded into
// a themed window — this serves modules over http:// so ES modules load cleanly
// (file:// would block them) and works fully offline.
const { app, BrowserWindow, shell } = require('electron')
const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const DIST = path.join(__dirname, '..', 'dist')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let urlPath = decodeURIComponent((req.url || '/').split('?')[0])
      if (urlPath === '/' || urlPath === '') urlPath = '/index.html'
      const filePath = path.join(DIST, path.normalize(urlPath))
      // Prevent path traversal outside dist.
      if (!filePath.startsWith(DIST)) {
        res.writeHead(403)
        res.end('Forbidden')
        return
      }
      fs.readFile(filePath, (err, data) => {
        if (err) {
          // SPA fallback.
          fs.readFile(path.join(DIST, 'index.html'), (e2, idx) => {
            if (e2) {
              res.writeHead(404)
              res.end('Not found')
            } else {
              res.writeHead(200, { 'Content-Type': MIME['.html'] })
              res.end(idx)
            }
          })
          return
        }
        const ext = path.extname(filePath).toLowerCase()
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
        res.end(data)
      })
    })
    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address()
      resolve(typeof addr === 'object' && addr ? addr.port : 0)
    })
  })
}

async function createWindow() {
  let url = 'about:blank'
  try {
    const port = await startServer()
    url = `http://127.0.0.1:${port}/`
  } catch {
    // Fall back to loading the file directly if the server failed to start.
    url = `file://${path.join(DIST, 'index.html')}`
  }

  const win = new BrowserWindow({
    width: 1200,
    height: 820,
    minWidth: 380,
    minHeight: 600,
    backgroundColor: '#090807',
    title: 'Lord of Hatred — Leveling Strategium',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  // Open external links (the Sources list) in the system browser, not a new window.
  win.webContents.setWindowOpenHandler(({ url: target }) => {
    if (/^https?:/.test(target)) shell.openExternal(target)
    return { action: 'deny' }
  })

  win.loadURL(url)
}

app.whenReady().then(createWindow)

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
