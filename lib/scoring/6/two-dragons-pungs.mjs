import Fan from '../fan'

export default class TwoDragonPungs extends Fan {
  get name() {
    return '双箭刻'
  }

  precondition() {
    return this.melds.filter(meld => meld.isPung() && Fan.isDragon(meld.tile)).length === 2
  }
}
