import fs from 'fs'
import path from 'path'

const LOG_PATH = path.join(process.cwd(), 'scripts/.gen-api-log.json')

const log = {
  created: [],
  modified: {},
}

export function writeFile(file, content) {
  if (fs.existsSync(file)) {
    if (!log.modified[file]) {
      log.modified[file] = fs.readFileSync(file, 'utf-8')
    }
  } else {
    log.created.push(file)
  }
  fs.writeFileSync(file, content)
}

export function saveRollbackLog() {
  fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2))
}
