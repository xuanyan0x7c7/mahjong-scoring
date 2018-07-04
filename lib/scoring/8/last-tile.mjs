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
      this.fans.push(this.names[0])
    } else {
      this.fans.push(this.names[1])
    }
    return true
  }

  get omittedFans() {
    return ['自摸']
  }
}
