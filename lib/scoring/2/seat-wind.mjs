import Fan from '../fan'

export default class SeatWind extends Fan {
  get name() {
    return '门风刻'
  }

  precondition() {
    let meld = this.melds.find(meld => meld.isPung() && meld.tile === this.hand.seatWind)
    if (meld) {
      return [meld]
    }
  }
}
