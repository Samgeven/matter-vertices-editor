import { Stage, Layer, Image, Line } from 'react-konva'
import useImage from "use-image"
import Konva from 'konva'
import { useState } from 'react'
import { useStore } from 'effector-react'
import { $selectedTool } from '../../model/store'
import { setLineCoords } from '../../model/events'
import { DrawingSpace } from '../drawing-space/drawing-space'

type ImageZoneProps = {
  imageSrc: string
}

type scaleOptions = {
  stageScale?: number,
  stageX?: number,
  stageY?: number
}

export const ImageZone = ({ imageSrc }: ImageZoneProps): JSX.Element => {
  const selectedTool = useStore($selectedTool)
  const [image] = useImage(imageSrc)
  const [pattern] = useImage('img-fill.svg')
  const [scale, setScale] = useState<scaleOptions>({
    stageScale: undefined,
    stageX: undefined,
    stageY: undefined,
  })

  const offsetX = image?.width ?? 300
  const offsetY = image?.height ?? 300

  const wheelHandler = (e: Konva.KonvaEventObject<WheelEvent>) => {
    const stage = e.target.getStage()

    if (!stage) {
      return
    }

    const step = 1.2
    const prevScale = stage.scaleX()
    const [pointerX, pointerY] = [stage.getPointerPosition()?.x, stage.getPointerPosition()?.y]

    if (!pointerX || !pointerY) {
      return
    }

    const pointerCoords = {
      x: pointerX / prevScale - stage.x() / prevScale,
      y: pointerY / prevScale - stage.y() / prevScale
    }

    const newScale = e.evt.deltaY > 0 ? prevScale / step : prevScale * step

    setScale({
      stageScale: newScale,
      stageX: -(pointerCoords.x - pointerX / newScale) * newScale,
      stageY: -(pointerCoords.y - pointerY / newScale) * newScale
    })
  }

  const touchHandler = (e: Konva.KonvaEventObject<MouseEvent>) => {
    console.log(e)
    const stage = e.target.getStage()

    if (!stage) {
      return
    }

    const [pointerX, pointerY] = [stage.getRelativePointerPosition()?.x, stage.getRelativePointerPosition()?.y]

    console.log([pointerX, pointerY])
    if (!pointerX || !pointerY) {
      return
    }

    setLineCoords([pointerX, pointerY])
  }

  return (
    <Stage 
      width={window.innerWidth} 
      height={window.innerHeight - 2}
      onWheel={(e) => wheelHandler(e)}
      draggable={selectedTool === 'hand'}
      scaleX={scale.stageScale}
      scaleY={scale.stageScale}
      x={scale.stageX}
      y={scale.stageY}
    >
      <Layer>
        <Image
          image={image}
          x={window.innerWidth / 2 - offsetX / 2}
          y={window.innerHeight / 2 - offsetY / 2}
          fillPatternImage={pattern}
          onMouseDown={(e) => {touchHandler(e)}}
        />
      </Layer>
      <Layer>
        <DrawingSpace/>
      </Layer>
    </Stage>
  )
}