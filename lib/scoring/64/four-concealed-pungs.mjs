import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class BigFourWinds extends Fan {
  get name() {
    return '四暗刻'
  }

  _process() {
    if (!this.isAllPungs() || !this.isConcealedHand()) {
      return
    }
    for (let index = 1; index <= 4; ++index) {
      if (!this.melds[index].isConcealedPungOrKong()) {
        return
      }
    }
    this.fans.push(this.name)
    this.addOmittedFans(['碰碰和', '门前清'])
  }
}