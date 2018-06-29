import Fan from "../fan"

export default class MixedStraight extends Fan {
  get name() {
    return '花龙'
  }

  precondition() {
    return this.isPureNormalHand()
  }

  _process() {
    let chows = this.melds.filter(meld => meld.isChow())
    if (chows.length < 3) {
      return false
    } 
    if (chows.length === 3) {
      if (MixedStraight.isMixedStraight(chows[0].middleTile, chows[1].middleTile, chows[2].middleTile)) {
        this.combinations.push(...chows)
      } else {
        return false
      }
    }
    if (chows.length === 4) {
      const indexesList = [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]]
      let ok = false
      for (let indexes of indexesList) {
        if (MixedStraight.isMixedStraight(
          chows[indexes[0]].middleTile, chows[indexes[1]].middleTile, chows[indexes[2]].middleTile
        )) {
          this.combinations.push(chows[indexes[0]], chows[indexes[1]], chows[indexes[2]])
          ok = true
          break
        }
      }
      if (!ok) {
        return false
      }
    }
    super._process()
    return true
  }

  static isMixedStraight(chow1, chow2, chow3) {
    if (
      Math.floor(chow1 / 9) === Math.floor(chow1 / 9)
      || Math.floor(chow1 / 9) === Math.floor(chow3 / 9)
      || Math.floor(chow2 / 9) === Math.floor(chow3 / 9)
    ) {
      return false
    }
    let numbers = [chow1 % 9, chow2 % 9, chow3 % 9]
    return numbers[0] * numbers[1] * numbers[2] === 28
      && numbers[0] + numbers[1] + numbers[2] === 12
  }
}