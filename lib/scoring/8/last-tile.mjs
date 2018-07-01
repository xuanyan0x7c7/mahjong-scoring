import Fan from '../fan'

export default class LastTile extends Fan {
  get names() {
    return ['妙手回春', '海底捞月']
  }

  precondition() {
    return this.isLastTile
  }

  _process() {
    if (this.isSelfDrawn) {
      this.fans.push(this.names[0])
      this.addOmittes(['自摸'])
    } else {
      this.fans.push(this.names[1])
    }
    return true
  }
}
