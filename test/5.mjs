import { strict as assert } from 'assert'
import { getScore, hasFan } from './utils'

export default {
  明暗杠() {
    let result = getScore('22777m66p', '6p', {
      exposedKongs: ['9999p'],
      concealedKongs: ['8888s']
    })
    assert.equal(hasFan(result.fans, '明暗杠'), true)
  }
}
