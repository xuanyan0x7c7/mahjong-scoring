import testCase_88 from './88'
import testCase_64 from './64'

describe('Fan', function() {
  describe('88', function() {
    for (let [name, handler] of Object.entries(testCase_88)) {
      it(name, handler)
    }
  })
  describe('64', function() {
    for (let [name, handler] of Object.entries(testCase_64)) {
      it(name, handler)
    }
  })
})
