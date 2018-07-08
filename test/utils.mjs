import MahjongHand from '../lib/mahjong-hand'
import { Chow, ExposedPung, ExposedKong, ConcealedKong } from '../lib/meld'

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

export function getScore(
  { characters = '', dots = '', bamboo = '', honors = '' },
  waitTile,
  {
    winds = ['东', '东'],
    chows = [], pungs = [], exposedKongs = [], concealedKongs = [], flowers = 0,
    isSelfDrawn = false, isFourthTile = false, isKong = false, isLastTile = false
  } = {}
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
  let prevalentWind = honorMapping[winds[0]]
  let seatWind = honorMapping[winds[1]]
  chows = chows.map(tile => new Chow(parseTile(tile)))
  pungs = pungs.map(tile => new ExposedPung(parseTile(tile)))
  exposedKongs = exposedKongs.map(tile => new ExposedKong(parseTile(tile)))
  concealedKongs = concealedKongs.map(tile => new ConcealedKong(parseTile(tile)))
  let hand = new MahjongHand({
    tiles,
    chows, pungs, exposedKongs, concealedKongs, flowers, waitTile,
    prevalentWind, seatWind,
    isSelfDrawn, isFourthTile, isKong, isLastTile
  })
  return hand.getScore()
}

export function hasFan(list, fan) {
  return list.map(item => item.name).includes(fan)
}

export function countInList(list, ...items) {
  return list.map(item => item.name).filter(x => items.includes(x)).length
}
