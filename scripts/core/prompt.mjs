import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const ask = q => new Promise(res => rl.question(q, res))

export async function askConfig() {
  const name = await ask('API name (e.g. settings): ')
  const shape = await ask('Data shape (object / array): ')
  const needCombine = await ask('Need combine hook? (yes / no): ')

  let combineName = null
  if (needCombine === 'yes') {
    combineName = await ask('Combine hook name (e.g. AppBootstrap): ')
  }

  const methods = (await ask('Methods (GET,POST,PUT): '))
    .split(',')
    .map(m => m.trim().toUpperCase())

  rl.close()

  return { name, shape, needCombine, combineName, methods }
}
