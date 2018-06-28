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
    throw 'Not Implemented'
  }

  isAllInList(list) {
    for (let tile = 0; tile < 34; ++tile) {
      if (this.hand.fullTiles[tile] > 0 && !list.includes(tile)) {
        return false
      }
    }
    return true
  }

  addOmittedFans(fans, meld = null) {
    if (!this.omittedFans.has(meld)) {
      this.omittedFans.set(meld, new Set())
    }
    for (let fan of fans) {
      this.omittedFans.get(meld).add(fan)
    }
  }
}