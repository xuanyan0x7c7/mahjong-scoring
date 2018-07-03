import Fan from '../fan'

export default class LowerFour extends Fan {
  get name() {
    return '小于五'
  }

  precondition() {
    return this.isAllInMask(0o017017017, 0)
  }
  
  get omittedFans() {
    return ['无字']
  }
}
