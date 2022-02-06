import type PodcastConfig from './__types__/PodcastConfig'
import type Post from './__types__/Post'
import type ReadPostFileFn from './__types__/ReadPostFn'
import type GetPostFn from './__types__/GetPostFn'
import type PostLoaderConfig from './__types__/PostLoaderConfig'
import type SerializedPost from './__types__/SerializedPost'

import {join} from 'path'
import fs from 'fs'
import dayjs from 'dayjs'
import podcastConfig from './__tests__/data/podcast.config'

const defaultConfig: PostLoaderConfig = {
  isNewestPostFirst: true,
  isDebug: false,
  isSerialized: true,
}

export class PostLoader {
  private podcast: PodcastConfig
  private posts: Post[]
  private tagToPostMap: {[tag: string]: string[]}
  config: PostLoaderConfig
  private isInitialized: boolean

  constructor(podcast: PodcastConfig, config: Partial<PostLoaderConfig> = {}) {
    this.podcast = podcast
    this.posts = []
    this.tagToPostMap = {}
    this.config = {...defaultConfig, ...config}
    this.isInitialized = false
  }

  async init(
    postsDirectory: string,
    getPostFn: GetPostFn,
    readPostFileFn: ReadPostFileFn,
  ) {
    const postsDirectories = fs.readdirSync(postsDirectory)
    if (postsDirectories.length === 0) {
      throw new Error(`No posts found in ${postsDirectory}`)
    }

    const posts: Post[] = []
    for await (const postDirectory of postsDirectories) {
      const postDirectoryPath = join(postsDirectory, postDirectory)
      const post = await getPostFn(
        this.podcast,
        postDirectoryPath,
        readPostFileFn,
      )
      if (this.config.isDebug || post.publishDate < dayjs()) {
        this.recordTags(post.tags, post.slug)
        posts.push(post)
      }
    }
    this.checkPostsForDuplicateSlugs(posts)
    this.sortPostsByPublishDate(posts)

    this.posts = posts
    this.isInitialized = true
  }

  private recordTags(postTags: string[], postSlug: string) {
    postTags.map((tag) => {
      if (!this.tagToPostMap[tag]) {
        this.tagToPostMap[tag] = []
      }
      this.tagToPostMap[tag].push(postSlug)
    })
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

  getTags() {
    this.throwIfNotInitialized()
    return Object.keys(this.tagToPostMap).sort()
  }

  getSlugs() {
    this.throwIfNotInitialized()
    return this.posts.map((post) => post.slug)
  }

  getSlugsByTag(tag: string) {
    this.throwIfNotInitialized()
    return this.tagToPostMap[tag]
  }

  getPostBySlug(slug: string) {
    const post = this.getUnserializedPostBySlug(slug)
    return this.config.isSerialized ? this.serializePost(post) : post
  }

  private getUnserializedPostBySlug(slug: string) {
    this.throwIfNotInitialized()
    const post = this.posts.find((post) => post.slug === slug)
    if (!post) {
      throw new Error(`Post with slug ${slug} not found`)
    }
    return post
  }

  getPosts(slugs: string[] = []) {
    this.throwIfNotInitialized()

    let posts: Post[]
    if (slugs.length === 0) {
      posts = this.posts
    } else {
      posts = slugs.map((s) => this.getUnserializedPostBySlug(s))
      this.sortPostsByPublishDate(posts)
    }
    return this.config.isSerialized ? this.serializePosts(posts) : posts
  }

  private serializePosts(posts: Post[]): SerializedPost[] {
    return posts.map((post) => this.serializePost(post))
  }

  private serializePost(post: Post): SerializedPost {
    const {publishDate, ...postFields} = post
    return {
      ...JSON.parse(JSON.stringify(postFields)),
      publishDate: publishDate.format('YYYY-MM-DD'),
    }
  }
}

export default PostLoader

import getPost from './get-post'
import readYamlFile from './read-post/read-yaml'

async function main() {
  const dir = join(__dirname, '__tests__', 'data', 'posts')
  const postLoader = new PostLoader(podcastConfig, {isSerialized: true})
  await postLoader.init(dir, getPost, readYamlFile)
  const posts = postLoader.getPosts()
  console.log(posts)
  const json = JSON.parse(JSON.stringify(posts))
  console.log(json)
}
if (require.main === module) {
  main()
}
