import Bitset from './bitset'
import { tilesMap } from '../utils'

export default class Fan {
  constructor(hand, melds, isSingleWait, fans, storage) {
    this.hand = hand
    this.melds = melds
    this.isSingleWait = isSingleWait
    this.fans = fans
    if (Object.keys(storage).length === 0) {
      storage.omittes = new Map()
      storage.combinations = []
    }
    this.storage = storage
    this.omittes = storage.omittes
    this.combinations = storage.combinations
    this._mask = storage.mask
    this._suitMask = storage.suitMask
  }

  get name() {
    throw 'NotImplemented'
  }

  get names() {
    return [this.name]
  }

  process() {
    if (this.omittes.has(null) && this.names.some(name => this.omittes.get(null).has(name))) {
      return
    }
    let melds = this.precondition()
    if (melds) {
      this.fansFound = false
      this._process(melds)
      if (this.fansFound) {
        this.addOmittes(this.omittedFans)
      }
    }
  }

  _process(melds) {
    if (melds instanceof Array) {
      this.addFan(this.name, melds)
    } else {
      this.addFan(this.name)
    }
  }

  precondition() {
    return true
  }

  get omittedFans() {
    return []
  }

  addFan(name, melds = []) {
    this.fans.push({name, melds})
    this.fansFound = true
  }

  addOmittes(fans, meld = null) {
    if (!this.omittes.has(meld)) {
      this.omittes.set(meld, new Set())
    }
    for (let fan of fans) {
      this.omittes.get(meld).add(fan)
    }
  }

  getOmittes(meld = null) {
    return this.omittes.get(meld) || new Set()
  }

  isAllInList(list) {
    for (let tile = 0; tile < 34; ++tile) {
      if (this.hand.fullTiles[tile] > 0 && !list.includes(tile)) {
        return false
      }
    }
    return true
  }

  isNormalHand() {
    return this.melds.length === 3 || this.melds.length === 5
  }

  isPureNormalHand() {
    return this.melds.length === 5
  }

  isSevenPairs() {
    return this.melds.length === 7
  }

  isFullyKnitted() {
    return this.melds[0].isFullyKnitted()
  }

  isThirteenOrphans() {
    return this.melds[0].isThirteenOrphans()
  }

  isAllPungs() {
    if (this.melds.length !== 5) {
      return false
    }
    for (let index = 1; index <= 4; ++index) {
      if (!this.melds[index].isPung()) {
        return false
      }
    }
    return true
  }

  isAllChows() {
    if (this.melds.length === 3) {
      return this.melds[1].isChow()
    }
    if (this.melds.length !== 5) {
      return false
    }
    for (let index = 1; index <= 4; ++index) {
      if (!this.melds[index].isChow()) {
        return false
      }
    }
    return true
  }

  isConcealedHand() {
    return this.hand.chows.length === 0 && this.hand.pungs.length === 0 && this.hand.exposedKongs.length === 0
  }

  get mask() {
    if (this._mask != null) {
      return this._mask
    }
    let numbersMask = 0
    let honorsMask = 0
    for (let tile = 0; tile < 27; ++tile) {
      if (this.hand.fullTiles[tile] > 0) {
        numbersMask |= 1 << tile
      }
    }
    for (let tile = 27; tile < 34; ++tile) {
      if (this.hand.fullTiles[tile] > 0) {
        honorsMask |= 1 << (tile - 27)
      }
    }
    this.storage.mask = this._mask = new Bitset(numbersMask, honorsMask)
    return this._mask
  }

  get suitMask() {
    if (this._suitMask != null) {
      return this._suitMask
    }
    this._suitMask = 0
    if (!this.mask.and(Bitset.characters).isZero()) {
      this._suitMask |= 1
    }
    if (!this.mask.and(Bitset.dots).isZero()) {
      this._suitMask |= 2
    }
    if (!this.mask.and(Bitset.bamboo).isZero()) {
      this._suitMask |= 4
    }
    if (!this.mask.and(Bitset.winds).isZero()) {
      this._suitMask |= 8
    }
    if (!this.mask.and(Bitset.dragons).isZero()) {
      this._suitMask |= 16
    }
    this.storage.suitMask = this._suitMask
    return this._suitMask
  }

  isAllInMask(numbersMask, honorsMask) {
    return this.mask.and(new Bitset(numbersMask, honorsMask).not()).isZero()
  }
}

export function isWind(tile) {
  return tile >= tilesMap.EAST_WIND && tile <= tilesMap.NORTH_WIND
}
  
export function isDragon(tile) {
  return tile >= tilesMap.RED_DRAGON
}
  
export function isHonor(tile) {
  return tile >= tilesMap.EAST_WIND
}

export function* choose3From4(list) {
  yield [list[0], list[1], list[2]]
  yield [list[0], list[1], list[3]]
  yield [list[0], list[2], list[3]]
  yield [list[1], list[2], list[3]]
}
