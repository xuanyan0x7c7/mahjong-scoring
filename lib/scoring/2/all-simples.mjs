import Fan from '../fan'
import { orphans } from '../../utils'

export default class AllSimples extends Fan {
  get name() {
    return '断幺'
  }

  precondition() {
    let list = []
    for (let tile = 0; tile < 34; ++tile) {
      if (!orphans.includes(tile)) {
        list.push(tile)
      }
    }
    return this.isAllInList(list)
  }

  get omittedFans() {
    return ['无字']
  }
}
