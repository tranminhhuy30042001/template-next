import path from 'path'

import { writeFile } from '../core/rollback.mjs'
import { ensureDir } from '../core/fs.mjs'
export function generateHook({ name, Pascal, hookDir }) {

    ensureDir(hookDir)

    writeFile(
        path.join(hookDir, `use${Pascal}.ts`),
        `
import { useResource } from './useResource'
import { apiFetch } from '@/lib/apiFetch'
import type { ${Pascal} } from '@/types'

export function use${Pascal}() {
  return useResource(
    signal => apiFetch('/api/${name}', { signal }),
    []
  )
}
`.trim()
    )
}
