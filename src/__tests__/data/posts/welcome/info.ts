import PostYamlData from '../../../../__types__/PostYamlData'

const title = 'Welcome to Sense Think Act'
const description = 'Audrow Nash introduces the Sense Think Act Podcast.'
const post: PostYamlData = {
  title,
  description,
  excerpt: description,
  duration: {
    hours: 0,
    minutes: 4,
    seconds: 39,
  },
  customSlug: '0-welcome',
  mp3SizeBytes: 9097894,
  tags: ['announcement'],
  publishDate: new Date(2021, 8, 24),
  youtube: {
    mainContent: {
      baseTitle: title,
      videoId: '7PdIbR8lNGI',
    },
  },
}
export default post
