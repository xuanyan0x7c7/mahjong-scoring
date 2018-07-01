import Fan from '../fan'

export default class AllChows extends Fan {
  get name() {
    return '平和'
  }

  precondition() {
    return this.isAllChows() && !Fan.isHonor(this.melds[0].tile)
  }

  get omittedFans() {
    return ['无字']
  }
}
