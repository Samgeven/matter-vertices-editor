import { useStore } from "effector-react"
import { Circle, Line } from "react-konva"
import { setLineCoords } from "../../model/events"
import { $lineCoords } from "../../model/store"

export const DrawingSpace = (): JSX.Element => {
  const lineCoords = useStore($lineCoords)

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
        onClick={(e) => setLineCoords([e.target.attrs.x, e.target.attrs.y])}
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