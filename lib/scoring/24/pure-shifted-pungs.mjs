import Fan from "../fan"
import { tilesMap } from "../../utils.mjs";

export default class PureShiftedPungs extends Fan {
  get name() {
    return '一色三节高'
  }

  precondition() {
    if (!this.isPureNormalHand()) {
      return false
    }
    let pungs = this.melds.filter(meld => meld.isPung()).map(meld => meld.tile)
    if (pungs.length < 3) {
      return false
    }
    if (pungs.length === 3 && !PureShiftedPungs.isPureShiftedPungs(pungs[0], pungs[1], pungs[2])) {
      return false
    }
    if (pungs.length === 4) {
      if (
        !PureShiftedPungs.isPureShiftedPungs(pungs[0], pungs[1], pungs[2])
        && !PureShiftedPungs.isPureShiftedPungs(pungs[1], pungs[2], pungs[3])
      ) {
        return false
      }
      if (pungs[3] - pungs[0] === 3 && Math.floor(pung[0] / 9) === Math.floor(pungs[3] / 9)) {
        return false
      }
    }
    return true
  }

  static isPureShiftedPungs(tile1, tile2, tile3) {
    return tile2 - tile1 === 1 && tile3 - tile2 === 1
      && Math.floor(tile1 / 9) === Math.floor(tile3 / 9) && !Fan.isHonor(tile1)
  }
}