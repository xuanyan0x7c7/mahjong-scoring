import Fan from '../fan'

export default class FourPureShiftedChows extends Fan {
  get name() {
    return '一色四步高'
  }

  precondition() {
    if (!this.isPureNormalHand() || !this.isAllChows()) {
      return false
    }
    let difference = this.melds[2].middleTile - this.melds[1].middleTile
    if (
      difference > 0
      && this.melds[3].middleTile - this.melds[2].middleTile === difference
      && this.melds[4].middleTile - this.melds[3].middleTile === difference
      && Math.floor(this.melds[1].middleTile / 9) === Math.floor(this.melds[3].middleTile / 9)
    ) {
      return this.melds.slice(1)
    }
  }

  get omittedFans() {
    return ['一色三步高', '连六', '老少副']
  }
}
