import { domain } from "./domain"

export const setToolChain = domain.createEvent<string>('selecting tool')
export const setFileLoaded = domain.createEvent<string | null>('file is loaded/unloaded')
export const setLineCoords = domain.createEvent<[number, number]>('setting line coords')
export const setPrevTool = domain.createEvent<string>('setting previous tool')
export const fillAutoLine = domain.createEvent<Array<[number, number]>>('setting auto line')
export const setZoom = domain.createEvent<number>('setting zoom value')
export const resetLineAction = domain.createEvent('resetting last line action')
export const showEmulation = domain.createEvent<boolean>('showing the emulation')