import Fan from '../fan'
import { orphans } from '../../utils'

export default class PungOfTerminalsOrHonors extends Fan {
  get name() {
    return '幺九刻'
  }

  _process() {
    let found = false
    for (let meld of this.melds) {
      if (
        meld.isPung() && orphans.includes(meld.tile) && !Fan.isDragon(meld.tile)
        && meld.tile !== this.hand.prevalentWind + 27 && meld.tile !== this.hand.seatWind + 27
        && (!this.omittes.has(meld) || !this.omittes.get(meld).has(this.name))
      ) {
        this.fans.push(this.name)
        found = true
      }
    }
    return found
  }
}
