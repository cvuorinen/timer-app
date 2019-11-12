import { DateString } from './db'

export function getCurrentDate(): DateString {
  return new Date().toISOString().split('T')[0]
}

export function getTimestamp(): number {
  return Math.floor(Date.now() / 1000)
}

export function dateFormat(date: DateString): string {
  if (date === getCurrentDate()) {
    return 'Today'
  }

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

export function formatTimeString(duration: number): string {
  if (duration < 3600) {
    const minutes = Math.floor(duration / 60)
    let seconds: number | string = duration % 60
    seconds = seconds < 10 ? '0' + seconds : seconds

    return `${minutes}:${seconds}`
  }

  const hours = Math.floor(duration / 3600)
  let minutes: number | string = Math.floor((duration % 3600) / 60)
  let seconds: number | string = (duration % 3600) % 60
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return `${hours}:${minutes}:${seconds}`
}

export function parseTimeString(time: string): number {
  const seconds = convertTimeStringToSeconds(time)

  if (Number.isNaN(seconds)) {
    throw 'Invalid time string'
  }

  return seconds
}

function convertTimeStringToSeconds(time: string): number {
  const minuteRegex = RegExp('(\\d+)\\s?(m|min)')
  if (minuteRegex.test(time)) {
    const minutes = minuteRegex.exec(time)![1]

    return parseInt(minutes) * 60
  }

  const hourRegex = RegExp('(\\d+[\\.,]\\d+)\\s?(h)?')
  if (hourRegex.test(time)) {
    const hours = hourRegex.exec(time)![1]

    return parseFloat(hours.replace(',', '.')) * 60 * 60
  }

  const fullTimeRegex = RegExp('(\\d+):(\\d+):(\\d+)')
  if (fullTimeRegex.test(time)) {
    const [ , hours, minutes, seconds ] = fullTimeRegex.exec(time)!

    return (parseInt(hours) * 60 * 60) + (parseInt(minutes) * 60) + parseInt(seconds)
  }

  const shortTimeRegex = RegExp('(\\d+):(\\d+)')
  if (shortTimeRegex.test(time)) {
    const [ , minutes, seconds ] = shortTimeRegex.exec(time)!

    return (parseInt(minutes) * 60) + parseInt(seconds)
  }

  throw 'Unknown time format'
}
