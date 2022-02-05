import type PostYamlData from './__types__/PostYamlData'
import type Post from './__types__/Post'
import type Link from './__types__/Link'
import type PodcastConfig from './__types__/PodcastConfig'
import type PostLoaderConfig from './__types__/PostLoaderConfig'

import PostLoader from './post-loader'
import {toDuration, toDurationString, sortDuration} from './utils'
import readTsPost from './read-post/read-ts'
import readYamlPost from './read-post/read-yaml'
import getPost from './get-post'

export type {PostYamlData, Post, Link, PodcastConfig, PostLoaderConfig}

export {
  PostLoader,
  toDuration,
  toDurationString,
  sortDuration,
  getPost,
  readTsPost,
  readYamlPost,
  createPostLoader,
}

async function createPostLoader(
  postInfoFileType: 'ts' | 'yaml',
  postsDirectory: string,
  podcast: PodcastConfig,
  config: Partial<PostLoaderConfig> = {},
) {
  const postLoader = new PostLoader(podcast, config)
  await postLoader.init(
    postsDirectory,
    getPost,
    postInfoFileType === 'ts' ? readTsPost : readYamlPost,
  )
  return postLoader
}

export default createPostLoader
