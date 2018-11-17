import { strict as assert } from 'assert'
import { getScore, hasFan, countInList } from './utils'

export default {
  '一般高/喜相逢/连六/老少副'() {
    let result1 = getScore('22334m56788p', '4m', {chows: ['567p']})
    assert.equal(countInList(result1.fans, '一般高'), 2)
    let result2 = getScore('23678m23455p', '4m', {chows: ['678s']})
    assert.equal(countInList(result2.fans, '喜相逢'), 2)
    let result3 = getScore('23567m34567899p', '4m')
    assert.equal(countInList(result3.fans, '连六'), 2)
    let result4 = getScore('1234789m234p567s', '4m')
    assert.equal(countInList(result4.fans, '老少副'), 1)
    let result5 = getScore('1122334m123p567s', '4m')
    assert.equal(countInList(result5.fans, '一般高'), 1)
    assert.equal(countInList(result5.fans, '喜相逢'), 1)
    let result6 = getScore('1122334m123p', '4m', {chows: ['123p']})
    assert.equal(countInList(result6.fans, '一般高',  '喜相逢'), 3)
    let result7 = getScore('1122334m123p', '4m', {chows: ['123m']})
    assert.equal(countInList(result7.fans, '喜相逢'), 1)
    assert.equal(hasFan(result7.fans, '一色三同顺'), true)
    let result8 = getScore('11223356789m11p', '4m')
    assert.equal(countInList(result8.fans, '一般高', '连六', '老少副'), 1)
    assert.equal(hasFan(result8.fans, '清龙'), true)
    let result9 = getScore('12789m11456p789s', '3m')
    assert.equal(countInList(result9.fans, '喜相逢', '老少副'), 1)
    assert.equal(hasFan(result9.fans, '花龙'), true)
    let result10 = getScore('11223m11123p123s', '3m')
    assert.equal(countInList(result10.fans, '一般高', '喜相逢'), 1)
    assert.equal(hasFan(result10.fans, '三色三同顺'), true)
    let result11 = getScore('1234789m123p789s', '4m')
    assert.equal(countInList(result11.fans, '喜相逢'), 2)
    assert.equal(countInList(result11.fans, '老少副'), 1)
  },
  幺九刻() {
    let result = getScore('111m23p99s', '4p', {pungs: ['111z', '333z'], winds: [1, 2]})
    assert.equal(countInList(result.fans, '幺九刻'), 2)
  },
  明杠() {
    let result = getScore('44m55p666s', '4m', {pungs: ['666m'], exposedKongs: ['4444p']})
    assert.equal(hasFan(result.fans, '明杠'), true)
  },
  缺一门() {
    let result = getScore('3477m456p', '5m', {chows: ['234m', '678p']})
    assert.equal(hasFan(result.fans, '缺一门'), true)
  },
  无字() {
    let result = getScore('3477m444p', '5m', {chows: ['234m', '789s']})
    assert.equal(hasFan(result.fans, '无字'), true)
  },
  '边张/坎张/单钓将'() {
    let result1 = getScore('12m99p', '3m', {chows: ['234p', '456s', '567s']})
    assert.equal(hasFan(result1.fans, '边张'), true)
    let result2 = getScore('24m99p', '3m', {chows: ['345p', '456s', '567s']})
    assert.equal(hasFan(result2.fans, '坎张'), true)
    let result3 = getScore('123m9p', '9p', {chows: ['345p', '456s', '567s']})
    assert.equal(hasFan(result3.fans, '单钓将'), true)
    let result4 = getScore('1233m', '3m', {chows: ['345p', '456s', '567s']})
    assert.equal(countInList(result4.fans, '边张', '单钓将'), 1)
    let result5 = getScore('2334m', '3m', {chows: ['345p', '456s', '567s']})
    assert.equal(countInList(result5.fans, '坎张', '单钓将'), 1)
    let result6 = getScore('12234m99p', '3m', {chows: ['345p', '456s']})
    assert.equal(countInList(result6.fans, '边张', '坎张'), 1)
    let result7 = getScore('147m245568p3679s', '7s')
    assert.equal(hasFan(result7.fans, '单钓将'), true)
    let result8 = getScore('147m24568p36779s', '5p')
    assert.equal(hasFan(result8.fans, '坎张'), false)
    let result9 = getScore('147m245568p3677s', '9s')
    assert.equal(hasFan(result9.fans, '单钓将'), false)
    let result10 = getScore('11m19p19s1234567z', '9m')
    assert.equal(hasFan(result10.fans, '单钓将'), false)
    let result11 = getScore('1112m', '3m', {chows: ['345p', '456s', '567s']})
    assert.equal(hasFan(result11.fans, '边张'), false)
    let result12 = getScore('1112m', '2m', {chows: ['345p', '456s', '567s']})
    assert.equal(hasFan(result12.fans, '单钓将'), false)
    let result13 = getScore('5777m', '6m', {chows: ['345p', '456s', '567s']})
    assert.equal(hasFan(result13.fans, '坎张'), false)
    let result14 = getScore('1111222m', '3m', {chows: ['345p', '456s']})
    assert.equal(hasFan(result14.fans, '边张'), false)
  },
  自摸() {
    let result = getScore('3477m456p', '5m', {chows: ['234m', '678s'], isSelfDrawn: true})
    assert.equal(hasFan(result.fans, '自摸'), true)
  },
  花牌() {
    let result1 = getScore('3477m456p', '5m', {chows: ['234m', '567s'], flowers: 2})
    assert.equal(countInList(result1.fans, '花牌'), 2)
    let result2 = getScore('3477m456p', '5m', {chows: ['234m', '678s'], flowers: 2})
    assert.equal(hasFan(result2.fans, '花牌'), false)
  }
}
