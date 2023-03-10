import { domain } from "./domain"

export const selectTool = domain.createEvent<string>('selecting tool')
export const setFileLoaded = domain.createEvent<string>('file is loaded')
export const setLineCoords = domain.createEvent<[number, number]>('setting line coords')