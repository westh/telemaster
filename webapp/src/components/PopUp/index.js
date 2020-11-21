import { Tabs, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const { TabPane } = Tabs

const Description = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`

const Wrapper = styled.div`
  padding: 5px;
  width: 400px;
`

const Row = styled.div`
  display: flex;
`

const TitleColumn = styled.div`
  width: 80px;
`

const DataColumn = styled.div`
`

const StyledTag = styled(Tag)`
  margin-top: 2px;
`

function MastInformation ({ operatorAggregatedData }) {
  return (
    <Description>
      <Row>
        <TitleColumn>
          Operator:
        </TitleColumn>
        <DataColumn>
          {operatorAggregatedData?.operator}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>
          Technology:
        </TitleColumn>
        <DataColumn>
          {
            operatorAggregatedData?.technology &&
            operatorAggregatedData.technology.map(technology => {
              return (
                <Tag color={technology[1]}>
                  {technology[0]}
                </Tag>
              )
            })
          }
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>
          Frequency:
        </TitleColumn>
        <DataColumn>
        {
          operatorAggregatedData?.frequency &&
          operatorAggregatedData.frequency.map(frequency => {
            return (
              <StyledTag color={frequency[1]}>
                {frequency[0]}
              </StyledTag>
            )
          })
        }
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>
          City:
        </TitleColumn>
        <DataColumn>
          {operatorAggregatedData?.city}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>
          Postal code:
        </TitleColumn>
        <DataColumn>
          {operatorAggregatedData?.postalCode}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>
          Street:
        </TitleColumn>
        <DataColumn>
          {operatorAggregatedData?.street}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>
          Latitude:
        </TitleColumn>
        <DataColumn>
        {operatorAggregatedData?.latitude}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>
          Longitude:
        </TitleColumn>
        <DataColumn>
          {operatorAggregatedData?.longitude}
        </DataColumn>
      </Row>
    </Description>
  )
}

function PopUp ({ masts }) {
  const [mastsPerOperatorObject, setMastsPerOperatorObject] = useState({})

  useEffect(() => {
    async function fetchAllData () {
      const mastData = await Promise.all(
        masts.map(mast => {
          return fetch(`${process.env.REACT_APP_BASE_URL}/masts/${mast.id}`)
            .then(response => response.json())
          }
        )
      )

      function getAggregation (operatorSpecificMasts) {
        const technologyColorMapping = {
          GSM: 'green',
          UMTS: 'cyan',
          LTE: 'blue',
        }

        const technologies = operatorSpecificMasts?.map(mast => [mast?.technology, technologyColorMapping[mast?.technology]])

        return {
          operator: operatorSpecificMasts[0]?.operator,
          technology: Array.from(new Set(technologies.map(x=>JSON.stringify(x))), x=>JSON.parse(x)),
          frequency: operatorSpecificMasts?.map(mast => [mast?.frequency, technologyColorMapping[mast?.technology]]),
          city: operatorSpecificMasts[0]?.city,
          postalCode: operatorSpecificMasts[0]?.postalCode,
          street: operatorSpecificMasts[0]?.street,
          latitude: operatorSpecificMasts[0]?.latitude && operatorSpecificMasts[0]?.latitude.toFixed(4),
          longitude: operatorSpecificMasts[0]?.longitude && operatorSpecificMasts[0]?.longitude.toFixed(4)
        }
      }

      setMastsPerOperatorObject({
        tdc: getAggregation(mastData.filter(mast => mast?.operator.includes('TDC'))),
        teliaTelenor: getAggregation(mastData.filter(mast => mast?.operator.includes('Telia'))),
        three: getAggregation(mastData.filter(mast => mast?.operator.includes('3')))
      })
    }

    fetchAllData()
  }, [masts])

  return (
    <Wrapper>
      <Tabs size='small'>
        {
          mastsPerOperatorObject?.teliaTelenor?.operator &&
          <TabPane tab='Telenor/Telia' key='1'>
            <MastInformation operatorAggregatedData={mastsPerOperatorObject?.teliaTelenor} />
          </TabPane>
        }
        {
          mastsPerOperatorObject?.tdc?.operator &&
          <TabPane tab='TDC' key='2'>
            <MastInformation operatorAggregatedData={mastsPerOperatorObject?.tdc} />
          </TabPane>
        }
        {
          mastsPerOperatorObject?.three?.operator &&
          <TabPane tab='3 DK' key='3'>
            <MastInformation operatorAggregatedData={mastsPerOperatorObject?.three} />
          </TabPane>
        }
      </Tabs>
    </Wrapper>
  )
}

export default PopUp
