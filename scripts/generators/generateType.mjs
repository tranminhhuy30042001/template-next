import path from 'path'
import fs from 'fs'
import { writeFile } from '../core/rollback.mjs'
import { ensureDir } from '../core/fs.mjs'

export function generateType({ name, Pascal, typeDir }) {
  ensureDir(typeDir)

  writeFile(
    path.join(typeDir, `${name}.ts`),
    `export type ${Pascal} = { id: string }\n`
  )

  const indexPath = path.join(typeDir, 'index.ts')
  const exportLine = `export * from './${name}'`

  if (fs.existsSync(indexPath)) {
    const old = fs.readFileSync(indexPath, 'utf-8')
    if (!old.includes(exportLine)) {
      writeFile(indexPath, `${old}\n${exportLine}`)
    }
  } else {
    writeFile(indexPath, exportLine)
  }
}
