import { guard, sample } from "effector"
import { domain } from "./domain"
import { fillAutoLine, resetLineAction, setFileLoaded, setLineCoords, setToolChain, setZoom, showEmulation } from "./events"

export const $toolChain = domain.createStore<[string | null, string]>([null, 'line'])
export const $loadedFile = domain.createStore<string | null>(null)
export const $lineCoords = domain.createStore<Array<[number, number]>>([])
export const $zoomValue = domain.createStore<number>(100)
export const $emulationZone = domain.createStore<boolean>(false)

$toolChain.on(setToolChain, (state, payload) => [state[1], payload])
$loadedFile.on(setFileLoaded, (_, payload) => payload)

$lineCoords.on(setLineCoords, (state, payload) => [...state, payload])
$lineCoords.on(fillAutoLine, (_, payload) => payload)

$zoomValue.on(setZoom, (_, payload) => payload)
$emulationZone.on(showEmulation, (_, payload) => payload)

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