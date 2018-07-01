import Fan from '../fan'

export default class TriplePung extends Fan {
  get name() {
    return '三同刻'
  }

  precondition() {
    let pungNumbers = new Array(9).fill(0)
    for (let meld of this.melds) {
      if (meld.isPung() && !Fan.isHonor(meld.tile)) {
        ++pungNumbers[meld.tile % 9]
      }
    }
    return pungNumbers.some(count => count === 3)
  }
}
