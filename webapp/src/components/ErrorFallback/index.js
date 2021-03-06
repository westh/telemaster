import Button from 'components/Button'
import React from 'react'
import styled from 'styled-components'

const CenterWrapper = styled.div`
  display: flex;
  padding-top: 50px;
  justify-content: center;
`

const WidthWrapper = styled.div`
  width: 70%;
  max-width: 1200px;
  text-align: center;
`

const ErrorMessage = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.2em 0.4em;
  font-size: 85%;
  background: rgba(150, 150, 150, 0.1);
  border: 1px solid rgba(100, 100, 100, 0.2);
  border-radius: 3px;
  height: 50vh;
  overflow-y: scroll;
`

function ErrorFallback ({error, resetErrorBoundary}) {
  return (
    <CenterWrapper>
      <WidthWrapper>
        <h2>Oops... Something went wrong</h2>
        <ErrorMessage>
          {error.message}
        </ErrorMessage>
        <Button
          size="large"
          type='secondary'
          onClick={resetErrorBoundary}
        >
          Take me back
        </Button>
      </WidthWrapper>
    </CenterWrapper>
  )
}

export default ErrorFallback
