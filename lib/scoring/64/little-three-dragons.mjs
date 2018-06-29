import Fan from "../fan"

export default class LittleThreeDragons extends Fan {
  get name() {
    return '小三元'
  }

  precondition() {
    return this.isPureNormalHand() && Fan.isDragon(this.melds[0].tile)
      && this.melds.filter(meld => meld.isPung() && Fan.isDragon(meld.tile)).length === 2
  }

  get omittedFans() {
    return ['双箭刻']
  }
}