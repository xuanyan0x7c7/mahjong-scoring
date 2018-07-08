import Fan, { isDragon } from '../fan'
import { orphans } from '../../utils'

export default class PungOfTerminalsOrHonors extends Fan {
  get name() {
    return '幺九刻'
  }

  _process() {
    for (let meld of this.melds) {
      if (
        meld.isPung() && orphans.includes(meld.tile) && !isDragon(meld.tile)
        && meld.tile !== this.hand.prevalentWind && meld.tile !== this.hand.seatWind
        && (!this.omittes.has(meld) || !this.omittes.get(meld).has(this.name))
      ) {
        this.addFan(this.name, [meld])
      }
    }
  }
}
