import Fan from '../fan'

export default class BigFourWinds extends Fan {
  get name() {
    return '一色双龙会'
  }

  precondition() {
    if (!this.isPureNormalHand() || !this.isAllChows() || ![1, 2, 4].includes(this.suitMask)) {
      return false
    }
    let suit = this.suitMask >>> 1
    if (this.melds[0].tile !== suit * 9 + 4) {
      return false
    }
    if (
      this.melds[1].middleTile === suit * 9 + 1
      && this.melds[2].middleTile === suit * 9 + 1
      && this.melds[3].middleTile === suit * 9 + 7
      && this.melds[4].middleTile === suit * 9 + 7
    ) {
      return this.melds
    }
  }

  get omittedFans() {
    return ['清一色', '平和', '一般高', '老少副', '无字']
  }
}
