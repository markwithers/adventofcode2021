import * as RA from 'fp-ts/ReadonlyArray';
import * as T from 'fp-ts/Tuple';
import {transpose, sum} from 'fp-ts-std/ReadonlyArray';
import {lines} from 'fp-ts-std/String';
import {pipe} from 'fp-ts/lib/function';
import fs from 'fs';

pipe(
  fs.readFileSync('./1.txt', 'utf-8'),
  lines,
  RA.map(string => parseInt(string, 10)),
  RA.reduce<number, [number, number]>([0, Infinity], ([inc, last], num) =>
    num > last ? [inc + 1, num] : [inc, num],
  ),
  T.fst,
  console.log,
);

pipe(
  fs.readFileSync('./1.txt', 'utf-8'),
  lines,
  RA.map(string => parseInt(string, 10)),
  numbers =>
    transpose([numbers, RA.dropLeft(1)(numbers), RA.dropLeft(2)(numbers)]),
  RA.map(sum),
  RA.reduce<number, [number, number]>([0, Infinity], ([inc, last], num) =>
    num > last ? [inc + 1, num] : [inc, num],
  ),
  T.fst,
  console.log,
);
