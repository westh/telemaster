import { Button as GeistButton } from '@geist-ui/react'
import styled from 'styled-components'

const Button = styled(GeistButton)`
  ${props => props.width && `width: ${props.width} !important`};
`

export default Button
