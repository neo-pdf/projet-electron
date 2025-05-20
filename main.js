// importation d'electron
const { app, BrowserWindow, Menu, screen } = require('electron');
const path = require('path');

// regarde si on est sur mac
const isMac = process.platform === 'darwin'
// regarde si on est en mode dev
const isDev = process.env.NODE_ENV !== 'development';

// creation de la fenetre
function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().size;
  console.log(`Taille de l'ecran : ${width}x${height}`);

  const win = new BrowserWindow({
    title: 'Labyrinthe',
    fullscreen: true,
  });


// Open devtools id in dev env
if (isDev) {
  win.webContents.openDevTools();
}

  win.loadFile(path.join(__dirname, './src//html/index.html'));
}

// Lancement de la fenetre
app.whenReady().then(() => {
  createWindow();

  // Creation du menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length ===0) {
      createWindow()
    }
  })
});
const menu = []

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})