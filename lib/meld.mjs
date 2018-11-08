import { tilesList, tilesMap, knittedList } from './utils'

export default class Meld {
  constructor(tiles) {
    this.tiles = tiles
  }

  get type() {
    throw 'Not Implemented'
  }

  toString() {
    let buffer = []
    for (let tile of tiles) {
      buffer.push(tilesList[tile].character)
    }
    return buffer.join('')
  }

  isPair() {
    return this.type === Meld.PAIR
  }

  isChow() {
    return [Meld.CHOW, Meld.KNITTED].includes(this.type)
  }

  isPung() {
    return [
      Meld.EXPOSED_PUNG, Meld.CONCEALED_PUNG, Meld.EXPOSED_KONG, Meld.CONCEALED_KONG
    ].includes(this.type)
  }

  isKong() {
    return [Meld.EXPOSED_KONG, Meld.CONCEALED_KONG].includes(this.type)
  }

  isConcealedPung() {
    return [Meld.CONCEALED_PUNG, Meld.CONCEALED_KONG].includes(this.type)
  }

  isFullyKnitted() {
    return this.type === Meld.FULLY_KNITTED
  }

  isThirteenOrphans() {
    return this.type === Meld.THIRTEEN_ORPHANS
  }
}

Object.assign(Meld, {
  PAIR: 0,
  CHOW: 1,
  EXPOSED_PUNG: 2,
  CONCEALED_PUNG: 3,
  EXPOSED_KONG: 4,
  CONCEALED_KONG: 5,
  KNITTED: 6,
  FULLY_KNITTED: 7,
  THIRTEEN_ORPHANS: 8
})


export class Pair extends Meld {
  constructor(tile) {
    super([tile, tile])
    this.tile = tile
  }

  get type() {
    return Meld.PAIR
  }
}


export class Chow extends Meld {
  constructor(middleTile) {
    super([middleTile - 1, middleTile, middleTile + 1])
    this.middleTile = middleTile
  }

  get type() {
    return Meld.CHOW
  }
}


class Pung extends Meld {
  constructor(tile) {
    super([tile, tile, tile])
    this.tile = tile
  }
}

export class ExposedPung extends Pung {
  get type() {
    return Meld.EXPOSED_PUNG
  }
}

export class ConcealedPung extends Pung {
  get type() {
    return Meld.CONCEALED_PUNG
  }
}


class Kong extends Meld {
  constructor(tile) {
    super([tile, tile, tile, tile])
    this.tile = tile
  }
}

export class ExposedKong extends Kong {
  get type() {
    return Meld.EXPOSED_KONG
  }
}

export class ConcealedKong extends Kong {
  get type() {
    return Meld.CONCEALED_KONG
  }
}


export class Knitted extends Meld {
  constructor(offset) {
    super([
      tilesMap.ONE_CHARACTER + offset[0],
      tilesMap.ONE_CHARACTER + offset[0] + 3,
      tilesMap.ONE_CHARACTER + offset[0] + 6,
      tilesMap.ONE_DOT + offset[1],
      tilesMap.ONE_DOT + offset[1] + 3,
      tilesMap.ONE_DOT + offset[1] + 6,
      tilesMap.ONE_BAMBOO + offset[2],
      tilesMap.ONE_BAMBOO + offset[2] + 3,
      tilesMap.ONE_BAMBOO + offset[2] + 6
    ])
    this.offset = offset
  }

  get type() {
    return Meld.KNITTED
  }

  static getKnittedOffset(tiles) {
    const offsetTable = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]
    for (let i = 0; i < 6; ++i) {
      if (knittedList[i].every(tile => tiles[tile] > 0)) {
        return offsetTable[i]
      }
    }
  }
}

export class FullyKnitted extends Meld {
  constructor(offset, voids) {
    super([
      tilesMap.ONE_CHARACTER + offset[0],
      tilesMap.ONE_CHARACTER + offset[0] + 3,
      tilesMap.ONE_CHARACTER + offset[0] + 6,
      tilesMap.ONE_DOT + offset[1],
      tilesMap.ONE_DOT + offset[1] + 3,
      tilesMap.ONE_DOT + offset[1] + 6,
      tilesMap.ONE_BAMBOO + offset[2],
      tilesMap.ONE_BAMBOO + offset[2] + 3,
      tilesMap.ONE_BAMBOO + offset[2] + 6,
      tilesMap.EAST_WIND, tilesMap.SOUTH_WIND, tilesMap.WEST_WIND, tilesMap.NORTH_WIND,
      tilesMap.RED_DRAGON, tilesMap.GREEN_DRAGON, tilesMap.WHITE_DRAGON
    ])
    this.offset = offset
    this.voids = voids
    this.tiles = this.tiles.filter(tile => !voids.includes(tile))
  }

  get type() {
    return Meld.FULLY_KNITTED
  }

  static getFullyKnittedParams(tiles) {
    const offsetTable = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]
    const knittedMask = [0o421, 0o241, 0o412, 0o142, 0o214, 0o124]
    for (let count of tiles) {
      if (count > 1) {
        return false
      }
    }
    let mask = 0
    for (let suit = 0; suit < 3; ++suit) {
      for (let number = 1; number <= 9; ++number) {
        mask |= tiles[suit * 9 + number - 1] << (suit * 3 + (number - 1) % 3)
      }
    }
    let knittedIndex = knittedMask.indexOf(mask)
    let voids = []
    for (let tile of knittedList[knittedIndex]) {
      if (tiles[tile] === 0) {
        voids.push(tile)
      }
    }
    for (let index = 27; index < 34; ++index) {
      if (tiles[index] === 0) {
        voids.push(index)
      }
    }
    return { offset: offsetTable[knittedIndex], voids }
  }
}


export class ThirteenOrphans extends Meld {
  constructor(pair) {
    super([
      tilesMap.ONE_CHARACTER, tilesMap.NINE_CHARACTERS,
      tilesMap.ONE_DOT, tilesMap.NINE_DOTS,
      tilesMap.ONE_BAMBOO, tilesMap.NINE_BAMBOO,
      tilesMap.EAST_WIND, tilesMap.SOUTH_WIND, tilesMap.WEST_WIND, tilesMap.NORTH_WIND,
      tilesMap.RED_DRAGON, tilesMap.GREEN_DRAGON, tilesMap.WHITE_DRAGON,
      pair
    ])
    this.pair = pair
  }

  get type() {
    return Meld.THIRTEEN_ORPHANS
  }
}
