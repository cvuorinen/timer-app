import * as React from 'react'
import { observer } from 'mobx-react'

import { TimerStore } from './store'
import MainButton from './main-button'
import NewButton from './new-button'
import TimeForm from './time-form'
import Form from './form'
import List from './list'
import Settings from './settings'

interface AppProps {
  store: TimerStore
}

@observer
export default class App extends React.Component<AppProps, {}> {
  updateEntry = (title: string, project: string, start = false) => {
    this.props.store.updateEntry(title, project)

    if (start) {
      this.props.store.start()
    }
  }

  render() {
    const store = this.props.store

    return (
      <div className="wrapper">
        <div className="top">
          <MainButton store={store} />

          <div className="time">
            <TimeForm
              duration={store.entry.duration}
              setDuration={this.props.store.setDuration}
            />
          </div>

          <Form entry={store.entry} updateEntry={this.updateEntry} />

          <NewButton store={store} />

          <Settings />
        </div>

        <List store={store} />
      </div>
    )
  }
}
