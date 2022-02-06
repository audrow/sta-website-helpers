import type Duration from './__types__/Duration'
import type PostFileData from './__types__/PostFileData'
import type Post from './__types__/Post'
import type SerializedPost from './__types__/SerializedPost'
import type Link from './__types__/Link'
import type PodcastConfig from './__types__/PodcastConfig'
import type PostLoaderConfig from './__types__/PostLoaderConfig'

import PostLoader from './post-loader'
import {toDuration, toDurationString, sortDuration} from './utils'
import readYamlPost from './read-post/read-yaml'
import getPost from './get-post'

export type {
  Duration,
  PostFileData as PostYamlData,
  Post,
  SerializedPost,
  Link,
  PodcastConfig,
  PostLoaderConfig,
}

export {
  PostLoader,
  toDuration,
  toDurationString,
  sortDuration,
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
