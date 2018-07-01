import fanMap from './fan.json'
import {
  BigFourWinds, BigThreeDragons, AllGreen, NineGates, FourKongs, SevenShiftedPairs, ThirteenOrphans
} from './88'
import {
  AllTerminals, LittleFourWinds, LittleThreeDragons, AllHonors, FourConcealedPungs, PureTerminalChows
} from './64'
import { QuadrupleChow, FourPureShiftedPungs } from './48'
import { FourShiftedChows, ThreeKongs, AllTerminalsAndHonors } from './32'
import {
  SevenPairs, GreaterHonorsAndKnittedTiles, AllEvenPungs,
  FullFlush, PureTripleChow, PureShiftedPungs,
  UpperTiles, MiddleTiles, LowerTiles
} from './24'
import {
  ThreeSuitedTerminalChows, PureShiftedChows, AllFives, TriplePung, ThreeConcealedPungs
} from './16'
import {
  LesserHonorsAndKnittedTiles, KnittedStraight, UpperFour, LowerFour, BigThreeWinds
} from './12'
import {
  MixedStraight, ReversibleTiles, MixedTripleChow, MixedShiftedPungs,
  LastTile, LastKongTile, TwoConcealedKongs
} from './8'
import {
  AllPungs, HalfFlush, MixedShiftedChows, AllTypes, MeldedHand, TwoDragonPungs
} from './6'
import { OutsideHand, FullyConcealedHand, TwoMeldedKongs, FourthTile } from './4'
import {
  DragonPung, PrevalentWind, SeatWind, ConcealedHand, AllChows, TileHog,
  DoublePung, TwoConcealedPungs, ConcealedKong, AllSimples
} from './2'
import {
  TwoChows, PungOfTerminalsOrHonors, MeldedKong, OneVoidedSuit, NoHonorTiles, SingleWait, SelfDrawn
} from './1'

const procedureList = [
  BigFourWinds, BigThreeDragons, AllGreen, NineGates, FourKongs, SevenShiftedPairs, ThirteenOrphans,
  AllTerminals, LittleFourWinds, LittleThreeDragons, AllHonors, FourConcealedPungs, PureTerminalChows,
  QuadrupleChow, FourPureShiftedPungs,
  FourShiftedChows, ThreeKongs, AllTerminalsAndHonors,
  SevenPairs, GreaterHonorsAndKnittedTiles, AllEvenPungs,
  FullFlush, PureTripleChow, PureShiftedPungs,
  UpperTiles, MiddleTiles, LowerTiles,
  ThreeSuitedTerminalChows, PureShiftedChows, AllFives, TriplePung, ThreeConcealedPungs,
  LesserHonorsAndKnittedTiles, KnittedStraight, UpperFour, LowerFour, BigThreeWinds,
  MixedStraight, ReversibleTiles, MixedTripleChow, MixedShiftedPungs,
  LastTile, LastKongTile, TwoConcealedKongs,
  AllPungs, HalfFlush, MixedShiftedChows, AllTypes, MeldedHand, TwoDragonPungs,
  OutsideHand, FullyConcealedHand, TwoMeldedKongs, FourthTile,
  DragonPung, PrevalentWind, SeatWind, ConcealedHand, AllChows, TileHog,
  DoublePung, TwoConcealedPungs, ConcealedKong, AllSimples,
  TwoChows, PungOfTerminalsOrHonors, MeldedKong, OneVoidedSuit, NoHonorTiles, SingleWait, SelfDrawn
]

export default class Scoring {
  constructor(hand, melds, isSingleWait) {
    this.hand = hand
    this.melds = melds
    this.isSingleWait = isSingleWait
    this.fans = []
    this.omittes = new Map()
    this.combinations = []
  }

  getScore() {
    for (let Class of procedureList) {
      new Class(
        this.hand,
        this.melds,
        this.fans,
        {
          omittes: this.omittes,
          combinations: this.combinations
        },
        {
          isSelfDrawn: this.isSelfDrawn,
          isFourthTile: this.isFourthTile,
          isKong: this.isKong,
          isLastTile: this.isLastTile,
          isSingleWait: this.isSingleWait
        }
      ).process()
    }
    return {
      score: this.fans.map(fan => fanMap[fan]).reduce((x, y) => x + y, 0),
      fans: this.fans
    }
  }
}
