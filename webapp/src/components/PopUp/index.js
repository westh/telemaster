import { Select, Tabs, Tag } from 'antd'
import useAggregatedMasts from 'hooks/use-aggregated-masts'
import React, { useState } from 'react'
import styled from 'styled-components'
import './ant-overwrite.css'

const { Option } = Select
const { TabPane } = Tabs

const Description = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`

const Wrapper = styled.div`
  padding: 5px;
  width: 370px;
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
  width: 40%;
  min-width: 140px;
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
            (technology) =>
                <Tag
                  key={technology}
                  color={
                    operatorAggregatedData[streetIndex].technologies[technology]
                      .color
                  }
                >
                  {technology}
                </Tag>
          )}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>Frequency [MHz]:</TitleColumn>
        <DataColumn>
          {Object.keys(operatorAggregatedData[streetIndex].technologies).map(
            (technology) =>
              operatorAggregatedData[streetIndex].technologies[
                technology
              ].frequencies.map((frequency) =>
                <StyledTag
                    key={`${technology}-${frequency}`}
                    color={
                      operatorAggregatedData[streetIndex].technologies[
                        technology
                      ].color
                    }
                  >
                    {frequency}
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
          key={`${operatorAggregatedData[0].operator}-${operatorAggregatedData[0].street}-select`}
          showSearch
          size='small'
          placeholder='Select a street'
          optionFilterProp='children'
          defaultValue={operatorAggregatedData[0].street}
          onChange={setStreetIndex}
          disabled={operatorAggregatedData.length < 2}
        >
          {operatorAggregatedData.map((streetObj, i) => (
            <Option key={`${streetObj.street}-${streetObj.operator}`} value={i}>
              {streetObj.street}
            </Option>
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

function PopUp({ masts }) {
  const [mastsPerOperatorObject, isLoading, isError] = useAggregatedMasts(masts)

  return (
    <Wrapper>
      <Tabs size='small'>
        {mastsPerOperatorObject?.teliaTelenor?.length && (
          <TabPane tab='Telenor/Telia' key='0'>
            <MastInformation
              operatorAggregatedData={mastsPerOperatorObject?.teliaTelenor}
            />
          </TabPane>
        )}
        {mastsPerOperatorObject?.tdc?.length && (
          <TabPane tab='TDC' key='1'>
            <MastInformation
              operatorAggregatedData={mastsPerOperatorObject?.tdc}
            />
          </TabPane>
        )}
        {mastsPerOperatorObject?.three?.length && (
          <TabPane tab='3 DK' key='2'>
            <MastInformation
              operatorAggregatedData={mastsPerOperatorObject?.three}
            />
          </TabPane>
        )}
      </Tabs>
    </Wrapper>
  )
}

export default PopUp
