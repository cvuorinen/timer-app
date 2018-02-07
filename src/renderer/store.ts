import { observable, action } from 'mobx'

import { Entry, getEntries, createEntry, DateString, saveEntry } from './db'

export class TimerStore {
  @observable started: number = 0
  @observable entries: Entry[] = []
  @observable entry: Entry = {
    date: getCurrentDate(),
    duration: 0,
    title: '',
    project: ''
  }

  private interval: NodeJS.Timer | null = null

  @action.bound
  start() {
    if (this.started) {
      return
    }

    this.started = getTimestamp() - this.entry.duration
    this.interval = setInterval(
      this.updateDuration,
      1000
    )

    if (!this.entry._id) {
      createEntry(this.entry).then(response => {
        console.log('createEntry', response)
      })
    }
  }

  @action.bound
  private updateDuration() {
    this.entry.duration = getTimestamp() - this.started
  }

  @action.bound
  stop() {
    if (!this.interval) {
      return
    }

    this.started = 0
    clearInterval(this.interval)

    saveEntry(this.entry).then(response => {
      console.log('saveEntry', response)
    })
  }

  @action.bound
  resetDuration(value: number = 0) {
    this.started = getTimestamp() - value
    this.updateDuration()
  }

  @action.bound
  loadEntries() {
    getEntries().then(action('getEntries', (response: Entry[]) => {
      console.log('getEntries', response)
      this.entries = response
    }))
  }
}

const timerStore = new TimerStore()

export default timerStore

function getCurrentDate(): DateString {
  return new Date().toISOString().split('T')[0]
}

function getTimestamp(): number {
  return Math.floor(Date.now() / 1000)
}
