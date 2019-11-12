import { observable, action } from 'mobx'
import * as electron from 'electron'

import { getCurrentDate, getTimestamp, parseTimeString } from './utils'
import { Entry, getEntries, createEntry, saveEntry, removeEntry } from './db'

export class TimerStore {
  @observable started: number = 0
  @observable entries: Entry[] = []
  @observable entry: Entry = this.newEntry('', '')

  private interval: NodeJS.Timer | null = null

  @action.bound
  start() {
    if (this.started) {
      return
    }

    this.started = getTimestamp() - this.entry.duration
    this.interval = setInterval(this.updateDuration, 1000)

    if (!this.entry._id) {
      createEntry(this.entry).then(
        action('createEntry.then', (response: PouchDB.Core.Response) => {
          this.entry._id = response.id
          this.entry._rev = response.rev

          console.log('createEntry', response)
        })
      )
    }
  }

  @action.bound
  private updateDuration() {
    const duration = getTimestamp() - this.started

    if (duration) {
      this.entry.duration = getTimestamp() - this.started
    }
  }

  @action.bound
  setDuration(time: string) {
    try {
      this.entry.duration = parseTimeString(time)
      if (this.started) {
        this.started = getTimestamp() - this.entry.duration
      }
    } catch (error) {
      electron.remote.dialog.showErrorBox('Error', error)
    }
  }

  @action.bound
  stop() {
    if (!this.interval) {
      return
    }

    this.started = 0
    clearInterval(this.interval)
    this.saveEntry()
  }

  private saveEntry() {
    if (this.entry._id) {
      saveEntry(this.entry).then(
        action('saveEntry.then', (response: PouchDB.Core.Response) => {
          if (this.entry._id === response.id) {
            this.entry._rev = response.rev
          }

          console.log('saveEntry', response)
          this.loadEntries()
        })
      )
    }
  }

  @action.bound
  continueEntry(entry: Entry) {
    this.stop()

    this.entry =
      entry.date === getCurrentDate()
        ? entry
        : this.newEntry(entry.title, entry.project)

    this.start()
  }

  @action.bound
  new() {
    this.stop()

    this.entry = this.newEntry('', '')
  }

  private newEntry(title: string, project: string) {
    return {
      date: getCurrentDate(),
      duration: 0,
      title,
      project
    }
  }

  @action.bound
  updateEntry(title: string, project: string) {
    this.entry.title = title
    this.entry.project = project
    console.log('updateEntry', this.entry)
    this.saveEntry()
  }

  @action.bound
  removeEntry(entry: Entry) {
    removeEntry(entry).then(() => {
      this.loadEntries()
    })
  }

  @action.bound
  resetDuration(value: number = 0) {
    this.started = getTimestamp() - value
    this.updateDuration()
  }

  @action.bound
  loadEntries() {
    getEntries().then(
      action('getEntries', (response: Entry[]) => {
        console.log('getEntries', response)
        this.entries = response
      })
    )
  }
}

const timerStore = new TimerStore()
timerStore.loadEntries()

export default timerStore

// Prevent losing data on quit by stopping timer (which saves it to db)
window.addEventListener('unload', () => {
  if (timerStore.started) {
    timerStore.stop()
  }
})
