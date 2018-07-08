import Fan, { isHonor } from '../fan'

export default class DoublePung extends Fan {
  get name() {
    return '双同刻'
  }

  _process() {
    let pungs = this.melds.filter(meld => meld.isPung() && !isHonor(meld.tile))
    let pungNumbers = new Array(9).fill(0)
    for (let pung of pungs) {
      ++pungNumbers[pung.tile % 9]
    }
    for (let number = 0; number < 9; ++number) {
      if (pungNumbers[number] === 2) {
        this.addFan(this.name, pungs.filter(pung => pung.tile % 9 === number))
      }
    }
  }
}
