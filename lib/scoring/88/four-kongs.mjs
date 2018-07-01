import Fan from '../fan'

export default class FourKongs extends Fan {
  get name() {
    return '四杠'
  }

  precondition() {
    return this.melds.filter(meld => meld.isKong()).length === 4
  }

  get omittedFans() {
    return ['碰碰和', '单调将']
  }
}
