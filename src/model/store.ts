import { sample } from "effector"
import { domain } from "./domain"
import { fillAutoLine, resetLineAction, setFileLoaded, setLineCoords, setPolygonFromImage, setShapeSettings, setToolChain, setZoom, showEmulation } from "./events"
import { Vector } from "matter-js"
import { ShapeSettings } from "../types"
import { DEFAULT_SHAPE_SETTINGS } from "../data"

export const $toolChain = domain.createStore<[string | null, string]>([null, 'line'])
export const $loadedFile = domain.createStore<string | null>(null)
export const $lineCoords = domain.createStore<Array<Vector>>([])
export const $polygonFromImage = domain.createStore<Array<Vector>>([])
export const $zoomValue = domain.createStore<number>(100)
export const $emulationZone = domain.createStore<boolean>(false)
export const $shapeSettings = domain.createStore<ShapeSettings>(DEFAULT_SHAPE_SETTINGS)

$toolChain.on(setToolChain, (state, payload) => [state[1], payload])
$loadedFile.on(setFileLoaded, (_, payload) => payload)

$lineCoords.on(setLineCoords, (state, payload) => [...state, payload])
$lineCoords.on(fillAutoLine, (_, payload) => payload)
$polygonFromImage.on(fillAutoLine, (_, payload) => payload)

$zoomValue.on(setZoom, (_, payload) => payload)
$emulationZone.on(showEmulation, (_, payload) => payload)
$shapeSettings.on(setShapeSettings, (state, payload) => {
  return {
    ...state,
    ...payload
  }
})

const storesToReset = [$zoomValue, $lineCoords, $toolChain]

const resetImage = sample({
  clock: setFileLoaded,
  filter: (clock) => {
    return clock === null
  },
})

storesToReset.forEach(store => {
  store.reset(resetImage)
})

sample({
  clock: resetLineAction,
  source: $lineCoords,
  fn: (store) => {
    return store.slice(0, -1)
  },
  target: $lineCoords
})

sample({
  clock: setToolChain,
  filter: (_, clock) => {
    return clock === 'auto-line'
  },
  source: setPolygonFromImage,
  target: fillAutoLine
})
