export default class Bitset {
  constructor(numbers, honors) {
    this.numbers = numbers
    this.honors = honors
  }

  equals(n) {
    return this.numbers === n.numbers && this.honors === n.honors
  }

  isZero() {
    return this.numbers === 0 && this.honors === 0
  }

  and(n) {
    return new Bitset(this.numbers & n.numbers, this.honors & n.honors)
  }

  or(n) {
    return new Bitset(this.numbers | n.numbers, this.honors | n.honors)
  }

  not() {
    return new Bitset(~this.numbers & 0o777777777, ~this.honors & 0x7f)
  }

  xor(n) {
    return new Bitset(this.numbers ^ n.numbers, this.honors ^ n.honors)
  }
}

Bitset.characters = new Bitset(0o777, 0)
Bitset.dots = new Bitset(0o777000, 0)
Bitset.bamboo = new Bitset(0o777000000, 0)
Bitset.winds = new Bitset(0, 0xf)
Bitset.dragons = new Bitset(0, 0x70)
Bitset.honors = new Bitset(0, 0x7f)
