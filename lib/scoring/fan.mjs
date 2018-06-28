export default class Fan {
  constructor(
    hand, melds, fans, omittedFans,
    { isSelfDrawn = false, isLastTileShown = false, isKong = false, isLastTile = false }
  ) {
    this.hand = hand
    this.melds = melds
    this.fans = fans
    this.omittedFans = omittedFans
    this.isSelfDrawn = isSelfDrawn
    this.isLastTileShown = isLastTileShown
    this.isKong = isKong
    this.isLastTile = isLastTile
  }

  get name() {
    return 'NotImplemented'
  }

  process() {
    if (this.omittedFans.has(null) && this.omittedFans.get(null).has(this.name)) {
      return
    }
    this._process()
  }

  _process() {
    this.fans.push(this.name)
  }

  addOmittedFans(fans, meld = null) {
    if (!this.omittedFans.has(meld)) {
      this.omittedFans.set(meld, new Set())
    }
    for (let fan of fans) {
      this.omittedFans.get(meld).add(fan)
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

  isAllPungs() {
    if (this.melds.length !== 5) {
      return false
    }
    for (let index = 1; index <= 4; ++index) {
      if (!this.melds[index].isPungOrKong()) {
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
    return this.hand.size === 13
  }
}