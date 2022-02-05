import PostYamlData from '../../../../__types__/PostYamlData'

const description = 'Audrow Nash introduces the Sense Think Act Podcast.'

const post: PostYamlData = {
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
  publishDate: new Date(2021, 8, 24),
  youtube: {
    mainContentId: 'welcome',
  },
}
export default post
