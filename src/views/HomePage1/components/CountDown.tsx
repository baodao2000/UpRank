import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { timeDisplayLong } from 'views/Pools2/util'
import { Heading } from '@pancakeswap/uikit'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled(Heading)`
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;
  text-align: center;
  color: #816bf2;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 40px;
    line-height: 46px;
    text-align: start;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 48px;
    line-height: 60px;
  }
`

const BlockCountDown = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const NumberCountDown = styled.div`
  font-weight: 600;
  color: #00ffc2;
  font-size: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 40px;
    line-height: 46px;
    text-align: start;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 50px;
    line-height: 60px;
  }
`

const StringCountDown = styled.div`
  font-size: 14px;
  color: white;

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 20px;
    line-height: 60px;
  }
`

const CountDown = ({ title }) => {
  const [countDown, setCountDown] = React.useState(1679220000 - moment().unix())
  React.useEffect(() => {
    const timerId = setInterval(() => {
      setCountDown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [countDown])

  return (
    <>
      {countDown !== 0 ? (
        <Wrapper>
          {title && (
            <Title color="mainColor" data-aos="fade-left">
              {title}
            </Title>
          )}
          <Title color="mainColor" data-aos="fade-left">
            Pool stake start in
          </Title>
          <BlockCountDown data-aos="fade-right">
            {timeDisplayLong(countDown)
              .split(' ')
              .map((item) =>
                Number(item) ? <NumberCountDown>{item}</NumberCountDown> : <StringCountDown>{item}</StringCountDown>,
              )}
          </BlockCountDown>
        </Wrapper>
      ) : null}
    </>
  )
}

export default CountDown
