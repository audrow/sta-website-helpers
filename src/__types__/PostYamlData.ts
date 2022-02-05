import Link from './Link'
import Duration from './Duration'
import YoutubeVideo from './YoutubeVideo'
import type {Dayjs} from 'dayjs'

type PostYamlData = {
  guests?: string | string[]
  title: string
  description: string
  excerpt: string
  publishDate: Dayjs
  tags: string[]
  links?: Link[]
  duration: Duration
  customSlug?: string
  customMp3FileName?: string
  mp3SizeBytes: number
  youtube: {
    mainContentId: string
    clips?: YoutubeVideo[]
  }
}

export default PostYamlData
