import * as React from 'react'
import { observer } from 'mobx-react'

import { Entry } from './db'
import { groupBy, dateFormat } from './utils'
import ElapsedTime from './elapsed-time'
import { TimerStore } from './store'

interface ListProps {
  store: TimerStore
}

@observer
export default class List extends React.Component<ListProps, {}> {
  render() {
    const store = this.props.store
    const withoutCurrent = store.entries.filter(
      entry => entry._id !== store.entry._id
    )
    const grouped = groupBy(withoutCurrent, 'date')
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
                <tr key={entry._id}>
                  <td>
                    <ElapsedTime duration={entry.duration} />
                  </td>
                  <td>
                    <div className="tile-title">{entry.title}</div>
                    <div className="tile-subtitle text-gray">
                      {entry.project}
                    </div>
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
