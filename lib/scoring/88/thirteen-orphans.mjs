import Fan from "../fan"
import Meld from "../../meld";

export default class ThirteenOrphans extends Fan {
  get name() {
    return '十三幺'
  }

  _process() {
    if (this.melds[0].type === Meld.THIRTEEN_ORPHANS) {
      this.fans.push(this.name)
      this.addOmittedFans(['五门齐', '门前清'])
    }
  }
}