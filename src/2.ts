import * as RA from 'fp-ts/ReadonlyArray'
import * as T from 'fp-ts/Tuple'
import { pipe } from 'fp-ts/function'
import { lines } from 'fp-ts-std/String'
import { product } from 'fp-ts-std/Array'
import fs from 'fs'

pipe(
  fs.readFileSync('./data/2.txt', 'utf-8'),
  lines,
  RA.map((instruction) => instruction.split(' ') as [string, string]),
  RA.map(T.mapSnd((distance) => parseInt(distance, 10))),
  RA.reduce([0, 0], ([x, y], [direction, distance]) => {
    switch (direction) {
      case 'down':
        return [x, y + distance]
      case 'up':
        return [x, y - distance]
      case 'forward':
        return [x + distance, y]
      default:
        return [x, y]
    }
  }),
  product,
  console.log
)

pipe(
  fs.readFileSync('./data/2.txt', 'utf-8'),
  lines,
  RA.map((instruction) => instruction.split(' ') as [string, string]),
  RA.map(T.mapSnd((distance) => parseInt(distance, 10))),
  RA.reduce([0, 0, 0], ([x, y, aim], [direction, distance]) => {
    switch (direction) {
      case 'down':
        return [x, y, aim + distance]
      case 'up':
        return [x, y, aim - distance]
      case 'forward':
        return [x + distance, y + distance * aim, aim]
      default:
        return [x, y, aim]
    }
  }),
  ([x, y]) => x * y,
  console.log
)
