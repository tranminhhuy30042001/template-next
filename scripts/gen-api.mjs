import { askConfig } from './core/prompt.mjs'
import { toPascal, toCamel } from './core/utils.mjs'
import { resolvePaths } from './core/paths.mjs'
import { saveRollbackLog } from './core/rollback.mjs'

import { generateType } from './generators/generateType.mjs'
import { generateApiRoute } from './generators/generateApiRoute.mjs'
import { generateHook } from './generators/generateHook.mjs'
import { generateCombineHook } from './generators/generateCombineHook.mjs'

async function main() {
  const config = await askConfig()
  const Pascal = toPascal(config.name)
  const camel = toCamel(config.name)

  const paths = resolvePaths(config.name)

  generateType({ ...config, Pascal, ...paths })
  generateApiRoute({ ...config, ...paths })
  generateHook({ ...config, Pascal, ...paths })

  if (config.needCombine === 'yes') {
    generateCombineHook({
      combineName: config.combineName,
      Pascal,
      camel,
      ...paths,
    })
  }

  saveRollbackLog()
  console.log('✅ API generated successfully')
}

main()
