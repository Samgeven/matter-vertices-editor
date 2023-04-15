import { ToolPanel } from '../tool-panel/tool-panel';
import { $lineCoords, $loadedFile, $zoomValue } from '../../model/store';
import { useStore } from 'effector-react';
import { UtilityBtn } from '../utility-btn/utility-btn';
import { Modal, Snackbar } from '@mui/material';
import { useState } from 'react';
import { ExportBlock } from '../export-block/export-block';
import './ui-layer.css'
import { setFileLoaded, showEmulation } from '../../model/events';
import { tupleToVector } from '../../utils/tuple-to-vector';

export const UILayer = (): JSX.Element => {
  const vertices = useStore($lineCoords)
  const [modalOpen, setModalOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const zoomValue = useStore($zoomValue)

  const exportData = tupleToVector(vertices)

  const exportBtnHandler = () => {
    if (vertices.length === 0) {
      setSnackbarOpen(true)
      return
    }
    setModalOpen(true)
  }

  const backBtnHandler = () => {
    setFileLoaded(null)
  }

  const demoBtnHandler = () => {
    showEmulation(true)
  }

  return (
    <>
      <p className='disclaimer'>
        Use line tool to add points. Export image by clicking on <img width={16} src='icons/export-icon.svg'/> icon.
        <br />
        Return to starting screen and load new image by clicking on <img width={16} src='icons/back.svg'/> icon.
      </p>
      <ToolPanel />
      <div className='utility-panel'>
        <UtilityBtn onClick={exportBtnHandler} alias='export-icon' />
        <UtilityBtn onClick={backBtnHandler} alias='back' />
        <UtilityBtn onClick={demoBtnHandler} alias='emulate' />
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ExportBlock exportCode={JSON.stringify(exportData)} />
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Nothing to export yet"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
      <div className='zoom-panel'>Zoom: {zoomValue}%</div>
    </>
  )
}