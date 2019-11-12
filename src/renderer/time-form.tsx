import * as React from 'react'
import { observer } from 'mobx-react'

import { formatTimeString } from './utils'
import ElapsedTime from './elapsed-time'

interface TimeFormProps {
  duration: number
  setDuration: (time: string) => void
}

interface TimeFormState {
  time: string
  editing: boolean
}

@observer
export default class TimeForm extends React.Component<
  TimeFormProps,
  TimeFormState
> {
  state = {
    time: '',
    editing: false
  }

  startEditing = () => {
    this.setState({
      editing: true,
      time: formatTimeString(this.props.duration)
    })
  }

  onSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    this.setState({ editing: false })
    this.props.setDuration(this.state.time)
  }

  handleChange = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      time: currentTarget.value
    })
  }

  render() {
    return (
      <div>
        <input
          className="form-input input-sm"
          name="time"
          value={this.state.time}
          onChange={this.handleChange}
          onBlur={this.onSubmit}
          onFocus={this.startEditing}
        />
        <ElapsedTime duration={this.props.duration} />
      </div>
    )
  }
}
