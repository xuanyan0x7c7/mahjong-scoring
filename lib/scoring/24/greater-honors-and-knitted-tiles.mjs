import Fan, { isHonor } from '../fan'

export default class GreaterHonorsAndKnittedTiles extends Fan {
  get name() {
    return '七星不靠'
  }

  precondition() {
    if (this.isFullyKnitted() && !isHonor(this.melds[0].voids[1])) {
      return this.melds
    }
  }

  get omittedFans() {
    return ['全不靠', '五门齐', '不求人', '门前清']
  }
}
