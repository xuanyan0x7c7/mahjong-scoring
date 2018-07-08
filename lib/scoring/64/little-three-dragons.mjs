import Fan, { isDragon } from '../fan'

export default class LittleThreeDragons extends Fan {
  get name() {
    return '小三元'
  }

  precondition() {
    if (this.isPureNormalHand() && isDragon(this.melds[0].tile)) {
      let dragonPungs = this.melds.filter(meld => meld.isPung() && isDragon(meld.tile))
      if (dragonPungs.length === 2) {
        return [this.melds[0], ...dragonPungs]
      }
    }
  }

  get omittedFans() {
    return ['双箭刻']
  }
}
