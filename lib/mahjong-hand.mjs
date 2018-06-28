import Hand from './hand'
import { knittedList, orphans } from './utils'
import fanMap from './scoring/fan.json'
import Scoring from './scoring/scoring'
import {
  BigFourWinds, BigThreeDragons, AllGreen, NineGates, FourKongs, SevenShiftedPairs, ThirteenOrphans
} from './scoring/88'

export default class MahjongHand extends Hand {
  static fromHand(hand) {
    let tiles = []
    for (let index = 0; index < 34; ++index) {
      for (let i = 0; i < hand.tiles[index]; ++i) {
        tiles.push(index)
      }
    }
    return new MahjongHand(tiles, hand)
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
      if (count === 1 || count === 4) {
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

  getScore({isSelfDrawn = false, isLastTileShown = false, isKong = false, isLastTile = false} = {}) {
    let waitTiles = this.getWaitingTiles()
    if (!waitTiles.includes(this.waitTile)) {
      return null
    }
  
    const procedureList = [
      BigFourWinds, BigThreeDragons, AllGreen, NineGates, FourKongs, SevenShiftedPairs, ThirteenOrphans
    ]
    let scoring = new Scoring(this)
    let bestScore = 0
    let bestFans = []
    for (let melds of scoring.getAllCombinations()) {
      let fans = []
      let omittedFans = new Map()
      for (let Class of procedureList) {
        new Class(
          this, melds, fans, omittedFans,
          {isSelfDrawn, isLastTileShown, isKong, isLastTile}
        ).process()
      }
      let score = fans.map(fan => fanMap[fan]).reduce((x, y) => x + y)
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