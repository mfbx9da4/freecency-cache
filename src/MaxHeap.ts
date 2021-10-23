export class MaxHeap<T> {
  priorityKey: keyof T
  /** Ordered array */
  heap: Array<T> = []
  constructor(priorityKey: keyof T) {
    this.priorityKey = priorityKey
  }

  private less(i: number, j: number) {
    return this.heap[i] < this.heap[j]
  }

  private swap(i: number, j: number) {
    const temp = this.heap[i]
    this.heap[i] = this.heap[j]
    this.heap[j] = temp
  }

  private swim(k: number) {
    while (k > 1 && this.less(k / 2, k)) {
      this.swap(k / 2, k)
      k = k / 2
    }
  }

  private sink(k: number) {
    const N = this.heap.length
    while (2 * k <= N) {
      const j = 2 * k
      if (j < N && this.less(j, j + 1)) j++
      if (!this.less(k, j)) break
      this.swap(k, j)
      k = j
    }
  }

  push(item: T) {
    this.heap.push(item)
    this.swim(this.heap.length)
  }
  pop() {
    this.swap(1, this.heap.length--)
    const max = this.heap.pop()
    this.sink(1)
    return max
  }
}
