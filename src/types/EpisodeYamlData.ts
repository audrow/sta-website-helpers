import Link from './Link'

type EpisodeYamlData = {
  guests: string[];
  title: string;
  description: string;
  excerpt: string;
  publicationDate: string;
  tags: string[];
  links: Link[];
  duration: string;
  customSlug?: string;
  customUrlFileName?: string;
  youtubeIds: {
    mainInterview: string;
    clips?: string[];
  }
}

export default EpisodeYamlData;
