import { transparentize } from 'polished'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.span`
  color: ${props => props.color};
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 0 7px;
  font-size: 12px;
  background: ${props => transparentize(0.8, props.color)};
  border: 1px solid ${props => props.color};
  border-radius: 4px;
`

function Tag ({ color, children }) {
  return (
    <Wrapper color={color}>
      {children}
    </Wrapper>
  )
}

export default Tag
