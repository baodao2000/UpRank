import { Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import Image from 'next/image'
import styled from 'styled-components'
import images from 'configs/images'

const Wrapper = styled.div`
  background: url(${images.bg}) no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 20px !important;
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
  }
`
const Container = styled.div`
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 100%;
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
  display: flex;
  width: 490px;
  height: 300px;
  line-height: 100px;
  gap: 44px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 575px) {
    height: 100%;
    width: 320px;
  }
`
const ContentRight = styled.div`
  display: flex;
  width: 216px;
  gap: 20px;
  flex-direction: column;
`
const ContentLeft = styled.div`
  display: flex;
  width: 310px;
  gap: 20px;
  flex-direction: column;
  justify-content: flex-end;
`
const Item = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
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
    title: 'Team foundation',
    label: '15.00%',
    text: '#FF703B',
  },
  {
    title: 'Miners Reward',
    label: '50.00%',
    text: '#8544F5',
  },
  {
    title: 'Bounty - Marketing',
    label: '3.00%',
    text: '#AF89EE',
  },
]
const dataRight = [
  {
    title: 'Platform',
    label: '17.00%',
    text: '#8ED556',
  },

  {
    title: 'Market Maker',
    label: '10.00%',
    text: '#1250B0',
  },
  {
    title: 'Early Contributors',
    label: '5.00%',
    text: '#3AA6FF',
  },
]

function Tokenomic() {
  const { isMobile, isTablet } = useMatchBreakpoints()

  return (
    <Wrapper>
      <Container>
        <OverviewText>Tokenomic Overview</OverviewText>

        <OverviewContent style={{ width: isMobile ? '343px' : isTablet ? '743px' : '785px' }}>
          Welcome to our member count section! Here, you can track the growth of our community and get a sense of the
          scale of our website&apos;s audience.
        </OverviewContent>
        <Token>
          <Image
            src="/images/newTokenomic.png"
            alt="tokenomic"
            width={isMobile ? '343px' : '500px'}
            height={isMobile ? '343px' : '500px'}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SupplyText>Supply</SupplyText>
            <SupplyNumber>21,000,000 TREND</SupplyNumber>
            <Card>
              <ContentLeft>
                {dataLeft.map((item, index) => (
                  <Item>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <Label style={{ color: dataLeft[index].text }}>{item.label}</Label>
                      <Title>{item.title}</Title>
                    </div>
                  </Item>
                ))}
              </ContentLeft>
              <ContentRight>
                {dataRight.map((item, index) => (
                  <Item>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
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

export default Tokenomic
