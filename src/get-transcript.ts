import srtParser2 from 'srt-parser-2'
import {toTimestamp} from './utils'

import type {Transcript, TranscriptEntry} from '@sta-podcast/types'

function getTranscript(srtText: string): Transcript {
  const parser = new srtParser2()
  const srt = parser
    .fromSrt(srtText)
    .map((s) => ({...s, text: s.text.replace(/\n/g, ' ')}))

  const dialog: Transcript = []
  for (const s of srt) {
    const match = s.text.match(/((?:(?:[A-Z][a-z]+)\s?)+): (.+)$/)
    if (match) {
      const entry: TranscriptEntry = {
        timeStamp: toTimestamp(s.startTime),
        speaker: match[1],
        text: match[2],
      }
      dialog.push(entry)
    } else {
      dialog.slice(-1)[0].text += ' ' + s.text
    }
  }
  return dialog
}

export default getTranscript
