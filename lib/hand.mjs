import { Chow, ExposedKong, ExposedPung, ConcealedKong } from './meld'
import { tilesList } from './utils.mjs'

export default class Hand {
  constructor(
    tiles = [],
    { prevalentWind, seatWind },
    { chows = [], pungs = [], exposedKongs = [], concealedKongs = [], flowers = 0, waitTile = null } = {}
  ) {
    this.size = 0
    this.tiles = new Array(34).fill(0)
    for (let tile of tiles) {
      ++this.tiles[tile]
      ++this.size
    }
    this.prevalentWind = prevalentWind
    this.seatWind = seatWind
    this.chows = chows.slice()
    this.pungs = pungs.slice()
    this.exposedKongs = exposedKongs.slice()
    this.concealedKongs = concealedKongs.slice()
    this.flowers = flowers
    this.waitTile = waitTile
    this.fullTiles = this.tiles.slice()
    for (let chow of chows) {
      ++this.fullTiles[chow.middleTile - 1]
      ++this.fullTiles[chow.middleTile]
      ++this.fullTiles[chow.middleTile + 1]
    }
    for (let pung of pungs) {
      this.fullTiles[pung.tile] += 3
    }
    for (let kong of exposedKongs) {
      this.fullTiles[kong.tile] += 4
    }
    for (let kong of concealedKongs) {
      this.fullTiles[kong.tile] += 4
    }
    if (waitTile !== null) {
      ++this.fullTiles[waitTile]
    }
  }

  toString() {
    let buffer = []
    for (let tile = 0; tile < 34; ++tile) {
      buffer.push(tilesList[tile].character.repeat(this.tiles[tile]))
    }
    return buffer.join('')
  }

  insert(tile) {
    ++this.tiles[tile]
    ++this.fullTiles[tile]
  }

  discard(tile) {
    --this.tiles[tile]
    --this.fullTiles[tile]
  }

  chow(tile, direction) {
    switch (direction) {
      case -1:
        --this.tiles[tile + 1]
        --this.tiles[tile + 2]
        break
      case 0:
        --this.tiles[tile - 1]
        --this.tiles[tile + 1]
        break
      case 1:
        --this.tiles[tile - 1]
        --this.tiles[tile - 2]
        break
    }
    ++this.fullTiles[tile]
    this.chows.push(new Chow(tile - direction))
  }

  pung(tile) {
    this.tiles[tile] -= 2
    ++this.fullTiles[tile]
    this.pungs.push(new ExposedPung(tile))
  }

  kong(tile) {
    this.tiles[tile] -= 3
    ++this.fullTiles[tile]
    this.kongs.push(new ExposedKong(tile))
  }

  addKong(tile) {
    --this.tiles[tile]
    this.kongs.push(new ExposedKong(tile))
  }

  concealKong(tile) {
    this.tiles[tile] -= 4
    this.kongs.push(new ConcealedKong(tile))
  }

  flower() {
    ++this.flowers
  }
}
