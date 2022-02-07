import {toTimestamp} from '@sta-podcast/timestamp-tools'

import type {Outline, OutlineEntry} from '@sta-podcast/types'

function getOutline(outlineTxt: string): Outline {
  return outlineTxt
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map((l) => {
      const match = l.match(/^(\d+:\d{2}:\d{2}) - (.+)$/)
      if (!match) {
        throw new Error('Invalid outline line: ' + l)
      }
      const [, time, title] = match
      const entry: OutlineEntry = {
        timeStamp: toTimestamp(time),
        title,
      }
      return entry
    })
}

export default getOutline
