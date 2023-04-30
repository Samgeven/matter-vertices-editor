import { ToolPanel } from '../tool-panel/tool-panel'
import { $lineCoords, $zoomValue } from '../../model/store'
import { useStore } from 'effector-react'
import { UtilityBtn } from '../utility-btn/utility-btn'
import { Modal, Snackbar } from '@mui/material'
import { useState } from 'react'
import { ExportBlock } from '../export-block/export-block'
import './ui-layer.css'
import { setFileLoaded, showEmulation } from '../../model/events'
import { SNACKBAR_MESSAGE } from '../../data'

export const UILayer = (): JSX.Element => {
  const vertices = useStore($lineCoords)
  const [modalOpen, setModalOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const zoomValue = useStore($zoomValue)

  const exportBtnHandler = () => {
    if (vertices.length === 0) {
      setSnackbarMessage(SNACKBAR_MESSAGE.EXPORT)
      setSnackbarOpen(true)
      return
    }
    setModalOpen(true)
  }

  const backBtnHandler = () => {
    setFileLoaded(null)
  }

  const demoBtnHandler = () => {
    if (vertices.length < 3) {
      setSnackbarMessage(SNACKBAR_MESSAGE.EMULATE)
      setSnackbarOpen(true)
      return
    }
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
        <ExportBlock exportCode={JSON.stringify(vertices)} />
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
      <div className='zoom-panel'>Zoom: {zoomValue}%</div>
    </>
  )
}