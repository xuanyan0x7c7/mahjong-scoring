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
    if (this.precondition()) {
      if (this._process()) {
        this.addOmittes(this.omittedFans)
      }
    }
  }

  _process() {
    this.fans.push(this.name)
    return true
  }

  precondition() {
    return true
  }

  get omittedFans() {
    return []
  }

  addOmittes(fans, meld = null) {
    if (!this.omittes.has(meld)) {
      this.omittes.set(meld, new Set())
    }
    for (let fan of fans) {
      this.omittes.get(meld).add(fan)
    }
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
    if (this.mask.and(Bitset.characters.not()).isZero()) {
      this._suitMask |= 1
    }
    if (this.mask.and(Bitset.dots.not()).isZero()) {
      this._suitMask |= 2
    }
    if (this.mask.and(Bitset.bamboo.not()).isZero()) {
      this._suitMask |= 4
    }
    if (this.mask.and(Bitset.winds.not()).isZero()) {
      this._suitMask |= 8
    }
    if (this.mask.and(Bitset.dragons.not()).isZero()) {
      this._suitMask |= 16
    }
    this.storage.suitMask = this._suitMask
    return this._suitMask
  }

  isAllInMask(numbersMask, honorsMask) {
    return this.mask.and(new Bitset(numbersMask, honorsMask).not()).isZero()
  }

  static isWind(tile) {
    return tile >= tilesMap.EAST_WIND && tile <= tilesMap.NORTH_WIND
  }

  static isDragon(tile) {
    return tile >= tilesMap.RED_DRAGON
  }

  static isHonor(tile) {
    return tile >= tilesMap.EAST_WIND
  }
}
