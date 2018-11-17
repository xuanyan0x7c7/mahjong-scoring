import { strict as assert } from 'assert'
import { getScore, hasFan } from './utils'

export default {
  七对() {
    let result = getScore('113355m22466p77s', '4p')
    assert.equal(hasFan(result.fans, '七对'), true)
    assert.equal(hasFan(result.fans, '门前清'), false)
    assert.equal(hasFan(result.fans, '单钓将'), false)
  },
  七星不靠() {
    let result1 = getScore('14m25p36s1234567z', '9s')
    assert.equal(hasFan(result1.fans, '七星不靠'), true)
    assert.equal(hasFan(result1.fans, '全不靠'), false)
    assert.equal(hasFan(result1.fans, '五门齐'), false)
    assert.equal(hasFan(result1.fans, '门前清'), false)
    let result2 = getScore('14m25p36s1234567z', '9s', {isSelfDrawn: true})
    assert.equal(hasFan(result2.fans, '七星不靠'), true)
    assert.equal(hasFan(result2.fans, '不求人'), false)
    assert.equal(hasFan(result2.fans, '自摸'), true)
  },
  全双刻() {
    let result1 = getScore('222m444p6668s', '8s', {pungs: ['666m']})
    assert.equal(hasFan(result1.fans, '全双刻'), true)
    assert.equal(hasFan(result1.fans, '碰碰和'), false)
    assert.equal(hasFan(result1.fans, '断幺'), false)
    assert.equal(hasFan(result1.fans, '无字'), false)
    let result2 = getScore('224466m46688p22s', '4p')
    assert.equal(hasFan(result2.fans, '全双刻'), false)
    assert.equal(hasFan(result2.fans, '七对'), true)
  },
  清一色() {
    let result = getScore('1233334m', '5m', {chows: ['567m'], pungs: ['777m']})
    assert.equal(hasFan(result.fans, '清一色'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  },
  一色三同顺() {
    let result1 = getScore('22334m56788p', '4m', {chows: ['234m']})
    assert.equal(hasFan(result1.fans, '一色三同顺'), true)
    assert.equal(hasFan(result1.fans, '一般高'), false)
    let result2 = getScore('333444555m5s', '5s', {chows: ['345p']})
    assert.equal(hasFan(result2.fans, '一色三同顺'), true)
    assert.equal(hasFan(result2.fans, '一色三节高'), false)
  },
  一色三节高() {
    let result1 = getScore('22244m56788p', '4m', {pungs: ['333m']})
    assert.equal(hasFan(result1.fans, '一色三节高'), true)
    assert.equal(hasFan(result1.fans, '一般高'), false)
    let result2 = getScore('333444555m5s', '5s', {chows: ['678s']})
    assert.equal(hasFan(result2.fans, '一色三节高'), true)
    assert.equal(hasFan(result2.fans, '一色三同顺'), false)
  },
  全大() {
    let result = getScore('88m99p', '8m', {chows: ['789p', '789s'], pungs: ['777m']})
    assert.equal(hasFan(result.fans, '全大'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  },
  全中() {
    let result = getScore('55m66p', '5m', {chows: ['456p', '456s'], pungs: ['444m']})
    assert.equal(hasFan(result.fans, '全中'), true)
    assert.equal(hasFan(result.fans, '断幺'), false)
  },
  全小() {
    let result = getScore('22m33p', '2m', {chows: ['123p', '123s'], pungs: ['111m']})
    assert.equal(hasFan(result.fans, '全小'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  }
}
