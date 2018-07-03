import Fan from '../fan'
import { tilesMap } from '../../utils'

export default class UpperTiles extends Fan {
  get name() {
    return '全大'
  }

  precondition() {
    return this.isAllInMask(0o700700700, 0)
  }
  
  get omittedFans() {
    return ['大于五', '无字']
  }
}
