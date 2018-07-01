import Fan from '../fan'

export default class LesserrHonorsAndKnittedTiles extends Fan {
  get name() {
    return '全不靠'
  }

  precondition() {
    return this.isFullyKnitted()
  }

  get omittedFans() {
    return ['五门齐', '门前清']
  }
}
