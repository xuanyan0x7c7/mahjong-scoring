require = require('esm')(module)

describe('Fan', function() {
  for (let score of [88, 64, 48, 32, 24, 16, 12, 8, 6, 4, 2, 1]) {
    describe(score + '-point fans', function() {
      let testCase = (require('./' + score)).default
      for (let [name, handler] of Object.entries(testCase)) {
        it(name, handler)
      }
    })
  }
})
