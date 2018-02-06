import PouchDB from 'pouchdb-browser'
import PouchDbFind from 'pouchdb-find'

type DateString = string
type DateTimeString = string

export type Entry = {
  _id?: string
  _rev?: string
  date: DateString
  duration: number
  title: string
  project: string
  modified?: DateTimeString
}

PouchDB.plugin(PouchDbFind)

const db = new PouchDB<Entry>('timer', { adapter: 'websql' })
db.createIndex({
  index: {fields: ['date']}
})

export async function getEntries(): Promise<Entry[]> {
  try {
    const response = await db.find({ selector: {}, sort: ['date'] })
    console.log(response)

    return response.docs
  } catch (err) {
    console.log(err)
    throw err
  }
}

export function createEntry(entry: Entry): Promise<Entry> {
  return db.post(entry)
    .then(response => {
      entry._id = response.id

      return entry
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

export function saveEntry(entry: Entry): Promise<boolean> {
  if (entry._id === undefined || entry._rev === undefined) {
    throw "Cannot save entry without _id or _rev"
  }

  return db.put(entry)
    .then(response => response.ok)
    .catch(err => {
      console.log(err)
      throw err
    })
}

export function removeEntry(entry: Entry): Promise<boolean> {
  if (entry._id === undefined || entry._rev === undefined) {
    throw "Cannot remove entry without _id or _rev"
  }

  return db.remove(entry as PouchDB.Core.ExistingDocument<Entry>)
    .then(response => response.ok)
    .catch(err => {
      console.log(err)
      throw err
    })
}
