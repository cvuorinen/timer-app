import * as React from 'react'
import { observer } from 'mobx-react'

import { Entry } from './db'
import { groupBy, dateFormat } from './utils'
import ElapsedTime from './elapsed-time'
import { TimerStore } from './store'
import { resize, showContextMenu } from './window'
import Modal from './modal'

interface ListProps {
  store: TimerStore
}

interface ListState {
  collapsed: boolean
}

@observer
export default class List extends React.Component<ListProps, ListState> {
  modalEntry: Entry | null = null
  modalOpen: Function | null = null

  constructor(props: ListProps) {
    super(props)
    this.state = { collapsed: false }
  }

  onClick(entry: Entry): void {
    console.log('click', entry)
  }

  onDoubleClick(entry: Entry) {
    console.log('dblClick', entry)
    if (!this.modalOpen) {
      console.error('modalOpen not bound, cannot open modal')
      return
    }

    this.modalEntry = entry
    this.modalOpen()
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
    resize({ height: 120 })
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
                      onDoubleClick={() => this.onDoubleClick(entry)}
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
        <Modal
          render={props => {
            this.modalOpen = props.open
            console.log('modal.render', props.isOpen, this.modalEntry)
            return props.isOpen && this.modalEntry ? (
              <div>{this.modalEntry.title}</div>
            ) : null
          }}
        />
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
