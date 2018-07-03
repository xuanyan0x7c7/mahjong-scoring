import Fan from '../fan'

export default class LowerTiles extends Fan {
  get name() {
    return '全小'
  }

  precondition() {
    return this.isAllInMask(0o007007007, 0)
  }
  
  get omittedFans() {
    return ['小于五', '无字']
  }
}
