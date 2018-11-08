import { strict as assert } from 'assert'
import { getScore, hasFan, countInList } from './utils'

export default {
  箭刻() {
    let result = getScore(
      {characters: '12345678', honors: '东东'},
      {character: 9},
      {pungs: [{honor: '中'}]}
    )
    assert.equal(hasFan(result.fans, '箭刻'), true)
  },
  圈风刻() {
    let result1 = getScore(
      {characters: '12345678', honors: '中中'},
      {character: 9},
      {
        pungs: [{honor: '东'}],
        winds: ['东', '南']
      }
    )
    assert.equal(hasFan(result1.fans, '圈风刻'), true)
    let result2 = getScore(
      {characters: '12345678', honors: '中中'},
      {character: 9},
      {
        pungs: [{honor: '东'}],
        winds: ['东', '东']
      }
    )
    assert.equal(hasFan(result2.fans, '圈风刻'), true)
    assert.equal(hasFan(result2.fans, '门风刻'), true)
  },
  门风刻() {
    let result = getScore(
      {characters: '12345678', honors: '中中'},
      {character: 9},
      {
        pungs: [{honor: '南'}],
        winds: ['东', '南']
      }
    )
    assert.equal(hasFan(result.fans, '门风刻'), true)
  },
  门前清() {
    let result = getScore(
      {dots: '123', bamboo: '234777', honors: '北'},
      {honor: '北'},
      {concealedKongs: [{character: 8}]}
    )
    assert.equal(hasFan(result.fans, '门前清'), true)
  },
  平和() {
    let result = getScore(
      {characters: '3477', dots: '456'},
      {character: 5},
      {chows: [{character: 3}, {bamboo: 8}]}
    )
    assert.equal(hasFan(result.fans, '平和'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  },
  四归一() {
    let result1 = getScore(
      {characters: '11123', dots: '55'},
      {character: 1},
      {exposedKongs: [{bamboo: 4}, {honor: '中'}]}
    )
    assert.equal(countInList(result1.fans, '四归一'), 1)
    let result2 = getScore(
      {characters: '4'},
      {character: 4},
      {
        chows: [{character: 2}],
        pungs: [{character: 1}, {character: 2}, {character: 3}],
      }
    )
    assert.equal(countInList(result2.fans, '四归一'), 3)
    let result3 = getScore(
      {characters: '1111999', dots: '1199', bamboo: '11'},
      {character: 9}
    )
    assert.equal(countInList(result3.fans, '四归一'), 2)
  },
  双同刻() {
    let result = getScore(
      {characters: '44', dots: '55', bamboo: '666'},
      {character: 4},
      {
        pungs: [{character: 6}],
        exposedKongs: [{dot: 4}]
      }
    )
    assert.equal(countInList(result.fans, '双同刻'), 2)
  },
  双暗刻() {
    let result = getScore(
      {characters: '44', dots: '55', bamboo: '666'},
      {character: 4},
      {
        pungs: [{character: 6}],
        concealedKongs: [{dot: 4}]
      }
    )
    assert.equal(hasFan(result.fans, '双暗刻'), true)
  },
  暗杠() {
    let result1 = getScore(
      {characters: '44', dots: '55', bamboo: '666'},
      {character: 4},
      {
        pungs: [{character: 6}],
        concealedKongs: [{dot: 4}]
      }
    )
    assert.equal(hasFan(result1.fans, '暗杠'), true)
    assert.equal(hasFan(result1.fans, '明杠'), false)
    let result2 = getScore(
      {characters: '44', dots: '55'},
      {character: 4},
      {
        pungs: [{character: 6}],
        exposedKongs: [{bamboo: 6}],
        concealedKongs: [{dot: 4}]
      }
    )
    assert.equal(hasFan(result2.fans, '暗杠'), false)
  },
  断幺() {
    let result = getScore(
      {characters: '3477', dots: '456'},
      {character: 5},
      {chows: [{character: 3}, {bamboo: 7}]}
    )
    assert.equal(hasFan(result.fans, '断幺'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  }
}
