import type Duration from './__types__/Duration'

export function listToString(items: string[], and = 'and') {
  if (items.length === 0) {
    throw new Error('items must not be empty')
  }
  const trimmedItems = items.map((i) => i.trim())
  if (trimmedItems.some((i) => i === '')) {
    throw new Error(
      'items must not contain empty strings (white space is trimmed)',
    )
  }
  if (trimmedItems.length === 1) {
    return trimmedItems[0]
  } else if (trimmedItems.length === 2) {
    return `${trimmedItems[0]} ${and} ${trimmedItems[1]}`
  } else {
    return `${trimmedItems.slice(0, -1).join(', ')}, and ${
      trimmedItems.slice(-1)[0]
    }`
  }
}

export function toDuration(s: string): Duration {
  const match = s.match(/^(\d+):(\d{2}):(\d{2})(?:[,|.]\d+)?$/)
  if (!match) {
    throw new Error(`"${s}" is not a valid duration`)
  }
  const duration = {
    hours: parseInt(match[1]),
    minutes: parseInt(match[2]),
    seconds: parseInt(match[3]),
  }
  if (duration.minutes > 59 || duration.seconds > 59) {
    throw new Error(`"${s}" is not a valid duration`)
  }
  return duration
}

export function toDurationString(duration: Duration): string {
  return `${duration.hours}:${duration.minutes
    .toString()
    .padStart(2, '0')}:${duration.seconds.toString().padStart(2, '0')}`
}

export function sortDuration(a: Duration, b: Duration) {
  if (a.hours > b.hours) {
    return 1
  } else if (a.hours < b.hours) {
    return -1
  }

  if (a.minutes > b.minutes) {
    return 1
  } else if (a.minutes < b.minutes) {
    return -1
  }

  if (a.seconds > b.seconds) {
    return 1
  } else if (a.seconds < b.seconds) {
    return -1
  }

  return 0
}
