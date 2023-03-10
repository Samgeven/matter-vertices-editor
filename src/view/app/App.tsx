
import './App.css';
import { ImageZone } from '../image-zone/image-zone';
import { ToolPanel } from '../tool-panel/tool-panel';
import { IntroZone } from '../intro-zone/intro-zone';
import { $loadedFile } from '../../model/store';
import { useStore } from 'effector-react';

function App() {
  const loadedFile = useStore($loadedFile)

  return (
    <div className="App">
      {
        !loadedFile ?
        <IntroZone /> :
        (
          <>
            <ImageZone imageSrc={loadedFile} />
            <ToolPanel />
          </>
        )
      }
    </div>
  )
}

export default App;
