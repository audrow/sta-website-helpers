import PostFileData from './PostFileData'

type ReadPostFileFn = (directory: string) => Promise<PostFileData>

export default ReadPostFileFn
