import './utility-btn.css'

type UtilityBtnProps = {
  onClick?: () => void,
  alias: string,
}

export const UtilityBtn = ({ onClick, alias }: UtilityBtnProps): JSX.Element => {
  return (
    <div className="utility-btn" onClick={onClick}>
      <img className="utility-icon" src={`icons/${alias}.svg`} alt={alias}/>
    </div>
  )
}
