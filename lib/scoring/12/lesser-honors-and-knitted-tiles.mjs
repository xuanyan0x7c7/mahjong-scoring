import Fan from "../fan"

export default class LesserrHonorsAndKnittedTiles extends Fan {
  get name() {
    return '全不靠'
  }

  _process() {
    if (!this.melds[0].isFullyKnitted()) {
      return
    }
    this.fans.push(this.name)
    this.addOmittedFans(['五门齐', '门前清'])
  }
}