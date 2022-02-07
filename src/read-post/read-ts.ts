import type {PostFileData} from '@sta-podcast/types'
import {join} from 'path'

import {INFO_TS_FILE_NAME} from '../constants'

async function readTsPost(directory: string): Promise<PostFileData> {
  const infoFilePath = join(directory, INFO_TS_FILE_NAME)
  return (await import(infoFilePath)).default as PostFileData
}

export default readTsPost
