export type EditingTools = 'line' | 'hand' | 'auto-line'

export type ShapeTools = 'xScale' | 'yScale' | 'xOffset' | 'yOffset' | 'constraints'

export type ShapeSettings = {
  xScale: number
  yScale: number
  xOffset: number
  yOffset: number
  constraints?: number
}

export type ControlConfig = {
  label: ShapeTools
  min: number
  max: number
  defaultValue: number
  step?: number
}
