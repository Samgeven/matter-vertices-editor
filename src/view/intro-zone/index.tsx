import { useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import { setFileLoaded } from "../../model/events"
import { base64FromFile } from "../../utils/base64-from-file"
import './intro-zone.css'
import GitHubIcon from '@mui/icons-material/GitHub';

export const IntroZone = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null)

  const fileTypes = ["PNG"]

  const inputChangeHandler = async (file: File) => {
    if (!file) {
      return
    }

    const url = await base64FromFile(file)

    if (!url) {
      return
    }
  
    setFile(file)
    setFileLoaded(url)
  }

  return (
    <div className="intro-zone">
      <h1 className="intro-zone__title">Matter.js vertices editor</h1>
      <FileUploader handleChange={inputChangeHandler} name="file" types={fileTypes} classes="drop-zone" />
      <a className="intro-repo" href="https://github.com/Samgeven/matter-vertices-editor">
        <GitHubIcon htmlColor="white" />
      </a>
    </div>
  )
}