import React from 'react'
import styled from 'styled-components'
import { Box } from '@soy-libs/uikit2'
import Container from '../Layout/Container'

const Outer = styled(Box)<{ background?: string }>`
  background: ${({ background }) => background || `rgba(0,0,0,.5)`};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Inner = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
  width: 100%;
`

const PageHeader: React.FC<{ background?: string }> = ({ background, children, ...props }) => (
  <Outer background={background} {...props}>
    <Inner>{children}</Inner>
  </Outer>
)

export default PageHeader
