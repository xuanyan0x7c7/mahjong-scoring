import Fan from '../fan'

export default class SingleWait extends Fan {
  get names() {
    return ['边张', '坎张', '单调将']
  }

  precondition() {
    return this.isSingleWait && !this.isThirteenOrphans()
  }

  _process() {
    if (this.isNormalHand() && !this.isPureNormalHand()) {
      if (this.melds[2].tiles.includes(this.hand.waitTile)) {
        return
      }
    }
    if (this.hand.waitTile % 9 === 2) {
      let meld = this.melds.find(meld => meld.isChow() && meld.middleTile === this.hand.waitTile - 1)
      if (meld) {
        this.addFan(this.names[0], [meld])
        return
      }
    }
    if (this.hand.waitTile % 9 === 6) {
      let meld = this.melds.find(meld => meld.isChow() && meld.middleTile === this.hand.waitTile + 1)
      if (meld) {
        this.addFan(this.names[0], [meld])
        return
      }
    }
    let meld = this.melds.find(meld => meld.isChow() && meld.middleTile === this.hand.waitTile)
    if (meld) {
      this.addFan(this.names[1], [meld])
    } else {
      this.addFan(this.names[2], [this.melds[0]])
    }
  }
}
