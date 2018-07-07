import Fan, { isHonor } from '../fan'

export default class TriplePung extends Fan {
  get name() {
    return '三同刻'
  }

  precondition() {
    let pungs = this.melds.filter(meld => meld.isPung() && !isHonor(meld.tile))
    let pungNumbers = new Array(9).fill(0)
    for (let meld of pungs) {
      ++pungNumbers[meld.tile % 9]
    }
    for (let number = 0; number < 9; ++number) {
      if (pungNumbers[number] === 3) {
        return pungs.filter(pung => pung.tile % 9 === number)
      }
    }
  }
}
