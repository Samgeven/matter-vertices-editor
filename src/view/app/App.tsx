
import './App.css';
import { ImageZone } from '../image-zone/image-zone';
import { IntroZone } from '../intro-zone/intro-zone';
import { $loadedFile } from '../../model/store';
import { useStore } from 'effector-react';
import { UILayer } from '../ui-layer/ui-layer';

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
            <UILayer />
          </>
        )
      }
    </div>
  )
}

export default App;
