import { tilesMap } from '../utils'

export default class Fan {
  constructor(
    hand, melds, fans,
    { omittes, combinations },
    { isSelfDrawn, isFourthTile, isKong, isLastTile, isSingleWait }
  ) {
    this.hand = hand
    this.melds = melds
    this.fans = fans
    this.omittes = omittes
    this.combinations = combinations
    this.isSelfDrawn = isSelfDrawn
    this.isFourthTile = isFourthTile
    this.isKong = isKong
    this.isLastTile = isLastTile
    this.isSingleWait = isSingleWait
  }

  get name() {
    throw 'NotImplemented'
  }

  get names() {
    return [this.name]
  }

  process() {
    if (this.omittes.has(null) && this.names.some(name => this.omittes.get(null).has(name))) {
      return
    }
    if (this.precondition()) {
      if (this._process()) {
        this.addOmittes(this.omittedFans)
      }
    }
  }

  _process() {
    this.fans.push(this.name)
    return true
  }

  precondition() {
    return true
  }

  get omittedFans() {
    return []
  }

  addOmittes(fans, meld = null) {
    if (!this.omittes.has(meld)) {
      this.omittes.set(meld, new Set())
    }
    for (let fan of fans) {
      this.omittes.get(meld).add(fan)
    }
  }

  isAllInList(list) {
    for (let tile = 0; tile < 34; ++tile) {
      if (this.hand.fullTiles[tile] > 0 && !list.includes(tile)) {
        return false
      }
    }
    return true
  }

  isNormalHand() {
    return this.melds.length === 3 || this.melds.length === 5
  }

  isPureNormalHand() {
    return this.melds.length === 5
  }

  isSevenPairs() {
    return this.melds.length === 7
  }

  isFullyKnitted() {
    return this.melds[0].isFullyKnitted()
  }

  isThirteenOrphans() {
    return this.melds[0].isThirteenOrphans()
  }

  isAllPungs() {
    if (this.melds.length !== 5) {
      return false
    }
    for (let index = 1; index <= 4; ++index) {
      if (!this.melds[index].isPung()) {
        return false
      }
    }
    return true
  }

  isAllChows() {
    if (this.melds.length === 3) {
      return this.melds[1].isChow()
    }
    if (this.melds.length !== 5) {
      return false
    }
    for (let index = 1; index <= 4; ++index) {
      if (!this.melds[index].isChow()) {
        return false
      }
    }
    return true
  }

  isConcealedHand() {
    return this.hand.chows.length === 0 && this.hand.pungs.length === 0 && this.hand.exposedKongs.length === 0
  }

  get suitMask() {
    if (this._suitMask != null) {
      return this._suitMask
    }
    let mask = 0
    for (let tile = 0; tile < 27; ++tile) {
      if (this.hand.fullTiles[tile] > 0) {
        mask |= 1 << Math.floor(tile / 9)
      }
    }
    for (let tile = 27; tile < 31; ++tile) {
      if (this.hand.fullTiles[tile] > 0) {
        mask |= 8
        break
      }
    }
    for (let tile = 31; tile < 34; ++tile) {
      if (this.hand.fullTiles[tile] > 0) {
        mask |= 16
        break
      }
    }
    return mask
  }

  static isWind(tile) {
    return tile >= tilesMap.EAST_WIND && tile <= tilesMap.NORTH_WIND
  }

  static isDragon(tile) {
    return tile >= tilesMap.RED_DRAGON
  }

  static isHonor(tile) {
    return tile >= tilesMap.EAST_WIND
  }
}
