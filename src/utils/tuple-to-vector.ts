export const tupleToVector = (arr: Array<[number, number]>) => {
  return arr.map(el => {
    return {x: el[0], y: el[1]}
  })
}