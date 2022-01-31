import type PostYamlData from './PostYamlData'
import type PostIncludes from './PostIncludes'

type Post = {
  slug: string
  number?: number
  url: string
  mp3: {
    url: string
    sizeBytes: number
  }
  includes?: Partial<PostIncludes>
} & Omit<PostYamlData, 'customSlug' | 'customMp3FileName' | 'mp3Size'>

export default Post
