import type EpisodeYamlData from './EpisodeYamlData'

type EpisodeData = {
  slug: string;
  path: string;
  number: number;
} & EpisodeYamlData

export default EpisodeData;
