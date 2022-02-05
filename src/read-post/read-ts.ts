import type PostYamlData from '../__types__/PostYamlData'
import {join} from 'path'

import {INFO_TS_FILE_NAME} from '../constants'

async function readTsPost(directory: string): Promise<PostYamlData> {
  const infoFilePath = join(directory, INFO_TS_FILE_NAME)
  return (await import(infoFilePath)).default as PostYamlData
}

export default readTsPost
