import type {PostFileData} from '@sta-podcast/types'
import {join} from 'path'
import yaml from 'js-yaml'
import fs from 'fs'
import dayjs from 'dayjs'

import {INFO_YAML_FILE_NAME} from '../constants'

async function readYamlPost(directory: string): Promise<PostFileData> {
  const infoFilePath = join(directory, INFO_YAML_FILE_NAME)
  const file = fs.readFileSync(infoFilePath, 'utf8')
  const info = yaml.load(file, {schema: yaml.CORE_SCHEMA}) as PostFileData

  // load the date as a dayjs date
  info.publishDate = dayjs(info.publishDate)

  // wrap the description so sentences are on the same line, but preserve paragraphs
  info.description = info.description
    .trim()
    .split('\n\n')
    .map((paragraph) => paragraph.replace(/\n/g, ' '))
    .join('\n')
  return info
}

export default readYamlPost

async function main() {
  const dir = join(__dirname, '..', '__tests__', 'data', 'posts', '10')
  const info = await readYamlPost(dir)
  console.log(info)
}
if (require.main === module) {
  main()
}
