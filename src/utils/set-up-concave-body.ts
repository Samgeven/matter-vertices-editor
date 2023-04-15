import Matter, { Bodies, Common, Composite, Constraint } from "matter-js";

export const setUpConcaveBody = (concaveBody: Matter.Body, texture: string): Matter.Composite => {
  Common.setDecomp(require('poly-decomp'))

  const spriteBody = Bodies.rectangle(
    concaveBody.bounds.min.x,
    concaveBody.bounds.min.y,
    (concaveBody.bounds.max.x - concaveBody.bounds.min.x),
    (concaveBody.bounds.max.y - concaveBody.bounds.min.y), {
    render: {
      fillStyle: 'none',
      strokeStyle: '#ffffff',
      sprite: {
        texture,
        xScale: 1,
        yScale: 1,
      },
    },
    collisionFilter: {
      mask: 0,
    },
  })

  let constraint = Constraint.create({
    bodyA: concaveBody,
    pointA: {x: 0, y: 10},
    bodyB: spriteBody,
    pointB: {x: 0, y: 10},
    length: 0,
    stiffness: 1.1
  })
  let constraint2 = Constraint.create({
    bodyA: concaveBody,
    pointA: {x: 0, y: -10},
    bodyB: spriteBody,
    pointB: {x: 0, y: -10},
    length: 0,
    stiffness: 1.1
  })
  let constraint3 = Constraint.create({
    bodyA: concaveBody,
    pointA: {x: -10, y: 0},
    bodyB: spriteBody,
    pointB: {x: -10, y: 0},
    length: 0,
    stiffness: 1.1
  })

  const composite = Composite.create()
  Composite.add(composite, [concaveBody, spriteBody, constraint, constraint2, constraint3])
  return composite
}