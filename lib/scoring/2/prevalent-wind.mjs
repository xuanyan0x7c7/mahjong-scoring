import Fan from '../fan'

export default class PrevalentWind extends Fan {
  get name() {
    return '圈风刻'
  }

  precondition() {
    return this.melds.find(meld => meld.isPung() && meld.tile === this.hand.prevalentWind + 27)
  }
}
