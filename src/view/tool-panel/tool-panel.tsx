import { ToolIcon } from '../tool-icon/tool-icon'
import './tool-panel.css'

export const ToolPanel = (): JSX.Element => {

  return (
    <div className="toolbar">
      <ToolIcon alias="line" />
      <ToolIcon alias="hand" />
    </div>
  )
}