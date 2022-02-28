import styled from 'styled-components'
import { Text } from '@soy-libs/uikit2'

const TextEllipsis = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export default TextEllipsis
