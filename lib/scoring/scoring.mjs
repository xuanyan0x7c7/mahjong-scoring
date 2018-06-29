import { Pair, Chow, ExposedPung, ConcealedPung, Knitted, FullyKnitted, ThirteenOrphans } from "../meld"

export default class Scoring {
  constructor(
    hand,
    { isSelfDrawn = false, isFourthTile = false, isKong = false, isLastTile = false } = {}
  ) {
    this.hand = hand
    this.isSelfDrawn = isSelfDrawn
    this.isFourthTile = isFourthTile
    this.isKong = isKong
    this.isLastTile = isLastTile
  }

  * getAllCombinations() {
    const Pung = this.isSelfDrawn ? ConcealedPung : ExposedPung
    function* expand(tiles, size, min = 0) {
      let alreadyHasPair = size % 3 !== 2
      let melds = []
      for (let tile = 27; tile < 34; ++tile) {
        if (tiles[tile] === 2) {
          if (alreadyHasPair) {
            return
          }
          alreadyHasPair = true
          tiles[tile] = 0
          size -= 2
          melds.push(new Pair(tile))
        } else if (tiles[tile] === 3) {
          tiles[tile] = 0
          size -= 3
          melds.push(new Pung(tile))
        } else if (tiles[tile] !== 0) {
          return
        }
      }
      while (min < 27 && tiles[min] === 0) {
        ++min
      }
      if (min === 27) {
        yield melds.slice()
        return
      }
      if (!alreadyHasPair) {
        for (let tile = 0; tile < 27; ++tile) {
          if (tiles[tile] >= 2) {
            let newTiles = tiles.slice()
            newTiles[tile] -= 2
            let min = 0
            while (min < 27 && newTiles[min] === 0) {
              ++min
            }
            for (let result of expand(newTiles, size - 2, min)) {
              yield [...result, new Pair(tile), ...melds]
            }
          }
        }
      } else if (tiles[min] === 1) {
        let tile = min
        if (min % 9 >= 7 || tiles[min + 1] === 0 || tiles[min + 2] === 0) {
          return
        }
        let newTiles = tiles.slice()
        newTiles[min] = 0
        --newTiles[min + 1]
        --newTiles[min + 2]
        while (min < 27 && newTiles[min] === 0) {
          ++min
        }
        for (let result of expand(newTiles, size - 3, min)) {
          yield [...result, new Chow(tile + 1), ...melds]
        }
      } else if (tiles[min] === 2) {
        let tile = min
        if (tile % 9 >= 7 || tiles[tile + 1] <= 1 || tiles[tile + 2] <= 1) {
          return
        }
        let newTiles = tiles.slice()
        newTiles[tile] = 0
        newTiles[tile + 1] -= 2
        newTiles[tile + 2] -= 2
        while (min < 27 && newTiles[min] === 0) {
          ++min
        }
        for (let result of expand(newTiles, size - 6, min)) {
          yield [...result, new Chow(tile + 1), new Chow(tile + 1), ...melds]
        }
      } else if (tiles[min] === 3) {
        let tile = min
        let newTiles1 = tiles.slice()
        newTiles1[tile] = 0
        let min1 = min
        while (min1 < 27 && newTiles1[min1] === 0) {
          ++min1
        }
        for (let result of expand(newTiles1, size - 3, min1)) {
          yield [...result, new Pung(tile), ...melds]
        }
        if (tile % 9 >= 7 || tiles[tile + 1] <= 2 || tiles[tile + 2] <= 2) {
          return
        }
        let newTiles2 = tiles.slice()
        newTiles2[tile] = 0
        newTiles2[tile + 1] -= 3
        newTiles2[tile + 2] -= 3
        let min2 = min
        while (min2 < 27 && newTiles2[min2] === 0) {
          ++min2
        }
        for (let result of expand(newTiles2, size - 6, min2)) {
          yield [...result, new Chow(tile + 1), new Chow(tile + 1), new Chow(tile + 1), ...melds]
        }
      } else if (tiles[min] === 4) {
        let tile = min
        if (tile % 9 >= 7 || tiles[tile + 1] === 0 || tiles[tile + 2] === 0) {
          return
        }
        let newTiles1 = tiles.slice()
        newTiles1[tile] = 0
        --newTiles1[tile + 1]
        --newTiles1[tile + 2]
        let min1 = min
        while (min1 < 27 && newTiles1[min1] === 0) {
          ++min1
        }
        for (let result of expand(newTiles1, size - 6, min1)) {
          yield [...result, new ConcealedPung(tile), new Chow(tile + 1), ...melds]
        }
        if (tiles[min + 1] < 4 || tiles[min + 2] < 4) {
          return
        }
        let newTiles2 = tiles.slice()
        newTiles2[tile] = 0
        newTiles2[tile + 1] = 0
        newTiles2[tile + 2] = 0
        let min2 = min
        while (min2 < 27 && newTiles2[min2] === 0) {
          ++min2
        }
        for (let result of expand(newTiles2, size - 12, min2)) {
          yield [...result, new Chow(tile + 1), new Chow(tile + 1), new Chow(tile + 1), new Chow(tile + 1), ...melds]
        }
      }
    }

    if (this.hand.isNormalHand()) {
      let tiles = this.hand.tiles.slice()
      ++tiles[this.hand.waitTile]
      let knittedOffset = Knitted.getKnittedOffset(tiles)
      let knitted = knittedOffset == null ? null : new Knitted(knittedOffset)
      if (knitted) {
        for (let tile = 0; tile < 27; ++tile) {
          tiles[tile] -= knitted.tiles[tile]
        }
      }
      for (let result of expand(tiles, this.hand.size + 1, 0)) {
        if (knitted) {
          result.push(knitted)
        }
        result.push(...this.hand.chows, ...this.hand.pungs, ...this.hand.exposedKongs, ...this.hand.concealedKongs)
        result.sort((x, y) => {
          if (x.isPung() && y.isPung()) {
            return x.tile - y.tile
          }
          if (x.type !== y.type) {
            return x.type - y.type
          } else if (x.isPair()) {
            return x.tile - y.tile
          } else if (x.isChow()) {
            return x.middleTile - y.middleTile
          } else {
            return 0
          }
        })
        yield result
      }
    }

    if (this.hand.isSevenPairs()) {
      let pairs = []
      for (let tile = 0; tile < 34; ++tile) {
        switch (this.hand.fullTiles[tile]) {
          case 4:
            pairs.push(new Pair(tile))
          case 2:
            pairs.push(new Pair(tile))
        }
      }
      yield pairs
    }

    if (this.hand.isFullyKnitted()) {
      let {offset, voids} = FullyKnitted.getFullyKnittedParams(this.hand.fullTiles)
      yield [new FullyKnitted(offset, voids)]
    }

    if (this.hand.isThirteenOrphans()) {
      yield [new ThirteenOrphans(this.hand.fullTiles.indexOf(2))]
    }
  }
}