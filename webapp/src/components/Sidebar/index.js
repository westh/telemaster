import { GithubFilled } from '@ant-design/icons'
import { Button, Checkbox, Divider, Select } from 'antd'
import {
  frequenciesMapping,
  operatorsMapping, technologiesMapping
} from 'lib/mappings'
import React, { useState } from 'react'
import styled from 'styled-components'
const { Option } = Select

const StyledSider = styled.div`
  position: absolute;
  margin-top: 10px;
  margin-left: 10px;
  background: white;
  border-radius: 4px;
  z-index: 1;
  width: 300px;
`

const Wrapper = styled.div`
  margin-top: 20px;
`

const StyledSelect = styled(Select)`
  margin-top: 10px;
  text-align: start;
  width: 80%;
`

const Spacer = styled.div`
  margin-top: 40px;
`

const StyledDivider = styled(Divider)`
  border-color: rgba(0, 0, 0, 0.1) !important;
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

const StyledGitHubLogo = styled(GithubFilled)`
  font-size: 30px;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.85);
`

const WrapperContent = styled.div`
  display: flex;
  justify-content: left;
  padding: 0px 20px;
`

const frequencyOptions = Object.keys(frequenciesMapping)
  .map(freq => <Option key={freq}>{freq}</Option>)

function Sidebar ({ loading, onApply }) {
  const [technologies, setTechnologies] = useState(Object.keys(technologiesMapping))
  const [operators, setOperators] = useState(Object.keys(operatorsMapping))
  const [frequencies, setFrequencies] = useState()

  function mapValues (values, mapping) {
    return values.map(value => mapping[value])
  }

  function checkValidity (values) {
    return values && values.length
  }

  function handleClick () {
    const query = {
      ...(checkValidity(operators) && { operators: mapValues(operators, operatorsMapping) }),
      ...(checkValidity(technologies) && { technologies: mapValues(technologies, technologiesMapping) }),
      ...(checkValidity(frequencies) && { frequencies: mapValues(frequencies, frequenciesMapping) })
    }

    onApply(query)
  }

  return (
    <StyledSider>
      <Wrapper>
        <StyledDivider orientation="left">
          Access Technologies
        </StyledDivider>
        <WrapperContent>
          <Checkbox.Group
            options={['2G', '3G', '4G']}
            defaultValue={technologies}
            onChange={value => setTechnologies(value)}
          />
        </WrapperContent>
        <StyledDivider orientation="left">
          Operators
        </StyledDivider>
        <WrapperContent>
          <Checkbox.Group
            options={['TDC', 'Telia/Telenor', '3 DK']}
            defaultValue={operators}
            onChange={value => setOperators(value)}
          />
        </WrapperContent>
        <StyledDivider orientation="left">
          Frequencies
        </StyledDivider>
        <WrapperContent>
          <StyledSelect
            mode='multiple'
            placeholder='e.g. 2100MHz'
            onChange={value => setFrequencies(value)}
          >
            {frequencyOptions}
          </StyledSelect>
        </WrapperContent>
        <Spacer />
        <WrapperContent>
          <Button
            type='primary'
            block
            loading={loading}
            onClick={() => handleClick()}
          >
            Apply
          </Button>
        </WrapperContent>
      </Wrapper>
      <Footer>
        <a href='https://github.com/westh/mastscraper'>
          <StyledGitHubLogo />
          by westh
        </a>
      </Footer>
    </StyledSider>
  )
}

export default Sidebar
