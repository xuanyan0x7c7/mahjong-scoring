import assert from 'assert'
import { getScore, countInList } from './utils'

export default {
  全不靠() {
    let result = getScore(
      {characters: '147', dots: '258', bamboo: '36', honors: '东南西北中'},
      {bamboo: 9}
    )
    assert.equal(result.fans.includes('全不靠'), true)
    assert.equal(result.fans.includes('组合龙'), true)
    assert.equal(result.fans.includes('五门齐'), false)
    assert.equal(result.fans.includes('门前清'), false)
  },
  组合龙() {
    let result1 = getScore(
      {characters: '147', dots: '24568', bamboo: '36779'},
      {dot: 5}
    )
    assert.equal(result1.fans.includes('组合龙'), true)
    assert.equal(result1.fans.includes('坎张'), false)
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
    assert.equal(result.fans.includes('大于五'), true)
    assert.equal(result.fans.includes('无字'), false)
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
    assert.equal(result.fans.includes('小于五'), true)
    assert.equal(result.fans.includes('无字'), false)
  },
  三风刻() {
    let result = getScore(
      {characters: '11', dots: '33', honors: '西西西'},
      {character: 1},
      {pungs: [{honor: '东'}, {honor: '南'}]}
    )
    assert.equal(result.fans.includes('三风刻'), true)
    assert.equal(countInList(result.fans, '幺九刻'), 1)
  }
}
