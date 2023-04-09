import { Box, Typography } from "@mui/material"
import { CopyBlock, dracula } from "react-code-blocks"
import './export-block.css'

type ExportBlockProps = {
  exportCode: string | Array<any>
}

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#282C34',
  border: '2px solid #FFEAA1',
  boxShadow: 24,
  p: 3,
  color: 'white',
}

export const ExportBlock = ({ exportCode }: ExportBlockProps): JSX.Element => {
  return (
    <Box sx={boxStyle}>
      <Typography id="modal-modal-title" variant="h5" component="h2">
        Export code
      </Typography>
      <CopyBlock
        text={exportCode}
        language="javascript"
        theme={dracula}
      />
    </Box>
  )
}