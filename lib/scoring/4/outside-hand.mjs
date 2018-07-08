import Fan from '../fan'
import { orphans } from '../../utils'

export default class OutsideHand extends Fan {
  get name() {
    return '全带幺'
  }

  precondition() {
    if (this.isPureNormalHand() && this.melds.every(meld => {
      if (meld.isChow()) {
        return [1, 7].includes(meld.middleTile % 9)
      } else {
        return orphans.includes(meld.tile)
      }
    })) {
      return this.melds
    }
  }
}
