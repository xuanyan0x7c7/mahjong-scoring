import Fan from '../fan'

export default class LittleFourWinds extends Fan {
  get name() {
    return '小四喜'
  }

  precondition() {
    return this.isPureNormalHand()
      && Fan.isWind(this.melds[0].tile)
      && this.melds.filter(meld => meld.isPung() && Fan.isWind(meld.tile)).length === 3
  }

  get omittedFans() {
    return ['三风刻']
  }

  _process() {
    for (let meld of this.melds) {
      if (meld.isPung() && Fan.isWind(meld.tile)) {
        this.addOmittes(['幺九刻'], meld)
      }
    }
    return super._process()
  }
}
