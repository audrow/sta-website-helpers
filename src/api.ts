import YAML from 'yaml';
import fs from 'fs';
import { join, sep } from 'path';

import type EpisodeYamlData from './types/EpisodeYamlData';
import {
  INFO_FILE_NAME,
  TRANSCRIPT_FILE_NAME,
  OUTLINE_FILE_NAME,
} from './constants'

export function getEpisodeBySlug(slug: string, episodesDirectory: string) {
  const episodeNumber = getEpisodeNumberFromSlug(slug);
  const episodeDirectory = join(episodesDirectory, episodeNumber.toString(), );

  const infoFilePath = join(episodeDirectory, INFO_FILE_NAME);
  const infoFileContents = fs.readFileSync(infoFilePath, 'utf8');
  const info = YAML.parse(infoFileContents) as unknown as EpisodeYamlData;
}

export function getEpisodeSlugs(episodesDirectory: string): string[] {
  const episodeDirectories = fs.readdirSync(episodesDirectory)
  if (episodeDirectories.length === 0) {
    throw new Error(`No episodes found in ${episodesDirectory}`);
  }
  const slugs = episodeDirectories.map(episodeDirectory => {
    const episodeNumber = getEpisodeNumberFromPath(episodeDirectory);

    const infoFilePath = join(episodesDirectory, episodeDirectory, INFO_FILE_NAME);
    const infoFileContents = fs.readFileSync(infoFilePath, 'utf8');
    const info = YAML.parse(infoFileContents) as unknown as EpisodeYamlData;

    return getEpisodeSlug(episodeNumber, info.guests);
  })
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

export function getEpisodeSlug(episodeNumber: number, guests: string[]): string {
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

const episodeDirectory = './src/test/data/episodes';
console.log(getEpisodeSlugs(episodeDirectory));
console.log(
  parseInt('12-brett-aldrich-1')
)