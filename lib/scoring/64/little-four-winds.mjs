import Fan, { isWind } from '../fan'

export default class LittleFourWinds extends Fan {
  get name() {
    return '小四喜'
  }

  precondition() {
    if (this.isPureNormalHand() && isWind(this.melds[0].tile)) {
      let windPungs = this.melds.filter(meld => meld.isPung() && isWind(meld.tile))
      if (windPungs.length === 3) {
        return [this.melds[0], ...windPungs]
      }
    }
  }

  get omittedFans() {
    return ['三风刻', '幺九刻']
  }
}
