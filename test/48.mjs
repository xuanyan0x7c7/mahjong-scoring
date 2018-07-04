import assert from 'assert'
import { getScore } from './utils'

export default {
  一色四同顺() {
    let result1 = getScore(
      {characters: '1112223334'},
      {character: 4},
      {chows: [{character: 2}]}
    )
    assert.equal(result1.fans.includes('一色四同顺'), true)
    assert.equal(result1.fans.includes('一色三同顺'), false)
    assert.equal(result1.fans.includes('四归一'), false)
    assert.equal(result1.fans.includes('一般高'), false)
    let result2 = getScore(
      {characters: '1111222233344'},
      {character: 3}
    )
    assert.equal(result2.fans.includes('一色四同顺'), true)
    assert.equal(result2.fans.includes('七对'), false)
  },
  一色四节高() {
    let result = getScore(
      {characters: '3355566677'},
      {character: 3},
      {pungs: [{character: 4}]}
    )
    assert.equal(result.fans.includes('一色四节高'), true)
    assert.equal(result.fans.includes('一色三节高'), false)
    assert.equal(result.fans.includes('碰碰和'), false)
  }
}
