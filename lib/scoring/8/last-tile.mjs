import Fan from '../fan'

export default class LastTile extends Fan {
  get names() {
    return ['妙手回春', '海底捞月']
  }

  precondition() {
    return this.hand.isLastTile
  }

  _process() {
    if (this.hand.isSelfDrawn) {
      this.addFan(this.names[0])
    } else {
      this.addFan(this.names[1])
    }
  }

  get omittedFans() {
    return ['自摸']
  }
}
