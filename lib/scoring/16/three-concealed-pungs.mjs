import Fan from "../fan"

export default class ThreeConcealedPungs extends Fan {
  get name() {
    return '三暗刻'
  }

  _process() {
    if (!this.isPureNormalHand()) {
      return
    }
    let concealedPungCount = 0
    for (let meld of this.melds) {
      if (meld.isConcealedPungOrKong()) {
        ++concealedPungCount
      }
    }
    if (concealedPungCount === 3) {
      this.fans.push(this.name)
    }
  }
}