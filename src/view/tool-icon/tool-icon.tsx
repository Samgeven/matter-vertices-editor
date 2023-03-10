import { useStore } from 'effector-react'
import { $selectedTool } from '../../model/store'
import { selectTool } from '../../model/events'
import './tool-icon.css'

type ToolIconProps = {
  alias: string,
}

export const ToolIcon = ({alias}: ToolIconProps): JSX.Element => {
  const selectedTool = useStore($selectedTool)

  return (
    <img 
      src={`icons/${alias}.svg`}
      alt={alias}
      className={`tool-icon ${selectedTool === alias ? 'tool-icon--active' : ''}`}
      onClick={() => selectTool(alias)}
    />
  )
}