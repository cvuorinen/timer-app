import * as React from 'react'
import { setAlwaysOnTop, isAlwaysOnTop } from './window'

interface SettingsState {
  alwaysOnTop: boolean
}

export default class Settings extends React.Component<{}, SettingsState> {
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
        <div>
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
        </div>
      </div>
    )
  }
}
