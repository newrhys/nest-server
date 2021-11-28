import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { join } from 'path'
import { rootPath } from './index'

const YAML_CONFIG_FILENAME = 'config.yaml'

export default () => {
  console.log(join(__dirname, YAML_CONFIG_FILENAME))
  return load(
    readFileSync(join(rootPath, 'src/config', YAML_CONFIG_FILENAME), 'utf8')
  ) as Record<string, any>
}
