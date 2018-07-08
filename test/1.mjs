import { strict as assert } from 'assert'
import { getScore, hasFan, countInList } from './utils'

export default {
  '一般高/喜相逢/连六/老少副'() {
    let result1 = getScore(
      {characters: '22334', dots: '56788'},
      {character: 4},
      {chows: [{dot: 6}]}
    )
    assert.equal(countInList(result1.fans, '一般高'), 2)
    let result2 = getScore(
      {characters: '23678', dots: '23455'},
      {character: 4},
      {chows: [{bamboo: 7}]}
    )
    assert.equal(countInList(result2.fans, '喜相逢'), 2)
    let result3 = getScore(
      {characters: '23567', dots: '34567899'},
      {character: 4}
    )
    assert.equal(countInList(result3.fans, '连六'), 2)
    let result4 = getScore(
      {characters: '1234789', dots: '234', bamboo: '567'},
      {character: 4}
    )
    assert.equal(countInList(result4.fans, '老少副'), 1)
    let result5 = getScore(
      {characters: '1122334', dots: '123', bamboo: '567'},
      {character: 4}
    )
    assert.equal(countInList(result5.fans, '一般高'), 1)
    assert.equal(countInList(result5.fans, '喜相逢'), 1)
    let result6 = getScore(
      {characters: '1122334', dots: '123'},
      {character: 4},
      {chows: [{dot: 2}]}
    )
    assert.equal(countInList(result6.fans, '一般高',  '喜相逢'), 3)
    let result7 = getScore(
      {characters: '1122334', dots: '123'},
      {character: 4},
      {chows: [{character: 2}]}
    )
    assert.equal(countInList(result7.fans, '喜相逢'), 1)
    assert.equal(hasFan(result7.fans, '一色三同顺'), true)
    let result8 = getScore(
      {characters: '11223356789', dots: '11'},
      {character: 4}
    )
    assert.equal(countInList(result8.fans, '一般高', '连六', '老少副'), 1)
    assert.equal(hasFan(result8.fans, '清龙'), true)
    let result9 = getScore(
      {characters: '12789', dots: '11456', bamboo: '789'},
      {character: 3}
    )
    assert.equal(countInList(result9.fans, '喜相逢', '老少副'), 1)
    assert.equal(hasFan(result9.fans, '花龙'), true)
    let result10 = getScore(
      {characters: '11223', dots: '11123', bamboo: '123'},
      {character: 3}
    )
    assert.equal(countInList(result10.fans, '一般高', '喜相逢'), 1)
    assert.equal(hasFan(result10.fans, '三色三同顺'), true)
    let result11 = getScore(
      {characters: '1234789', dots: '123', bamboo: '789'},
      {character: 4}
    )
    assert.equal(countInList(result11.fans, '喜相逢'), 2)
    assert.equal(countInList(result11.fans, '老少副'), 1)
  },
  幺九刻() {
    let result = getScore(
      {characters: '111', dots: '23', bamboo: '99'},
      {dot: 4},
      {
        pungs: [{honor: '东'}, {honor: '西'}],
        winds: ['东', '南']
      }
    )
    assert.equal(countInList(result.fans, '幺九刻'), 2)
  },
  明杠() {
    let result = getScore(
      {characters: '44', dots: '55', bamboo: '666'},
      {character: 4},
      {
        pungs: [{character: 6}],
        exposedKongs: [{dot: 4}]
      }
    )
    assert.equal(hasFan(result.fans, '明杠'), true)
  },
  缺一门() {
    let result = getScore(
      {characters: '3477', dots: '456'},
      {character: 5},
      {chows: [{character: 3}, {dot: 7}]}
    )
    assert.equal(hasFan(result.fans, '缺一门'), true)
  },
  无字() {
    let result = getScore(
      {characters: '3477', dots: '444'},
      {character: 5},
      {chows: [{character: 3}, {bamboo: 8}]}
    )
    assert.equal(hasFan(result.fans, '无字'), true)
  },
  '边张/坎张/单调将'() {
    let result1 = getScore(
      {characters: '12', dots: '99'},
      {character: 3},
      {chows: [{dot: 4}, {bamboo: 5}, {bamboo: 6}]}
    )
    assert.equal(hasFan(result1.fans, '边张'), true)
    let result2 = getScore(
      {characters: '24', dots: '99'},
      {character: 3},
      {chows: [{dot: 4}, {bamboo: 5}, {bamboo: 6}]}
    )
    assert.equal(hasFan(result2.fans, '坎张'), true)
    let result3 = getScore(
      {characters: '123', dots: '9'},
      {dot: 9},
      {chows: [{dot: 4}, {bamboo: 5}, {bamboo: 6}]}
    )
    assert.equal(hasFan(result3.fans, '单调将'), true)
    let result4 = getScore(
      {characters: '1233'},
      {character: 3},
      {chows: [{dot: 4}, {bamboo: 5}, {bamboo: 6}]}
    )
    assert.equal(countInList(result4.fans, '边张', '单调将'), 1)
    let result5 = getScore(
      {characters: '2334'},
      {character: 3},
      {chows: [{dot: 4}, {bamboo: 5}, {bamboo: 6}]}
    )
    assert.equal(countInList(result5.fans, '坎张', '单调将'), 1)
    let result6 = getScore(
      {characters: '12234', dots: '99'},
      {character: 3},
      {chows: [{dot: 4}, {bamboo: 5}]}
    )
    assert.equal(countInList(result6.fans, '边张', '坎张'), 1)
    let result7 = getScore(
      {characters: '147', dots: '245568', bamboo: '3679'},
      {bamboo: 7}
    )
    assert.equal(hasFan(result7.fans, '单调将'), true)
    let result8 = getScore(
      {characters: '147', dots: '24568', bamboo: '36779'},
      {dot: 5}
    )
    assert.equal(hasFan(result8.fans, '坎张'), false)
    let result9 = getScore(
      {characters: '147', dots: '245568', bamboo: '3677'},
      {bamboo: 9}
    )
    assert.equal(hasFan(result9.fans, '单调将'), false)
    let result10 = getScore(
      {characters: '11', dots: '19', bamboo: '19', honors: '东南西北中发白'},
      {character: 9}
    )
    assert.equal(hasFan(result10.fans, '单调将'), false)
    let result11 = getScore(
      {characters: '1112'},
      {character: 3},
      {chows: [{dot: 4}, {bamboo: 5}, {bamboo: 6}]}
    )
    assert.equal(hasFan(result11.fans, '边张'), false)
    let result12 = getScore(
      {characters: '1112'},
      {character: 2},
      {chows: [{dot: 4}, {bamboo: 5}, {bamboo: 6}]}
    )
    assert.equal(hasFan(result12.fans, '单调将'), false)
    let result13 = getScore(
      {characters: '5777'},
      {character: 6},
      {chows: [{dot: 4}, {bamboo: 5}, {bamboo: 6}]}
    )
    assert.equal(hasFan(result13.fans, '坎张'), false)
    let result14 = getScore(
      {characters: '1111222'},
      {character: 3},
      {chows: [{dot: 4}, {bamboo: 5}]}
    )
    assert.equal(hasFan(result14.fans, '边张'), false)
  },
  自摸() {
    let result = getScore(
      {characters: '3477', dots: '456'},
      {character: 5},
      {
        chows: [{character: 3}, {bamboo: 7}],
        isSelfDrawn: true
      }
    )
    assert.equal(hasFan(result.fans, '自摸'), true)
  },
  花牌() {
    let result1 = getScore(
      {characters: '3477', dots: '456'},
      {character: 5},
      {
        chows: [{character: 3}, {bamboo: 6}],
        flowers: 2
      }
    )
    assert.equal(countInList(result1.fans, '花牌'), 2)
    let result2 = getScore(
      {characters: '3477', dots: '456'},
      {character: 5},
      {
        chows: [{character: 3}, {bamboo: 7}],
        flowers: 2
      }
    )
    assert.equal(hasFan(result2.fans, '花牌'), false)
  }
}
