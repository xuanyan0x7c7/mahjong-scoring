import { strict as assert } from 'assert'
import { getScore, hasFan } from './utils'

export default {
  清幺九() {
    let result1 = getScore('99m11199p999s', '9m', {pungs: ['111m']})
    assert.equal(hasFan(result1.fans, '清幺九'), true)
    assert.equal(hasFan(result1.fans, '碰碰和'), false)
    assert.equal(hasFan(result1.fans, '全带幺'), false)
    assert.equal(hasFan(result1.fans, '幺九刻'), false)
    assert.equal(hasFan(result1.fans, '无字'), false)
    let result2 = getScore('11999m1199p1199s', '9m')
    assert.equal(hasFan(result2.fans, '清幺九'), true)
    assert.equal(hasFan(result2.fans, '七对'), true)
    assert.equal(hasFan(result2.fans, '四归一'), true)
  },
  小四喜() {
    let result = getScore('456p2223344z', '4z', {pungs: ['111z']})
    assert.equal(hasFan(result.fans, '小四喜'), true)
    assert.equal(hasFan(result.fans, '三风刻'), false)
  },
  小三元() {
    let result = getScore('555p5556677z', '7z', {chows: ['123m']})
    assert.equal(hasFan(result.fans, '小三元'), true)
    assert.equal(hasFan(result.fans, '双箭刻'), false)
  },
  字一色() {
    let result = getScore('2223366z', '6z', {pungs: ['111z', '777z']})
    assert.equal(hasFan(result.fans, '字一色'), true)
    assert.equal(hasFan(result.fans, '碰碰和'), false)
    assert.equal(hasFan(result.fans, '全带幺'), false)
    assert.equal(hasFan(result.fans, '幺九刻'), false)
  },
  四暗刻() {
    let result1 = getScore('222m333555p4777s', '4s')
    assert.equal(hasFan(result1.fans, '四暗刻'), true)
    assert.equal(hasFan(result1.fans, '碰碰和'), false)
    assert.equal(hasFan(result1.fans, '门前清'), false)
    let result2 = getScore('222m33355p44777s', '5p', {isSelfDrawn: true})
    assert.equal(hasFan(result2.fans, '四暗刻'), true)
    assert.equal(hasFan(result2.fans, '不求人'), false)
    assert.equal(hasFan(result2.fans, '自摸'), true)
  },
  一色双龙会() {
    let result1 = getScore('1235578m', '9m', {chows: ['123m', '789m']})
    assert.equal(hasFan(result1.fans, '一色双龙会'), true)
    assert.equal(hasFan(result1.fans, '七对'), false)
    assert.equal(hasFan(result1.fans, '清一色'), false)
    assert.equal(hasFan(result1.fans, '平和'), false)
    assert.equal(hasFan(result1.fans, '一般高'), false)
    assert.equal(hasFan(result1.fans, '老少副'), false)
    assert.equal(hasFan(result1.fans, '无字'), false)
    let result2 = getScore('1122335577889m', '9m')
    assert.equal(hasFan(result2.fans, '一色双龙会'), true)
    assert.equal(hasFan(result2.fans, '七对'), false)
  }
}
