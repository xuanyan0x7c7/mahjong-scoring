import Fan from "../fan"

export default class SelfDrawn extends Fan {
  get name() {
    return '自摸'
  }

  precondition() {
    return this.isSelfDrawn
  }
}