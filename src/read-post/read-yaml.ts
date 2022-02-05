import type PostYamlData from '../__types__/PostYamlData'
import {join} from 'path'
import YAML from 'yaml'
import fs from 'fs'

import {INFO_YAML_FILE_NAME} from '../constants'

async function readYamlPost(directory: string): Promise<PostYamlData> {
  const infoFilePath = join(directory, INFO_YAML_FILE_NAME)
  const file = fs.readFileSync(infoFilePath, 'utf8')
  return YAML.parse(file) as PostYamlData
}

export default readYamlPost
