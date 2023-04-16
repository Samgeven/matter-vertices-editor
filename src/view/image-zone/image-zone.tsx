import { Stage, Layer, Image } from 'react-konva'
import useImage from "use-image"
import Konva from 'konva'
import { createRef, useEffect, useRef, useState } from 'react'
import { useStore } from 'effector-react'
import { setLineCoords, setZoom } from '../../model/events'
import { DrawingSpace } from '../drawing-space/drawing-space'
import { $toolChain, $lineCoords } from '../../model/store'
import { useKeyShortcuts } from '../../utils/use-key-shortcuts'
import { Vertices } from 'matter-js'
import { tupleToVector } from '../../utils/tuple-to-vector'

type ImageZoneProps = {
  imageSrc: string,
}

type scaleOptions = {
  stageScale?: number,
  stageX?: number,
  stageY?: number
}

const lineLeftBtnHandler = (stage: Konva.Stage) => {
  const [pointerX, pointerY] = [stage.getRelativePointerPosition()?.x, stage.getRelativePointerPosition()?.y]

  if (!pointerX || !pointerY) {
    return
  }

  setLineCoords([pointerX, pointerY])
}

const touchHandler = (e: Konva.KonvaEventObject<MouseEvent>, tool: string) => {
  const stage = e.target.getStage()

  if (!stage) {
    return
  }

  if (tool === 'line') {
    lineLeftBtnHandler(stage)
  }
}

export const ImageZone = ({ imageSrc }: ImageZoneProps): JSX.Element => {
  useKeyShortcuts()
  const vertices = useStore($lineCoords)
  const selectedTool = useStore($toolChain)
  const [image] = useImage(imageSrc)
  const imageRef = createRef<Konva.Image>()
  const [pattern] = useImage('img-fill.svg')
  const [scale, setScale] = useState<scaleOptions>({
    stageScale: undefined,
    stageX: undefined,
    stageY: undefined,
  })

  const offsetX = image?.width ?? 300
  const offsetY = image?.height ?? 300

  const wheelHandler = (e: Konva.KonvaEventObject<WheelEvent>, step: number = 1.2) => {
    const stage = e.target.getStage()

    if (!stage) {
      return
    }

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
    setZoom(Math.ceil(newScale * 100))

    setScale({
      stageScale: newScale,
      stageX: -(pointerCoords.x - pointerX / newScale) * newScale,
      stageY: -(pointerCoords.y - pointerY / newScale) * newScale
    })
  }

  useEffect(() => {
    if (!imageRef.current) {
      return
    }
    console.log(imageRef.current?.x() + imageRef.current.width() / 2)
    console.log(Vertices.centre(tupleToVector(vertices)))
  })

  return (
    <div
      tabIndex={1}
    >
      <Stage 
        width={window.innerWidth} 
        height={window.innerHeight - 2}
        onWheel={(e) => wheelHandler(e)}
        draggable={selectedTool[1] === 'hand'}
        scaleX={scale.stageScale}
        scaleY={scale.stageScale}
        x={scale.stageX}
        y={scale.stageY}
      >
        <Layer id="image">
          <Image
            ref={imageRef}
            image={image}
            x={window.innerWidth / 2 - offsetX / 2}
            y={window.innerHeight / 2 - offsetY / 2}
            fillPatternImage={pattern}
            onMouseDown={(e) => {touchHandler(e, selectedTool[1])}}
          />
        </Layer>
        <Layer>
          <DrawingSpace/>
        </Layer>
      </Stage>
    </div>
  )
}
