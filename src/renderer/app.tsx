import * as React from 'react'
import { observer } from 'mobx-react'

import { TimerStore } from './store'
import ElapsedTime from './elapsed-time'

@observer
export default class App extends React.Component<{store: TimerStore}, {}> {
  render() {
    const store = this.props.store
    return (<div className="container">
      <div className="main-button">
        { store.started
          ? <button className="btn btn-action btn-lg circle btn-error" onClick={store.stop}>
              <i className="icon icon-shutdown"></i>
            </button>
          : <button className="btn btn-action btn-lg circle btn-success" onClick={store.start}>
              <i className="icon icon-time"></i>
            </button>
        }
      </div>
      <div className="time">
        <ElapsedTime duration={store.entry.duration} />
      </div>
      <form className="form"
        onSubmit={e => {e.preventDefault(); store.start()}}>
        <input className="form-input"
          placeholder="What's up?"
          value={store.entry.title}
          onChange={e => store.entry.title = e.target.value} />
        <input className="form-input input-sm"
          value={store.entry.project}
          onChange={e => store.entry.project = e.target.value} />
      </form>
    </div>)
  }
}
