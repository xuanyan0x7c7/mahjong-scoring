import tilesList from './tiles.json'

export { tilesList }

export const tilesMap = {}
for (let index = 0; index < tilesList.length; ++index) {
  tilesMap[tilesList[index].name] = index
  tilesMap[tilesList[index].character] = index
}

export const orphans = [
  tilesMap.ONE_CHARACTER, tilesMap.NINE_CHARACTERS,
  tilesMap.ONE_DOT, tilesMap.NINE_DOTS,
  tilesMap.ONE_BAMBOO, tilesMap.NINE_BAMBOO,
  tilesMap.EAST_WIND, tilesMap.SOUTH_WIND, tilesMap.WEST_WIND, tilesMap.NORTH_WIND,
  tilesMap.RED_DRAGON, tilesMap.GREEN_DRAGON, tilesMap.WHITE_DRAGON
]

export const knittedList = [
  [0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]
].map(offset => [
  tilesMap.ONE_CHARACTER + offset[0],
  tilesMap.ONE_CHARACTER + offset[0] + 3,
  tilesMap.ONE_CHARACTER + offset[0] + 6,
  tilesMap.ONE_DOT + offset[1],
  tilesMap.ONE_DOT + offset[1] + 3,
  tilesMap.ONE_DOT + offset[1] + 6,
  tilesMap.ONE_BAMBOO + offset[2],
  tilesMap.ONE_BAMBOO + offset[2] + 3,
  tilesMap.ONE_BAMBOO + offset[2] + 6
])
