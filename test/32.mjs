import assert from 'assert'
import { getScore } from './utils'

export default {
  一色四步高() {
    let result1 = getScore(
      {characters: '23456', bamboo: '77'},
      {character: 4},
      {chows: [{character: 2}, {character: 4}]}
    )
    assert.equal(result1.fans.includes('一色四步高'), true)
    assert.equal(result1.fans.includes('连六'), false)
    let result2 = getScore(
      {characters: '5677789'},
      {character: 7},
      {chows: [{character: 2}, {character: 4}]}
    )
    assert.equal(result2.fans.includes('一色四步高'), true)
    assert.equal(result2.fans.includes('老少副'), false)
  },
  三杠() {
    let result = getScore(
      {characters: '44', dots: '66'},
      {character: 4},
      {exposedKongs: [{character: 2}, {dot: 3}, {bamboo: 5}]}
    )
    assert.equal(result.fans.includes('三杠'), true)
  },
  混幺九() {
    let result1 = getScore(
      {characters: '999', dots: '11', honors: '南南'},
      {honor: '南'},
      {pungs: [{honor: '西'}, {honor: '白'}]}
    )
    assert.equal(result1.fans.includes('混幺九'), true)
    assert.equal(result1.fans.includes('碰碰和'), false)
    assert.equal(result1.fans.includes('全带幺'), false)
    assert.equal(result1.fans.includes('幺九刻'), false)
    let result2 = getScore(
      {characters: '1199', dots: '11', bamboo: '99', honors: '南南西西白'},
      {honor: '白'}
    )
    assert.equal(result2.fans.includes('混幺九'), true)
    assert.equal(result2.fans.includes('七对'), true)
  }
}
