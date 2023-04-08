import { domain } from "./domain"
import { fillAutoLine, setFileLoaded, setLineCoords, setToolChain, setZoom } from "./events"

export const $toolChain = domain.createStore<[string | null, string]>([null, 'line'])
export const $loadedFile = domain.createStore<string | null>(null)
export const $lineCoords = domain.createStore<Array<[number, number]>>([])
export const $zoomValue = domain.createStore<number>(100)

$toolChain.on(setToolChain, (state, payload) => [state[1], payload])

$loadedFile.on(setFileLoaded, (_, payload) => payload)
$lineCoords.on(setLineCoords, (state, payload) => [...state, payload])
$lineCoords.on(fillAutoLine, (_, payload) => payload)

$toolChain.watch((state, payload) => {console.log('prevTool state', state, payload)})

$zoomValue.on(setZoom, (_, payload) => payload)