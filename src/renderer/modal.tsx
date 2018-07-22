import * as React from 'react'

type ProvidedProps = {
  open: Function
  close: Function
  isOpen: boolean
}

interface ModalProps {
  render: (props: ProvidedProps) => JSX.Element | null
}

interface ModalSate {
  isOpen: boolean
}

export default class Modal extends React.Component<ModalProps, ModalSate> {
  constructor(props: ModalProps) {
    super(props)
    this.state = { isOpen: false }
  }

  open() {
    console.log('modal.open')
    this.setState({
      isOpen: true
    })
  }

  close() {
    console.log('modal.close')
    this.setState({
      isOpen: false
    })
  }

  render() {
    return this.props.render({
      isOpen: this.state.isOpen,
      open: this.open,
      close: this.close
    })
  }
}
