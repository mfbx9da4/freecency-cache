export class MaxHeap<T> {
  priorityKey: keyof T
  /** Ordered array */
  heap: Array<T> = []
  constructor(priorityKey: keyof T) {
    this.priorityKey = priorityKey
  }

  private less(i: number, j: number) {
    return this.heap[i]?.[this.priorityKey] < this.heap[j]?.[this.priorityKey]
  }

  private parent(i: number) {
    return Math.floor((i + 1) / 2 - 1)
  }

  private left(i: number) {
    return (i + 1) * 2 - 1
  }

  private right(i: number) {
    return (i + 1) * 2
  }

  private swap(i: number, j: number) {
    const temp = this.heap[i]
    this.heap[i] = this.heap[j]
    this.heap[j] = temp
  }

  private swim(k: number) {
    while (k > 0 && this.less(this.parent(k), k)) {
      this.swap(this.parent(k), k)
      k = this.parent(k)
    }
  }

  private sink(k: number) {
    const N = this.heap.length
    while (this.left(k) <= N) {
      let j = this.left(k)
      if (j < N && this.less(j, this.right(k))) j++
      if (!this.less(k, j)) break
      this.swap(k, j)
      k = j
    }
  }

  push(item: T) {
    this.heap.push(item)
    this.swim(this.heap.length - 1)
  }

  pop() {
    this.swap(0, this.heap.length - 1)
    const max = this.heap.pop()
    this.sink(0)
    return max
  }
}
