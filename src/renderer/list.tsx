import electron from 'electron'
import * as React from 'react'
import { observer } from 'mobx-react'

import { Entry } from './db'
import { groupBy, dateFormat } from './utils'
import ElapsedTime from './elapsed-time'
import { TimerStore } from './store'

const { remote } = electron

interface ListProps {
  store: TimerStore
}

@observer
export default class List extends React.Component<ListProps, {}> {
  onClick(entry: Entry) {
    console.log('click', entry)
  }

  onContextMenu(entry: Entry) {
    this.createContextMenu(entry).popup()
  }

  private createContextMenu(entry: Entry): Electron.Menu {
    const menu = new remote.Menu()

    menu.append(
      new remote.MenuItem({
        label: 'Continue',
        click: () => this.props.store.continueEntry(entry)
      })
    )

    menu.append(
      new remote.MenuItem({
        label: 'Delete',
        click: () => {
          if (window.confirm(`Delete "${entry.title}"?`)) {
            this.props.store.removeEntry(entry)
          }
        }
      })
    )

    return menu
  }

  render() {
    const store = this.props.store
    const entries = !store.started
      ? store.entries
      : store.entries.filter(entry => entry._id !== store.entry._id)
    const grouped = groupBy(entries, 'date')
    const dates = Object.keys(grouped)
      .sort()
      .reverse()

    return (
      <div className="list">
        {dates.map(date => (
          <table key={date} className="table table-striped table-hover">
            <thead>
              <tr>
                <th colSpan={9}>{dateFormat(date)}</th>
              </tr>
            </thead>
            <tbody>
              {grouped[date].map(entry => (
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
              ))}
            </tbody>
          </table>
        ))}
      </div>
    )
  }
}
