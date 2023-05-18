import { ControlConfig, ShapeSettings } from "../types"

export const SNACKBAR_MESSAGE = Object.freeze({
  EXPORT: 'Nothing to export yet',
  EMULATE: 'You must place more vertices to create matter body'
})

export const DEFAULT_SHAPE_SETTINGS: ShapeSettings = {
  xScale: 1,
  yScale: 1,
  xOffset: 0.5,
  yOffset: 0.5
}

export const CONTROLS: Array<ControlConfig> = [
  {
    label: 'xScale',
    min: 0,
    max: 2,
    defaultValue: 1
  },
  {
    label: 'yScale',
    min: 0,
    max: 2,
    defaultValue: 1
  },
  {
    label: 'xOffset',
    min: 0,
    max: 1,
    defaultValue: 0.5,
    step: 0.01
  },
  {
    label: 'yOffset',
    min: 0,
    max: 1,
    defaultValue: 0.5,
    step: 0.01
  },
]