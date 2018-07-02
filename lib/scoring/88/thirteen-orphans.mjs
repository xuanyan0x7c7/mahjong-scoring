import Fan from '../fan'

export default class ThirteenOrphans extends Fan {
  get name() {
    return '十三幺'
  }

  precondition() {
    return this.isThirteenOrphans()
  }

  get omittedFans() {
    return ['混幺九', '五门齐', '门前清']
  }
}
