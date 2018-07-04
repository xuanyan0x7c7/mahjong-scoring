import testCase_88 from './88'
import testCase_64 from './64'
import testCase_48 from './48'
import testCase_32 from './32'
import testCase_24 from './24'
import testCase_16 from './16'

let testCaseFan = [
  [88, testCase_88],
  [64, testCase_64],
  [48, testCase_48],
  [32, testCase_32],
  [24, testCase_24],
  [16, testCase_16]
]

describe('Fan', function() {
  for (let [score, testCase] of testCaseFan) {
    describe(String(score), function() {
      for (let [name, handler] of Object.entries(testCase)) {
        it(name, handler)
      }
    })
  }
})
