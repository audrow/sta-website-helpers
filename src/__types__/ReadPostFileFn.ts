import type {PostFileData} from '@sta-podcast/types'

type ReadPostFileFn = (directory: string) => Promise<PostFileData>

export default ReadPostFileFn
