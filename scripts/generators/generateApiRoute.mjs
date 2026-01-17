import path from 'path'

import { writeFile } from '../core/rollback.mjs'
import { ensureDir } from '../core/fs.mjs'
export function generateApiRoute({ name, shape, methods, apiDir }) {

    ensureDir(apiDir)

    let code = `import { NextResponse } from 'next/server'\n\n`

    if (methods.includes('GET')) {
        code += `
export async function GET() {
  return NextResponse.json(${shape === 'array' ? '[]' : '{}'})
}\n`
    }

    if (methods.includes('POST')) {
        code += `
export async function POST(req: Request) {
  const body = await req.json()
  return NextResponse.json(body, { status: 201 })
}\n`
    }

    if (methods.includes('PUT')) {
        code += `
export async function PUT(req: Request) {
  const body = await req.json()
  return NextResponse.json(body)
}\n`
    }

    writeFile(path.join(apiDir, 'route.ts'), code)
}
