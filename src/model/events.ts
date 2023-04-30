import { domain } from "./domain"

export const setFileLoaded = domain.createEvent<string | null>('file is loaded/unloaded')

export const setToolChain = domain.createEvent<string>('selecting tool')
export const setPrevTool = domain.createEvent<string>('setting previous tool')
export const resetLineAction = domain.createEvent('resetting last line action')
export const setLineCoords = domain.createEvent<{x: number, y: number}>('setting line coords')
export const fillAutoLine = domain.createEvent<Array<{x: number, y: number}>>('setting auto line')

export const setZoom = domain.createEvent<number>('setting zoom value')
export const showEmulation = domain.createEvent<boolean>('showing the emulation')

export const setImageCenter = domain.createEvent<{x: number, y: number}>('setting image center')
export const setBodyOrigin = domain.createEvent<{x: number, y: number}>('setting matter body origin')