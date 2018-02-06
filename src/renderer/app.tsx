import * as React from 'react'
import { observer } from 'mobx-react'

import { TimerStore } from './store'
import ElapsedTime from './elapsed-time'

@observer
export default class App extends React.Component<{store: TimerStore}, {}> {
  render() {
    const store = this.props.store
    return (<div>
      <h4>TIMER</h4>
      <div>Time: <ElapsedTime duration={store.timer} /></div>
	    { store.started
		    ? <button className="btn btn-action circle btn-error" onClick={ store.stop }>
            <i className="icon icon-shutdown"></i>
          </button>
		    : <button className="btn btn-action circle btn-success" onClick={ store.start }>
            <i className="icon icon-shutdown"></i>
          </button>
	    }
    </div>)
  }
}
