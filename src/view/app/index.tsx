
import './App.css';
import { ImageZone } from '../image-zone/';
import { IntroZone } from '../intro-zone/';
import { $emulationZone, $lineCoords, $loadedFile } from '../../model/store';
import { useStore } from 'effector-react';
import { UILayer } from '../ui-layer';
import { MatterDemo } from '../matter-demo/';
import { useCallback } from 'react';

function App() {
  const loadedFile = useStore($loadedFile)
  const vertices = useStore($lineCoords)
  const showEmulation = useStore($emulationZone)

  const AppState = useCallback(() => {
    if (!loadedFile) {
      return <IntroZone />
    }

    if (showEmulation) {
      return <MatterDemo vertices={vertices} />
    }

    return (
      <>
        <ImageZone imageSrc={loadedFile} />
        <UILayer />
      </>
    )
  }, [loadedFile, showEmulation])

  return (
    <div className="App">
      <AppState />
    </div>
  )
}

export default App;
