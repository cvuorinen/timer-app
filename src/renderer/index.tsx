import * as React from 'react'
import * as ReactDOM from 'react-dom'
import mobx from 'mobx'

import App from './app'
import timerStore from './store'
import './global.scss'

mobx.useStrict(true)

ReactDOM.render(<App store={timerStore} />, document.body)
