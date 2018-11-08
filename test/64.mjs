import { strict as assert } from 'assert'
import { getScore, hasFan } from './utils'

export default {
  清幺九() {
    let result1 = getScore(
      {characters: '99', dots: '11199', bamboo: '999'},
      {character: 9},
      {pungs: [{character: 1}]}
    )
    assert.equal(hasFan(result1.fans, '清幺九'), true)
    assert.equal(hasFan(result1.fans, '碰碰和'), false)
    assert.equal(hasFan(result1.fans, '全带幺'), false)
    assert.equal(hasFan(result1.fans, '幺九刻'), false)
    assert.equal(hasFan(result1.fans, '无字'), false)
    let result2 = getScore(
      {characters: '11999', dots: '1199', bamboo: '1199'},
      {character: 9}
    )
    assert.equal(hasFan(result2.fans, '清幺九'), true)
    assert.equal(hasFan(result2.fans, '七对'), true)
    assert.equal(hasFan(result2.fans, '四归一'), true)
  },
  小四喜() {
    let result = getScore(
      {honors: '南南南西西北北', dots: '456'},
      {honor: '北'},
      {pungs: [{honor: '东'}]}
    )
    assert.equal(hasFan(result.fans, '小四喜'), true)
    assert.equal(hasFan(result.fans, '三风刻'), false)
  },
  小三元() {
    let result = getScore(
      {honors: '中中中发发白白', dots: '555'},
      {honor: '白'},
      {chows: [{character: 2}]}
    )
    assert.equal(hasFan(result.fans, '小三元'), true)
    assert.equal(hasFan(result.fans, '双箭刻'), false)
  },
  字一色() {
    let result = getScore(
      {honors: '南南南西西发发'},
      {honor: '发'},
      {pungs: [{honor: '东'}, {honor: '白'}]}
    )
    assert.equal(hasFan(result.fans, '字一色'), true)
    assert.equal(hasFan(result.fans, '碰碰和'), false)
    assert.equal(hasFan(result.fans, '全带幺'), false)
    assert.equal(hasFan(result.fans, '幺九刻'), false)
  },
  四暗刻() {
    let result1 = getScore(
      {characters: '222', dots: '333555', bamboo: '4777'},
      {bamboo: 4}
    )
    assert.equal(hasFan(result1.fans, '四暗刻'), true)
    assert.equal(hasFan(result1.fans, '碰碰和'), false)
    assert.equal(hasFan(result1.fans, '门前清'), false)
    let result2 = getScore(
      {characters: '222', dots: '33355', bamboo: '44777'},
      {dot: 5},
      {isSelfDrawn: true}
    )
    assert.equal(hasFan(result2.fans, '四暗刻'), true)
    assert.equal(hasFan(result2.fans, '不求人'), false)
    assert.equal(hasFan(result2.fans, '自摸'), true)
  },
  一色双龙会() {
    let result1 = getScore(
      {characters: '1235578'},
      {character: 9},
      {chows: [{character: 2}, {character: 8}]}
    )
    assert.equal(hasFan(result1.fans, '一色双龙会'), true)
    assert.equal(hasFan(result1.fans, '七对'), false)
    assert.equal(hasFan(result1.fans, '清一色'), false)
    assert.equal(hasFan(result1.fans, '平和'), false)
    assert.equal(hasFan(result1.fans, '一般高'), false)
    assert.equal(hasFan(result1.fans, '老少副'), false)
    assert.equal(hasFan(result1.fans, '无字'), false)
    let result2 = getScore(
      {characters: '1122335577889'},
      {character: 9}
    )
    assert.equal(hasFan(result2.fans, '一色双龙会'), true)
    assert.equal(hasFan(result2.fans, '七对'), false)
  }
}
