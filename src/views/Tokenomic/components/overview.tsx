import { Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import Image from 'next/image'
import styled from 'styled-components'
import images from 'configs/images'

const Wrapper = styled.div`
  background: url(${images.bg});
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  * {
    font-family: Inter, sans-serif;
  }
  @media screen and (max-width: 575px) {
    background: black;
  }
`
const OverviewText = styled.div`
  font-size: 60px;
  font-weight: 700;
  line-height: 72px;
  letter-spacing: -0.02em;
  text-align: left;

  margin-top: 30px;
  background: linear-gradient(180deg, #7b3fe4 0%, #a726c1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 575px) {
    font-size: 24px;
  }
`

const OverviewContent = styled(Text)`
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0em;
  color: #adabb2;
  text-align: center;
  @media screen and (max-width: 575px) {
    font-size: 16px;
    line-height: 24px;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 56px;
  margin-bottom: 140px;
  @media screen and (max-width: 1440px) {
    margin-bottom: 90px;
  }
  @media screen and (max-width: 900px) {
    margin-bottom: 4px;
  }
  @media screen and (max-width: 575px) {
    margin-top: 16px;
    margin-bottom: 4px !important;
  }
`
const Token = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  margin-top: 30px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`
const Card = styled.div`
  border-radius: 8px;
  margin-top: 60px;
  display: flex;
  width: 600px;
  height: 300px;
  line-height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 575px) {
    height: 100%;
    width: 350px;
    margin-top: 12px;
  }
`
const ContentRight = styled.div`
  display: flex;
  width: 246px;
  gap: 58px;

  flex-direction: column;
  @media screen and (max-width: 575px) {
    width: 390px;
  }
`
const ContentLeft = styled.div`
  display: flex;
  padding: 16px 24px 16px 24px;

  width: 276px;
  gap: 58px;
  flex-direction: column;
  justify-content: flex-end;
  @media screen and (max-width: 575px) {
    width: 535px;
  }
`
const Item = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;

  // &:hover {
  //   border-radius: 10px;
  //   border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
  //   background: var(--white-white-6, rgba(255, 255, 255, 0.06));
  //   box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.1);
  //   height: 100px;
  //   padding: 16px;
  // }
  // @media screen and (max-width: 575px) {
  //   &:hover {
  //     display: none;
  //   }
  // }
`
const Title = styled(Text)`
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
  @media screen and (max-width: 575px) {
    font-size: 14px;
  }
`
const Label = styled(Text)`
  font-size: 30px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: left;
  @media screen and (max-width: 575px) {
    font-size: 20px;
  }
`
const SupplyText = styled(Text)`
  line-height: 30px;
  font-weight: 500;
  color: #adabb2;
  font-size: 20px;
  @media screen and (max-width: 575px) {
    font-size: 18px;
  }
`
const SupplyNumber = styled(Text)`
  font-size: 54px;
  line-height: 64px;
  font-weight: 700;
  @media screen and (max-width: 575px) {
    font-size: 20px;
  }
`
const dataLeft = [
  {
    title: '🔒 Team foundation',
    label: '15.00%',
    text: '#FF703B',
  },
  {
    title: '🔒 Miners Reward',
    label: '50.00%',
    text: '#8544F5',
  },
  {
    title: '🔒 Bounty - Marketing',
    label: '3.00%',
    text: '#AF89EE',
  },
]
const dataRight = [
  {
    title: '🔒 Trategic Partners',
    label: '17.00%',
    text: '#8ED556',
  },

  {
    title: '🔒 Market Maker',
    label: '10.00%',
    text: '#1250B0',
  },
  {
    title: '🔒 Early Contributors',
    label: '5.00%',
    text: '#3AA6FF',
  },
]

function Overview() {
  const { isMobile, isTablet } = useMatchBreakpoints()

  return (
    <Wrapper>
      <Container>
        <OverviewText>Tokenomic</OverviewText>

        <OverviewContent style={{ width: isMobile ? '343px' : isTablet ? '743px' : '785px' }}>
          Building Trust, One Block at a Time - Discover the future of TREND Token.
        </OverviewContent>
        <Token>
          <Image
            src="/images/TokenomicNew.png"
            alt="tokenomic"
            width={isMobile ? '343px' : '500px'}
            height={isMobile ? '343px' : '500px'}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SupplyText>Total Supply</SupplyText>
            <SupplyNumber>21,000,000 TREND</SupplyNumber>
            <Card>
              <ContentLeft>
                {dataLeft.map((item, index) => (
                  <Item>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <Label style={{ color: dataLeft[index].text }}>{item.label}</Label>
                      <Title>{item.title}</Title>
                    </div>
                  </Item>
                ))}
              </ContentLeft>
              <ContentRight>
                {dataRight.map((item, index) => (
                  <Item>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <Label style={{ color: dataRight[index].text }}>{item.label}</Label>
                      <Title>{item.title}</Title>
                    </div>
                  </Item>
                ))}
              </ContentRight>
            </Card>
          </div>
        </Token>
      </Container>
    </Wrapper>
  )
}

export default Overview
