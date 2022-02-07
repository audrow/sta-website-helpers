import type PostLoaderConfig from './__types__/PostLoaderConfig'
import type GetPostFn from './__types__/GetPostFn'
import type ReadPostFileFn from './__types__/ReadPostFileFn'

import PostLoader from './post-loader'
import {toTimestamp, toTimestampString, sortTimestamps} from './utils'
import readYamlPost from './read-post/read-yaml'
import getPost from './get-post'
import type {PodcastConfig} from '@sta-podcast/types'

export type {PostLoaderConfig, GetPostFn, ReadPostFileFn}

export {
  PostLoader,
  toTimestamp,
  toTimestampString,
  sortTimestamps,
  getPost,
  readYamlPost,
  createPostLoader,
}

async function createPostLoader(
  postsDirectory: string,
  podcast: PodcastConfig,
  config: Partial<PostLoaderConfig> = {},
) {
  const postLoader = new PostLoader(podcast, config)
  await postLoader.init(postsDirectory, getPost, readYamlPost)
  return postLoader
}

export default createPostLoader
