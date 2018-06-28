import Fan from "../fan"

export default class NineGates extends Fan {
  get name() {
    return '九莲宝灯'
  }

  _process() {
    if (this.hand.size !== 13 || this.melds.length !== 5) {
      return false
    }
    for (let suit = 0; suit < 3; ++suit) {
      if (this.hand.tiles[suit * 9] !== 3 || this.hand.tiles[suit * 9 + 8] !== 3) {
        continue
      }
      let ok = true
      for (let number = 2; number <= 8; ++number) {
        if (this.hand.tiles[suit * 9 + number - 1] !== 1) {
          ok = false
          break
        }
      }
      if (ok) {
        this.fans.push(this.name)
        this.addOmittedFans(['清一色', '门前清', '幺九刻'])
        return
      }
    }
  }
}