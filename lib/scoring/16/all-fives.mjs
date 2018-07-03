import Fan from '../fan'

export default class AllFives extends Fan {
  get name() {
    return '全带五'
  }

  precondition() {
    return this.isPureNormalHand()
      && this.melds.every(meld => {
        if (meld.isChow()) {
          return meld.middleTile % 9 === 3 || meld.middleTile % 9 === 4 || meld.middleTile % 9 === 5
        } else {
          return meld.tile % 9 === 4 && !Fan.isHonor(meld.tile)
        }
      })
  }

  get omittedFans() {
    return ['断幺', '无字']
  }
}
