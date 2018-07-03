import assert from 'assert'
import { getScore } from './utils'

export default {
  大四喜() {
    let result = getScore(
      {honors: '南南南西西西北北', dots: '22'},
      {honor: '北'},
      {pungs: [{honor: '东'}]}
    )
    assert.equal(result.fans.includes('大四喜'), true)
    assert.equal(result.fans.includes('三风刻'), false)
    assert.equal(result.fans.includes('碰碰和'), false)
    assert.equal(result.fans.includes('圈风刻'), false)
    assert.equal(result.fans.includes('门风刻'), false)
    assert.equal(result.fans.includes('幺九刻'), false)
  },
  大三元() {
    let result = getScore(
      {honors: '中中中发发发白白', dots: '55'},
      {honor: '白'},
      {chows: [{character: 2}]}
    )
    assert.equal(result.fans.includes('大三元'), true)
  },
  绿一色() {
    let result = getScore(
      {honors: '发发', bamboo: '23666888'},
      {bamboo: 4},
      {chows: [{bamboo: 3}]}
    )
    assert.equal(result.fans.includes('绿一色'), true)
    assert.equal(result.fans.includes('混一色'), true)
  },
  九莲宝灯() {
    let result1 = getScore(
      {bamboo: '1112345678999'},
      {bamboo: 5}
    )
    assert.equal(result1.fans.includes('九莲宝灯'), true)
    assert.equal(result1.fans.includes('幺九刻'), false)
    assert.equal(result1.fans.includes('清一色'), false)
    assert.equal(result1.fans.includes('门前清'), false)
    assert.equal(result1.fans.includes('无字'), false)
    let result2 = getScore(
      { bamboo: '1112234567899' },
      { bamboo: 9 }
    )
    assert.equal(result2.fans.includes('九莲宝灯'), false)
  },
  四杠() {
    let result = getScore(
      {honors: '发'},
      {honor: '发'},
      {
        exposedKongs: [{bamboo: 2}, {bamboo: 3}, {dot: 5}, {character: 7}],
        isSelfDrawn: true
      }
    )
    assert.equal(result.fans.includes('四杠'), true)
    assert.equal(result.fans.includes('碰碰和'), false)
    assert.equal(result.fans.includes('单调将'), false)
  },
  连七对() {
    let result = getScore(
      {bamboo: '1122334456677'},
      {bamboo: 5}
    )
    assert.equal(result.fans.includes('连七对'), true)
    assert.equal(result.fans.includes('七对'), false)
    assert.equal(result.fans.includes('清一色'), false)
    assert.equal(result.fans.includes('门前清'), false)
    assert.equal(result.fans.includes('无字'), false)
    assert.equal(result.fans.includes('单调将'), false)
  },
  十三幺() {
    let result = getScore(
      {bamboo: '11', dots: '19', characters: '19', honors: '东南西北中发白'},
      {bamboo: 9}
    )
    assert.equal(result.fans.includes('十三幺'), true)
    assert.equal(result.fans.includes('混幺九'), false)
    assert.equal(result.fans.includes('单调将'), false)
  }
}
