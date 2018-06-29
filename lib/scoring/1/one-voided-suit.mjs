import Fan from "../fan"

export default class OneVoidedSuit extends Fan {
  get name() {
    return '缺一门'
  }

  precondition() {
    return [3, 5, 6].includes(this.suitMask % 8)
  }
}