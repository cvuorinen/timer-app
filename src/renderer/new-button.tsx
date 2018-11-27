import * as React from 'react'
import { observer } from 'mobx-react'

import { TimerStore } from './store'

interface NewButtonProps {
  store: TimerStore
}

@observer
export default class NewButton extends React.Component<NewButtonProps, {}> {
  render() {
    const store = this.props.store

    return (
      <div className="new-button">
        <button className="btn btn-action btn-sm circle" onClick={store.new}>
          <i className="icon icon-plus" />
        </button>
      </div>
    )
  }
}
