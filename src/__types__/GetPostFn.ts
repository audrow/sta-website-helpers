import PodcastConfig from './PodcastConfig'
import ReadPostFileFn from './ReadPostFn'
import Post from './Post'

type GetPostFn = (
  podcast: PodcastConfig,
  directory: string,
  readPostFileFn: ReadPostFileFn,
) => Promise<Post>

export default GetPostFn
