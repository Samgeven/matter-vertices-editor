import { domain } from "./domain"
import { selectTool, setFileLoaded, setLineCoords } from "./events"

export const $selectedTool = domain.createStore('line')
export const $loadedFile = domain.createStore<string | null>(null)
export const $lineCoords = domain.createStore<Array<[number, number]>>([])

$selectedTool.on(selectTool, (_, payload) => payload)
$loadedFile.on(setFileLoaded, (_, payload) => payload)
$lineCoords.on(setLineCoords, (state, payload) => [...state, payload])

$lineCoords.watch(state => console.log(state))