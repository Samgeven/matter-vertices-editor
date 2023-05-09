import { useEffect, useRef } from "react"
import { Bodies, Common, Engine, Render, Runner, Vector, Vertices, World } from 'matter-js'
import { $loadedFile, $shapeSettings, DEFAULT_SHAPE_SETTINGS, ShapeSettings } from "../../model/store"
import { useStore } from "effector-react"
import { setUpConcaveBody } from "../../utils/set-up-concave-body"
import { UtilityBtn } from "../utility-btn/utility-btn"
import { showEmulation } from "../../model/events"
import './index.css'
import { ShapeControls } from "../shape-controls/shape-controls"

type MatterDemoProps = {
  vertices: Array<{x: number, y: number}>
}

const verticesBodyRenderOptions = {
  lineWidth: 1,
  strokeStyle: '#ffffff',
  fillStyle: 'transparent',
}

export const MatterDemo = ({ vertices }: MatterDemoProps) => {
  const scene = useRef() as React.LegacyRef<HTMLDivElement> | undefined
  const engine = useRef(Engine.create())
  const image = useStore($loadedFile)
  const shapeSettings = useStore($shapeSettings)

  const cw = document.body.clientWidth
  const ch = document.body.clientHeight

  const addBody = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>, options: ShapeSettings = DEFAULT_SHAPE_SETTINGS) => {

    if (!image) {
      return
    }

    let verticesBody
    let bodyToRender

    const first = vertices[0]
    const last = vertices[vertices.length - 1]
    if (first.x === last.x && first.y === last.y) {
      vertices = vertices.slice(0, -1)
    }
    
    if (Vertices.isConvex(vertices)) {

      verticesBody = Bodies.fromVertices(e?.pageX ?? cw / 2, e?.pageY ?? ch / 2, [vertices], {
        render: {
          ...verticesBodyRenderOptions,
          sprite: {
            texture: image,
            xScale: 1,
            yScale: 1,
          }
        },
      })

      bodyToRender = verticesBody
    } else {
      Common.setDecomp(require('poly-decomp'))
      verticesBody = Bodies.fromVertices(e?.pageX ?? cw / 2, e?.pageY ?? ch / 2, [vertices], {
        render: { ...verticesBodyRenderOptions }
      })
      console.log(verticesBody)
      bodyToRender = setUpConcaveBody(verticesBody, image, options)
    }

    World.add(engine.current.world, bodyToRender)
  }

  useEffect(() => {
    console.log('render')
    // mount

    const sceneRef = scene as React.MutableRefObject<HTMLDivElement>
    
    const render = Render.create({
      element: sceneRef.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }
    })
      
    // boundaries
    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 2, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 2, ch, { isStatic: true })
    ])
      
    // run the engine
    Runner.run(engine.current)
    Render.run(render)

    addBody(undefined, shapeSettings)

    // unmount
    return () => {
      // destroy Matter
      Render.stop(render)
      World.clear(engine.current.world, false)
      Engine.clear(engine.current)
      render.canvas.remove()
      // render.canvas = null
      // render.context = null
      render.textures = {}
    }
  }, [])

  return (
    <>
      <div ref={scene} style={{ width: '100vw', height: '100vh' }} onMouseDown={(e) => addBody(e, shapeSettings)} />
      <div className='utility-panel'>
        <UtilityBtn onClick={() => showEmulation(false)} alias='back' />
      </div>
      <ShapeControls world={engine.current.world} isShapeConvex={Vertices.isConvex(vertices)} />
    </>
  )
}