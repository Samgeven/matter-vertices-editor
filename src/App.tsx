
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import './App.css';
import { ImageZone } from './image-zone';
import { base64FromFile } from './utils/base64-from-file';

function App() {
  const [fileIsLoaded, setLoadedFile] = useState(false)
  const [processError, setProcessError] = useState(false)
  const [url, setUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const fileTypes = ["PNG"]

  const inputChangeHandler = async (file: File) => {
    if (!file) {
      return
    }

    const url = await base64FromFile(file)

    if (!url) {
      setProcessError(true)
      return
    }
    
    setUrl(url)
    setProcessError(false)
    setLoadedFile(true)
    setFile(file)
  }

  return (
    <div className="App">
      {/* {!fileIsLoaded && <input type="file" onChange={(e) => inputChangeHandler(e)}></input>} */}
      { !fileIsLoaded && <FileUploader handleChange={inputChangeHandler} name="file" types={fileTypes} classes="drop-zone" /> }
      { processError && <div style={{ color: 'red' }}>Error while processing the image</div> }
      { !processError && fileIsLoaded && <ImageZone imageSrc={url ?? ''} /> }
    </div>
  );
}

export default App;
