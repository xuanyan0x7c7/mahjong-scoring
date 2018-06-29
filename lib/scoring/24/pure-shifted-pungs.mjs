import Fan from "../fan"
import { tilesMap } from "../../utils.mjs";

export default class PureShiftedPungs extends Fan {
  get name() {
    return '一色三节高'
  }

  _process() {
    if (!this.isPureNormalHand()) {
      return
    }
    let pungs = []
    for (let index = 1; index <= 4; ++index) {
      if (this.melds[index].isPungOrKong()) {
        pungs.push(this.melds[index].tile)
      }
    }
    if (pungs.length < 3) {
      return
    }
    if (pungs.length === 3 && !PureShiftedPungs.isPureShiftedPungs(pungs[0], pungs[1], pungs[2])) {
      return
    }
    if (pungs.length === 4) {
      if (
        !PureShiftedPungs.isPureShiftedPungs(pungs[0], pungs[1], pungs[2])
        && !PureShiftedPungs.isPureShiftedPungs(pungs[1], pungs[2], pungs[3])
      ) {
        return
      }
      if (pungs[3] - pungs[0] === 3 && pungs[3] % 9 !== 0) {
        return
      }
    }
    this.fans.push(this.name)
  }

  static isPureShiftedPungs(tile1, tile2, tile3) {
    return tile2 - tile1 === 1 && tile3 - tile2 === 1 && tile1 % 9 < 7 && tile1 < tilesMap.EAST_WIND
  }
}