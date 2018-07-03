import Fan from '../fan'

export default class AllTerminals extends Fan {
  get name() {
    return '清幺九'
  }

  precondition() {
    return this.isAllInMask(0o401401401, 0)
  }

  get omittedFans() {
    return ['碰碰和', '全带幺', '幺九刻', '无字']
  }
}
