import fs from 'fs'

export function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`📁 created directory: ${dir}`)
  }
}
