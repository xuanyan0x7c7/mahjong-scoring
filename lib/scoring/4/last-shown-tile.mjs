import Fan from "../fan"

export default class LastShownTile extends Fan {
  get name() {
    return '和绝张'
  }

  precondition() {
    return this.isLastTileShown
  }
}