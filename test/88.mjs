import { strict as assert } from 'assert'
import { getScore, hasFan, countInList } from './utils'

export default {
  大四喜() {
    let result = getScore('22s22233344z', '4z', {pungs: ['111z']})
    assert.equal(hasFan(result.fans, '大四喜'), true)
    assert.equal(hasFan(result.fans, '三风刻'), false)
    assert.equal(hasFan(result.fans, '碰碰和'), false)
    assert.equal(hasFan(result.fans, '圈风刻'), false)
    assert.equal(hasFan(result.fans, '门风刻'), false)
    assert.equal(hasFan(result.fans, '幺九刻'), false)
  },
  大三元() {
    let result = getScore('55p55566677z', '7z', {chows: ['123m']})
    assert.equal(hasFan(result.fans, '大三元'), true)
  },
  绿一色() {
    let result = getScore('23666888s66z', '4s', {chows: ['234s']})
    assert.equal(hasFan(result.fans, '绿一色'), true)
    assert.equal(hasFan(result.fans, '混一色'), false)
  },
  九莲宝灯() {
    let result1 = getScore('1112345678999s', '5s')
    assert.equal(hasFan(result1.fans, '九莲宝灯'), true)
    assert.equal(hasFan(result1.fans, '清一色'), false)
    assert.equal(hasFan(result1.fans, '门前清'), false)
    assert.equal(countInList(result1.fans, '幺九刻'), 1)
    assert.equal(hasFan(result1.fans, '无字'), false)
    let result2 = getScore('1112345678999s', '6s', {isSelfDrawn: true})
    assert.equal(hasFan(result2.fans, '九莲宝灯'), true)
    assert.equal(hasFan(result2.fans, '不求人'), false)
    assert.equal(hasFan(result2.fans, '幺九刻'), false)
    assert.equal(hasFan(result2.fans, '自摸'), true)
    let result3 = getScore('1112234567899s', '9s')
    assert.equal(hasFan(result3.fans, '九莲宝灯'), false)
  },
  四杠() {
    let result = getScore('6z', '6z', {
      exposedKongs: ['2222z', '3333z', '5555p', '7777m'],
      isSelfDrawn: true
    })
    assert.equal(hasFan(result.fans, '四杠'), true)
    assert.equal(hasFan(result.fans, '碰碰和'), false)
    assert.equal(hasFan(result.fans, '单钓将'), false)
  },
  连七对() {
    let result1 = getScore('1122334456677s', '5s')
    assert.equal(hasFan(result1.fans, '连七对'), true)
    assert.equal(hasFan(result1.fans, '七对'), false)
    assert.equal(hasFan(result1.fans, '清一色'), false)
    assert.equal(hasFan(result1.fans, '门前清'), false)
    assert.equal(hasFan(result1.fans, '无字'), false)
    assert.equal(hasFan(result1.fans, '单钓将'), false)
    let result2 = getScore('2233445667788s', '5s', {isSelfDrawn: true})
    assert.equal(hasFan(result2.fans, '连七对'), true)
    assert.equal(hasFan(result2.fans, '不求人'), false)
    assert.equal(hasFan(result2.fans, '断幺'), true)
    assert.equal(hasFan(result2.fans, '自摸'), true)
  },
  十三幺() {
    let result1 = getScore('19m19p11s1234567z', '9s')
    assert.equal(hasFan(result1.fans, '十三幺'), true)
    assert.equal(hasFan(result1.fans, '混幺九'), false)
    assert.equal(hasFan(result1.fans, '门前清'), false)
    assert.equal(hasFan(result1.fans, '单钓将'), false)
    let result2 = getScore('19m19p11s1234567z', '9s', {isSelfDrawn: true})
    assert.equal(hasFan(result2.fans, '十三幺'), true)
    assert.equal(hasFan(result2.fans, '不求人'), false)
    assert.equal(hasFan(result2.fans, '自摸'), true)
  }
}
