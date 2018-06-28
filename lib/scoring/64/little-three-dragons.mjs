import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class LittleThreeDragons extends Fan {
  get name() {
    return '小三元'
  }

  _process() {
    if (!this.isPureNormalHand() || this.melds[0].tile < tilesMap.RED_DRAGON) {
      return
    }
    let dragonPungs = []
    for (let index = 1; index <= 4; ++index) {
      let meld = this.melds[index]
      if (meld.isPungOrKong() && meld.tile >= tilesMap.RED_DRAGON && meld.tile <= tilesMap.WHITE_DRAGON) {
        dragonPungs.push(meld)
      }
    }
    if (dragonPungs.length === 2) {
      this.fans.push(this.name)
      this.addOmittedFans(['双箭刻', '箭刻'])
    }
  }
}