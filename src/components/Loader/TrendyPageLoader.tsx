import styled from 'styled-components'
import Page from '../Layout/Page'
import TrendydefiSpinner from './TrendydefiSpinner'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const TrendyPageLoader: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Wrapper>
      <TrendydefiSpinner />
    </Wrapper>
  )
}

export default TrendyPageLoader
