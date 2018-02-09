import { DateString } from './db'

export function getCurrentDate(): DateString {
  return new Date().toISOString().split('T')[0]
}

export function getTimestamp(): number {
  return Math.floor(Date.now() / 1000)
}

export function dateFormat(date: DateString): string {
  return date
    .split('-')
    .reverse()
    .join('.')
}

export function groupBy<T>(list: T[], prop: keyof T): { [id: string]: T[] } {
  return list.reduce(function(groups: any, item) {
    const val = item[prop]
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}
