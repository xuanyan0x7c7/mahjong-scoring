import Fan from '../fan'

export default class PrevalentWind extends Fan {
  get name() {
    return '圈风刻'
  }

  precondition() {
    let meld = this.melds.find(meld => meld.isPung() && meld.tile === this.hand.prevalentWind)
    if (meld) {
      return [meld]
    }
  }
}
