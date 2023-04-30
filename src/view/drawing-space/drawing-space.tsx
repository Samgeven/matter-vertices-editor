import { useStore } from "effector-react"
import { Circle, Line } from "react-konva"
import { setLineCoords } from "../../model/events"
import { $lineCoords, $zoomValue } from "../../model/store"
import Konva from 'konva'

export const DrawingSpace = (): JSX.Element => {
  const lineCoords = useStore($lineCoords)
  const zoomValue = useStore($zoomValue)

  const circleClickHandler = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const {x, y} = lineCoords[lineCoords.length - 1]

    if (x === e.target.attrs.x && y === e.target.attrs.y) {
      return
    }

    setLineCoords({x: e.target.attrs.x, y: e.target.attrs.y})
  }

  const circles = lineCoords.map((el, i) => {
    return (
      <Circle
        key={i}
        x={el.x}
        y={el.y}
        stroke="#000000"
        strokeWidth={2 / (zoomValue / 100) + 0.5}
        radius={ 4 / (zoomValue / 100) + 2}
        fill='#FFEAA1'
        onClick={(e) => circleClickHandler(e)}
      />
    )
  })

  const lines = lineCoords.map((el, i) => {
    if (!lineCoords[i + 1]) {
      return false
    }
    return (
      <Line
        key={i}
        points={[el.x, el.y, lineCoords[i + 1].x, lineCoords[i + 1].y]}
        stroke="#000000"
        strokeWidth={2 / (zoomValue / 100) + 0.5}
      />
    )
  }).filter(Boolean)

  return <>
    {lines}
    {circles}
  </>
}