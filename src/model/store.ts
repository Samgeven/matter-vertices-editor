import { forward, sample } from "effector"
import { domain } from "./domain"
import { setFileLoaded, setLineCoords, setToolChain } from "./events"

export const $toolChain = domain.createStore<[string | null, string]>([null, 'line'])
export const $loadedFile = domain.createStore<string | null>(null)
export const $lineCoords = domain.createStore<Array<[number, number]>>([])

$toolChain.on(setToolChain, (state, payload) => [state[1], payload])

$loadedFile.on(setFileLoaded, (_, payload) => payload)
$lineCoords.on(setLineCoords, (state, payload) => [...state, payload])

// sample({
//   clock: selectTool,
//   source: $selectedTool,
//   target: setPrevTool
// })

$toolChain.watch((state, payload) => {console.log('prevTool state', state, payload)})