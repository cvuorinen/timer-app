import * as React from 'react'
import { setAlwaysOnTop, isAlwaysOnTop } from './window'

interface SettingsProps {
  darkTheme: boolean
  toggleTheme: () => void
}
interface SettingsState {
  alwaysOnTop: boolean
}

export default class Settings extends React.Component<
  SettingsProps,
  SettingsState
> {
  state = {
    alwaysOnTop: isAlwaysOnTop()
  }

  toggleAlwaysOnTop = () => {
    setAlwaysOnTop(!this.state.alwaysOnTop)

    this.setState({
      alwaysOnTop: !this.state.alwaysOnTop
    })
  }

  render() {
    return (
      <div className="settings">
        <div className="drag-handle" />
        <button
          className="btn btn-sm btn-link"
          onClick={this.toggleAlwaysOnTop}
          title="Always on top"
        >
          {/* TODO: better icon for this, like a pin/thumbtack */}
          <i
            className={
              'icon icon-flag ' +
              (!this.state.alwaysOnTop ? 'text-secondary' : '')
            }
          />
        </button>
        <button
          className="btn btn-sm btn-link"
          onClick={this.props.toggleTheme}
          title="Dark theme"
        >
          {/* TODO: better icon for this, like a sun/contrast */}
          <i
            className={
              'icon icon-stop ' + (!this.props.darkTheme ? 'text-secondary' : '')
            }
          />
        </button>
      </div>
    )
  }
}
