import * as React from 'react'
import { observer } from 'mobx-react'

import { formatTimeString } from './utils'

@observer
export default class ElapsedTime extends React.Component<
  { duration: number },
  {}
> {
  private format(duration: number): JSX.Element {
    if (!duration) {
      return <em>00:00</em>
    }

    const timeParts = formatTimeString(duration).split(':')
    const seconds = timeParts.pop()

    return (
      <span>
        <em>{timeParts.join(':')}</em>:{seconds}
      </span>
    )
  }

  render() {
    return <time>{this.format(this.props.duration)}</time>
  }
}
