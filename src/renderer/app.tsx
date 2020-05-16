import * as React from 'react'
import { observer } from 'mobx-react'

import { createTrayIcon } from './tray'
import { resize } from './window'
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

interface AppState {
  collapsed: boolean
  darkTheme: boolean
}

@observer
export default class App extends React.Component<AppProps, AppState> {
  state = {
    collapsed: false,
    darkTheme: true
  }

  constructor(props: AppProps) {
    super(props)
    createTrayIcon()
  }

  toggleCollapse = () => {
    if (this.state.collapsed) {
      resize({ height: 550 })
    } else {
      resize({ height: 69 })
    }

    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  toggleTheme = () => {
    this.setState({
      darkTheme: !this.state.darkTheme
    })
  }

  updateEntry = (title: string, project: string, start = false) => {
    this.props.store.updateEntry(title, project)

    if (start) {
      this.props.store.start()
    }
  }

  render() {
    const store = this.props.store

    const wrapperClasses = [
      'wrapper',
      this.state.collapsed ? 'collapsed' : '',
      this.state.darkTheme ? 'dark-theme' : '',
    ]

    return (
      <div className={wrapperClasses.join(' ')}>
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

          <Settings darkTheme={this.state.darkTheme} toggleTheme={this.toggleTheme} />
        </div>

        <List store={store} collapsed={this.state.collapsed} toggleCollapse={this.toggleCollapse} />
      </div>
    )
  }
}
