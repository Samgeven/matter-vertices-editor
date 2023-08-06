import Matter, { Bounds, Composite, Constraint, Vector } from 'matter-js'

export const defineConstraintPositions = (vertices: Vector[], count: number): Vector[] => {
  const bounds = Bounds.create(vertices)

  const width = bounds.max.x - bounds.min.x
  const height = bounds.max.y - bounds.min.y
  const posX = width / 3
  const posY = height / 3

  const center = { x: 0, y: 0 }
  const top = { x: 0, y: -posY }
  const left = { x: -posX, y: 0 }
  const right = { x: posX, y: 0 }
  const bottom = { x: 0, y: posY }

  switch (count) {
    case 1:
      return [center]
    case 2:
      return [left, right]
    case 3:
      return [left, right, center]
    case 4:
      return [left, right, top, bottom]
    default:
      return [left, right]
  }
}

export const createConstraints = (body: Matter.Body, spriteBody: Matter.Body, count: number) => {
  const { vertices } = body
  const positions = defineConstraintPositions(vertices, count)
  return positions.map((el, i) => {
    return Constraint.create({
      bodyA: body,
      pointA: { ...positions[i] },
      bodyB: spriteBody,
      pointB: { ...positions[i] },
      length: 0,
      stiffness: 1.1,
      label: 'constraint',
    })
  })
}

export const replaceAllConstraints = (allComposites: Composite[], newCount: number) => {
  allComposites.forEach((el) => {
    while (el.constraints.length) {
      Composite.remove(el, el.constraints[0])
    }

    const sprite = el.bodies.find((el) => el.label === 'texture')
    const concave = el.bodies.find((el) => el.label === 'concave-body')

    if (!sprite || !concave) {
      return
    }

    const newConstraints = createConstraints(concave, sprite, newCount)
    Composite.add(el, newConstraints)
  })
}
