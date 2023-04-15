import { useEffect, useRef } from "react"
import { Bodies, Engine, Render, Runner, Vertices, World } from 'matter-js'
import { $loadedFile } from "../../model/store"
import { useStore } from "effector-react"
import { setUpConcaveBody } from "../../utils/set-up-concave-body"
import { tupleToVector } from "../../utils/tuple-to-vector"

type MatterDemoProps = {
  vertices: [number, number][]
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

  const addBody = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const arr = tupleToVector(vertices)

    if (!image) {
      return
    }

    let verticesBody
    let bodyToRender
    
    if (Vertices.isConvex(arr)) {
      verticesBody = Bodies.fromVertices(e?.pageX ?? 200, e?.pageY ?? 200, [arr], {
        render: {
          ...verticesBodyRenderOptions,
          sprite: {
            texture: image,
            xScale: 1,
            yScale: 1
          }
        },
      })

      bodyToRender = verticesBody
    } else {
      verticesBody = Bodies.fromVertices(e?.pageX ?? 200, e?.pageY ?? 200, [arr], {
        render: { ...verticesBodyRenderOptions }
      })
      bodyToRender = setUpConcaveBody(verticesBody, image)
    }

    World.add(engine.current.world, bodyToRender)
  }

  useEffect(() => {
    // mount
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight

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
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true })
    ])
      
    // run the engine
    Runner.run(engine.current)
    Render.run(render)

    addBody()

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
    <div onMouseDown={addBody}>
      <div ref={scene} style={{ width: '100vw', height: '100vh' }} />
    </div>
  )
}