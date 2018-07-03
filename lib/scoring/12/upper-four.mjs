import Fan from '../fan'

export default class UpperFour extends Fan {
  get name() {
    return '大于五'
  }

  precondition() {
    return this.isAllInMask(0o740740740, 0)
  }
  
  get omittedFans() {
    return ['无字']
  }
}
