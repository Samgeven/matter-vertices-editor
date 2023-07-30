import { useStore } from 'effector-react'
import { $toolChain } from '../../model/store'
import { setToolChain } from '../../model/events'
import PolylineIcon from '@mui/icons-material/Polyline';
import PanToolIcon from '@mui/icons-material/PanTool';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import './index.css'
import { Tooltip } from '@mui/material';
import { ToolIconProps } from './types';

const ALIAS_TO_ICON_MAP = {
  'line': <PolylineIcon htmlColor='white'/>,
  'hand': <PanToolIcon htmlColor='white'/>,
  'auto-line': <AutoGraphIcon htmlColor='white'/>,
}

export const ToolIcon = ({alias}: ToolIconProps): JSX.Element => {
  const selectedTool = useStore($toolChain)

  return (
    <Tooltip title={`${alias} tool`} placement='right' arrow>
      <div 
        className={`tool-icon ${selectedTool[1] === alias ? 'tool-icon--active' : ''}`}
        onClick={() => setToolChain(alias)}
      >
          {ALIAS_TO_ICON_MAP[alias]}
      </div>
    </Tooltip>
  )
}