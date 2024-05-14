import { strict as assert } from 'assert'
import { getScore, hasFan, countInList } from './utils'

export default {
  清龙() {
    let result = getScore('1234m', '4m', {chows: ['123m', '456m', '789m']})
    assert.equal(hasFan(result.fans, '清龙'), true)
    assert.equal(countInList(result.fans, '一般高', '连六', '老少副'), 1)
  },
  三色双龙会() {
    let result = getScore('13m55p789s', '2m', {chows: ['789m', '123s']})
    assert.equal(hasFan(result.fans, '三色双龙会'), true)
    assert.equal(hasFan(result.fans, '平和'), false)
    assert.equal(hasFan(result.fans, '喜相逢'), false)
    assert.equal(hasFan(result.fans, '老少副'), false)
    assert.equal(hasFan(result.fans, '无字'), false)
  },
  一色三步高() {
    let result1 = getScore('2348m567p', '8m', {chows: ['123m', '345m']})
    assert.equal(hasFan(result1.fans, '一色三步高'), true)
    let result2 = getScore('5678m567p', '8m', {chows: ['123m', '345m']})
    assert.equal(hasFan(result2.fans, '一色三步高'), true)
  },
  全带五() {
    let result = getScore('55m345p57s', '6s', {chows: ['456p'], pungs: ['555s']})
    assert.equal(hasFan(result.fans, '全带五'), true)
    assert.equal(hasFan(result.fans, '断幺'), false)
    assert.equal(hasFan(result.fans, '无字'), false)
  },
  三同刻() {
    let result = getScore('44m444p88s', '4m', {chows: ['567m'], pungs: ['444s']})
    assert.equal(hasFan(result.fans, '三同刻'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  },
  三暗刻() {
    let result = getScore('33456m55888p', '3m', {concealedKongs: ['9999s'], isSelfDrawn: true})
    assert.equal(hasFan(result.fans, '三暗刻'), true)
  }
}
