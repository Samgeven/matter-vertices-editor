import { ToolIcon } from '../tool-icon'
import './tool-panel.css'

export const ToolPanel = (): JSX.Element => {

  return (
    <div className="toolbar">
      <ToolIcon alias="line" />
      <ToolIcon alias="auto-line" />
      <ToolIcon alias="hand" />
    </div>
  )
}