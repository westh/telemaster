import { Checkbox, Select } from '@geist-ui/react'
import { Menu } from '@geist-ui/react-icons'
import Button from 'components/Button'
import Heading from 'components/Heading'
import {
  frequenciesMapping,
  networkGenerations,
  operatorsColorMapping,
  operatorsMapping
} from 'lib/mappings'
import React, { useState } from 'react'
import {
  Circle,
  ContentWrapper,
  FlexWrapper,
  Footer,
  MainWrapper,
  MenuButton,
  OperatorCheckbox,
  Spacer,
  StyledCheckbox,
  StyledGitHubLogo,
  StyledSider
} from './SidebarSpecific'

const frequencyOptions = Object.keys(frequenciesMapping)
  .map(freq => <Select.Option value={freq}>{freq}</Select.Option>)

function Sidebar ({ loading, onApply }) {
  const [technologies, setTechnologies] = useState(networkGenerations)
  const [operators, setOperators] = useState(Object.keys(operatorsMapping))
  const [frequencies, setFrequencies] = useState()
  const isMobileWidth = window.innerWidth <= 740
  const [shouldShow, setShouldShow] = useState(isMobileWidth)

  function mapValues (values, mapping) {
    return values.map(value => mapping[value])
  }

  function checkValidity (values) {
    return values && values.length
  }

  function toggleShowMenu () {
    const { innerWidth: width } = window
    const shouldReactToMenuToggle = width <= 740
    if (shouldReactToMenuToggle) setShouldShow(!shouldShow)
  }

  function handleClick () {
    const query = {
      ...(checkValidity(operators) && { operators: mapValues(operators, operatorsMapping) }),
      ...(checkValidity(technologies) && { technologies }),
      ...(checkValidity(frequencies) && { frequencies: mapValues(frequencies, frequenciesMapping) })
    }

    onApply(query)
    toggleShowMenu()
  }

  return (
    <>
      {shouldShow
        ?
          <MenuButton onClick={toggleShowMenu}>
            <Menu />
          </MenuButton>
        :
          <StyledSider>
            <MainWrapper>
              <Heading>
                Network Generations
              </Heading>
              <ContentWrapper>
                <Checkbox.Group
                  value={technologies}
                  onChange={value => setTechnologies(value)}
                >
                  {networkGenerations.map(technology => 
                    <StyledCheckbox value={technology}>{technology}</StyledCheckbox>
                  )}
                </Checkbox.Group>
              </ContentWrapper>
              <Heading>
                Operators
              </Heading>
              <ContentWrapper>
                <Checkbox.Group
                  value={operators}
                  onChange={value => setOperators(value)}
                >
                  {Object.keys(operatorsMapping).map(operator =>
                    <OperatorCheckbox value={operator}>
                      <FlexWrapper>
                        <Circle
                          mainColor={operatorsColorMapping[operator].main}
                          borderColor={operatorsColorMapping[operator].border}
                        />
                        {operator}
                      </FlexWrapper>
                    </OperatorCheckbox>
                  )}
                </Checkbox.Group>
              </ContentWrapper>
              <Heading>
                Frequencies
              </Heading>
              <ContentWrapper>
                <Select
                  multiple
                  size='small'
                  placeholder='e.g. 2100MHz'
                  width='300px'
                  onChange={value => setFrequencies(value)}
                >
                  {frequencyOptions}
                </Select>
              </ContentWrapper>
              <Spacer />
              <ContentWrapper>
                <Button
                  type='secondary'
                  width='100%'
                  loading={loading}
                  onClick={() => handleClick()}
                >
                  Apply
                </Button>
              </ContentWrapper>
              <Footer>
                <a href='https://github.com/westh/telemaster'>
                  <StyledGitHubLogo />
                  by westh
                </a>
              </Footer>
            </MainWrapper>
          </StyledSider>
      }
    </>
  )
}

export default Sidebar
