import type PostFileData from '../__types__/PostFileData'
import {join} from 'path'

import {INFO_TS_FILE_NAME} from '../constants'

async function readTsPost(directory: string): Promise<PostFileData> {
  const infoFilePath = join(directory, INFO_TS_FILE_NAME)
  return (await import(infoFilePath)).default as PostFileData
}

export default readTsPost
