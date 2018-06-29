import Fan from "../fan"

export default class LastTile extends Fan {
  get name() {
    return ['妙手回春', '海底捞月']
  }

  precondition() {
    return this.isLastTile
  }

  _process() {
    if (this.isSelfDrawn) {
      this.fans.push(this.name[0])
      this.addOmittes(['自摸'])
    } else {
      this.fans.push(this.name[1])
    }
    return true
  }
}