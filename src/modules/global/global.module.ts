import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { rootPath } from '../../config'
import { join } from 'path'
import { existsSync, readFileSync } from 'fs'
import { load } from 'js-yaml'
import { cloneDeepWith, merge } from 'lodash'

export interface GlobalModuleOptions {
  yamlFilePath?: string[] // 配置文件路径
  microservice?: string[] // 开启微服务模块
  typeorm?: boolean // 开启 orm 模块
  upload?: boolean // 开启文件上传模块
  cache?: boolean // 开启缓存模块
}

@Module({})
export class GlobalModule {
  static forRoot(options: GlobalModuleOptions): DynamicModule {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { typeorm, upload, cache } = options || {}
    console.log(typeorm, '-typeorm')
    const imports: DynamicModule['imports'] = [
      // 配置模块
      ConfigModule.forRoot({
        isGlobal: true,
        load: [
          () => {
            let configs: any = {}
            const configPath = ['config.yaml']
            for (const path of configPath) {
              try {
                // 读取并解析配置文件
                const filePath = join(rootPath, 'src/config', path)
                console.log(filePath, 'filePath')
                console.log(path, 'path')
                if (existsSync(filePath))
                  configs = merge(configs, load(readFileSync(filePath, 'utf8')))
              } catch {}
            }
            // 递归将 null 转 空字符串
            configs = cloneDeepWith(configs, (value) => {
              if (value === null) return ''
            })
            return configs
          }
        ]
      })
    ]
    if (typeorm) {
      imports.push(
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => {
            const db = configService.get('db')
            return { ...db }
          },
          inject: [ConfigService]
        })
      )
    }

    return {
      module: GlobalModule,
      imports
    }
  }
}
