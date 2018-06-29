import Fan from "../fan"

export default class SeatWind extends Fan {
  get name() {
    return '门风刻'
  }

  precondition() {
    return this.melds.find(meld => meld.isPung() && meld.tile === this.hand.seatWind + 27)
  }
}