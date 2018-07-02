import Hand from './hand'
import { knittedList, orphans } from './utils'
import { Pair, Chow, ExposedPung, ConcealedPung, Knitted, FullyKnitted, ThirteenOrphans } from './meld'
import Scoring from './scoring/scoring'

export default class MahjongHand extends Hand {
  constructor({
    isSelfDrawn = false, isFourthTile = false, isKong = false, isLastTile = false,
    ...args
  }) {
    super(args)
    this.isSelfDrawn = isSelfDrawn
    this.isFourthTile = isFourthTile
    this.isKong = isKong
    this.isLastTile = isLastTile
  }

  static fromHand(hand) {
    let tiles = []
    for (let index = 0; index < 34; ++index) {
      for (let i = 0; i < hand.tiles[index]; ++i) {
        tiles.push(index)
      }
    }
    return new MahjongHand({...hand, tiles})
  }

  isNormalHand() {
    function isNormalWithoutPair(tiles, min = 0) {
      if (min === 27) {
        return true
      }
      let newTiles = tiles.slice()
      if (tiles[min] === 1) {
        if (min % 9 >= 7 || tiles[min + 1] === 0 || tiles[min + 2] === 0) {
          return false
        }
        newTiles[min] = 0
        --newTiles[min + 1]
        --newTiles[min + 2]
      } else if (tiles[min] === 2) {
        if (min % 9 >= 7 || tiles[min + 1] <= 1 || tiles[min + 2] <= 1) {
          return false
        }
        newTiles[min] = 0
        newTiles[min + 1] -= 2
        newTiles[min + 2] -= 2
      } else if (tiles[min] === 3) {
        newTiles[min] = 0
      } else if (tiles[min] === 4) {
        if (min % 9 >= 7 || tiles[min + 1] === 0 || tiles[min + 2] === 0) {
          return false
        }
        newTiles[min] = 0
        --newTiles[min + 1]
        --newTiles[min + 2]
      } else if (tiles[min] === 5) {
        if (min % 9 >= 7 || tiles[min + 1] <= 2 || tiles[min + 2] <= 2) {
          return false
        }
        newTiles[min] = 0
        newTiles[min + 1] -= 2
        newTiles[min + 2] -= 2
      }
      while (newTiles[min] === 0 && min < 27) {
        ++min
      }
      return isNormalWithoutPair(newTiles, min)
    }

    let tiles = this.tiles.slice()
    ++tiles[this.waitTile]
    let honorPairFound = false
    for (let index = 27; index < 34; ++index) {
      let count = tiles[index]
      if (count === 1 || count === 4 || count === 5) {
        return false
      } else if (count === 2) {
        honorPairFound = true
      }
    }
    if (honorPairFound) {
      return isNormalWithoutPair(tiles.slice(0, 27))
    }
    for (let knittedTiles of knittedList) {
      let found = true
      for (let tile of knittedTiles) {
        if (tiles[tile] === 0) {
          found = false
          break
        }
      }
      if (found) {
        for (let tile of knittedTiles) {
          --tiles[tile]
        }
        break
      }
    }
    for (let tile = 0; tile < 27; ++tile) {
      if (tiles[tile] >= 2) {
        let newTiles = tiles.slice(0, 27)
        newTiles[tile] -= 2
        if (isNormalWithoutPair(newTiles, 0)) {
          return true
        }
      }
    }
    return false
  }

  isSevenPairs() {
    if (this.size !== 13) {
      return false
    }
    for (let tile = 0; tile < 34; ++tile) {
      if (this.tiles[tile] % 2 === 1 && tile !== this.waitTile) {
        return false
      }
    }
    return true
  }

  isFullyKnitted() {
    const knittedMask = [0o421, 0o241, 0o412, 0o142, 0o214, 0o124]
    if (this.size !== 13) {
      return false
    }
    for (let count of this.fullTiles) {
      if (count > 1) {
        return false
      }
    }
    let mask = 0
    for (let suit = 0; suit < 3; ++suit) {
      for (let number = 1; number <= 9; ++number) {
        mask |= this.fullTiles[suit * 9 + number - 1] << (suit * 3 + (number - 1) % 3)
      }
    }
    return knittedMask.includes(mask)
  }

  isThirteenOrphans() {
    if (this.size !== 13) {
      return false
    }
    let product = 1
    for (let tile of orphans) {
      product *= this.fullTiles[tile]
    }
    return product === 2
  }

  getWaitingTiles() {
    let result = []
    for (let waitTile = 0; waitTile < 34; ++waitTile) {
      let hand = MahjongHand.fromHand(this)
      --hand.fullTiles[hand.waitTile]
      hand.waitTile = waitTile
      ++hand.fullTiles[waitTile]
      if (hand.isNormalHand() || hand.isSevenPairs() || hand.isFullyKnitted() || hand.isThirteenOrphans()) {
        result.push(waitTile)
      }
    }
    return result
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

    if (this.isNormalHand()) {
      let tiles = this.tiles.slice()
      ++tiles[this.waitTile]
      let knittedOffset = Knitted.getKnittedOffset(tiles)
      let knitted = knittedOffset == null ? null : new Knitted(knittedOffset)
      if (knitted) {
        for (let tile = 0; tile < 27; ++tile) {
          tiles[tile] -= knitted.tiles[tile]
        }
      }
      for (let result of expand(tiles, this.size + 1, 0)) {
        if (knitted) {
          result.push(knitted)
        }
        result.push(...this.chows, ...this.pungs, ...this.exposedKongs, ...this.concealedKongs)
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

    if (this.isSevenPairs()) {
      let pairs = []
      for (let tile = 0; tile < 34; ++tile) {
        switch (this.fullTiles[tile]) {
          case 4:
            pairs.push(new Pair(tile))
          case 2:
            pairs.push(new Pair(tile))
        }
      }
      yield pairs
    }

    if (this.isFullyKnitted()) {
      let {offset, voids} = FullyKnitted.getFullyKnittedParams(this.fullTiles)
      yield [new FullyKnitted(offset, voids)]
    }

    if (this.isThirteenOrphans()) {
      yield [new ThirteenOrphans(this.fullTiles.indexOf(2))]
    }
  }

  getScore() {
    let waitTiles = this.getWaitingTiles()
    if (!waitTiles.includes(this.waitTile)) {
      return null
    }
    let bestScore = 0
    let bestFans = []
    for (let melds of this.getAllCombinations()) {
      let {score, fans} = new Scoring(this, melds, waitTiles.length === 1).getScore()
      if (bestScore < score) {
        bestScore = score
        bestFans = fans
      }
    }
    if (bestScore === 0) {
      bestScore = 8
      bestFans = ['无番和']
    }
    if (bestScore >= 8) {
      bestScore += this.flowers
      for (let i = 0; i < this.flowers; ++i) {
        bestFans.push('花牌')
      }
    }
    return {score: bestScore, fans: bestFans}
  }
}
