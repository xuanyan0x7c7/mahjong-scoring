import Fan from '../fan'

export default class BigFourWinds extends Fan {
  get name() {
    return '大四喜'
  }

  precondition() {
    return this.melds.filter(meld => meld.isPung() && Fan.isWind(meld.tile)).length === 4
  }

  get omittedFans() {
    return ['三风刻', '碰碰和', '圈风刻', '门风刻', '幺九刻']
  }
}
