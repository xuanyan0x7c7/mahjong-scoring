import Fan from '../fan'

export default class AllSimples extends Fan {
  get name() {
    return '断幺'
  }

  precondition() {
    return this.isAllInMask(0o376376376, 0)
  }

  get omittedFans() {
    return ['无字']
  }
}
