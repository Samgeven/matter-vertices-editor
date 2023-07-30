import './index.css'
import { ImageInfoPanelProps } from './types'

export const ImageInfoPanel = ({ zoom, imageSize }: ImageInfoPanelProps): JSX.Element => {
  return (
    <div className="image-info-panel">
      <div className="image-size">{imageSize}</div>
      <div className='zoom'>{zoom}%</div>
    </div>
  )
}
