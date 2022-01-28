import Link from './Link'
import Duration from './Duration'
import YoutubeVideo from './YoutubeVideo'

type PostYamlData = {
  guests?: string | string[]
  title: string
  description: string
  excerpt: string
  publishDate: Date
  tags: string[]
  links?: Link[]
  duration: Duration
  customSlug?: string
  customMp3FileName?: string
  mp3SizeBytes: number
  youtube: {
    mainContent: YoutubeVideo
    clips?: YoutubeVideo[]
  }
}

export default PostYamlData
