import Fan from '../fan'
import { orphans } from '../../utils'

export default class SingleWait extends Fan {
  get names() {
    return ['边张', '坎张', '单调将']
  }

  precondition() {
    return this.isSingleWait && !this.isThirteenOrphans()
  }

  _process() {
    if (this.isNormalHand() && !this.isPureNormalHand()) {
      if (this.melds[2].tiles[this.hand.waitTile] > 0) {
        return false
      }
    }
    if (orphans.includes(this.hand.waitTile)) {
      this.fans.push(this.names[2])
      return true
    }
    if (this.hand.waitTile % 9 === 2) {
      if (this.melds.some(meld => meld.isChow() && meld.middleTile === this.hand.waitTile - 1)) {
        this.fans.push(this.names[0])
        return true
      }
    }
    if (this.hand.waitTile % 9 === 6) {
      if (this.melds.some(meld => meld.isChow() && meld.middleTile === this.hand.waitTile + 1)) {
        this.fans.push(this.names[0])
        return true
      }
    }
    if (this.melds.some(meld => meld.isChow() && meld.middleTile === this.hand.waitTile)) {
      this.fans.push(this.names[1])
    } else {
      this.fans.push(this.names[2])
    }
    return true
  }
}
