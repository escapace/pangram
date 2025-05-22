import { access } from 'node:fs/promises'

export const pathExists = async (path: string) =>
  await access(path)
    .then(() => true)
    .catch(() => false)
