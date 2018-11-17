import MahjongHand from '../lib/mahjong-hand'
import { Chow, ExposedPung, ExposedKong, ConcealedKong } from '../lib/meld'

const tilesRegex = /^(?:(?<m>[1-9]+)m)?(?:(?<p>[1-9]+)p)?(?:(?<s>[1-9]+)s)?(?:(?<z>[1-7]+)z)?$/

function parseTiles(string) {
  let {m, p, s, z} = string.match(tilesRegex).groups
  return [
    ...(m || '').split('').map(s => Number.parseInt(s) - 1),
    ...(p || '').split('').map(s => Number.parseInt(s) + 8),
    ...(s || '').split('').map(s => Number.parseInt(s) + 17),
    ...(z || '').split('').map(s => Number.parseInt(s) + 26)
  ]
}

export function getScore(
  tiles, waitTile,
  {
    winds = [1, 1],
    chows = [], pungs = [], exposedKongs = [], concealedKongs = [], flowers = 0,
    isSelfDrawn = false, isFourthTile = false, isKong = false, isLastTile = false
  } = {}
) {
  tiles = parseTiles(tiles)
  waitTile = parseTiles(waitTile)[0]
  let prevalentWind = winds[0] + 26
  let seatWind = winds[1] + 26
  chows = chows.map(tile => new Chow(parseTiles(tile)[1]))
  pungs = pungs.map(tile => new ExposedPung(parseTiles(tile)[0]))
  exposedKongs = exposedKongs.map(tile => new ExposedKong(parseTiles(tile)[0]))
  concealedKongs = concealedKongs.map(tile => new ConcealedKong(parseTiles(tile)[0]))
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
