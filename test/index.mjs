import testCase_88 from './88'
import testCase_64 from './64'
import testCase_48 from './48'
import testCase_32 from './32'
import testCase_24 from './24'
import testCase_16 from './16'
import testCase_12 from './12'
import testCase_8 from './8'
import testCase_6 from './6'
import testCase_4 from './4'
import testCase_2 from './2'
import testCase_1 from './1'

let testCaseFan = [
  [88, testCase_88],
  [64, testCase_64],
  [48, testCase_48],
  [32, testCase_32],
  [24, testCase_24],
  [16, testCase_16],
  [12, testCase_12],
  [8, testCase_8],
  [6, testCase_6],
  [4, testCase_4],
  [2, testCase_2],
  [1, testCase_1]
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
