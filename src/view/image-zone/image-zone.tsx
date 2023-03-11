import { Stage, Layer, Image, Line } from 'react-konva'
import useImage from "use-image"
import Konva from 'konva'
import { useState } from 'react'
import { useStore } from 'effector-react'
import { setLineCoords, setToolChain } from '../../model/events'
import { DrawingSpace } from '../drawing-space/drawing-space'
import { $toolChain } from '../../model/store'

type ImageZoneProps = {
  imageSrc: string
}

type scaleOptions = {
  stageScale?: number,
  stageX?: number,
  stageY?: number
}

export const ImageZone = ({ imageSrc }: ImageZoneProps): JSX.Element => {
  const selectedTool = useStore($toolChain)
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
    const stage = e.target.getStage()

    if (!stage) {
      return
    }

    if (selectedTool[1] !== 'line') {
      return
    }

    const [pointerX, pointerY] = [stage.getRelativePointerPosition()?.x, stage.getRelativePointerPosition()?.y]

    if (!pointerX || !pointerY) {
      return
    }

    setLineCoords([pointerX, pointerY])
  }

  const spaceDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== ' ' || selectedTool[1] === 'hand') {
      return
    }
    
    console.log('down', e.key)
    setToolChain('hand')
  }

  const spaceUpHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== ' ') {
      return
    }

    console.log('up', e.key)
    setToolChain(selectedTool[0] ?? 'line')
  }

  return (
    <div 
      onKeyDown={(e) => spaceDownHandler(e)}
      onKeyUp={(e) => spaceUpHandler(e)}
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
    </div>
  )
}