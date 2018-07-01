import Fan from '../fan'

export default class AllHonors extends Fan {
  get name() {
    return '字一色'
  }

  precondition() {
    return this.suitMask % 8 === 0
  }

  get omittedFans() {
    return ['碰碰和', '全带幺', '幺九刻']
  }
}
