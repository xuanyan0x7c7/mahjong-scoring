import assert from 'assert'
import { getScore } from './utils'

export default {
  碰碰和() {
    let result = getScore(
      {characters: '22', dots: '66999'},
      {dot: 6},
      {pungs: [{character: 7}, {bamboo: 8}]}
    )
    assert.equal(result.fans.includes('碰碰和'), true)
  },
  混一色() {
    let result1 = getScore(
      {characters: '6788'},
      {character: 5},
      {
        chows: [{character: 3}, {character: 4}],
        pungs: [{honor: '白'}]
      }
    )
    assert.equal(result1.fans.includes('混一色'), true)
    let result2 = getScore(
      {characters: '6788'},
      {character: 5},
      {
        chows: [{character: 3}, {character: 4}],
        pungs: [{character: '1'}]
      }
    )
    assert.equal(result2.fans.includes('混一色'), false)
    assert.equal(result2.fans.includes('清一色'), true)
  },
  三色三步高() {
    let result = getScore(
      {characters: '3477', dots: '456'},
      {character: 5},
      {chows: [{character: 3}, {bamboo: 4}]}
    )
    assert.equal(result.fans.includes('三色三步高'), true)
  },
  五门齐() {
    let result = getScore(
      {characters: '888', bamboo: '34', honors: '北北'},
      {bamboo: 2},
      {
        chows: [{dot: 2}],
        pungs: [{honor: '中'}]
      }
    )
    assert.equal(result.fans.includes('五门齐'), true)
  },
  全求人() {
    let result = getScore(
      {honors: '北'},
      {honor: '北'},
      {
        chows: [{dot: 2}, {bamboo: 3}],
        pungs: [{bamboo: 7}],
        exposedKongs: [{character: 8}]
      }
    )
    assert.equal(result.fans.includes('全求人'), true)
    assert.equal(result.fans.includes('单调将'), false)
  },
  双箭刻() {
    let result = getScore(
      {characters: '22345', dots: '66'},
      {dot: 6},
      {
        pungs: [{honor: '发'}],
        concealedKongs: [{honor: '白'}]
      }
    )
    assert.equal(result.fans.includes('双箭刻'), true)
  }
}
