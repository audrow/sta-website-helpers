import getPost from './get-post'

import type PodcastConfig from './__types__/PodcastConfig'
import type Post from './__types__/Post'

import {join} from 'path'
import fs from 'fs'

type PodcastHelperConfig = {
  isNewestPostFirst: boolean
  isDebug: boolean
}

const defaultConfig: PodcastHelperConfig = {
  isNewestPostFirst: true,
  isDebug: false,
}

export class PostLoader {
  private podcast: PodcastConfig
  private posts: Post[]
  private config: PodcastHelperConfig
  private isInitialized: boolean

  constructor(
    podcast: PodcastConfig,
    config: Partial<PodcastHelperConfig> = {},
  ) {
    this.podcast = podcast
    this.posts = []
    this.config = {...defaultConfig, ...config}
    this.isInitialized = false
  }

  async init(postsDirectory: string) {
    const postsDirectories = fs.readdirSync(postsDirectory)

    const posts: Post[] = []
    for await (const postDirectory of postsDirectories) {
      const postDirectoryPath = join(postsDirectory, postDirectory)
      const post = await getPost(this.podcast, postDirectoryPath)
      if (this.config.isDebug || post.publishDate.getTime() < Date.now()) {
        posts.push(post)
      }
    }
    this.checkPostsForDuplicateSlugs(posts)
    this.sortPostsByPublishDate(posts)

    this.posts = posts
    this.isInitialized = true
  }

  private checkPostsForDuplicateSlugs(posts: Post[]) {
    const slugs = posts.map((post) => post.slug)
    if (new Set(slugs).size !== slugs.length) {
      throw new Error('Duplicate slugs detected')
    }
  }

  private sortPostsByPublishDate(
    posts: Post[],
    isNewestFirst = this.config.isNewestPostFirst,
  ) {
    return posts.sort((post1, post2) => {
      if (post1.publishDate > post2.publishDate) {
        return isNewestFirst ? -1 : 1
      } else if (post1.publishDate < post2.publishDate) {
        return isNewestFirst ? 1 : -1
      }
      return 0
    })
  }

  private throwIfNotInitialized() {
    if (!this.isInitialized) {
      throw new Error('PostHelper is not initialized')
    }
  }

  getSlugs() {
    this.throwIfNotInitialized()
    return this.posts.map((post) => post.slug)
  }

  getPostBySlug(slug: string) {
    this.throwIfNotInitialized()
    const post = this.posts.find((post) => post.slug === slug)
    if (!post) {
      throw new Error(`Post with slug ${slug} not found`)
    }
    return post
  }

  getPosts() {
    this.throwIfNotInitialized()
    return this.posts
  }
}

export default PostLoader
