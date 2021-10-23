import { test } from 'uvu'
import { MaxHeap } from '../src/MaxHeap'
import * as assert from 'uvu/assert'

class Item {
  constructor(public key: number) {}
}

test('add to pq', () => {
  const heap = new MaxHeap<Item>('key')
  heap.push(new Item(3))
  heap.push(new Item(1))
  heap.push(new Item(2))
  assert.equal(heap.pop()?.key, 3, 'failed')
})

test.run()
