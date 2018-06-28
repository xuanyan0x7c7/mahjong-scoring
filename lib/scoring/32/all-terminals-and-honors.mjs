import Fan from "../fan"
import { tilesMap, orphans } from "../../utils"

export default class AllTerminalsAndHonors extends Fan {
  get name() {
    return '混幺九'
  }

  _process() {
    if (
      this.isAllInList(orphans)
      && !this.fans.includes('清幺九') && !this.fans.includes('字一色')
    ) {
      this.fans.push(this.name)
      this.addOmittedFans(['碰碰和', '全带幺', '幺九刻'])
    }
  }
}