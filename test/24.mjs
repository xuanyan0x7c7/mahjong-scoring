import { strict as assert } from 'assert'
import { getScore, hasFan } from './utils'

export default {
  七对() {
    let result = getScore(
      {characters: '113355', dots: '22466', bamboo: '77'},
      {dot: 4}
    )
    assert.equal(hasFan(result.fans, '七对'), true)
    assert.equal(hasFan(result.fans, '门前清'), false)
    assert.equal(hasFan(result.fans, '单调将'), false)
  },
  七星不靠() {
    let result = getScore(
      {characters: '14', dots: '25', bamboo: '36', honors: '东南西北中发白'},
      {bamboo: 9}
    )
    assert.equal(hasFan(result.fans, '七星不靠'), true)
    assert.equal(hasFan(result.fans, '全不靠'), false)
    assert.equal(hasFan(result.fans, '五门齐'), false)
    assert.equal(hasFan(result.fans, '门前清'), false)
  },
  全双刻() {
    let result1 = getScore(
      {characters: '222', dots: '444', bamboo: '6688'},
      {bamboo: 8},
      {pungs: [{character: 6}]}
    )
    assert.equal(hasFan(result1.fans, '全双刻'), true)
    assert.equal(hasFan(result1.fans, '碰碰和'), false)
    assert.equal(hasFan(result1.fans, '断幺'), false)
    assert.equal(hasFan(result1.fans, '无字'), false)
    let result2 = getScore(
      {characters: '224466', dots: '46688', bamboo: '22'},
      {dot: 4}
    )
    assert.equal(hasFan(result2.fans, '全双刻'), false)
    assert.equal(hasFan(result2.fans, '七对'), true)
  },
  清一色() {
    let result = getScore(
      {characters: '1233334'},
      {character: 5},
      {
        chows: [{character: 6}],
        pungs: [{character: 7}]
      }
    )
    assert.equal(hasFan(result.fans, '清一色'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  },
  一色三同顺() {
    let result1 = getScore(
      {characters: '22334', dots: '56788'},
      {character: 4},
      {chows: [{character: 3}]}
    )
    assert.equal(hasFan(result1.fans, '一色三同顺'), true)
    assert.equal(hasFan(result1.fans, '一般高'), false)
    let result2 = getScore(
      {characters: '333444555', bamboo: '5'},
      {bamboo: 5},
      {chows: [{dot: 4}]}
    )
    assert.equal(hasFan(result2.fans, '一色三同顺'), true)
    assert.equal(hasFan(result2.fans, '一色三节高'), false)
  },
  一色三节高() {
    let result1 = getScore(
      {characters: '22244', dots: '56788'},
      {character: 4},
      {pungs: [{character: 3}]}
    )
    assert.equal(hasFan(result1.fans, '一色三节高'), true)
    assert.equal(hasFan(result1.fans, '一般高'), false)
    let result2 = getScore(
      {characters: '333444555', bamboo: '5'},
      {bamboo: 5},
      {chows: [{dot: 7}]}
    )
    assert.equal(hasFan(result2.fans, '一色三节高'), true)
    assert.equal(hasFan(result2.fans, '一色三同顺'), false)
  },
  全大() {
    let result = getScore(
      {characters: '88', dots: '99'},
      {character: 8},
      {
        chows: [{dot: 8}, {bamboo: 8}],
        pungs: [{character: 7}]
      }
    )
    assert.equal(hasFan(result.fans, '全大'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  },
  全中() {
    let result = getScore(
      {characters: '55', dots: '66'},
      {character: 5},
      {
        chows: [{dot: 5}, {bamboo: 5}],
        pungs: [{character: 4}]
      }
    )
    assert.equal(hasFan(result.fans, '全中'), true)
    assert.equal(hasFan(result.fans, '断幺'), false)
  },
  全小() {
    let result = getScore(
      {characters: '22', dots: '33'},
      {character: 2},
      {
        chows: [{dot: 2}, {bamboo: 2}],
        pungs: [{character: 1}]
      }
    )
    assert.equal(hasFan(result.fans, '全小'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  }
}
