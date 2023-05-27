import { Alert, Box, Typography } from "@mui/material"
import './export-block.css'
import { $lineCoords } from "../../model/store"
import { useStore } from "effector-react"
import { Vertices } from "matter-js"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { codepenEmbed } from 'react-syntax-highlighter/dist/esm/styles/hljs'

type ExportBlockProps = {
  exportCode: string | Array<any>
}

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: '800px',
  bgcolor: '#282C34',
  border: '2px solid #FFEAA1',
  boxShadow: 24,
  p: 3,
  color: 'white',
}

const codeBlockStyle = {
  padding: '24px',
  borderRadius: '4px',
  maxHeight: '400px',
  overflow: 'auto'
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
      <SyntaxHighlighter language="javascript" style={codepenEmbed} customStyle={codeBlockStyle}>
        {exportCode}
      </SyntaxHighlighter>
    </Box>
  )
}