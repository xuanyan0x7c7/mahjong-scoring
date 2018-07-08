import { strict as assert } from 'assert'
import { getScore, hasFan } from './utils'

export default {
  一色四步高() {
    let result1 = getScore(
      {characters: '23456', bamboo: '77'},
      {character: 4},
      {chows: [{character: 2}, {character: 4}]}
    )
    assert.equal(hasFan(result1.fans, '一色四步高'), true)
    assert.equal(hasFan(result1.fans, '一色三步高'), false)
    assert.equal(hasFan(result1.fans, '连六'), false)
    let result2 = getScore(
      {characters: '5677789'},
      {character: 7},
      {chows: [{character: 2}, {character: 4}]}
    )
    assert.equal(hasFan(result2.fans, '一色三步高'), false)
    assert.equal(hasFan(result2.fans, '老少副'), false)
  },
  三杠() {
    let result = getScore(
      {characters: '44', dots: '66'},
      {character: 4},
      {exposedKongs: [{character: 2}, {dot: 3}, {bamboo: 5}]}
    )
    assert.equal(hasFan(result.fans, '三杠'), true)
  },
  混幺九() {
    let result1 = getScore(
      {characters: '999', dots: '11', honors: '南南'},
      {honor: '南'},
      {pungs: [{honor: '西'}, {honor: '白'}]}
    )
    assert.equal(hasFan(result1.fans, '混幺九'), true)
    assert.equal(hasFan(result1.fans, '碰碰和'), false)
    assert.equal(hasFan(result1.fans, '全带幺'), false)
    assert.equal(hasFan(result1.fans, '幺九刻'), false)
    let result2 = getScore(
      {characters: '1199', dots: '11', bamboo: '99', honors: '南南西西白'},
      {honor: '白'}
    )
    assert.equal(hasFan(result2.fans, '混幺九'), true)
    assert.equal(hasFan(result2.fans, '七对'), true)
  }
}
