import YAML from 'yaml';
import fs from 'fs';
import { join, sep } from 'path';

import type EpisodeYamlData from './types/EpisodeYamlData';

export function getEpisodeSlugs(episodesDirectory: string): string[] {
  const directories = fs.readdirSync(episodesDirectory)
  if (directories.length === 0) {
    throw new Error(`No episodes found in ${episodesDirectory}`);
  }
  const slugs = directories.map(directory => {
    const episodeNumber = getEpisodeNumber(directory);

    const infoFilePath = join(episodesDirectory, directory, 'info.yml');
    const infoFileContents = fs.readFileSync(infoFilePath, 'utf8');
    const info = YAML.parse(infoFileContents) as unknown as EpisodeYamlData;

    return getEpisodeSlug(episodeNumber, info.guests);
  })
  return slugs
}

export function getEpisodeNumber(episodeDirectory: string) {
  return parseInt(episodeDirectory.split(sep).slice(-1)[0])
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