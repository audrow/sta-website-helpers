import PostYamlData from './PostYamlData'

type ReadPostFileFn = (directory: string) => Promise<PostYamlData>

export default ReadPostFileFn
