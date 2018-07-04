import assert from 'assert'
import { getScore } from './utils'

export default {
  全带幺() {
    let result = getScore(
      {characters: '11123', dots: '78', honors: '中中中'},
      {dot: 9},
      {pungs: [{bamboo: 9}]}
    )
    assert.equal(result.fans.includes('全带幺'), true)
  },
  不求人() {
    let result = getScore(
      {dots: '123', bamboo: '234777', honors: '北'},
      {honor: '北'},
      {
        concealedKongs: [{character: 8}],
        isSelfDrawn: true
      }
    )
    assert.equal(result.fans.includes('不求人'), true)
    assert.equal(result.fans.includes('门前清'), false)
    assert.equal(result.fans.includes('自摸'), false)
  },
  双明杠() {
    let result = getScore(
      {characters: '22777', dots: '66'},
      {dot: 6},
      {
        exposedKongs: [{dot: 9}],
        concealedKongs: [{bamboo: 8}]
      }
    )
    assert.equal(result.fans.includes('双明杠'), true)
    assert.equal(result.fans.includes('暗杠'), true)
  },
  和绝张() {
    let result = getScore(
      {characters: '888', bamboo: '34', honors: '北北'},
      {bamboo: 2},
      {
        chows: [{dot: 2}],
        pungs: [{bamboo: 7}],
        isFourthTile: true
      }
    )
    assert.equal(result.fans.includes('和绝张'), true)
  }
}
