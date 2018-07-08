import Fan, { isDragon } from '../fan'

export default class TwoDragonsPungs extends Fan {
  get name() {
    return '双箭刻'
  }

  precondition() {
    let dragonPungs = this.melds.filter(meld => meld.isPung() && isDragon(meld.tile))
    if (dragonPungs.length === 2) {
      return dragonPungs
    }
  }
}
