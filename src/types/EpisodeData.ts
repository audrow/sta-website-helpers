import type EpisodeYamlData from './EpisodeYamlData'
import type Mp3 from './Mp3'
import type YoutubeVideo from './YoutubeVideo'

type EpisodeData = {
  slug: string;
  path: string;
  number: number;
  mp3: Mp3;
  youtube: {
    mainInterview: YoutubeVideo;
    clips?: YoutubeVideo[];
  }
} & Omit<EpisodeYamlData, "customSlug" | "youTubeIds" | "customUrlFileName">;

export default EpisodeData;
