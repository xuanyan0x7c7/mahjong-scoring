import { strict as assert } from 'assert'
import { getScore, hasFan, countInList } from './utils'

export default {
  全不靠() {
    let result1 = getScore('147m25p36s123456z', '9s')
    assert.equal(hasFan(result1.fans, '全不靠'), true)
    assert.equal(hasFan(result1.fans, '五门齐'), false)
    assert.equal(hasFan(result1.fans, '门前清'), false)
    let result2 = getScore('147m25p36s123456z', '9s', {isSelfDrawn: true})
    assert.equal(hasFan(result2.fans, '全不靠'), true)
    assert.equal(hasFan(result2.fans, '不求人'), false)
    assert.equal(hasFan(result2.fans, '自摸'), true)
  },
  组合龙() {
    let result1 = getScore('147m258p36s12345z', '9s')
    assert.equal(hasFan(result1.fans, '全不靠'), true)
    assert.equal(hasFan(result1.fans, '组合龙'), true)
    let result2 = getScore('147m24568p36779s', '5p')
    assert.equal(hasFan(result2.fans, '组合龙'), true)
    assert.equal(hasFan(result2.fans, '平和'), true)
    assert.equal(hasFan(result2.fans, '坎张'), false)
    let result3 = getScore('147m28p369s77z', '5p', {pungs: ['111z']})
    assert.equal(hasFan(result3.fans, '组合龙'), true)
    assert.equal(hasFan(result3.fans, '五门齐'), true)
  },
  大于五() {
    let result = getScore('88m99p', '8m', {chows: ['678p', '789s'], pungs: ['777m']})
    assert.equal(hasFan(result.fans, '大于五'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  },
  小于五() {
    let result = getScore('33m44p', '3m', {chows: ['123p', '234s'], pungs: ['222m']})
    assert.equal(hasFan(result.fans, '小于五'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  },
  三风刻() {
    let result = getScore('11m33p333z', '1m', {pungs: ['111z', '222z'], winds: [1, 2]})
    assert.equal(hasFan(result.fans, '三风刻'), true)
    assert.equal(hasFan(result.fans, '圈风刻'), true)
    assert.equal(hasFan(result.fans, '门风刻'), true)
    assert.equal(countInList(result.fans, '幺九刻'), 1)
  }
}
