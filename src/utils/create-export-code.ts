import { Vector, Vertices } from "matter-js"
import prettier from 'prettier';
import parserBabel from "prettier/parser-babel";
import { ShapeSettings } from "../types";
import { DEFAULT_SHAPE_SETTINGS } from "../data";

const fixedVertices = (vertices: Vector[]) => {
  return vertices.map(el => {
    return {
      x: Number(el.x.toFixed(4)),
      y: Number(el.x.toFixed(4))
    }
  })
}

const PRETTIER_CONFIG: prettier.Options = {
  parser: 'babel', 
  plugins: [parserBabel],
  embeddedLanguageFormatting: "off",
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
    Object.keys(settingsToDisplay).length !== 0 && !Vertices.isConvex(vertices)
    ? prettier.format(`const shapeSettings = ${JSON.stringify(settingsToDisplay)}`, PRETTIER_CONFIG)
    : ''

  return verticesString.concat(shapeSettingsString)
}