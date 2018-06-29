import Fan from "../fan"

export default class FullFlush extends Fan {
  get name() {
    return '清一色'
  }

  _process() {
    let mask = 0
    for (let tile = 0; tile < 34; ++tile) {
      if (this.fullTiles[tile] > 0) {
        mask |=  1 << Math.floor(tile / 9)
      }
    }
    if (mask === 1 || mask === 2 || mask === 4) {
      this.fans.push(this.name)
      this.addOmittedFans(['无字'])
    }
  }
}