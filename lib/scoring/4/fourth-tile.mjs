import Fan from "../fan"

export default class FourthTile extends Fan {
  get name() {
    return '和绝张'
  }

  precondition() {
    return this.isFourthTile
  }
}