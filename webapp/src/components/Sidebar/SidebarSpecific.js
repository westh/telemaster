import { Checkbox } from '@geist-ui/react'
import { Github } from '@geist-ui/react-icons'
import Button from 'components/Button'
import styled from 'styled-components'

const StyledSider = styled.div`
  position: absolute;
  margin-top: 10px;
  margin-left: 10px;
  background: white;
  border-radius: 8px;
  z-index: 1;
  width: 300px;
  box-shadow: 0 0 10px 2px rgba(0,0,0,.1);
  @media only screen and (max-width: 740px) {
    width: 100%;
    height: calc(100% - 20px);
    margin: 0;
    padding-top: 20px;
    z-index: 3;
    border-radius: 0;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0);
  }
`

const MainWrapper = styled.div`
  margin-top: 20px;
  @media only screen and (max-width: 740px) {
    margin: auto;
    width: 300px;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: left;
  padding: 0px 20px;
  flex-wrap: wrap;
`

const FlexWrapper = styled.div`
  margin-left: 5px;
  display: flex;
  flex-wrap: wrap;
`

const MenuButton = styled(Button)`
  position: absolute !important;
  top: 10px;
  left: 10px;
  z-index: 3;
  border-radius: 8px !important;
  min-width: 0 !important;
  padding: 0 !important;
  width: 50px !important;
  height: 50px !important;
  @media only screen and (min-width: 640px) {
    width: 36px !important;
    height: 36px !important;
  }
  .text {
    height: 100%;
    width: 100%;
  }
`

const Spacer = styled.div`
  margin-top: 20px;
`

const Footer = styled.div`
  margin-top: 10px;
  padding: 20px;
  font-size: 14px;
  a {
    display: flex;
    justify-content: left;
    align-items: center;
    color: rgba(0, 0, 0, 0.2);
  }
`

const StyledGitHubLogo = styled(Github)`
  font-size: 30px;
  margin-right: 5px;
  color: #eaeaea;
`

const StyledCheckbox = styled(Checkbox)`
  margin-right: calc(.875rem * 1.5) !important;
  display: flex;
  `

const OperatorCheckbox = styled(Checkbox)`
  display: flex !important;
  margin-bottom: 10px;
  justify-content: left !important;
`

const Circle = styled.div`
  border-radius: 50%;
  height: 10px;
  width: 10px;
  background-color: ${props => props.mainColor};
  border-radius: 18px;
  border: 3px solid ${props => props.borderColor};
  margin-right: 8px;
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding;
  background-clip: padding-box;
`

export {
  StyledSider,
  MainWrapper,
  ContentWrapper,
  FlexWrapper,
  Spacer,
  Footer,
  StyledGitHubLogo,
  StyledCheckbox,
  OperatorCheckbox,
  Circle,
  MenuButton
}
