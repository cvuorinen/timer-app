import electron from 'electron'
import timerStore from './store'
import { Entry } from './db'

const { remote } = electron
const { Tray, Menu } = remote

let trayIcon: electron.Tray

export function createTrayIcon() {
  trayIcon = new Tray(`${__dirname}/../not-tracking.png`)

  trayIcon.setContextMenu(
    createTrayMenu(false)
  )
}

export function updateTrayIcon(tracking: boolean, entry: Entry) {
  const imageName = tracking ? 'tracking.png' : 'not-tracking.png'

  trayIcon.setImage(`${__dirname}/../${imageName}`)

  trayIcon.setContextMenu(
    createTrayMenu(tracking, entry)
  )
}

function createTrayMenu(tracking: boolean, entry: Entry | null = null): electron.Menu {
  let title: string | null = null
  if (entry && entry.title) {
    title = entry.title
    if (title.length > 25) {
      title = title.slice(0, 25) + '...'
    }
  }

  const trayMenuTemplate: electron.MenuItemConstructorOptions[] = [
    {
      label: title || 'Timer app',
      click: function() {
        remote.getCurrentWindow().show()
      }
    }
  ]

  if (tracking) {
    trayMenuTemplate.push({
      label: 'Stop',
      click: function() {
        timerStore.stop()
      }
    })
  } else {
    trayMenuTemplate.push({
      label: (entry && entry.title) ? 'Continue' : 'Start',
      click: function() {
        timerStore.start()
      }
    })
  }

  trayMenuTemplate.push({ type: 'separator' })

  trayMenuTemplate.push({
    label: 'Hide icon',
    click: function() {
      trayIcon.destroy()
    }
  })

  trayMenuTemplate.push({
    label: 'Quit',
    click: function() {
      remote.getCurrentWindow().close()
    }
  })

  return Menu.buildFromTemplate(trayMenuTemplate)
}
