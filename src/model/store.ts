import { guard, sample } from "effector"
import { domain } from "./domain"
import { fillAutoLine, resetLineAction, setFileLoaded, setImageCenter, setLineCoords, setToolChain, setZoom, showEmulation } from "./events"
import { Vertices } from "matter-js"

export const $toolChain = domain.createStore<[string | null, string]>([null, 'line'])
export const $loadedFile = domain.createStore<string | null>(null)
export const $lineCoords = domain.createStore<Array<{x: number, y: number}>>([])
export const $zoomValue = domain.createStore<number>(100)
export const $emulationZone = domain.createStore<boolean>(false)
export const $imageCenter = domain.createStore<{x: number, y: number} | null>(null)

$toolChain.on(setToolChain, (state, payload) => [state[1], payload])
$loadedFile.on(setFileLoaded, (_, payload) => payload)

$lineCoords.on(setLineCoords, (state, payload) => [...state, payload])
$lineCoords.on(fillAutoLine, (_, payload) => payload)

$zoomValue.on(setZoom, (_, payload) => payload)
$emulationZone.on(showEmulation, (_, payload) => payload)

$imageCenter.on(setImageCenter, (_, payload) => payload)

export const $shiftedLineCoords = $lineCoords.map(state => {
  const centerOfMass = Vertices.centre(state)
  const imageCenter = $imageCenter.getState()
  if (!imageCenter) {
    return state
  }
  return state.map((el) => {
    const deltaX = centerOfMass.x - imageCenter.x
    const deltaY = centerOfMass.y - imageCenter.y

    return { x: el.x - 50, y: el.y - 50 }
  })
})

sample({
  clock: resetLineAction,
  source: $lineCoords,
  fn: (store) => {
    return store.slice(0, -1)
  },
  target: $lineCoords
})

guard({
  clock: setFileLoaded,
  filter: (_, clock) => {
    return clock === null
  },
  source: [],
  target: $lineCoords
})