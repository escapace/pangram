import { uniq } from 'lodash-es'

export const reduceGraph = (
  a: Map<string, string[]>,
  b: Map<string, string[]>,
): Map<string, string[]> => {
  const graph = new Map<string, string[]>()

  uniq([...a.keys(), ...b.keys()]).forEach((key) => {
    graph.set(key, uniq([...(a.get(key) ?? []), ...(b.get(key) ?? [])]))
  })

  return graph
}
