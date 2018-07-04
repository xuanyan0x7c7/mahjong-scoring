import assert from 'assert'
import { getScore, countInList } from './utils'

export default {
  清龙() {
    let result = getScore(
      {characters: '1234'},
      {character: 4},
      {chows: [{character: 2}, {character: 5}, {character: 8}]}
    )
    assert.equal(result.fans.includes('清龙'), true)
    assert.equal(countInList(result.fans, '一般高', '连六', '老少副'), 1)
  },
  三色双龙会() {
    let result = getScore(
      {characters: '13', dots: '55', bamboo: '789'},
      {character: 2},
      {chows: [{character: 8}, {bamboo: 2}]}
    )
    assert.equal(result.fans.includes('三色双龙会'), true)
    assert.equal(result.fans.includes('平和'), false)
    assert.equal(result.fans.includes('喜相逢'), false)
    assert.equal(result.fans.includes('老少副'), false)
    assert.equal(result.fans.includes('无字'), false)
  },
  一色三步高() {
    let result1 = getScore(
      {characters: '2348', dots: '567'},
      {character: 8},
      {chows: [{character: 2}, {character: 4}]}
    )
    assert.equal(result1.fans.includes('一色三步高'), true)
    let result2 = getScore(
      {characters: '5678', dots: '567'},
      {character: 8},
      {chows: [{character: 2}, {character: 4}]}
    )
    assert.equal(result2.fans.includes('一色三步高'), true)
  },
  全带五() {
    let result = getScore(
      {characters: '55', dots: '345', bamboo: '57'},
      {bamboo: 6},
      {
        chows: [{dot: 5}],
        pungs: [{bamboo: 5}]
      }
    )
    assert.equal(result.fans.includes('全带五'), true)
    assert.equal(result.fans.includes('断幺'), false)
    assert.equal(result.fans.includes('无字'), false)
  },
  三同刻() {
    let result = getScore(
      {characters: '44', dots: '444', bamboo: '88'},
      {character: 4},
      {
        chows: [{character: 6}],
        pungs: [{bamboo: 4}]
      }
    )
    assert.equal(result.fans.includes('三同刻'), true)
    assert.equal(result.fans.includes('无字'), false)
  },
  三暗刻() {
    let result = getScore(
      {characters: '33456', dots: '55888'},
      {character: 3},
      {
        concealedKongs: [{bamboo: 9}],
        isSelfDrawn: true
      }
    )
    assert.equal(result.fans.includes('三暗刻'), true)
  }
}
