import { strict as assert } from 'assert'
import { getScore, hasFan } from './utils'

export default {
  一色四同顺() {
    let result1 = getScore('1112223334m', '4m', {chows: ['123m']})
    assert.equal(hasFan(result1.fans, '一色四同顺'), true)
    assert.equal(hasFan(result1.fans, '一色三同顺'), false)
    assert.equal(hasFan(result1.fans, '四归一'), false)
    assert.equal(hasFan(result1.fans, '一般高'), false)
    let result2 = getScore('1111222233344m', '3m')
    assert.equal(hasFan(result2.fans, '一色四同顺'), true)
    assert.equal(hasFan(result2.fans, '七对'), false)
  },
  一色四节高() {
    let result = getScore('3355566677m', '3m', {pungs: ['444m']})
    assert.equal(hasFan(result.fans, '一色四节高'), true)
    assert.equal(hasFan(result.fans, '一色三节高'), false)
    assert.equal(hasFan(result.fans, '碰碰和'), false)
  }
}
