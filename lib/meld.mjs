import util from 'util'
import { tilesList, tilesMap } from './utils.mjs'

export default class Meld {
  constructor(tiles) {
    this.tiles = new Array(34).fill(0)
    for (let tile of tiles) {
      ++this.tiles[tile]
    }
  }

  get type() {}

  [util.inspect.custom]() {
    let buffer = []
    for (let tile = 0; tile < this.tiles.length; ++tile) {
      buffer.push(tilesList[tile].character.repeat(this.tiles[tile]))
    }
    return buffer.join('')
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
    for (let tile of voids) {
      --this.tiles[tile]
    }
  }

  get type() {
    return Meld.FULLY_KNITTED
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