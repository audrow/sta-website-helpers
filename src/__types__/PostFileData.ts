import Link from './Link'
import Timestamp from './Timestamp'
import YoutubeVideo from './YoutubeVideo'
import type {Dayjs} from 'dayjs'

type PostFileData = {
  guests?: string | string[]
  title: string
  description: string
  excerpt: string
  publishDate: Dayjs
  tags: string[]
  links?: Link[]
  duration: Timestamp
  customSlug?: string
  customMp3FileName?: string
  mp3SizeBytes: number
  youtube: {
    mainContentId: string
    clips?: YoutubeVideo[]
  }
}

export default PostFileData
