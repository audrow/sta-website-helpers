import * as fs from 'fs';
import { join, sep } from 'path';
import urlJoin from 'proper-url-join';

import type EpisodeYamlData from './types/EpisodeYamlData';
import type EpisodeData from './types/EpisodeData';
import type PodcastConfig from './types/PodcastConfig';

import {
  INFO_TS_FILE_NAME,
  // TRANSCRIPT_FILE_NAME,
  // OUTLINE_FILE_NAME,
} from './constants'

type YoutubePost = {
  videoId: string;
  title: string;
  description: string;
  tags: string[];
}

type EpisodeContent = Partial<{
  publishDate: Date;
  mp3Url: string;
  website: {
    slug: string;
    title: string;
    description: string;
    transcript?: string;
    outline?: string;
  };
  youtube: {
    mainInterview: YoutubePost;
    clips: YoutubePost[];
  };
  crossposting: {
    robohub: {
      title: string;
      htmlContent: string;
    }
  };
}>

export async function getEpisodeContent(ep: EpisodeData, podcast: PodcastConfig): Promise<EpisodeContent> {

  // get mp3 file path or use option
  const baseUrl = podcast.hosting.baseMp3Url;
  const mp3Url = (ep.customUrlFileName ?
    getCustomHostedMp3Url(baseUrl, ep.number, ep.customUrlFileName) :
    getHostedMp3UrlWithGuests(baseUrl, ep.number, ep.guests)
  )
  // get mp3 Size

  // get main interview and clip titles, check them for length

  // try to get and mark up the transcript
  // try to get the outline

  // set website content = description + links
  // set transcript and outline

  return {
    mp3Url,
  } as EpisodeContent
}

export function getHostedMp3UrlWithGuests(
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
  return getCustomHostedMp3Url(baseUrl, episodeNumber, listToString(episodeGuests))
}

export function getCustomHostedMp3Url(
  baseUrl: string,
  episodeNumber: number,
  customBaseName: string,
): string {
  if (customBaseName.trim() === '') {
    throw new Error('Received an empty customBaseName')
  }
  return urlJoin(baseUrl, `STA Ep ${episodeNumber} - ${customBaseName}.mp3`)
}

export async function getEpisodeDataBySlug(slug: string, episodesDirectory: string) {
  const episodeNumber = getEpisodeNumberFromSlug(slug);
  return await getEpisodeDataByNumber(episodeNumber, episodesDirectory);
}

export async function getEpisodeDataByNumber(episodeNumber: number, episodesDirectory: string) {
  const episodeDirectory = join(episodesDirectory, episodeNumber.toString(), );

  const infoFilePath = join(episodeDirectory, INFO_TS_FILE_NAME);
  const info = (await import(infoFilePath)).default as EpisodeYamlData;

  const slug = info.customSlug || getEpisodeSlug(episodeNumber, info.guests);

  const episodeData: EpisodeData = {
    slug,
    path: episodeDirectory,
    number: episodeNumber,
    ...info,
  };
  return episodeData
}

export async function getEpisodeSlugs(episodesDirectory: string) {
  const episodeDirectories = fs.readdirSync(episodesDirectory)
  if (episodeDirectories.length === 0) {
    throw new Error(`No episodes found in ${episodesDirectory}`);
  }
  const slugs: string[] = [];
  for await (const episodeDirectory of episodeDirectories) {
    const episodeNumber = getEpisodeNumberFromPath(episodeDirectory);

    const infoFilePath = join(episodesDirectory, episodeDirectory, INFO_TS_FILE_NAME);
    const info = (await import(infoFilePath)).default as EpisodeYamlData;

    slugs.push(getEpisodeSlug(episodeNumber, info.guests));
  }
  return slugs
}

export function getEpisodeNumberFromSlug(slug: string) {
  const out = parseInt(slug)
  if (isNaN(out)) {
    throw new Error(`Invalid episode slug: ${slug}`);
  }
  return out
}

export function getEpisodeNumberFromPath(episodeDirectory: string) {
  const out = parseInt(episodeDirectory.split(sep).slice(-1)[0])
  if (isNaN(out)) {
    throw new Error(`Could not parse episode number from ${episodeDirectory}`)
  }
  return out
}

export function getEpisodeSlug(episodeNumber: number, guests: string | string[]): string {
  if (typeof guests === 'string') {
    guests = [guests];
  }
  if (guests.length === 0) {
    throw new Error('guests must not be empty')
  } else if (guests.map(g => g.trim()).some(g => g === '')) {
    throw new Error('guests must not contain empty strings')
  }
  guests = listToString(guests)
    .toLowerCase()
    .replace(/,/g, '')
    .split(/\s/)
  return [episodeNumber.toString(), ...guests].join('-');
}

export function listToString(items: string[], and = 'and') {
  if (items.length === 0) {
    throw new Error('items must not be empty')
  }
  const trimmedItems = items.map(i => i.trim())
  if (trimmedItems.some(i => i === '')) {
    throw new Error('items must not contain empty strings (white space is trimmed)')
  }
  if (trimmedItems.length === 1) {
    return trimmedItems[0]
  } else if (trimmedItems.length === 2) {
    return `${trimmedItems[0]} ${and} ${trimmedItems[1]}`
  } else {
    return `${trimmedItems.slice(0, -1).join(', ')}, and ${trimmedItems.slice(-1)[0]}`
  }
}

// async function main() {
//   const episodeDirectory = join(__dirname, 'test', 'data', 'episodes');
//   const slugs = await getEpisodeSlugs(episodeDirectory)
//   console.log(slugs)
//   const ep = await getEpisodeDataBySlug(slugs[0], episodeDirectory)
//   console.log(ep)
// }

// main()
