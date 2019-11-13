import * as React from 'react'
import { observer } from 'mobx-react'

import { Entry } from './db'
import { groupBy, dateFormat } from './utils'
import ElapsedTime from './elapsed-time'
import { TimerStore } from './store'
import { resize, showContextMenu } from './window'

interface ListProps {
  store: TimerStore
}

interface ListState {
  collapsed: boolean
}

@observer
export default class List extends React.Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props)
    this.state = { collapsed: false }
  }

  onClick(entry: Entry) {
    console.log('click', entry)
  }

  onContextMenu(entry: Entry) {
    showContextMenu([
      {
        label: 'Continue',
        click: () => this.props.store.continueEntry(entry)
      },
      {
        label: 'Delete',
        click: () => {
          if (window.confirm(`Delete "${entry.title}"?`)) {
            this.props.store.removeEntry(entry)
          }
        }
      }
    ])
  }

  collapse() {
    resize({ height: 108 })
    this.setState({ collapsed: true })
  }

  expand() {
    resize({ height: 550 })
    this.setState({ collapsed: false })
  }

  render() {
    return (
      <div className="list">
        {this.state.collapsed ? this.renderCollapsed() : this.renderList()}
      </div>
    )
  }

  renderCollapsed(): JSX.Element {
    return (
      <div className="expand" onClick={() => this.expand()}>
        <i className="icon icon-arrow-down" />
      </div>
    )
  }

  renderList(): JSX.Element {
    const store = this.props.store
    const grouped = groupBy(store.entries, 'date')
    const dates = Object.keys(grouped)
      .sort()
      .reverse()

    return (
      <>
        <div className="list-inner">
          {dates.map(date => (
            <table key={date} className="table table-striped table-hover">
              <thead>
                <tr>
                  <th colSpan={9}>
                    {dateFormat(date)}
                    <span className="date-total-time">
                      <ElapsedTime
                        duration={this.calculateTotalDuration(grouped[date])}
                      />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {grouped[date].map(entry => {
                  if (store.started && entry._id === store.entry._id) {
                    return
                  }

                  return (
                    <tr
                      key={entry._id}
                      onContextMenu={() => this.onContextMenu(entry)}
                    >
                      <td onClick={() => this.onClick(entry)}>
                        <ElapsedTime duration={entry.duration} />
                      </td>
                      <td onClick={() => this.onClick(entry)}>
                        <div>{entry.title}</div>
                        <div className="text-gray">{entry.project}</div>
                      </td>
                      <td>
                        <button
                          className="btn btn-link"
                          style={{ transform: 'rotate(270deg)' }}
                          onClick={() => this.props.store.continueEntry(entry)}
                        >
                          <i className="icon icon-caret" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ))}
        </div>
        <div className="collapse" onClick={() => this.collapse()}>
          <i className="icon icon-arrow-up" />
        </div>
      </>
    )
  }

  private calculateTotalDuration(entries: Entry[]): number {
    return entries.reduce(
      (accumulator, entry) => accumulator + entry.duration,
      0
    )
  }
}
