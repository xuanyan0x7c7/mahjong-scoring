import Fan from '../fan'

export default class LittleThreeDragons extends Fan {
  get name() {
    return '三风刻'
  }

  precondition() {
    return this.melds.filter(meld => meld.isPung() && Fan.isWind(meld.tile)).length === 3
  }

  _process() {
    for (let meld of this.melds) {
      if (meld.isPung() && Fan.isWind(meld.tile)) {
        this.addOmittes(['幺九刻'], meld)
      }
    }
    return true
  }
}
