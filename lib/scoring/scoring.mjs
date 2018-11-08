import fanMap from './fan.json'
import {
  BigFourWinds, BigThreeDragons, AllGreen, NineGates, FourKongs, SevenShiftedPairs, ThirteenOrphans
} from './88'
import {
  AllTerminals, LittleFourWinds, LittleThreeDragons, AllHonors, FourConcealedPungs, PureTerminalChows
} from './64'
import { QuadrupleChow, FourPureShiftedPungs } from './48'
import { FourPureShiftedChows, ThreeKongs, AllTerminalsAndHonors } from './32'
import {
  SevenPairs, GreaterHonorsAndKnittedTiles, AllEvenPungs,
  FullFlush, PureTripleChow, PureShiftedPungs,
  UpperTiles, MiddleTiles, LowerTiles
} from './24'
import {
  PureShiftedChows, ThreeSuitedTerminalChows, AllFives, TriplePung, ThreeConcealedPungs
} from './16'
import {
  LesserHonorsAndKnittedTiles, KnittedStraight, UpperFour, LowerFour, BigThreeWinds
} from './12'
import {
  MixedStraight, ReversibleTiles, MixedTripleChow, MixedShiftedPungs, LastTile, WinByKong
} from './8'
import {
  AllPungs, HalfFlush, MixedShiftedChows, AllTypes, MeldedHand, TwoConcealedKongs, TwoDragonsPungs
} from './6'
import { MeldedAndConcealedKongs } from './5'
import { OutsideHand, FullyConcealedHand, TwoMeldedKongs, FourthTile } from './4'
import {
  DragonPung, PrevalentWind, SeatWind, ConcealedHand, AllChows, TileHog,
  DoublePung, TwoConcealedPungs, ConcealedKong, AllSimples
} from './2'
import {
  TwoChows, PungOfTerminalsOrHonors, MeldedKong, OneVoidedSuit, NoHonors, SingleWait, SelfDrawn
} from './1'

let fanIndex = {}
{
  let index = 0
  for (let name of Object.keys(fanMap)) {
    fanIndex[name] = index++
  }
}

const procedureList = [
  BigFourWinds, BigThreeDragons, AllGreen, NineGates, FourKongs, SevenShiftedPairs, ThirteenOrphans,
  AllTerminals, LittleFourWinds, LittleThreeDragons, AllHonors, FourConcealedPungs, PureTerminalChows,
  QuadrupleChow, FourPureShiftedPungs,
  FourPureShiftedChows, ThreeKongs, AllTerminalsAndHonors,
  SevenPairs, GreaterHonorsAndKnittedTiles, AllEvenPungs,
  FullFlush, PureTripleChow, PureShiftedPungs,
  UpperTiles, MiddleTiles, LowerTiles,
  PureShiftedChows, ThreeSuitedTerminalChows, AllFives, TriplePung, ThreeConcealedPungs,
  LesserHonorsAndKnittedTiles, KnittedStraight, UpperFour, LowerFour, BigThreeWinds,
  MixedStraight, ReversibleTiles, MixedTripleChow, MixedShiftedPungs, LastTile, WinByKong,
  AllPungs, HalfFlush, MixedShiftedChows, AllTypes, MeldedHand, TwoConcealedKongs, TwoDragonsPungs,
  MeldedAndConcealedKongs,
  OutsideHand, FullyConcealedHand, TwoMeldedKongs, FourthTile,
  DragonPung, PrevalentWind, SeatWind, ConcealedHand, AllChows, TileHog,
  DoublePung, TwoConcealedPungs, ConcealedKong, AllSimples,
  TwoChows, PungOfTerminalsOrHonors, MeldedKong, OneVoidedSuit, NoHonors, SingleWait, SelfDrawn
]

export default class Scoring {
  constructor(hand, melds, isSingleWait) {
    this.hand = hand
    this.melds = melds
    this.isSingleWait = isSingleWait
    this.fans = []
    this.storage = {}
  }

  getScore() {
    for (let Class of procedureList) {
      new Class(
        this.hand,
        this.melds,
        this.isSingleWait,
        this.fans,
        this.storage
      ).process()
    }
    return {
      score: this.fans.map(({name}) => fanMap[name]).reduce((x, y) => x + y, 0),
      fans: this.fans.sort((x, y) => fanIndex[x.name] - fanIndex[y.name])
    }
  }
}
