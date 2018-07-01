import Fan from '../fan'

export default class HalfFlush extends Fan {
  get name() {
    return '混一色'
  }

  precondition() {
    return [1, 2, 4].includes(this.suitMask % 8) && this.suitMask > 8
  }
}
