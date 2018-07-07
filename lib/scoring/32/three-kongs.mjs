import Fan from '../fan'

export default class ThreeKongs extends Fan {
  get name() {
    return '三杠'
  }

  precondition() {
    let kongs = this.melds.filter(meld => meld.isKong())
    if (kongs.length === 3) {
      return kongs
    }
  }
}
