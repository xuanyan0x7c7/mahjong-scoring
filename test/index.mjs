import testCase_88 from './88'
import testCase_64 from './64'
import testCase_48 from './48'
import testCase_32 from './32'

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
  describe('48', function() {
    for (let [name, handler] of Object.entries(testCase_48)) {
      it(name, handler)
    }
  })
  describe('32', function() {
    for (let [name, handler] of Object.entries(testCase_32)) {
      it(name, handler)
    }
  })
})
