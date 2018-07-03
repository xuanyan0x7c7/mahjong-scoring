import Fan from '../fan'
import Bitset from '../bitset'

export default class AllGreen extends Fan {
  get name() {
    return '绿一色'
  }

  precondition() {
    return this.isAllInMask(0o256000000, 0x20)
  }
}
