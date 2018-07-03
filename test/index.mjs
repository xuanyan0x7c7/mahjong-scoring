import testCase_88 from './88'

describe('Fan', function() {
  describe('88', function() {
    for (let [name, handler] of Object.entries(testCase_88)) {
      it(name, handler)
    }
  })
})
