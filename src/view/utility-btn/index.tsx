import { UtilityBtnProps } from './types'
import './index.css'

export const UtilityBtn = ({ onClick, alias }: UtilityBtnProps): JSX.Element => {
  return (
    <div className="utility-btn" onClick={onClick}>
      <img className="utility-icon" src={`icons/${alias}.svg`} alt={alias}/>
    </div>
  )
}
