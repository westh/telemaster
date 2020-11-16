import { Pagination } from 'antd'
import useMast from 'hooks/use-mast'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Description = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`

const Wrapper = styled.div`
  padding: 5px;
  width: 250px;
`

const StyledPagination = styled(Pagination)`
  max-width: 300px;
`

const Row = styled.div`
  display: flex;
`

const TitleColumn = styled.div`
  width: 80px;
`

const DataColumn = styled.div`
`

function MastInformation ({ id }) {
  const [{ data, isLoading, isError }] = useMast(id)

  return (
    <Description>
      <Row>
        <TitleColumn>
          Operator:
        </TitleColumn>
        <DataColumn>
          {data?.operator}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>
          Technology:
        </TitleColumn>
        <DataColumn>
          {data?.technology}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>
          Frequency:
        </TitleColumn>
        <DataColumn>
          {data?.frequency}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>
          City:
        </TitleColumn>
        <DataColumn>
          {data?.city}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>
          Postal code:
        </TitleColumn>
        <DataColumn>
          {data?.postalCode}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>
          Street:
        </TitleColumn>
        <DataColumn>
          {data?.street}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>
          Latitude:
        </TitleColumn>
        <DataColumn>
        {data?.latitude && data.latitude.toFixed(2)}
        </DataColumn>
      </Row>
      <Row>
        <TitleColumn>
          Longitude:
        </TitleColumn>
        <DataColumn>
          {data?.longitude && data.longitude.toFixed(2)}
        </DataColumn>
      </Row>
    </Description>
  )
}

function PopUp ({ masts }) {
  const [mastNumber, setMastNumber] = useState(1)

  useEffect(() => {
    setMastNumber(1)
  }, [masts])

  return (
    <Wrapper>
      <MastInformation id={masts[mastNumber - 1]?.id} />
      <StyledPagination
        size='small'
        responsive={true}
        current={mastNumber}
        pageSize={1}
        total={masts.length}
        onChange={page => setMastNumber(page)}
      />
    </Wrapper>
  )
}

export default PopUp
