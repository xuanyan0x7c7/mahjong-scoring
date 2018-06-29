import Fan from "../fan"
import { orphans } from "../../utils"

export default class AllTerminalsAndHonors extends Fan {
  get name() {
    return '混幺九'
  }

  precondition() {
    return this.isAllInList(orphans) && this.suitMask > 8 && this.suitMask % 8 !== 0
  }

  get omittedFans() {
    return ['碰碰和', '全带幺', '幺九刻']
  }
}