import Fan, { isDragon } from '../fan'

export default class BigThreeDragons extends Fan {
  get name() {
    return '大三元'
  }

  precondition() {
    let dragonPungs = this.melds.filter(meld => meld.isPung() && isDragon(meld.tile))
    if (dragonPungs.length === 3) {
      return dragonPungs
    }
  }
}
