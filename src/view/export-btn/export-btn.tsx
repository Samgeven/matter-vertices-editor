import './export-btn.css'

type exportBtnProps = {
  onClick: () => void
}

export const ExportBtn = ({ onClick }: exportBtnProps): JSX.Element => {
  return (
    <div className="export-btn" onClick={onClick}>
      <img className="export-icon" src='./icons/export-icon.svg'/>
    </div>
  )
}
