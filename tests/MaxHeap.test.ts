import { test } from 'uvu'
import { MaxHeap } from '../src/MaxHeap'
import * as assert from 'uvu/assert'

class Item {
  constructor(public key: number) {}
}

test('should pop in sorted order', () => {
  const heap = new MaxHeap<Item>('key')
  heap.push(new Item(3))
  heap.push(new Item(1))
  heap.push(new Item(4))
  heap.push(new Item(2))
  assert.equal(heap.pop()?.key, 4, 'failed')
  assert.equal(heap.pop()?.key, 3, 'failed')
  assert.equal(heap.pop()?.key, 2, 'failed')
  assert.equal(heap.pop()?.key, 1, 'failed')
})

test.run()
