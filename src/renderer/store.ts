import { observable, action } from 'mobx'

import { getEntries, createEntry } from './db'

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

    getEntries().then((res: any) => {
      console.log('getEntries', res)
    })
  }

  @action.bound
  stop() {
    this.started = false

    if (this.interval) {
      clearInterval(this.interval)
    }

    createEntry({
      date: 'now',
      duration: this.timer,
      title: 'Foo',
      project: '-'
    }).then((res: any) => {
      console.log('create', res)
    })
  }

  @action.bound
  resetTimer(value: number = 0) {
    this.timer = value
  }
}

const timerStore = new TimerStore()

export default timerStore
