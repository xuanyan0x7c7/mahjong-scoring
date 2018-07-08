import Fan, { isHonor } from '../fan'

export default class AllEvenPungs extends Fan {
  get name() {
    return '全双刻'
  }

  precondition() {
    if (this.isAllPungs() && this.melds.every(meld => !isHonor(meld.tile) && meld.tile % 9 % 2 === 1)) {
      return this.melds
    }
  }

  get omittedFans() {
    return ['碰碰和', '断幺', '无字']
  }
}
