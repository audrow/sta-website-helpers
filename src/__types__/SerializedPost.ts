import type Post from './Post'

type SerializedPost = {
  publishDate: string
} & Omit<Post, 'publishDate'>

export default SerializedPost
