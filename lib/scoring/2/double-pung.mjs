import Fan from '../fan'

export default class DoublePung extends Fan {
  get name() {
    return '双同刻'
  }

  _process() {
    let found = false
    let pungNumbers = new Array(9).fill(0)
    for (let meld of this.melds) {
      if (meld.isPung() && !Fan.isHonor(meld.tile)) {
        ++pungNumbers[meld.tile % 9]
      }
    }
    for (let count of pungNumbers) {
      if (count === 2) {
        this.fans.push(this.name)
        found = true
      }
    }
    return found
  }
}
