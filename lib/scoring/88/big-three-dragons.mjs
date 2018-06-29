import Fan from "../fan"

export default class BigThreeDragons extends Fan {
  get name() {
    return '大三元'
  }

  precondition() {
    return this.melds.filter(meld => meld.isPung() && Fan.isDragon(meld.tile)).length === 3
  }
}