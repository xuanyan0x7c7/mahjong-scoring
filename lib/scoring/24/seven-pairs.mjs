import Fan from "../fan"

export default class SevenPairs extends Fan {
  get name() {
    return '七对'
  }

  _process() {
    if (this.isSevenPairs()) {
      this.fans.push(this.name)
      this.addOmittedFans(['门前清', '单调将'])
    }
  }
}