import path from 'path'

const root = process.cwd()

export function resolvePaths(name) {
  return {
    // API
    apiDir: path.resolve('src/app/api', name),

    // Types
    typeDir: path.resolve('src/types'),

    // Hooks
    hookDir: path.resolve('src/hooks'),

    componentDir: path.resolve('src/components'),
  }
}