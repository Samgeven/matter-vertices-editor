
import './App.css';
import { ImageZone } from '../image-zone/image-zone';
import { ToolPanel } from '../tool-panel/tool-panel';
import { IntroZone } from '../intro-zone/intro-zone';
import { $lineCoords, $loadedFile, $zoomValue } from '../../model/store';
import { useStore } from 'effector-react';
import { ExportBtn } from '../export-btn/export-btn';
import { Modal } from '@mui/material';
import { useState } from 'react';
import { ExportBlock } from '../export-block/export-block';

function App() {
  const loadedFile = useStore($loadedFile)
  const vertices = useStore($lineCoords)
  const [modalOpen, setModalOpen] = useState(false)
  const zoomValue = useStore($zoomValue)

  const createExportData = () => {
    return vertices.map(el => {
      return {
        x: el[0],
        y: el[1]
      }
    })
  }

  return (
    <div className="App">
      {
        !loadedFile ?
        <IntroZone /> :
        (
          <>
            <ImageZone imageSrc={loadedFile} />
            <ToolPanel />
            <ExportBtn onClick={() => setModalOpen(true)}/>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
              <ExportBlock exportCode={JSON.stringify(createExportData())} />
            </Modal>
            <div className='zoom-panel'>Zoom: {zoomValue}%</div>
          </>
        )
      }
    </div>
  )
}

export default App;
