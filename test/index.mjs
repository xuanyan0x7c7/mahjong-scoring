import assert from 'assert'
import MahjongHand from "../lib/mahjong-hand"
import { Chow, ExposedPung, ExposedKong, ConcealedKong } from "../lib/meld.mjs"

const honorMapping = {
  '东': 27,
  '東': 27,
  '南': 28,
  '西': 29,
  '北': 30,
  '中': 31,
  '发': 32,
  '發': 32,
  '白': 33
}

function parseTile(tile) {
  if ('character' in tile) {
    return tile.character - 1
  } else if ('dot' in tile) {
    return tile.dot + 8
  } else if ('bamboo' in tile) {
    return tile.bamboo + 17
  } else if ('honor' in tile) {
    return honorMapping[tile.honor]
  }
}

function getScore(
  { characters = '', dots = '', bamboo = '', honors = '' },
  waitTile,
  winds,
  { chows = [], pungs = [], exposedKongs = [], concealedKongs = [], flowers = 0 },
  { isSelfDrawn = false, isFourthTile = false, isKong = false, isLastTile = false }
) {
  let tiles = []
  for (let number of characters) {
    tiles.push(Number(number) - 1)
  }
  for (let number of dots) {
    tiles.push(Number(number) + 8)
  }
  for (let number of bamboo) {
    tiles.push(Number(number) + 17)
  }
  for (let c of honors) {
    tiles.push(honorMapping[c])
  }

  waitTile = parseTile(waitTile)
  let prevalentWind = honorMapping[winds[0]] - 27
  let seatWind = honorMapping[winds[1]] - 27
  chows = chows.map(tile => new Chow(parseTile(tile)))
  pungs = pungs.map(tile => new ExposedPung(parseTile(tile)))
  exposedKongs = exposedKongs.map(tile => new ExposedKong(parseTile(tile)))
  concealedKongs = concealedKongs.map(tile => new ConcealedKong(parseTile(tile)))
  let hand = new MahjongHand({
    tiles,
    chows, pungs, exposedKongs, concealedKongs, flowers, waitTile,
    prevalentWind, seatWind
  })
  return hand.getScore({isSelfDrawn, isFourthTile, isKong, isLastTile})
}

describe('Fan', function() {
  describe('88', function() {
    it('大四喜', function() {
      let result = getScore(
        {honors: '南南南西西西北北', dots: '22'},
        {honor: '北'},
        ['东', '东'],
        {pungs: [{honor: '东'}]},
        {}
      )
      assert.equal(result.fans.includes('大四喜'), true)
      assert.equal(result.score >= 94, true)
      assert.equal(result.fans.includes('三风刻'), false)
      assert.equal(result.fans.includes('碰碰和'), false)
      assert.equal(result.fans.includes('圈风刻'), false)
      assert.equal(result.fans.includes('门风刻'), false)
      assert.equal(result.fans.includes('幺九刻'), false)
    })
    it('大三元', function() {
      let result = getScore(
        {honors: '中中中发发发白白', dots: '55'},
        {honor: '白'},
        ['东', '东'],
        {chows: [{character: 2}]},
        {}
      )
      assert.equal(result.fans.includes('大三元'), true)
      assert.equal(result.score >= 89, true)
    })
    it('绿一色', function() {
      let result = getScore(
        {honors: '发发', bamboo: '23666888'},
        {bamboo: 4},
        ['东', '东'],
        {chows: [{bamboo: 3}]},
        {}
      )
      assert.equal(result.fans.includes('绿一色'), true)
      assert.equal(result.score >= 95, true)
    })
    it('九莲宝灯', function() {
      let result = getScore(
        {bamboo: '1112345678999'},
        {bamboo: 5},
        ['东', '东'],
        {},
        {}
      )
      assert.equal(result.fans.includes('九莲宝灯'), true)
      assert.equal(result.score >= 88, true)
      assert.equal(result.fans.includes('幺九刻'), false)
      assert.equal(result.fans.includes('清一色'), false)
      assert.equal(result.fans.includes('门前清'), false)
      assert.equal(result.fans.includes('无字'), false)
    })
    it('四杠', function() {
      let result = getScore(
        {honors: '发'},
        {honor: '发'},
        ['东', '东'],
        {exposedKongs: [{bamboo: 2}, {bamboo: 3}, {dot: 5}, {character: 7}]},
        {isSelfDrawn: true}
      )
      assert.equal(result.fans.includes('四杠'), true)
      assert.equal(result.score >= 89, true)
      assert.equal(result.fans.includes('碰碰和'), false)
      assert.equal(result.fans.includes('单调将'), false)
    })
    it('连七对', function() {
      let result = getScore(
        {bamboo: '1122334456677'},
        {bamboo: 5},
        ['东', '东'],
        {},
        {}
      )
      assert.equal(result.fans.includes('连七对'), true)
      assert.equal(result.score >= 88, true)
      assert.equal(result.fans.includes('七对'), false)
      assert.equal(result.fans.includes('清一色'), false)
      assert.equal(result.fans.includes('门前清'), false)
      assert.equal(result.fans.includes('无字'), false)
      assert.equal(result.fans.includes('单调将'), false)
    })
    it('十三幺', function() {
      let result = getScore(
        {bamboo: '19', dots: '19', characters: '19', honors: '东南西北中发白'},
        {bamboo: 1},
        ['东', '东'],
        {},
        {}
      )
      assert.equal(result.fans.includes('十三幺'), true)
      assert.equal(result.score >= 88, true)
      assert.equal(result.fans.includes('混幺九'), false)
    })
  })
})
