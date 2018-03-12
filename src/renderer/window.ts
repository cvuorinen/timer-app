import electron from 'electron'

const { remote } = electron

type Size = {
  width?: number
  height?: number
}

export function resize(size: Size) {
  const window = remote.getCurrentWindow()
  const [currentWidth, currentHeight] = window.getSize()

  window.setSize(size.width || currentWidth, size.height || currentHeight)
}

export function showContextMenu(items: Electron.MenuItemConstructorOptions[]) {
  const menu = new remote.Menu()

  items.map(item => {
    menu.append(new remote.MenuItem(item))
  })

  menu.popup()
}
