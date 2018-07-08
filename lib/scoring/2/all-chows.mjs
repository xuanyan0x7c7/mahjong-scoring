import Fan, { isHonor } from '../fan'

export default class AllChows extends Fan {
  get name() {
    return '平和'
  }

  precondition() {
    if (this.isAllChows() && !isHonor(this.melds[0].tile)) {
      return this.melds
    }
  }

  get omittedFans() {
    return ['无字']
  }
}
