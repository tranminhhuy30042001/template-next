import path from 'path'
import { writeFile } from '../core/rollback.mjs'

export function generateCombineHook({ combineName, Pascal, camel, hookDir }) {
  writeFile(
    path.join(hookDir, `use${combineName}.ts`),
    `
import { combineResources } from '@/lib/combineResources'
import { use${Pascal} } from './use${Pascal}'

export function use${combineName}() {
  const ${camel} = use${Pascal}()
  return combineResources({ ${camel} })
}
`.trim()
  )
}
