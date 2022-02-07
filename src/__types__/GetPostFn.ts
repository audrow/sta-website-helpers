import ReadPostFileFn from './ReadPostFileFn'

import type {PodcastConfig, Post} from '@sta-podcast/types'

type GetPostFn = (
  podcast: PodcastConfig,
  directory: string,
  readPostFileFn: ReadPostFileFn,
) => Promise<Post>

export default GetPostFn
