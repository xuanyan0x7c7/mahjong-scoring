import { strict as assert } from 'assert'
import { getScore, hasFan } from './utils'

export default {
  全带幺() {
    let result = getScore('11123m78p555z', '9p', {pungs: ['999s']})
    assert.equal(hasFan(result.fans, '全带幺'), true)
  },
  不求人() {
    let result = getScore('123p234777s4z', '4z', {concealedKongs: ['8888m'], isSelfDrawn: true})
    assert.equal(hasFan(result.fans, '不求人'), true)
    assert.equal(hasFan(result.fans, '门前清'), false)
    assert.equal(hasFan(result.fans, '自摸'), false)
  },
  双明杠() {
    let result = getScore('22777m66p', '6p', {exposedKongs: ['9999p', '8888s']})
    assert.equal(hasFan(result.fans, '双明杠'), true)
  },
  和绝张() {
    let result = getScore('888m34s44z', '2s', {
      chows: ['123p'], pungs: ['777s'],
      isFourthTile: true
    })
    assert.equal(hasFan(result.fans, '和绝张'), true)
  }
}
