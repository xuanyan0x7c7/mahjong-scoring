import Fan from '../fan'

export default class NoHonors extends Fan {
  get name() {
    return '无字'
  }

  precondition() {
    return this.suitMask < 8
  }
}
