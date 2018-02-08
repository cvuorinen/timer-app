import PouchDB from 'pouchdb-browser'
import PouchDbFind from 'pouchdb-find'

export type DateString = string
export type DateTimeString = string

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
  index: { fields: ['modified'] }
})

export async function getEntries(): Promise<Entry[]> {
  const query = {
    selector: {},
    sort: [{ modified: 'desc' }],
    limit: 50
  } as any // sort typing not working

  try {
    const response = await db.find(query)
    console.log(response)

    return response.docs
  } catch (err) {
    console.log(err)
    throw err
  }
}

export function createEntry(entry: Entry): Promise<PouchDB.Core.Response> {
  entry.modified = new Date().toISOString()

  return db.post(entry).catch(err => {
    console.log(err)
    throw err
  })
}

export function saveEntry(entry: Entry): Promise<PouchDB.Core.Response> {
  if (entry._id === undefined || entry._rev === undefined) {
    throw 'Cannot save entry without _id or _rev'
  }

  entry.modified = new Date().toISOString()

  return db.put(entry).catch(err => {
    console.log(err)
    throw err
  })
}

export function removeEntry(entry: Entry): Promise<boolean> {
  if (entry._id === undefined || entry._rev === undefined) {
    throw 'Cannot remove entry without _id or _rev'
  }

  return db
    .remove(entry as PouchDB.Core.ExistingDocument<Entry>)
    .then(response => response.ok)
    .catch(err => {
      console.log(err)
      throw err
    })
}
