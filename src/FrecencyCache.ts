import { MaxHeap } from './MaxHeap'

const durationDays = (days: number) => 1000 * 60 * 60 * 24 * days

function initialCachePolicy(now: number, item: HeapItem<unknown, unknown>) {
  let score = 0
  for (const timestamp of item.timestamps) {
    const elapsed = now - timestamp
    score += (1 - Math.max(1, elapsed / durationDays(90))) * 100
  }
  return (item.count * score) / item.timestamps.length
}

type HeapItem<K, V> = {
  key: K
  value: V
  /** count usage of this heap item */
  count: number
  /** timestamps of last 10 usages */
  timestamps: number[]
  /** derived from cache policy fn, cached for sorting */
  frecencyScore: number
}

export class FrecencyCache<K, V> {
  private heap = new MaxHeap<HeapItem<K, V>>('frecencyScore')
  private cache: Map<K, HeapItem<K, V>> = new Map()
  private cachePolicy = initialCachePolicy

  private nullHeapItem(k: K, v: V) {
    return { key: k, value: v, count: 0, timestamps: [], frecencyScore: -1 }
  }

  set(k: K, v: V) {
    const prev = this.cache.get(k)
    const item = prev ?? this.nullHeapItem(k, v)
    item.count += 1
    const now = Date.now()
    item.timestamps.push(now)
    item.frecencyScore = this.cachePolicy(now, item)
    this.cache.set(k, item)
    this.heap.push(item)
  }
  get(k: K): V
  delete(k: K): void
  setCachePolicy(fn: (item: HeapItem<V>) => number): void
  setCacheSize(size: number): void
}
