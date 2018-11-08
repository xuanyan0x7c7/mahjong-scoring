import { strict as assert } from 'assert'
import { getScore, hasFan } from './utils'

export default {
  明暗杠() {
    let result = getScore(
      {characters: '22777', dots: '66'},
      {dot: 6},
      {
        exposedKongs: [{dot: 9}],
        concealedKongs: [{bamboo: 8}]
      }
    )
    assert.equal(hasFan(result.fans, '明暗杠'), true)
  }
}
