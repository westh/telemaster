import { Select } from '@geist-ui/react'
import Tag from 'components/Tag'
import React, { useState } from 'react'
import styled from 'styled-components'

const Description = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`

const Row = styled.div`
display: flex;
margin-bottom: 5px;
`

const TitleColumn = styled.div`
min-width: 110px;
`

const DataColumn = styled.div``

const StyledTag = styled(Tag)`
margin-top: 2px;
`

const StyledSelect = styled(Select)`
  font-size: 12px;
`

function MastInformation({ operatorAggregatedData }) {
  const [streetIndex, setStreetIndex] = useState(0)

  return (
    <Description>
      <Row>
        <TitleColumn>Operator:</TitleColumn>
        <DataColumn>{operatorAggregatedData[0]?.operator}</DataColumn>
      </Row>
      <Row>
        <TitleColumn>Technology:</TitleColumn>
        <DataColumn>
          {Object.keys(operatorAggregatedData[streetIndex].technologies).map(
            technology =>
                <Tag
                  key={technology}
                  color={
                    operatorAggregatedData[streetIndex].technologies[technology].color
                  }
                >
                  {technology}
                </Tag>
          )}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>Frequency:</TitleColumn>
        <DataColumn>
          {Object.keys(operatorAggregatedData[streetIndex].technologies).map(
            (technology) =>
              operatorAggregatedData[streetIndex].technologies[
                technology
              ].frequencies.map(frequency =>
                <StyledTag
                    key={`${technology}-${frequency}`}
                    color={
                      operatorAggregatedData[streetIndex].technologies[technology].color
                    }
                  >
                    {frequency}MHz
                </StyledTag>
             )
          )}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>City:</TitleColumn>
        <DataColumn>{operatorAggregatedData[streetIndex]?.city}</DataColumn>
      </Row>
      <Row>
        <TitleColumn>Postal code:</TitleColumn>
        <DataColumn>
          {operatorAggregatedData[streetIndex]?.postalCode}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>Street:</TitleColumn>
        <StyledSelect
          size='small'
          placeholder='Select a street'
          initialValue={'0'}
          onChange={value => setStreetIndex(String(value))}
          disabled={operatorAggregatedData.length < 2}
          width={'200px'}
        >
          {operatorAggregatedData.map((streetObj, i) => (
            <Select.Option key={`${streetObj.street}-${streetObj.operator}`} value={String(i)}>
              {streetObj.street}
            </Select.Option>
          ))}
        </StyledSelect>
      </Row>
      <Row>
        <TitleColumn>Latitude:</TitleColumn>
        <DataColumn>{operatorAggregatedData[streetIndex]?.latitude}</DataColumn>
      </Row>
      <Row>
        <TitleColumn>Longitude:</TitleColumn>
        <DataColumn>
          {operatorAggregatedData[streetIndex]?.longitude}
        </DataColumn>
      </Row>
    </Description>
  )
}

export default MastInformation
