import Fan, { isWind } from '../fan'

export default class BigFourWinds extends Fan {
  get name() {
    return '大四喜'
  }

  precondition() {
    let windPungs = this.melds.filter(meld => meld.isPung() && isWind(meld.tile))
    if (windPungs.length === 4) {
      return windPungs
    }
  }

  get omittedFans() {
    return ['三风刻', '碰碰和', '圈风刻', '门风刻', '幺九刻']
  }
}
