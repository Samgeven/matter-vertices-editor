export type EditingTools = 'line' | 'hand' | 'auto-line'

export type ShapeSettings = {
  xScale: number,
  yScale: number,
  xOffset: number,
  yOffset: number
}

export type ControlConfig = {
  label: 'xScale' | 'yScale' | 'xOffset' | 'yOffset',
  min: number,
  max: number,
  defaultValue: number,
  step?: number,
}