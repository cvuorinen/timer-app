import { observable, action } from 'mobx'

export class TimerStore {
  @observable started: boolean = false
  @observable timer = 0

  private interval: NodeJS.Timer|null = null

  @action.bound
  start() {
    this.started = true
    this.interval = setInterval(
      action('interval', () => this.timer++),
      1000
    )
  }

  @action.bound
  stop() {
    this.started = false
    clearInterval(this.interval as NodeJS.Timer)
  }

  @action.bound
  resetTimer() {
    this.timer = 0
  }
}

const timerStore = new TimerStore()

export default timerStore
