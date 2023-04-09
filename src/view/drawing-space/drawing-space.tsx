import { useStore } from "effector-react"
import { Circle, Line } from "react-konva"
import { setLineCoords } from "../../model/events"
import { $lineCoords } from "../../model/store"
import Konva from 'konva'

export const DrawingSpace = (): JSX.Element => {
  const lineCoords = useStore($lineCoords)
  const circleClickHandler = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const [prevX, prevY] = lineCoords[lineCoords.length - 1]

    if (prevX === e.target.attrs.x && prevY === e.target.attrs.y) {
      return
    }

    setLineCoords([e.target.attrs.x, e.target.attrs.y])
  }

  const circles = lineCoords.map((el, i) => {
    return (
      <Circle
        key={i}
        x={el[0]}
        y={el[1]}
        stroke="#000000"
        strokeWidth={2}
        radius={5}
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
        points={[el[0], el[1], lineCoords[i + 1][0], lineCoords[i + 1][1]]}
        stroke="#000000"
        strokeWidth={2}
      />
    )
  }).filter(Boolean)

  return <>
    {lines}
    {circles}
  </>
}