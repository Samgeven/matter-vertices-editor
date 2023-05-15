import { Vector } from "matter-js"
import { EditingTools } from "../types"
import { domain } from "./domain"
import { ShapeSettings } from "./store"

export const setFileLoaded = domain.createEvent<string | null>('file is loaded/unloaded')

export const setToolChain = domain.createEvent<EditingTools>('selecting tool')
export const setPrevTool = domain.createEvent<string>('setting previous tool')
export const resetLineAction = domain.createEvent('resetting last line action')
export const setLineCoords = domain.createEvent<Vector>('setting line coords')
export const fillAutoLine = domain.createEvent<Vector[]>('setting auto line')

export const setZoom = domain.createEvent<number>('setting zoom value')
export const showEmulation = domain.createEvent<boolean>('showing the emulation')
export const setShapeSettings = domain.createEvent<Partial<ShapeSettings>>('setting shape settings')