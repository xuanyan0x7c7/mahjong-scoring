import Fan from "../fan"

export default class NoHonorTiles extends Fan {
  get name() {
    return '无字'
  }

  precondition() {
    return this.suitMask < 8
  }
}