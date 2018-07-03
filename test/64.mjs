import assert from 'assert'
import { getScore } from './utils'

export default {
  清幺九() {
    let result1 = getScore(
      {characters: '99', dots: '11199', bamboo: '999'},
      {character: 9},
      {pungs: [{character: 1}]}
    )
    assert.equal(result1.fans.includes('清幺九'), true)
    assert.equal(result1.fans.includes('碰碰和'), false)
    assert.equal(result1.fans.includes('全带幺'), false)
    assert.equal(result1.fans.includes('幺九刻'), false)
    assert.equal(result1.fans.includes('无字'), false)
    let result2 = getScore(
      {characters: '11999', dots: '1199', bamboo: '1199'},
      {character: 9}
    )
    assert.equal(result2.fans.includes('清幺九'), true)
    assert.equal(result2.fans.includes('七对'), true)
    assert.equal(result2.fans.includes('四归一'), true)
  },
  小四喜() {
    let result = getScore(
      {honors: '南南南西西北北', dots: '456'},
      {honor: '北'},
      {pungs: [{honor: '东'}]}
    )
    assert.equal(result.fans.includes('小四喜'), true)
    assert.equal(result.fans.includes('三风刻'), false)
  },
  小三元() {
    let result = getScore(
      {honors: '中中中发发白白', dots: '555'},
      {honor: '白'},
      {chows: [{character: 2}]}
    )
    assert.equal(result.fans.includes('小三元'), true)
    assert.equal(result.fans.includes('双箭刻'), false)
  },
  字一色() {
    let result = getScore(
      {honors: '南南南西西发发'},
      {honor: '发'},
      {pungs: [{honor: '东'}, {honor: '白'}]}
    )
    assert.equal(result.fans.includes('字一色'), true)
    assert.equal(result.fans.includes('碰碰和'), false)
    assert.equal(result.fans.includes('全带幺'), false)
    assert.equal(result.fans.includes('幺九刻'), false)
  },
  四暗刻() {
    let result1 = getScore(
      {characters: '222', dots: '333555', bamboo: '4777'},
      {bamboo: 4}
    )
    assert.equal(result1.fans.includes('四暗刻'), true)
    assert.equal(result1.fans.includes('碰碰和'), false)
    let result2 = getScore(
      {characters: '222', dots: '33355', bamboo: '44777'},
      {dot: 5},
      {isSelfDrawn: true}
    )
    assert.equal(result2.fans.includes('四暗刻'), true)
    assert.equal(result2.fans.includes('门前清'), false)
  },
  一色双龙会() {
    let result1 = getScore(
      {characters: '1235578'},
      {character: 9},
      {chows: [{character: 2}, {character: 8}]}
    )
    assert.equal(result1.fans.includes('一色双龙会'), true)
    assert.equal(result1.fans.includes('七对'), false)
    assert.equal(result1.fans.includes('清一色'), false)
    assert.equal(result1.fans.includes('平和'), false)
    assert.equal(result1.fans.includes('一般高'), false)
    assert.equal(result1.fans.includes('老少副'), false)
    assert.equal(result1.fans.includes('无字'), false)
    let result2 = getScore(
      {characters: '1122335577889'},
      {character: 9}
    )
    assert.equal(result2.fans.includes('一色双龙会'), true)
    assert.equal(result2.fans.includes('七对'), false)
  }
}
