import { domain } from "./domain"

export const setToolChain = domain.createEvent<string>('selecting tool')
export const setFileLoaded = domain.createEvent<string>('file is loaded')
export const setLineCoords = domain.createEvent<[number, number]>('setting line coords')
export const setPrevTool = domain.createEvent<string>('setting previous tool')
export const fillAutoLine = domain.createEvent<Array<[number, number]>>('setting auto line')

export const setZoom = domain.createEvent<number>('setting zoom value')