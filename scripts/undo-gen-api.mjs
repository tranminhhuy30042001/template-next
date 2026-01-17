import fs from 'fs'
import path from 'path'

const LOG_PATH = path.join(process.cwd(), 'scripts/.gen-api-log.json')

if (!fs.existsSync(LOG_PATH)) {
  console.log('❌ No rollback log found')
  process.exit(1)
}

const log = JSON.parse(fs.readFileSync(LOG_PATH, 'utf-8'))

log.created.forEach(f => {
  if (fs.existsSync(f)) fs.unlinkSync(f)
})

Object.entries(log.modified).forEach(([file, content]) => {
  fs.writeFileSync(file, content)
})

fs.unlinkSync(LOG_PATH)
console.log('✅ Undo completed')
