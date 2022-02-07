import {PostFileData} from '@sta-podcast/types'
import dayjs from 'dayjs'

const description = 'Audrow Nash introduces the Sense Think Act Podcast.'

const post: PostFileData = {
  title: 'Welcome to Sense Think Act',
  description,
  excerpt: description,
  duration: {
    hours: 0,
    minutes: 4,
    seconds: 39,
  },
  customSlug: '0-welcome',
  customMp3FileName: 'STA Ep 0 - Welcome',
  mp3SizeBytes: 9097894,
  tags: ['announcement'],
  publishDate: dayjs('2021-8-24'),
  youtube: {
    mainContentId: 'welcome',
  },
}
export default post
