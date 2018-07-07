import Fan from '../fan'

export default class AllPungs extends Fan {
  get name() {
    return '碰碰和'
  }

  precondition() {
    if (this.isAllPungs()) {
      return this.melds
    }
  }
}
