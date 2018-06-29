import Fan from "../fan"
import { tilesMap } from "../../utils.mjs";

export default class PureShiftedPungs extends Fan {
  get name() {
    return '一色三节高'
  }

  precondition() {
    return this.isPureNormalHand()
  }

  precondition() {
    let pungs = this.melds.filter(meld => meld.isPung()).map(meld => meld.tile)
    if (pungs.length < 3) {
      return false
    }
    if (pungs.length === 3) {
      if (PureShiftedPungs.isPureShiftedPungs(pungs[0].tile, pungs[1].tile, pungs[2].tile)) {
        this.combinations.push(pungs)
      } else {
        return false
      }
    }
    if (pungs.length === 4) {
      if (pungs[3] - pungs[0] === 3 && Math.floor(pung[0] / 9) === Math.floor(pungs[3] / 9)) {
        return false
      }
      if (PureShiftedPungs.isPureShiftedPungs(pungs[0].tile, pungs[1].tile, pungs[2].tile)) {
        this.combinations.push(pungs.slice(0, 3))
      } else if (PureShiftedPungs.isPureShiftedPungs(pungs[1].tile, pungs[2].tile, pungs[3].tile)) {
        this.combinations.push(pungs.slice(1))
      } else {
        return false
      }
    }
    return super._process()
  }

  static isPureShiftedPungs(tile1, tile2, tile3) {
    return tile2 - tile1 === 1 && tile3 - tile2 === 1
      && Math.floor(tile1 / 9) === Math.floor(tile3 / 9) && !Fan.isHonor(tile1)
  }
}