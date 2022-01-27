import Link from './Link'
import Duration from './Duration'
import YoutubeVideo from './YoutubeVideo'

type EpisodeYamlData = {
  guests: string | string[]
  title: string
  description: string
  excerpt: string
  publishDate: Date
  tags: string[]
  links: Link[]
  duration: Duration
  customSlug?: string
  customUrlFileName?: string
  youtube: {
    mainInterview: YoutubeVideo
    clips?: YoutubeVideo[]
  }
}

export default EpisodeYamlData
