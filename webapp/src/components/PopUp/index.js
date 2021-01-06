import { Loading, Tabs, useTabs } from '@geist-ui/react'
import useAggregatedMasts from 'hooks/use-aggregated-masts'
import { operatorsShortNameMapping } from 'lib/mappings'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import MastInformation from './MastInformation'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  width: 370px;
  min-height: 270px;
`

const StyledTabs = styled(Tabs)`
  .tab {
    font-size: 14px !important;
  }
`

function PopUp({ masts }) {
  // eslint-disable-next-line
  const [mastsPerOperatorObject, isLoading, isError] = useAggregatedMasts(masts)
  const { bindings, setState } = useTabs()

  useEffect(() => {
    const shouldCalculateActiveTab = !isLoading && mastsPerOperatorObject
    if (!shouldCalculateActiveTab) return

    for (const operatorShortName of Object.keys(mastsPerOperatorObject)) {
      const isOperatorPresent = mastsPerOperatorObject[operatorShortName].length > 0
      if (!isOperatorPresent) continue

      setState(operatorShortName)
      return
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return (
    <>
      {mastsPerOperatorObject &&
        <Wrapper>
          {isLoading
            ? <Loading />
            : <StyledTabs
              {...bindings}
              hideDivider
            >
              {mastsPerOperatorObject && Object.keys(mastsPerOperatorObject)
                .filter(operatorShortName => mastsPerOperatorObject[operatorShortName].length > 0)
                .map(operatorShortName => {
                  return (
                    <Tabs.Item
                      label={operatorsShortNameMapping[operatorShortName]}
                      value={operatorShortName}
                    >
                      <MastInformation
                        operatorAggregatedData={mastsPerOperatorObject[operatorShortName]}
                      />
                    </Tabs.Item>
                  )
                })
              }
            </StyledTabs>
          }
        </Wrapper>
      }
    </>
  )
}

export default PopUp
