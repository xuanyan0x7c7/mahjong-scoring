import Fan from '../fan'

export default class FullFlush extends Fan {
  get name() {
    return '清一色'
  }

  precondition() {
    return [1, 2, 4].includes(this.suitMask)
  }

  get omittedFans() {
    return ['无字']
  }
}
