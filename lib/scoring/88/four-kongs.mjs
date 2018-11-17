import Fan from '../fan'

export default class FourKongs extends Fan {
  get name() {
    return '四杠'
  }

  precondition() {
    let kongs = this.melds.filter(meld => meld.isKong())
    if (kongs.length === 4) {
      return kongs
    }
  }

  get omittedFans() {
    return ['碰碰和', '单钓将']
  }
}
