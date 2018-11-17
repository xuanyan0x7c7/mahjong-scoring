import { strict as assert } from 'assert'
import { getScore, hasFan, countInList } from './utils'

export default {
  花龙() {
    let result = getScore('4789m', '4m', {chows: ['123m', '456p', '789s']})
    assert.equal(hasFan(result.fans, '花龙'), true)
    assert.equal(countInList(result.fans, '喜相逢', '老少副'), 1)
  },
  推不倒() {
    let result = getScore('345p8899s', '9s', {chows: ['222p', '555s']})
    assert.equal(hasFan(result.fans, '推不倒'), true)
    assert.equal(hasFan(result.fans, '缺一门'), false)
  },
  三色三同顺() {
    let result = getScore('3477m234p', '2m', {chows: ['234m', '234s']})
    assert.equal(hasFan(result.fans, '三色三同顺'), true)
    assert.equal(countInList(result.fans, '一般高', '喜相逢'), 1)
  },
  三色三节高() {
    let result = getScore('22m66999p', '6p', {pungs: ['777m', '888s']})
    assert.equal(hasFan(result.fans, '三色三节高'), true)
  },
  无番和() {
    let result = getScore('888m34s44z', '2s', {chows: ['123p', '777s']})
    assert.equal(result.fans.length, 1)
    assert.equal(result.fans[0].name, '无番和')
  },
  妙手回春() {
    let result = getScore('888m34s44z', '2s', {
      chows: ['222p'], pungs: ['777s'],
      isSelfDrawn: true, isLastTile: true
    })
    assert.equal(hasFan(result.fans, '妙手回春'), true)
    assert.equal(hasFan(result.fans, '无番和'), false)
    assert.equal(hasFan(result.fans, '自摸'), false)
  },
  海底捞月() {
    let result = getScore('888m34s44z', '2s', {
      chows: ['123p'], pungs: ['777s'],
      isLastTile: true
    })
    assert.equal(hasFan(result.fans, '海底捞月'), true)
    assert.equal(hasFan(result.fans, '无番和'), false)
  },
  杠上开花() {
    let result = getScore('22m66999p', '6p', {
      pungs: ['888s'], exposedKongs: ['7777m'],
      isSelfDrawn: true, isKong: true
    })
    assert.equal(hasFan(result.fans, '杠上开花'), true)
    assert.equal(hasFan(result.fans, '自摸'), false)
  },
  抢杠和() {
    let result = getScore('888m34s44z', '2s', {
      chows: ['123p'], pungs: ['777s'],
      isKong: true
    })
    assert.equal(hasFan(result.fans, '抢杠和'), true)
    assert.equal(hasFan(result.fans, '和绝张'), false)
  }
}
