import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class ThreeSuitedTerminalChows extends Fan {
  get name() {
    return '三色双龙会'
  }

  _process() {
    if (!this.isPureNormalHand() || !this.isAllChows()) {
      return
    }
    if (this.melds[0].tile >= tilesMap.EAST_WIND || this.melds[0].tile % 9 != 4) {
      return
    }
    let suits = [0, 1, 2]
    suits.splice(Math.floor(this.melds[0].tile / 9), 1)
    if (
      this.melds[1].middleTile === 9 * suits[0] + 1
      && this.melds[2].middleTile === 9 * suits[0] + 7
      && this.melds[3].middleTile === 9 * suits[1] + 1
      && this.melds[4].middleTile === 9 * suits[1] + 7
    ) {
      this.fans.push(this.name)
      this.addOmittedFans(['平和', '喜相逢', '老少副', '无字'])
    }
  }
}