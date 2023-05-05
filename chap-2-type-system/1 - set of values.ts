// EMPTY set
const x: never = 1 // Error

// UNIT types / iteral types 
type A = 'A'
type B = 'B'

// DESCRIPTION of values in the domain of its type
const INTERFACE = () => {
  type UnionAB = A | B // 'A', 'B'
  type IntersectAB = A & B // never

  interface Person {
    name: string,
    sayHello: () => void
  }

  interface Lifespan {
    name: UnionAB,
    birth: Date
    death?: Date,
    startLife: () => void
  }

  type IntersectType = Lifespan & Person // have all properties, choose smaller set if duplicate
  const intersectFunc = (it: IntersectType) => {
    it.name // AB
    it.sayHello()
    it.startLife()
  }

  type UnionType = Lifespan | Person // have common properties, choose bigger set if duplicate
  const unionFunc = (ut: UnionType) => {
    ut.name // string
  }
}

// SUBSET of 
const EXTENDS = () => {
  interface v1 { x: number }
  interface v2 extends v1 { y: number }
  interface v3 extends v2 { z: number }

  const V1: v1 = { x: 0 }
  const V2: v2 = { x: 0, y: 0 }
  const V3: v3 = { x: 0, y: 0, z: 0 }

  const extendFunc = <K extends string>(val: any, key: K) => { }
  extendFunc(1, 'a')

  interface Point {
    x: number
    y: number
  }

  const pointFunc = <T, K extends keyof T>(val: T[], key: K) => { }
  const points: Point[] = [{ x: 0, y: 0 }, { x: 1, y: 0 }]
  pointFunc(points, 'x')
  pointFunc(points, 'y')
}

const SUBSET_SUPERSET = () => {
  // superset <-assignable- subset
  const ASSIGN_DIRECTION = () => {
    type NumberList = number[] // superset
    type NumberTuple = [number, number] // subset

    const list: NumberList = [1, 2]
    const tuple: NumberTuple = [1, 2]

    const list1: NumberList = tuple // OK: superset <-assignable- subset
    const tuple1: NumberTuple = list // ERROR: subset <-unassignable- superset
  }

  const DIFFERENT_TUPLE_LENGTH = () => {
    type Tuple2 = [number, number] // {0: number, 1: number, length: 2}
    type Tuple3 = [number, number, number] // {0: number, 1: number, 2: number, length: 3}
    const tuple2: Tuple2 = [1, 2]
    const tuple3: Tuple3 = tuple2 // ERROR: structure is different -> cant assign
  }
}

// ONLY work when result is Typescript's original type
const EXCLUDE_TYPE = () => {
  type T = Exclude<string | Date, string | number> // -> Date
  type NonZeroNums = Exclude<number, 0> // -> still number
}

const UNKNOWN = () => {
  // Cant access to any properties
  let a: unknown = ''
  a.
}

// Summary
/*
never                 - empty
literal type          - single element set
value assignable to T - value in T
T1 assignable to T2   - T1 in T2
T1 extends T2         - T1 in T2
T1 | T2               - T1 v T2 (union)
T1 & T2               - T1 ^ T2 (intersection)
unknown               - Universal set
*/
