import Fan from '../fan'
import { tilesMap } from '../../utils'

export default class LowerTiles extends Fan {
  get name() {
    return '全中'
  }

  precondition() {
    return this.isAllInMask(0o070070070, 0)
  }
  
  get omittedFans() {
    return ['断幺', '无字']
  }
}
