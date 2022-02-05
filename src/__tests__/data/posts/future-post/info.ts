import PostYamlData from '../../../../__types__/PostYamlData'
import dayjs from 'dayjs'

const description = 'Some Great Future News'

const post: PostYamlData = {
  title: 'This Post Is Always in the Future',
  description,
  excerpt: description,
  duration: {
    hours: 0,
    minutes: 4,
    seconds: 39,
  },
  customSlug: '99-future-post',
  customMp3FileName: 'Future Post',
  mp3SizeBytes: 99999,
  tags: ['announcement'],
  publishDate: dayjs('2099-01-01'),
  youtube: {
    mainContentId: 'futurepost',
  },
}
export default post
