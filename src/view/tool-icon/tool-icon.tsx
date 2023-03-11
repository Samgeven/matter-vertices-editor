import { useStore } from 'effector-react'
import { $toolChain } from '../../model/store'
import { setToolChain } from '../../model/events'
import './tool-icon.css'

type ToolIconProps = {
  alias: string,
}

export const ToolIcon = ({alias}: ToolIconProps): JSX.Element => {
  const selectedTool = useStore($toolChain)

  return (
    <img 
      src={`icons/${alias}.svg`}
      alt={alias}
      className={`tool-icon ${selectedTool[1] === alias ? 'tool-icon--active' : ''}`}
      onClick={() => setToolChain(alias)}
    />
  )
}