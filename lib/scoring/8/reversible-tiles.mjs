import Fan from '../fan'

export default class ReversibleTiles extends Fan {
  get name() {
    return '推不倒'
  }

  precondition() {
    return this.isAllInMask(0o672637000, 0x40)
  }
  
  get omittedFans() {
    return ['缺一门']
  }
}
