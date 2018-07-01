import Fan from '../fan'
import { tilesMap } from '../../utils'

export default class BigFourWinds extends Fan {
  get name() {
    return '四暗刻'
  }

  precondition() {
    return this.melds.filter(meld => meld.isConcealedPung()).length === 4
  }

  get omittedFans() {
    return ['碰碰和', '门前清']
  }
}
