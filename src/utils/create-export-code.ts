import Matter, { Vector } from "matter-js"
import { DEFAULT_SHAPE_SETTINGS, ShapeSettings } from "../model/store"
import prettier from 'prettier';
import parserBabel from "prettier/parser-babel";

const fixedVertices = (vertices: Vector[]) => {
  return vertices.map(el => {
    return {
      x: el.x.toFixed(4),
      y: el.x.toFixed(4)
    }
  })
}

const PRETTIER_CONFIG: prettier.Options = {
  parser: 'babel', 
  plugins: [parserBabel],
  embeddedLanguageFormatting: "off"
}

const excludeDefaultShapeSettings = (shapeSettings: ShapeSettings): Partial<ShapeSettings> => {
  const modifiedSettings = { ...shapeSettings }

  for (const key in modifiedSettings) {
    const shapeOption = key as keyof ShapeSettings
    if (DEFAULT_SHAPE_SETTINGS[shapeOption] === modifiedSettings[shapeOption]) {
      delete modifiedSettings[shapeOption]
    }
  }

  return modifiedSettings
}

export const createExportCode = (vertices: Vector[], shapeSettings: ShapeSettings) => {
  const verticesString = prettier.format(`const vertices = ${JSON.stringify(fixedVertices(vertices))}`, PRETTIER_CONFIG)
  const settingsToDisplay = excludeDefaultShapeSettings(shapeSettings)

  const shapeSettingsString = 
    Object.keys(settingsToDisplay).length !== 0 
    ? prettier.format(`const shapeSettings = ${JSON.stringify(settingsToDisplay)}`, PRETTIER_CONFIG)
    : ''

  return verticesString.concat(shapeSettingsString)
}