import path from 'path'

const root = process.cwd()

export function resolvePaths(name) {
  return {
    apiDir: path.join(root, 'src/app/api', name),
    hookDir: path.join(root, 'src/hooks'),
    typeDir: path.join(root, 'src/types'),
  }
}
