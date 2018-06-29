import Fan from "../fan"

export default class NineGates extends Fan {
  get name() {
    return '九莲宝灯'
  }

  precondition() {
    if (this.isPureNormalHand() && this.isConcealedHand() && [1, 2, 4].includes(this.suitMask)) {
      let suit = this.suitMask >>> 1
      if (this.hand.tiles[suit * 9] !== 3 || this.hand.tiles[suit * 9 + 8] !== 3) {
        return false
      }
      for (let number = 2; number <= 8; ++number) {
        if (this.hand.tiles[suit * 9 + number - 1] !== 1) {
          return false
        }
      }
      return true
    }
  }

  get omittedFans() {
    return ['清一色', '门前清', '幺九刻', '无字']
  }
}