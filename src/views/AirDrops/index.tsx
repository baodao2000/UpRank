import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'

const Waraper = styled.div`
  display: flex;
  justify-content: center;
  * {
    font-family: Inter, sans-serif;
  }
`
const Container = styled.div`
  padding: 96px 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-content: center;
  .system {
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    background: var(--primary-primary-gradient-2, linear-gradient(180deg, #7b3fe4 0%, #a726c1 100%));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  // max-width: 876px;
  width: 100%;
  @media screen and (max-width: 575px) {
    padding: 40px 16px;
  }
`
const CardGruop = styled.div`
  display: flex;
  gap: 26px;
  width: 100%;
  justify-content: center;
  @media screen and (max-width: 575px) {
    gap: 10px;
  }
`
const Card = styled.div`
  border-radius: 22px;
  background: var(--primary-primary-gradient-2, linear-gradient(180deg, #7b3fe4 0%, #a726c1 100%));
  max-width: 199px;
  height: 199px;
  width: 20%;
  // height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 575px) {
    width: 78px;
    height: 111px;
    border-radius: 8px;
  }
`
const CardText = styled(Text)`
  color: var(--greyscale-text, #e2e1e5);
  text-align: center;

  /* Display xs/Semibold */
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  @media screen and (max-width: 800px) {
    font-size: 18px;
  }
  @media screen and (max-width: 575px) {
    font-size: 12px;
  }
`
const CardNumber = styled(Text)`
  color: var(--white-white, #fff);
  text-align: center;

  /* Display xl/Bold */
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
  line-height: 72px; /* 120% */
  letter-spacing: -1.2px;
  @media screen and (max-width: 800px) {
    font-size: 40px;
  }
  @media screen and (max-width: 575px) {
    font-size: 24px;
    line-height: 32px;
  }
`
const AirDrops = () => {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const timeStamp = Math.floor(Date.now() / 1000)
  useEffect(() => {
    let countdown = 1694501880 - timeStamp
    const updateCountdown = () => {
      setDays(Math.floor(countdown / 86400))
      setHours(Math.floor((countdown % 86400) / 3600))
      setMinutes(Math.floor((countdown % 3600) / 60))
      setSeconds(countdown % 60)
    }
    const timer = setInterval(() => {
      if (countdown > 0) {
        updateCountdown()
        countdown--
      } else {
        clearInterval(timer)
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [timeStamp])
  return (
    <Waraper>
      <Container>
        <img width="148px" height="120px" src="/images/V3/Error.svg" />
        <Text
          style={{
            fontSize: '20px',
            fontWeight: '500',
            color: '#E2E1E5',
          }}
        >
          Available in
        </Text>
        <CardGruop>
          <Card>
            <CardNumber>{days}</CardNumber>
            <CardText>DAYS</CardText>
          </Card>
          <Card>
            <CardNumber>{hours}</CardNumber>
            <CardText>HOURS</CardText>
          </Card>
          <Card>
            <CardNumber>{minutes}</CardNumber>
            <CardText>MINUTES</CardText>
          </Card>
          <Card>
            <CardNumber>{seconds}</CardNumber>
            <CardText>SECONDS</CardText>
          </Card>
        </CardGruop>
        <Text className="system">System Updating</Text>
        <Text
          style={{
            color: '#ADABB2',
            textAlign: 'center',
            maxWidth: '532px',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '28px',
          }}
        >
          A new system update is available. This update includes security fixes, performance improvements, and new
          features.
        </Text>
      </Container>
    </Waraper>
  )
}
export default AirDrops
