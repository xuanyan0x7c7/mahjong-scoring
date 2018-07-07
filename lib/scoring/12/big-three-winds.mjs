import Fan, { isWind } from '../fan'

export default class LittleThreeDragons extends Fan {
  get name() {
    return '三风刻'
  }

  precondition() {
    let windPungs = this.melds.filter(meld => meld.isPung() && isWind(meld.tile))
    if (windPungs.length === 3) {
      for (let pung of windPungs) {
        this.addOmittes(['幺九刻'], pung)
      }
      return windPungs
    }
  }
}
