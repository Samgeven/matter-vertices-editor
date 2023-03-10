import { useStore } from "effector-react"
import { Circle } from "react-konva"
import { $lineCoords } from "../../model/store"

export const DrawingSpace = (): JSX.Element => {
  const lineCoords = useStore($lineCoords)

  return <>{lineCoords.map((el, i) => {
    return (
      <Circle
        key={i}
        x={el[0]}
        y={el[1]}
        stroke="#000000"
        strokeWidth={2}
        radius={5}
        fill='red'
      />
    )
  })}</>
}