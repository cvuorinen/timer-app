import * as React from 'react'
import { observer } from 'mobx-react'

import { Entry } from './db'

interface FormProps {
  entry: Entry,
  updateEntry: (title:string, project: string, start?: boolean) => void
}

interface FormState {
  title: string,
  project: string,
  duration: string
}

@observer
export default class Form extends React.Component<FormProps, FormState> {
  componentWillMount() {
    this.setStateFromEntry()
  }

  private setStateFromEntry() {
    this.setState({
      title: this.props.entry.title,
      project: this.props.entry.project,
      duration: ''
    })
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.props.updateEntry(this.state.title, this.state.project, true)
  }

  handleChange = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [currentTarget.name]: currentTarget.value
    })
  }

  render() {
    return (<form className="form"
      onSubmit={this.onSubmit}>
      <input className="form-input"
        placeholder="What's up?"
        name="title"
        value={this.state.title}
        onChange={this.handleChange} />
      <input className="form-input input-sm"
        name="project"
        value={this.state.project}
        onChange={this.handleChange} />
      <button type="submit" className="d-none"></button>
    </form>)
  }
}
