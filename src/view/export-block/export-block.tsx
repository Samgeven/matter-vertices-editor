import { Alert, Box, Typography } from "@mui/material"
import { CopyBlock, dracula } from "react-code-blocks"
import './export-block.css'
import { $lineCoords } from "../../model/store"
import { useStore } from "effector-react"
import { Vertices } from "matter-js"

type ExportBlockProps = {
  exportCode: string | Array<any>
}

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#282C34',
  border: '2px solid #FFEAA1',
  boxShadow: 24,
  p: 3,
  color: 'white',
}

export const ExportBlock = ({ exportCode }: ExportBlockProps): JSX.Element => {
  const vertices = useStore($lineCoords)
  const isConcave = !Vertices.isConvex(vertices)

  return (
    <Box sx={boxStyle}>
      <Typography id="modal-modal-title" variant="h5" component="h2" marginBottom='12px'>
        Export code
      </Typography>
      {isConcave 
      ? <Alert severity="warning" style={{ margin: '12px 0' }}>
          Your shape supposedly has concave vertices. Check out the emulation page to create additional shape settings.
        </Alert>
      : null}
      <CopyBlock
        style={{ padding: '16px !important' }}
        text={exportCode}
        language="javascript"
        theme={dracula}
      />
    </Box>
  )
}