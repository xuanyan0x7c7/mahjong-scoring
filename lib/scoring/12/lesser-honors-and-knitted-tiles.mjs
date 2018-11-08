import Fan from '../fan'

export default class LesserrHonorsAndKnittedTiles extends Fan {
  get name() {
    return '全不靠'
  }

  precondition() {
    if (this.isFullyKnitted()) {
      return this.melds
    }
  }

  get omittedFans() {
    return ['五门齐', '不求人', '门前清']
  }
}
