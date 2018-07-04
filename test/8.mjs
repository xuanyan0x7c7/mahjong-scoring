import assert from 'assert'
import { getScore, countInList } from './utils'

export default {
  花龙() {
    let result = getScore(
      {characters: '4789'},
      {character: 4},
      {chows: [{character: 2}, {dot: 5}, {bamboo: 8}]}
    )
    assert.equal(result.fans.includes('花龙'), true)
    assert.equal(countInList(result.fans, '喜相逢', '老少副'), 1)
  },
  推不倒() {
    let result = getScore(
      {dots: '345', bamboo: '8899'},
      {bamboo: 9},
      {
        chows: [{dot: 2}, {bamboo: 5}]
      }
    )
    assert.equal(result.fans.includes('推不倒'), true)
    assert.equal(result.fans.includes('缺一门'), false)
  },
  三色三同顺() {
    let result = getScore(
      {characters: '3477', dots: '234'},
      {character: 2},
      {chows: [{character: 3}, {bamboo: 3}]}
    )
    assert.equal(result.fans.includes('三色三同顺'), true)
    assert.equal(countInList(result.fans, '一般高', '喜相逢'), 1)
  },
  三色三节高() {
    let result = getScore(
      {characters: '22', dots: '66999'},
      {dot: 6},
      {pungs: [{character: 7}, {bamboo: 8}]}
    )
    assert.equal(result.fans.includes('三色三节高'), true)
  },
  无番和() {
    let result = getScore(
      {characters: '888', bamboo: '34', honors: '北北'},
      {bamboo: 2},
      {
        chows: [{dot: 2}],
        pungs: [{bamboo: 7}]
      }
    )
    assert.deepEqual(result.fans, ['无番和'])
  },
  妙手回春() {
    let result = getScore(
      {characters: '888', bamboo: '34', honors: '北北'},
      {bamboo: 2},
      {
        chows: [{dot: 2}],
        pungs: [{bamboo: 7}],
        isSelfDrawn: true,
        isLastTile: true
      }
    )
    assert.equal(result.fans.includes('妙手回春'), true)
    assert.equal(result.fans.includes('无番和'), false)
    assert.equal(result.fans.includes('自摸'), false)
  },
  海底捞月() {
    let result = getScore(
      {characters: '888', bamboo: '34', honors: '北北'},
      {bamboo: 2},
      {
        chows: [{dot: 2}],
        pungs: [{bamboo: 7}],
        isLastTile: true
      }
    )
    assert.equal(result.fans.includes('海底捞月'), true)
    assert.equal(result.fans.includes('无番和'), false)
  },
  杠上开花() {
    let result = getScore(
      {characters: '22', dots: '66999'},
      {dot: 6},
      {
        pungs: [{bamboo: 8}],
        exposedKongs: [{character: 7}],
        isSelfDrawn: true,
        isKong: true
      }
    )
    assert.equal(result.fans.includes('杠上开花'), true)
    assert.equal(result.fans.includes('自摸'), false)
  },
  抢杠和() {
    let result = getScore(
      {characters: '888', bamboo: '34', honors: '北北'},
      {bamboo: 2},
      {
        chows: [{dot: 2}],
        pungs: [{bamboo: 7}],
        isKong: true
      }
    )
    assert.equal(result.fans.includes('抢杠和'), true)
    assert.equal(result.fans.includes('和绝张'), false)
  },
  双暗杠() {
    let result = getScore(
      {characters: '22', dots: '66'},
      {dot: 6},
      {
        exposedKongs: [{dot: 9}],
        concealedKongs: [{character: 7}, {bamboo: 8}]
      }
    )
    assert.equal(result.fans.includes('双暗杠'), true)
    assert.equal(result.fans.includes('双明杠'), false)
    assert.equal(result.fans.includes('双暗刻'), false)
  }
}
