import * as fs from 'fs'
import {join, sep} from 'path'
import urlJoin from 'proper-url-join'
import encodeurl from 'encodeurl'

import {listToString} from './utils'

import {
  TRANSCRIPT_FILE_NAME,
  OUTLINE_FILE_NAME,
  COVER_ART_FILE_NAME,
} from './constants'

import type {
  Post,
  PodcastConfig,
  Transcript,
  Outline,
  PostFileData,
  PostIncludes,
} from '@sta-podcast/types'
import type ReadPostFileFn from './__types__/ReadPostFileFn'

import getTranscript from './get-transcript'
import getOutline from './get-outline'

export default getPost

export async function getPost(
  podcast: PodcastConfig,
  directory: string,
  readPostFn: ReadPostFileFn,
): Promise<Post> {
  let info: PostFileData
  try {
    info = await readPostFn(directory)
  } catch (err) {
    throw new Error(
      `Error reading post at ${directory}: ${(err as Error).message}`,
    )
  }

  const number = getNumber(directory)
  if (!number || !info.guests) {
    if (!info.customSlug) {
      throw Error(
        'Post must have a custom slug, or a post number (given by the directory) and guests',
      )
    }
    if (!info.customMp3FileName) {
      throw Error(
        'Post must have a custom mp3 file name, or a post number (given by the directory) and guests',
      )
    }
  }

  // get the slug
  const slug = info.customSlug || getSlug(number!, info.guests!)

  // get the post's url
  // TODO make episodes part of podcast config
  const postUrl = urlJoin(podcast.siteUrl, 'episodes', slug)

  // get Mp3 URL
  const baseUrl = podcast.hosting.baseMp3Url
  const mp3Url = info.customMp3FileName
    ? getCustomMp3Url(baseUrl, info.customMp3FileName)
    : getMp3Url(baseUrl, number!, info.guests!)

  // try to get the includes
  const includes = getIncludes(directory)

  return {
    slug,
    url: postUrl,
    number,
    mp3: {
      url: mp3Url,
      sizeBytes: info.mp3SizeBytes,
    },
    includes,
    ...info,
  } as Post
}

export function getNumber(episodeDirectory: string) {
  const out = parseInt(episodeDirectory.split(sep).slice(-1)[0])
  if (isNaN(out)) {
    return undefined
  }
  return out
}

export function getSlug(number: number, guests: string | string[]): string {
  if (typeof guests === 'string') {
    guests = [guests]
  }
  if (guests.length === 0) {
    throw new Error('guests must not be empty')
  } else if (guests.map((g) => g.trim()).some((g) => g === '')) {
    throw new Error('guests must not contain empty strings')
  }
  guests = listToString(guests).toLowerCase().replace(/,/g, '').split(/\s/)
  return [number.toString(), ...guests].join('-')
}

export function getMp3Url(
  baseUrl: string,
  episodeNumber: number,
  episodeGuests: string | string[],
) {
  if (typeof episodeGuests === 'string') {
    episodeGuests = [episodeGuests]
  }
  if (episodeGuests.length === 0) {
    throw new Error('Must have at least one guest')
  }
  return getCustomMp3Url(
    baseUrl,
    `STA Ep ${episodeNumber} - ${listToString(episodeGuests)}`,
  )
}

export function getCustomMp3Url(
  baseUrl: string,
  customBaseName: string,
): string {
  if (customBaseName.trim() === '') {
    throw new Error('Received an empty customBaseName')
  }
  return encodeurl(urlJoin(baseUrl, `${customBaseName}.mp3`))
}

export function getIncludes(
  directory: string,
  getTranscriptFn: (srtText: string) => Transcript = getTranscript,
  getOutlineFn: (outlineTxt: string) => Outline = getOutline,
) {
  function tryOrUndefined<T>(fn: () => T): T | undefined {
    try {
      return fn()
    } catch {
      return undefined
    }
  }

  const transcriptPath = join(directory, TRANSCRIPT_FILE_NAME)
  const outlinePath = join(directory, OUTLINE_FILE_NAME)
  const coverArtPath = join(directory, COVER_ART_FILE_NAME)

  const includes: Partial<PostIncludes> = {
    transcript: tryOrUndefined<Transcript>(() =>
      getTranscriptFn(fs.readFileSync(transcriptPath, 'utf8')),
    ),
    outline: tryOrUndefined<Outline>(() =>
      getOutlineFn(fs.readFileSync(outlinePath, 'utf8')),
    ),
    coverArtPath: fs.existsSync(coverArtPath) ? coverArtPath : undefined,
  }
  return includes
}
