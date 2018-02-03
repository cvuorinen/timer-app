import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observer } from 'mobx-react'

import timerStore, { TimerStore } from './store'
import './global.scss'

@observer
class App extends React.Component<{store: TimerStore}, {}> {
  render() {
    const store = this.props.store
	  return (<div>
	    <h4>TIMER</h4>
      <div>Seconds passed: {store.timer}</div>
	  { store.started
		  ? <button className="btn btn-error" onClick={ store.stop }>STOP</button>
		  : <button className="btn btn-success" onClick={ store.start }>START</button>
	  }
    </div>)
  }
}

ReactDOM.render((
	<App store={timerStore} />
), document.body)
