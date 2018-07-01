import Fan from '../fan'

export default class ThreeSuitedTerminalChows extends Fan {
  get name() {
    return '三色双龙会'
  }

  precondition() {
    if (!this.isPureNormalHand() || !this.isAllChows()) {
      return false
    }
    if (!Fan.isHonor(this.melds[0].tile) || this.melds[0].tile % 9 != 4) {
      return false
    }
    let suits = [0, 1, 2]
    suits.splice(Math.floor(this.melds[0].tile / 9), 1)
    return this.melds[1].middleTile === 9 * suits[0] + 1
      && this.melds[2].middleTile === 9 * suits[0] + 7
      && this.melds[3].middleTile === 9 * suits[1] + 1
      && this.melds[4].middleTile === 9 * suits[1] + 7
  }

  get omittedFans() {
    return ['平和', '喜相逢', '老少副', '无字']
  }
}
