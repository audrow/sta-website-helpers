import fs from 'fs';
import { join, sep } from 'path';

import type EpisodeYamlData from './types/EpisodeYamlData';
import {
  INFO_FILE_NAME,
  // TRANSCRIPT_FILE_NAME,
  // OUTLINE_FILE_NAME,
} from './constants'

export async function getEpisodeBySlug(slug: string, episodesDirectory: string) {
  const episodeNumber = getEpisodeNumberFromSlug(slug);
  const episodeDirectory = join(episodesDirectory, episodeNumber.toString(), );

  const infoFilePath = join(episodeDirectory, INFO_FILE_NAME);
  const info = (await import(infoFilePath)).default as EpisodeYamlData;

  return {
    ...info,
    episodeNumber,
    slug,
  }
}

export async function getEpisodeSlugs(episodesDirectory: string) {
  const episodeDirectories = fs.readdirSync(episodesDirectory)
  if (episodeDirectories.length === 0) {
    throw new Error(`No episodes found in ${episodesDirectory}`);
  }
  return episodeDirectories.map(async episodeDirectory => {
    const episodeNumber = getEpisodeNumberFromPath(episodeDirectory);

    const infoFilePath = join(episodesDirectory, episodeDirectory, INFO_FILE_NAME);
    const info = (await import(infoFilePath)).default as EpisodeYamlData;

    return getEpisodeSlug(episodeNumber, info.guests);
  })
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
  if (guests.length > 1) {
    guests = [...guests.slice(0, -1), 'and', ...guests.slice(-1)];
  }
  return [episodeNumber.toString(), ...guests]
    .map(ele => (
      ele
        .toLowerCase()
        .trim()
        .replace(/\s/g, '-')))
    .join('-');
}

// const episodeDirectory = './src/test/data/episodes';
// console.log(getEpisodeSlugs(episodeDirectory));
// console.log(
//   parseInt('12-brett-aldrich-1')
// )
