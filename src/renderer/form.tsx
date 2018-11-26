import * as React from 'react'
import { observer } from 'mobx-react'

import { Entry } from './db'

interface FormProps {
  entry: Entry
  updateEntry: (title: string, project: string, start?: boolean) => void
}

interface FormState {
  _id?: string
  title: string
  project: string
}

@observer
export default class Form extends React.Component<FormProps, FormState> {
  componentWillMount() {
    this.setStateFromEntry(this.props)
  }

  componentWillReceiveProps(nextProps: FormProps) {
    console.log(
      'componentWillReceiveProps',
      this.props.entry.title,
      nextProps.entry.title
    )
    if (this.props.entry._id !== nextProps.entry._id) {
      this.setStateFromEntry(nextProps)
    }
  }

  private setStateFromEntry(props: FormProps) {
    this.setState({
      title: props.entry.title,
      project: props.entry.project
    })
  }

  onSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    this.props.updateEntry(
      this.state.title,
      this.state.project,
      !this.props.entry._id
    )
  }

  handleChange = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [currentTarget.name]: currentTarget.value
    })
  }

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <input
          className="form-input"
          placeholder="What's up?"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          onBlur={this.onSubmit}
        />
        <input
          className="form-input input-sm"
          name="project"
          value={this.state.project}
          onChange={this.handleChange}
          onBlur={this.onSubmit}
        />
        <button type="submit" className="d-none" />
      </form>
    )
  }
}
