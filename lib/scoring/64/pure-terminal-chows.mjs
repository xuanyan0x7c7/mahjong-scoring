import Fan from "../fan"

export default class BigFourWinds extends Fan {
  get name() {
    return '一色双龙会'
  }

  _process() {
    if (!this.isPureNormalHand() || !this.isAllChows()) {
      return
    }
    for (let suit = 0; suit < 3; ++suit) {
      if (
        this.melds[1].middleTile === suit * 9 + 1
        && this.melds[2].middleTile === suit * 9 + 1
        && this.melds[3].middleTile === suit * 9 + 7
        && this.melds[4].middleTile === suit * 9 + 7
      ) {
        this.fans.push(this.name)
        this.addOmittedFans(['清一色', '平和', '一般高', '老少副'])
        return
      }
    }
  }
}