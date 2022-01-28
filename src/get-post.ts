import * as fs from 'fs'
import {join, sep} from 'path'
import urlJoin from 'proper-url-join'

import {listToString} from './utils'

import type PostYamlData from './__types__/PostYamlData'
import type Post from './__types__/Post'
import type PodcastConfig from './__types__/PodcastConfig'

import {
  INFO_TS_FILE_NAME,
  TRANSCRIPT_FILE_NAME,
  OUTLINE_FILE_NAME,
  COVER_ART_FILE_NAME,
} from './constants'
import PostIncludes from './__types__/PostIncludes'

// type YoutubePost = {
//   videoId: string
//   title: string
//   description: string
//   tags: string[]
// }

// type EpisodeContent = Partial<{
//   publishDate: Date
//   mp3Url: string
//   website: {
//     slug: string
//     title: string
//     description: string
//     transcript?: string
//     outline?: string
//   }
//   youtube: {
//     mainInterview: YoutubePost
//     clips: YoutubePost[]
//   }
//   crossposting: {
//     robohub: {
//       title: string
//       htmlContent: string
//     }
//   }
// }>

// export async function getEpisodeContent(
//   ep: Post,
//   podcast: PodcastConfig,
// ): Promise<EpisodeContent> {
//   // get mp3 file path or use option
//   const baseUrl = podcast.hosting.baseMp3Url
//   // const mp3Url = ep.customUrlFileName
//   //   ? getCustomHostedMp3Url(baseUrl, ep.number, ep.customUrlFileName)
//   //   : getHostedMp3UrlWithGuests(baseUrl, ep.number, ep.guests)
//   // get mp3 Size

//   // get main interview and clip titles, check them for length

//   // try to get and mark up the transcript
//   // try to get the outline

//   // set website content = description + links
//   // set transcript and outline

//   return {
//     // mp3Url,
//   } as EpisodeContent
// }

// export async function getEpisodeDataBySlug(
//   slug: string,
//   episodesDirectory: string,
// ) {
//   const episodeNumber = getEpisodeNumberFromSlug(slug)
//   return await getEpisodeDataByNumber(episodeNumber, episodesDirectory)
// }

// export async function getEpisodeDataByNumber(
//   episodeNumber: number,
//   episodesDirectory: string,
// ) {
//   const episodeDirectory = join(episodesDirectory, episodeNumber.toString())

//   const infoFilePath = join(episodeDirectory, INFO_TS_FILE_NAME)
//   const info = (await import(infoFilePath)).default as PostYamlData

//   const slug = info.customSlug || getEpisodeSlug(episodeNumber, info.guests)

//   const episodeData: Post = {
//     slug,
//     path: episodeDirectory,
//     number: episodeNumber,
//     ...info,
//   }
//   return episodeData
// }

// export async function getEpisodeSlugs(episodesDirectory: string) {
//   const episodeDirectories = fs.readdirSync(episodesDirectory)
//   if (episodeDirectories.length === 0) {
//     throw new Error(`No episodes found in ${episodesDirectory}`)
//   }
//   const slugs: string[] = []
//   for await (const episodeDirectory of episodeDirectories) {
//     const episodeNumber = getPostNumberFromPath(episodeDirectory)

//     const infoFilePath = join(
//       episodesDirectory,
//       episodeDirectory,
//       INFO_TS_FILE_NAME,
//     )
//     const info = (await import(infoFilePath)).default as PostYamlData

//     slugs.push(getEpisodeSlug(episodeNumber, info.guests))
//   }
//   return slugs
// }

// export function getEpisodeNumberFromSlug(slug: string) {
//   const out = parseInt(slug)
//   if (isNaN(out)) {
//     throw new Error(`Invalid episode slug: ${slug}`)
//   }
//   return out
// }

export async function getPost(
  podcast: PodcastConfig,
  directory: string,
): Promise<Post> {
  const infoFilePath = join(directory, INFO_TS_FILE_NAME)
  const info = (await import(infoFilePath)).default as PostYamlData

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

  // get Mp3 URL
  const baseUrl = podcast.hosting.baseMp3Url
  const mp3Url = info.customMp3FileName
    ? getCustomMp3Url(baseUrl, info.customMp3FileName)
    : getMp3Url(baseUrl, number!, info.guests!)

  // try to get the includes
  const includes = getIncludes(directory)

  return {
    slug,
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
  return urlJoin(baseUrl, `${customBaseName}.mp3`)
}

export function getIncludes(directory: string) {
  const transcriptPath = join(directory, TRANSCRIPT_FILE_NAME)
  const outlinePath = join(directory, OUTLINE_FILE_NAME)
  const coverArtPath = join(directory, COVER_ART_FILE_NAME)

  const includes: Partial<PostIncludes> = {
    transcriptSrt: fs.readFileSync(transcriptPath, 'utf8'),
    outlineTxt: fs.readFileSync(outlinePath, 'utf8'),
    coverArtPath: fs.existsSync(coverArtPath) ? coverArtPath : undefined,
  }
  return includes
}

// async function main() {
//   const episodeDirectory = join(__dirname, 'test', 'data', 'episodes');
//   const slugs = await getEpisodeSlugs(episodeDirectory)
//   console.log(slugs)
//   const ep = await getEpisodeDataBySlug(slugs[0], episodeDirectory)
//   console.log(ep)
// }

// main()
