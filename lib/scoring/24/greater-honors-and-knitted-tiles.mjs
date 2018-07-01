import Fan from '../fan'

export default class GreaterHonorsAndKnittedTiles extends Fan {
  get name() {
    return '七星不靠'
  }

  precondition() {
    return this.isFullyKnitted() && !Fan.isHonor(this.melds[0].voids[1])
  }

  get omittedFans() {
    return ['全不靠', '五门齐', '门前清']
  }
}
