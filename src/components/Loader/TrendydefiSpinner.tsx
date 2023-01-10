import React from 'react'
import styled, { keyframes } from 'styled-components'
import Trendydefi from './TRENDEYDEFI'
import { SpinnerProps } from './types'
import { TrendyPlanetSpinner } from './TrendyPlanetSpinner'
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const float = keyframes`
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(10px);
	}
	100% {
		transform: translatey(0px);
	}
`

const Container = styled.div`
  position: relative;
`
const Loader = styled.div`
  font-size: 50px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
`
const TrendydefiIcon = styled.div`
  animation: ${float} 6s ease-in-out infinite;
  transform: translate3d(0, 0, 0);
  display: flex;
  justify-content: center;
`

const Spinner: React.FC<React.PropsWithChildren<SpinnerProps>> = ({ size = 200 }) => {
  return (
    <Container>
      <Loader>
        {/* <Trendydefi /> */}
        <TrendyPlanetSpinner />
      </Loader>
    </Container>
  )
}

export default Spinner
