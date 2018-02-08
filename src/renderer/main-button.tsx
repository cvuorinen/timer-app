import * as React from 'react'
import { observer } from 'mobx-react'

import { TimerStore } from './store'

interface MainButtonProps {
  store: TimerStore
}

@observer
export default class MainButton extends React.Component<MainButtonProps, {}> {
  render() {
    const store = this.props.store

    return (
      <div className="main-button">
        {store.started ? (
          <button
            className="btn btn-action btn-lg circle btn-error"
            onClick={store.stop}
          >
            <i className="icon icon-shutdown" />
          </button>
        ) : (
          <button
            className="btn btn-action btn-lg circle btn-success"
            onClick={store.start}
          >
            <i className="icon icon-time" />
          </button>
        )}
      </div>
    )
  }
}
