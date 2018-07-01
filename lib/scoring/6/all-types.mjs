import Fan from '../fan'

export default class AllTypes extends Fan {
  get name() {
    return '五门齐'
  }

  precondition() {
    return this.suitMask === 31
  }
}
