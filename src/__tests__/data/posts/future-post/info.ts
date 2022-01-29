import PostYamlData from '../../../../__types__/PostYamlData'

const title = 'This Post Is Always in the Future'
const description = 'Some Great Future News'
const publishDate = new Date()
publishDate.setDate(publishDate.getDate() + 1)

const post: PostYamlData = {
  title,
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
  publishDate,
  youtube: {
    mainContent: {
      baseTitle: title,
      videoId: '7PdIbR8lNGI',
    },
  },
}
export default post
