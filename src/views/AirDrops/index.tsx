import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Button, Text, useMatchBreakpoints, useToast } from '@pancakeswap/uikit'
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'
import Link from 'next/link'

const Waraper = styled.div`
  display: flex;
  justify-content: center;
  * {
    font-family: Inter, sans-serif;
  }
`
const CheckList = styled.div`
* {
    font-family: Inter,sans-serif;
}
max-width: 400px;
border-radius: 24px;
display: flex;
flex-direction: column;
justify-contect: center;
align-items: center;
gap: 20px;
@media screen and (max-width: 575px) {
    .text {
        font-size: 18px;
    }`
const Title = styled(Text)`
text-align: center;
color: #FFF;
text-align: center;

/* Display xs/Bold */
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 32px; /* 133.333% */


}`
const ButtonClaim = styled(Button)`
  border-radius: var(--border-radius-lg, 8px);
  background: var(--primary-primary-1, #8544f5);
  color: #fff;
  /* light effect/boxShadow */
  box-shadow: 2px 2px 8px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 0px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-8, 8px);
  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {
    transform: none;
  }
`
const SocialGroup = styled.div`
  display: flex;
  gap: 20px;
`
const Social = styled.a`
  img {
    width: 32px;
    height: 32px;
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
  const { account, chainId } = useWeb3React()
  const isCheckList = useRef(false)
  const [isClaim, setIsClaim] = useState(false)
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const timeStamp = Math.floor(Date.now() / 1000)
  const ListAccount = async () => {
    if (account === '0x22852cbcF916Dd0B32BB25680ec3a4f9ce223e52') {
      isCheckList.current = false
    } else if (account === '0x657aa592FdCa8614c5D5A400f19d099B9f72fb7D') {
      isCheckList.current = true
      setIsClaim(false)
    } else if (account === '0x909839C893f5768e739eC7b6AF878537b84B9220') {
      isCheckList.current = true
      setIsClaim(true)
    }
  }
  useEffect(() => {
    if (account) {
      ListAccount()
    }
  }, [account, isCheckList.current, isClaim])
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
  const { isMobile } = useMatchBreakpoints()
  const { toastSuccess } = useToast()
  const handleClaim = () => {
    toastSuccess('You have claimed your rewards!')
  }
  return (
    <Waraper>
      <Container>
        <>
          {isCheckList.current === false ? (
            <CheckList>
              <Title className="text">
                Your account is not in the whitelist, please follow social channels or join the Matic stacke to claim
                TREND.
              </Title>
              <SocialGroup>
                <Social href="https://twitter.com/TrendyDefi">
                  <img src="images/V3/twitter-icon.svg" />
                </Social>
                <Social href="https://twitter.com/TrendyDefi">
                  <img src="images/V3/Telegramicon.svg" />
                </Social>
                <Social href="https://t.me/trendydefiglobal">
                  <img src="images/V3/Telegramicon.svg" />
                </Social>
              </SocialGroup>
              <Link href="/pools">
                <ButtonClaim>Stacking Now</ButtonClaim>
              </Link>
            </CheckList>
          ) : (
            <CheckList>
              {isClaim === false ? (
                <>
                  <Title>Your Rewards</Title>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <img width="24px" height="24px" src="images/trendyloopcoin2.png" />
                    <Title>0.5</Title>
                  </div>

                  <ButtonClaim onClick={handleClaim}>Claim</ButtonClaim>
                </>
              ) : (
                <>
                  <Title style={{ fontSize: isMobile ? '20px' : '20px' }}>
                    You had claimed please stacke Matic to receive TREND.
                  </Title>
                  <Link href="/pools">
                    <ButtonClaim>Stacking Now</ButtonClaim>
                  </Link>
                </>
              )}
            </CheckList>
          )}
        </>

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
