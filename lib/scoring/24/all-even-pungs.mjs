import Fan from "../fan"

export default class AllEvenPungs extends Fan {
  get name() {
    return '全双刻'
  }

  precondition() {
    return this.isAllPungs()
      && this.melds.every(meld => !Fan.isHonor(meld.tile) && meld.tile % 9 % 2 === 1)
  }

  get omittedFans() {
    return ['碰碰和', '断幺', '无字']
  }
}