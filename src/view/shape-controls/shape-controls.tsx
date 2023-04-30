import { Button, Slider, Typography } from "@mui/material";
import { Composite, World } from "matter-js";

type ControlConfig = {
  label: 'xScale' | 'yScale' | 'xOffset' | 'yOffset',
  min: number,
  max: number,
  defaultValue: number,
  step?: number,
}

const CONTROLS: Array<ControlConfig> = [
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

const controlChangeHandler = (e: Event, world: World, controlProp: ControlConfig['label']) => {
  const allBodies = Composite.allBodies(world).filter(el => el.label === 'texture')
  const target = e.target as { value: number } | null

  for (const body of allBodies) {
    if (!body.render.sprite || !target) {
      return
    }
    body.render.sprite[controlProp] = target?.value
  }
}

const clearButtonHandler = (world: World) => {
  Composite.clear(world, true)
}

type ShapeControlsProps = {
  world: World,
  isShapeConvex?: boolean
}

export const ShapeControls = ({ world, isShapeConvex = true }: ShapeControlsProps): JSX.Element => {
  return (
    <div className="controls">
      {
        CONTROLS.map(el => (
          <>
            <Typography align="left" style={{ opacity: isShapeConvex ? 0.3 : 1 }}>{el.label}</Typography>
            <Slider
              aria-label={el.label}
              defaultValue={el.defaultValue}
              valueLabelDisplay="auto"
              step={el.step ?? 0.1}
              min={el.min}
              max={el.max}
              size='small'
              disabled={isShapeConvex}
              onChange={(e) => controlChangeHandler(e, world, el.label)}
            />
          </>
        ))
      }
      <Button 
        variant="contained" 
        style={{marginTop: '54px', fontSize: '12px'}}
        onClick={() => clearButtonHandler(world)}
      >
        Clear bodies
      </Button>
    </div>
  )
}
