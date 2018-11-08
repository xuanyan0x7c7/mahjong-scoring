import { strict as assert } from 'assert'
import { getScore, hasFan, countInList } from './utils'

export default {
  全不靠() {
    let result1 = getScore(
      {characters: '147', dots: '25', bamboo: '36', honors: '东南西北中发'},
      {bamboo: 9}
    )
    assert.equal(hasFan(result1.fans, '全不靠'), true)
    assert.equal(hasFan(result1.fans, '五门齐'), false)
    assert.equal(hasFan(result1.fans, '门前清'), false)
    let result2 = getScore(
      {characters: '147', dots: '25', bamboo: '36', honors: '东南西北中发'},
      {bamboo: 9},
      {isSelfDrawn: true}
    )
    assert.equal(hasFan(result2.fans, '全不靠'), true)
    assert.equal(hasFan(result2.fans, '不求人'), false)
    assert.equal(hasFan(result2.fans, '自摸'), true)
  },
  组合龙() {
    let result1 = getScore(
      {characters: '147', dots: '258', bamboo: '36', honors: '东南西北中'},
      {bamboo: 9}
    )
    assert.equal(hasFan(result1.fans, '全不靠'), true)
    assert.equal(hasFan(result1.fans, '组合龙'), true)
    let result2 = getScore(
      {characters: '147', dots: '24568', bamboo: '36779'},
      {dot: 5}
    )
    assert.equal(hasFan(result2.fans, '组合龙'), true)
    assert.equal(hasFan(result2.fans, '平和'), true)
    assert.equal(hasFan(result2.fans, '坎张'), false)
    let result3 = getScore(
      {characters: '147', dots: '28', bamboo: '369', honors: '东东东白白'},
      {dot: 5}
    )
    assert.equal(hasFan(result3.fans, '组合龙'), true)
    assert.equal(hasFan(result3.fans, '五门齐'), true)
  },
  大于五() {
    let result = getScore(
      {characters: '88', dots: '99'},
      {character: 8},
      {
        chows: [{dot: 7}, {bamboo: 8}],
        pungs: [{character: 7}]
      }
    )
    assert.equal(hasFan(result.fans, '大于五'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  },
  小于五() {
    let result = getScore(
      {characters: '33', dots: '44'},
      {character: 3},
      {
        chows: [{dot: 2}, {bamboo: 3}],
        pungs: [{character: 2}]
      }
    )
    assert.equal(hasFan(result.fans, '小于五'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  },
  三风刻() {
    let result = getScore(
      {characters: '11', dots: '33', honors: '西西西'},
      {character: 1},
      {pungs: [{honor: '东'}, {honor: '南'}]}
    )
    assert.equal(hasFan(result.fans, '三风刻'), true)
    assert.equal(countInList(result.fans, '幺九刻'), 1)
  }
}
