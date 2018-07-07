import Fan, { isDragon } from '../fan'

export default class DragonPung extends Fan {
  get name() {
    return '箭刻'
  }

  precondition() {
    let dragonPungs = this.melds.filter(meld => meld.isPung() && isDragon(meld.tile))
    if (dragonPungs.length === 1) {
      return dragonPungs
    }
  }
}
