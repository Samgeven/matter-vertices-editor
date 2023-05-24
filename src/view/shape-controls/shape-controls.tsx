import { Button, Slider, Typography } from "@mui/material";
import { Composite, World } from "matter-js";
import { setShapeSettings } from "../../model/events";
import { ControlConfig } from "../../types";
import { CONTROLS } from "../../data";
import { replaceAllConstraints } from "../../utils/apply-constraints";

const controlChangeHandler = (e: Event, world: World, controlProp: ControlConfig['label']) => {
  const allBodies = Composite.allBodies(world).filter(el => el.label === 'texture')
  const target = e.target as { value: number } | null

  setShapeSettings({
    [controlProp]: target?.value
  })

  if (controlProp === 'constraints') {
    const allComposites = Composite.allComposites(world).filter(el => el.label === 'composite')

    if (allComposites[0]?.constraints.length === target?.value) {
      return
    }

    replaceAllConstraints(allComposites, target?.value ?? 2)
    return
  }

  for (const body of allBodies) {
    if (!body.render.sprite || !target) {
      return
    }

    body.render.sprite[controlProp] = target.value
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
              key={el.label}
            />
          </>
        ))
      }
      <Button 
        variant="contained" 
        style={{marginTop: '54px'}}
        size='small'
        onClick={() => clearButtonHandler(world)}
      >
        Clear bodies
      </Button>
    </div>
  )
}
