import { Layout } from 'antd'
import 'antd/dist/antd.css'
import ErrorFallback from 'components/ErrorFallback'
import Map from 'components/Map'
import PopUp from 'components/PopUp'
import Sidebar from 'components/Sidebar'
import useMasts from 'hooks/use-masts'
import React, { useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import styled from 'styled-components'
const { Content } = Layout

const StyledLayout = styled(Layout)`
  height: 100vh;
`

function App() {
  const popUpRef = useRef()
  const [selectedMasts, setSelectedMasts] = useState([])
  const [{ data, isLoading }, fetchData] = useMasts(
    { short: true },
    {
      type: 'FeatureCollection',
      features: []
    }
  )

  function applySettings (query) {
    fetchData({
      ...query,
      short: true
    })
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <StyledLayout>
        <Sidebar
          loading={isLoading}
          onApply={applySettings}
        />
        <Content>
          <Map
            data={data}
            onPopUp={setSelectedMasts}
            popUpRef={popUpRef}
          />
        </Content>
      </StyledLayout>
      <div ref={popUpRef}>
        <PopUp masts={selectedMasts} />
      </div>
    </ErrorBoundary>
  )
}

export default App
