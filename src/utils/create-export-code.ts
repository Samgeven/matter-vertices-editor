import { Vector, Vertices } from 'matter-js'
import prettier from 'prettier'
import parserBabel from 'prettier/parser-babel'
import { ShapeSettings } from '../types'
import { DEFAULT_SHAPE_SETTINGS } from '../data'
import { defineConstraintPositions } from './apply-constraints'
import { $shapeSettings } from '../model/store'

const renderArrayConst = (arr: Array<any>, varName: string) => {
  const fixed = arr.map((el) => {
    return {
      x: Number(el.x.toFixed(4)),
      y: Number(el.x.toFixed(4)),
    }
  })

  return `const ${varName} = ${JSON.stringify(fixed)}`
}

const PRETTIER_CONFIG: prettier.Options = {
  parser: 'babel',
  plugins: [parserBabel],
  embeddedLanguageFormatting: 'off',
}

const excludeDefaultShapeSettings = (shapeSettings: ShapeSettings): Partial<ShapeSettings> => {
  const modifiedSettings = { ...shapeSettings }

  for (const key in modifiedSettings) {
    const shapeOption = key as keyof ShapeSettings
    if (DEFAULT_SHAPE_SETTINGS[shapeOption] === modifiedSettings[shapeOption]) {
      delete modifiedSettings[shapeOption]
    }
  }

  if (modifiedSettings.constraints) {
    delete modifiedSettings.constraints
  }

  return modifiedSettings
}

export const createExportCode = (vertices: Vector[], shapeSettings: ShapeSettings) => {
  const { constraints } = $shapeSettings.getState()

  const engineStart = `const engine = Engine.create();
    const element = document.getElementById('matter-container');
    const render = Render.create({ engine, element })
    Runner.run(engine)
    Render.run(render)`
  const verticesString = renderArrayConst(vertices, 'vertices')
  const settingsToDisplay = excludeDefaultShapeSettings(shapeSettings)
  const positions = renderArrayConst(defineConstraintPositions(vertices, constraints ?? 3), 'positions')
  const decomp = `// install 'poly-decomp' package
  Common.setDecomp(require('poly-decomp'))`

  const constraintsSettings = `const constraints = positions.map((el, i) => {
    return Constraint.create({
      bodyA: concaveBody,
      pointA: { ...positions[i] },
      bodyB: spriteBody,
      pointB: { ...positions[i] },
      length: 0,
      stiffness: 1.1,
      label: 'constraint'
    })
  })`

  const plainSpriteBody = `const spriteBody = Bodies.fromVertices(0, 0, vertices, {
    render: {
      sprite: {
        texture: 'path/to/texture.png',
        xScale: 1,
        yScale: 1,
      }
    }
  })`

  const compoundSpriteBody = `const spriteBody = Bodies.rectangle(
    concaveBody.bounds.min.x,
    concaveBody.bounds.min.y,
    (concaveBody.bounds.max.x - concaveBody.bounds.min.x),
    (concaveBody.bounds.max.y - concaveBody.bounds.min.y), {
    render: {
      sprite: {
        texture,
        xScale: 1,
        yScale: 1,
      },
    },
    collisionFilter: {
      mask: 0,
    },
  })`

  const applyShapeSettings = `spriteBody.render.sprite = { ...spriteBody.render.sprite, ...shapeSettings }`

  const concavebody = `const concaveBody = Bodies.fromVertices(0, 0, vertices)`
  const shapeSettingsString = `const shapeSettings = ${JSON.stringify(settingsToDisplay)}`
  const compositeAdding = `const composite = Composite.create({ label: 'composite' })
  Composite.add(composite, [concaveBody, spriteBody, ...constraints])
  World.add(engine.world, composite)`
  const spriteAdding = `World.add(engine.world, spriteBody)`

  const convexImports = `import { Engine, Render, Runner, World, Bodies } from 'matter-js'`
  const concaveImports = `import { Engine, Render, Runner, Common, Bodies, Constraint, Composite, World } from 'matter-js'`

  const convexExportString = [convexImports, engineStart, verticesString, plainSpriteBody, spriteAdding].join(';\n\n')
  const concaveExportString = [
    concaveImports,
    engineStart,
    verticesString,
    shapeSettingsString,
    decomp,
    concavebody,
    compoundSpriteBody,
    applyShapeSettings,
    positions,
    constraintsSettings,
    compositeAdding,
  ].join(';\n\n')

  return prettier.format(Vertices.isConvex(vertices) ? convexExportString : concaveExportString, PRETTIER_CONFIG)
}
