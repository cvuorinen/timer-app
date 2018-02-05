import * as React from 'react'
import { observer } from 'mobx-react'

import { TimerStore } from './store'

@observer
export default class App extends React.Component<{store: TimerStore}, {}> {
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
