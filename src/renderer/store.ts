import { observable, action } from 'mobx'
import autobind from 'autobind-decorator'

@autobind
export class TimerStore {
  @observable started: boolean = false
  @observable timer = 0

  private interval: NodeJS.Timer|null = null

  @action
  start() {
    this.started = true
    this.interval = setInterval(() => this.timer++, 1000)
  }

  @action
  stop() {
    this.started = false
    clearInterval(this.interval as NodeJS.Timer)
  }

  @action
  resetTimer() {
    this.timer = 0
  }
}

const timerStore = new TimerStore()

export default timerStore
