import Fan from "../fan"

export default class TwoChows extends Fan {
  get names() {
    return ['一般高', '喜相逢', '连六', '老少副']
  }

  _process() {
    let singles = this.melds.filter(
      meld => meld.isChow() && this.combinations.every(combination => !combination.includes(meld))
    )
    let sets = []
    for (let combination of this.combinations) {
      let chowCombination = combination.filter(meld => meld.isChow())
      if (chowCombination.length > 0) {
        sets.push(chowCombination.map(chow => ({chow, fans: []})))
      }
    }
    hasCombination:
    while (true) {
      if (singles.length === 0) {
        break
      }
      for (let chow1 of singles) {
        for (let set of sets) {
          for (let chow2 of set) {
            let type = TwoChows.getCombinationType(chow1.middleTile, chow2.chow.middleTile)
            if (type && !chow2.fans.includes(type)) {
              chow2.fans.push(type)
              set.push({chow: chow1, fans: [type]})
              singles.splice(singles.indexOf(chow1), 1)
              continue hasCombination
            }
          }
        }
      }
      for (let chow1 of singles) {
        for (let chow2 of singles) {
          if (chow1 !== chow2) {
            let type = TwoChows.getCombinationType(chow1.middleTile, chow2.middleTile)
            if (type) {
              sets.push([
                {chow: chow1, fans: [type]},
                {chow: chow2, fans: [type]}
              ])
              singles = singles.filter(chow => chow !== chow1 && chow !== chow2)
              continue hasCombination
            }
          }
        }
      }
      break
    }
    let fanCount = [0, 0, 0, 0]
    for (let set of sets) {
      for (let {fans} of set) {
        for (let fan of fans) {
          ++fanCount[this.names.indexOf(fan)]
        }
      }
    }
    let found = false
    for (let index = 0; index < 4; ++index) {
      fanCount[index] >>>= 1
      if (fanCount[index]) {
        for (let i = 0; i < fanCount[index]; ++i) {
          this.fans.push(this.names[index])
        }
      }
    }
    return found
  }

  static getCombinationType(chow1, chow2) {
    if (chow1 % 9 === chow2 % 9) {
      if (chow1 === chow2) {
        return '一般高'
      } else {
        return '喜相逢'
      }
    } else if (Math.floor(chow1 / 9) === Math.floor(chow2 / 9)) {
      if (Math.floor(chow1 - chow2) === 3) {
        return '连六'
      } else if ((chow1 % 9) * (chow2 % 9) === 7) {
        return '老少副'
      }
    }
    return null
  }
}