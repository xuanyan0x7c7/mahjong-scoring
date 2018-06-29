import Fan from "../fan"

export default class DragonPung extends Fan {
  get name() {
    return '箭刻'
  }

  precondition() {
    return this.melds.filter(meld => meld.isPung() && Fan.isDragon(meld.tile)).length === 1
  }
}