import * as React from 'react'
import { observer } from 'mobx-react'

import { Entry } from './db'
import ElapsedTime from './elapsed-time'

interface ListProps {
  entries: Entry[]
  onContinue: (entry: Entry) => void
}

@observer
export default class List extends React.Component<ListProps, {}> {
  render() {
    return (
      <div className="list">
        {this.props.entries.map(entry => (
          <div key={entry._id} className="tile tile-centered">
            <div className="tile-icon">
              <div className="example-tile-icon">
                <ElapsedTime duration={entry.duration} />
              </div>
            </div>
            <div className="tile-content">
              <div className="tile-title">{entry.title}</div>
              <div className="tile-subtitle text-gray">{entry.project}</div>
            </div>
            <div className="tile-action">
              <button
                className="btn btn-link"
                style={{ transform: 'rotate(270deg)' }}
                onClick={() => this.props.onContinue(entry)}
              >
                <i className="icon icon-caret" />
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
