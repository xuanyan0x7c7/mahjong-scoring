import { strict as assert } from 'assert'
import { getScore, hasFan, countInList } from './utils'

export default {
  箭刻() {
    let result = getScore('12345678m11z', '9m', {pungs: ['555z']})
    assert.equal(hasFan(result.fans, '箭刻'), true)
  },
  圈风刻() {
    let result1 = getScore('12345678m55z', '9m', {pungs: ['111z'], winds: [1, 2]})
    assert.equal(hasFan(result1.fans, '圈风刻'), true)
    let result2 = getScore('12345678m55z', '9m', {pungs: ['111z'], winds: [1, 1]})
    assert.equal(hasFan(result2.fans, '圈风刻'), true)
    assert.equal(hasFan(result2.fans, '门风刻'), true)
  },
  门风刻() {
    let result = getScore('12345678m55z', '9m', {pungs: ['222z'], winds: [1, 2]})
    assert.equal(hasFan(result.fans, '门风刻'), true)
  },
  门前清() {
    let result = getScore('123p234777s4z', '4z', {concealedKongs: ['8888m']})
    assert.equal(hasFan(result.fans, '门前清'), true)
  },
  平和() {
    let result = getScore('3477m456p', '5m', {chows: ['234m', '789s']})
    assert.equal(hasFan(result.fans, '平和'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  },
  四归一() {
    let result1 = getScore('11123m55p', '1m', {exposedKongs: ['4444s', '5555z']})
    assert.equal(countInList(result1.fans, '四归一'), 1)
    let result2 = getScore('4m', '4m', {chows: ['123m'], pungs: ['111m', '222m', '333m']})
    assert.equal(countInList(result2.fans, '四归一'), 3)
    let result3 = getScore('1111999m1199p11s', '9m')
    assert.equal(countInList(result3.fans, '四归一'), 2)
  },
  双同刻() {
    let result = getScore('44m55p666s', '4m', {pungs: ['666m'], exposedKongs: ['4444p']})
    assert.equal(countInList(result.fans, '双同刻'), 2)
  },
  双暗刻() {
    let result = getScore('44m55p666s', '4m', {pungs: ['666m'], concealedKongs: ['4444p']})
    assert.equal(hasFan(result.fans, '双暗刻'), true)
  },
  暗杠() {
    let result1 = getScore('44m55p666s', '4m', {pungs: ['666m'], concealedKongs: ['4444p']})
    assert.equal(hasFan(result1.fans, '暗杠'), true)
    assert.equal(hasFan(result1.fans, '明杠'), false)
    let result2 = getScore('44m55p', '4m', {
      pungs: ['666m'],
      exposedKongs: ['6666s'],
      concealedKongs: ['4444p']
    })
    assert.equal(hasFan(result2.fans, '暗杠'), false)
  },
  断幺() {
    let result = getScore('3477m456p', '5m', {chows: ['234m', '678s']})
    assert.equal(hasFan(result.fans, '断幺'), true)
    assert.equal(hasFan(result.fans, '无字'), false)
  }
}
