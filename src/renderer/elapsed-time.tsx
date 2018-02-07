import * as React from 'react'
import { observer } from 'mobx-react'

@observer
export default class ElapsedTime extends React.Component<{ duration: number }, {}> {
  format(duration: number): JSX.Element {
    if (!duration) {
      return <em>00:00</em>
    }

    if (duration < 3600) {
      const minutes = Math.floor(duration / 60)
      let seconds: number | string = duration % 60
      seconds = (seconds < 10) ? '0' + seconds : seconds

      return <span><em>{minutes}</em>:{seconds}</span>
    }

    const hours = Math.floor(duration / 3600)
    let minutes: number | string = Math.floor(duration % 3600 / 60)
    let seconds: number | string = duration % 3600 % 60
    minutes = (minutes < 10) ? '0' + minutes : minutes
    seconds = (seconds < 10) ? '0' + seconds : seconds

    return <span><em>{hours}:{minutes}</em>:{seconds}</span>
  }

  render() {
    const time = this.format(this.props.duration)

    return (<time>{time}</time>)
  }
}
