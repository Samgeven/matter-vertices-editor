import Matter, { Bodies, Composite } from 'matter-js'
import { ShapeSettings } from '../types'
import { createConstraints } from './apply-constraints'
import { $shapeSettings } from '../model/store'

export const setUpConcaveBody = (
  concaveBody: Matter.Body,
  texture: string,
  shapeSettings: ShapeSettings
): Matter.Composite => {
  const spriteBody = Bodies.rectangle(
    concaveBody.bounds.min.x,
    concaveBody.bounds.min.y,
    concaveBody.bounds.max.x - concaveBody.bounds.min.x,
    concaveBody.bounds.max.y - concaveBody.bounds.min.y,
    {
      render: {
        fillStyle: 'none',
        strokeStyle: '#ffffff',
        sprite: {
          texture,
          xScale: 1,
          yScale: 1,
        },
      },
      label: 'texture',
      collisionFilter: {
        mask: 0,
      },
    }
  )

  if (spriteBody.render.sprite) {
    spriteBody.render.sprite = { ...spriteBody.render.sprite, ...shapeSettings }
  }

  const { constraints: count } = $shapeSettings.getState()

  const constraints = createConstraints(concaveBody, spriteBody, count ?? 3)
  const composite = Composite.create({ label: 'composite' })
  Composite.add(composite, [concaveBody, spriteBody, ...constraints])

  return composite
}
