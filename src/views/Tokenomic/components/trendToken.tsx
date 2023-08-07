import { Flex, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

const TrendTokenText = styled.div`
  color: var(--state-bold-white, #fff);
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 60px;
  letter-spacing: -0.96px;
  @media screen and (max-width: 575px) {
    font-size: 25px;
  }
`

const TrendContent = styled(Text)`
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  @media screen and (max-width: 575px) {
    font-size: 16px;
  }
`
const Container = styled.div`
  display: flex;
  margin-top: 80px;
  flex-direction: column;
`
const TokenText = styled.div`
  color: var(--neutrals-4, #777e90);

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`
const CardTrend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 64px;
  flex-shrink: 0;
  @media screen and (max-width: 575px) {
    gap: 16px;
  }
`
const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`
const Divider = styled.div`
  width: 553px;
  height: 1px;
  background-color: #353945;
  @media screen and (max-width: 575px) {
    width: 343px;
  }
`
const Circle = styled.div`
  height: 56px;
  width: 56px;
  background-color: #23262f;
  border-radius: 50%;
  display: inline-block;
  align-items: center;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 575px) {
    height: 32px;
    width: 32px;
  }
`
const ContentToken = styled.div`
  display: flex;
  margin-top: 64px;
  @media screen and (max-width: 1024px) {
    flex-direction: column-reverse !important;
  }
`
function TrendToken() {
  const { isMobile, isTablet } = useMatchBreakpoints()

  return (
    <Container>
      <TrendTokenText>TREND Mining, Bounty & Airdrop</TrendTokenText>
      <ContentToken
        style={{
          flexDirection: isMobile ? 'column-reverse' : isTablet ? 'column-reverse' : 'row',
          gap: isMobile ? '50px' : '200px',
        }}
      >
        <CardTrend>
          <CardContent>
            <Circle>
              <Image src="/images/checkCircle.png" width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} alt="" />
            </Circle>
            <Flex style={{ flexDirection: 'column' }}>
              <TrendContent>Mine Trend token</TrendContent>
              <TokenText>
                Through pool Stater Visit Pool{''}
                <Link href="/pools">
                  <span
                    style={{
                      color: 'var(--primary-primary-1, #8544F5)',
                      fontSize: '11px',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      lineHeight: '20px',
                      cursor: 'pointer',
                    }}
                  >
                    Visit Pool
                  </span>
                </Link>
              </TokenText>
            </Flex>
          </CardContent>
          <Divider />
          <CardContent>
            <Circle>
              <Image src="/images/checkCircle.png" width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} alt="" />
            </Circle>
            <Flex style={{ flexDirection: 'column' }}>
              <TrendContent>Mine TREND token</TrendContent>
              <TokenText>By developing the pool standard system</TokenText>
            </Flex>
          </CardContent>
          <Divider />

          <CardContent>
            <Circle>
              <Image src="/images/checkCircle.png" width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} alt="" />
            </Circle>
            <Flex style={{ flexDirection: 'column' }}>
              <TrendContent>Earn profit and receive reward</TrendContent>
              <TokenText>On Trendy DeFi community platforms</TokenText>
            </Flex>
          </CardContent>
        </CardTrend>
        <Image
          src="/images/trendyimg.svg"
          width={isMobile ? '343px' : '438px'}
          height={isMobile ? '216px' : '453px'}
          alt=""
        />
        {/* <Image
          style={{ display: isMobile ? 'flex' : 'none' }}
          src="/images/tokenMobile.jpg"
          width={343}
          height={216}
          alt=""
        /> */}
      </ContentToken>
    </Container>
  )
}

export default TrendToken
