import Fan from '../fan'

export default class TileHog extends Fan {
  get name() {
    return '四归一'
  }

  _process() {
    let found = false
    for (let tile = 0; tile < 34; ++tile) {
      if (
        this.hand.fullTiles[tile] === 4
        && this.hand.exposedKongs.every(kong => kong.tile !== tile)
        && this.hand.concealedKongs.every(kong => kong.tile !== tile)
      ) {
        this.fans.push(this.name)
        found = true
      }
    }
    return found
  }
}
