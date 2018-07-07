import Fan from '../fan'

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
            let type = getCombinationType(chow1, chow2.chow)
            if (type && !chow2.fans.includes(type)) {
              chow2.fans.push(type)
              this.addFan(type, [chow1, chow2.chow])
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
            let type = getCombinationType(chow1, chow2)
            if (type) {
              this.addFan(type, [chow1, chow2])
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
  }
}

function getCombinationType(chow1, chow2) {
  let tile1 = chow1.middleTile
  let tile2 = chow2.middleTile
  if (tile1 % 9 === tile2 % 9) {
    if (tile1 === tile2) {
      return '一般高'
    } else {
      return '喜相逢'
    }
  } else if (Math.floor(tile1 / 9) === Math.floor(tile2 / 9)) {
    if (Math.abs(tile1 - tile2) === 3) {
      return '连六'
    } else if ((tile1 % 9) * (tile2 % 9) === 7) {
      return '老少副'
    }
  }
  return null
}
