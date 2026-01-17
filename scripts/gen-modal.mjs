import fs from 'fs'
import path from 'path'
import readline from 'readline'

const root = process.cwd()
const LOG_PATH = path.join(root, 'scripts/.gen-modal-log.json')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const ask = q => new Promise(res => rl.question(q, res))

const rollbackLog = {
  created: [],
}

function writeFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    rollbackLog.created.push(filePath)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, content)
    console.log('📄', path.relative(root, filePath))
  }
}

const toPascal = s => s.charAt(0).toUpperCase() + s.slice(1)

async function main() {
  const name = await ask('Modal name (e.g. UserDetail): ')
  const mode = await ask('Mode (boundary / suspense): ')

  const Pascal = toPascal(name)

  const modalPath = path.join(
    root,
    'src/components/modals',
    `${Pascal}Modal.tsx`
  )

  const isSuspense = mode === 'suspense'

  const content = isSuspense
    ? `
'use client'

import { Suspense } from 'react'

type Props<T> = {
  open: boolean
  resource: { read(): T }
  onClose(): void
  children(data: T): React.ReactNode
}

export function ${Pascal}Modal<T>({
  open,
  resource,
  onClose,
  children,
}: Props<T>) {
  if (!open) return null

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={onClose}>×</button>

        <Suspense fallback={<div>Loading...</div>}>
          {children(resource.read())}
        </Suspense>
      </div>
    </div>
  )
}
`.trim()
    : `
'use client'

import { DataBoundary } from '@/components/DataBoundary'

type Props<T> = {
  open: boolean
  resource: {
    data?: T
    loading: boolean
    error?: Error
  }
  onClose(): void
  children(data: T): React.ReactNode
}

export function ${Pascal}Modal<T>({
  open,
  resource,
  onClose,
  children,
}: Props<T>) {
  if (!open) return null

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={onClose}>×</button>

        <DataBoundary {...resource}>
          {children}
        </DataBoundary>
      </div>
    </div>
  )
}
`.trim()

  writeFile(modalPath, content)

  fs.mkdirSync(path.join(root, 'scripts'), { recursive: true })
  fs.writeFileSync(LOG_PATH, JSON.stringify(rollbackLog, null, 2))

  console.log('\n✅ Modal generated')
  console.log('↩ rollback log:', 'scripts/.gen-modal-log.json')

  rl.close()
}

main()
