import styled, { keyframes } from 'styled-components'
import images from 'configs/images'
import { Flex, Text, Button, Heading } from '@pancakeswap/uikit'
import 'aos/dist/aos.css'

const Crypto = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 14%;
  * {
    font-family: Inter, sans-serif;
  }
`

const Title = styled(Heading)`
  font-size: 60px;
  font-style: normal;
  font-weight: 500;
  line-height: 72px; /* 120% */
  letter-spacing: -1.2px;
  text-align: center;
`
const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 40px;
`
const Card = styled.div`
  margin-top: 32px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    border-radius: 24px;
    border: 2px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
    background: var(--white-white-6, rgba(255, 255, 255, 0.06));
    box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.1);
  }
`
const CardTitle = styled(Text)`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  color: #fff;
`
const CardLabel = styled(Text)`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: rgba(103, 102, 110, 1);
  text-align: center;
`
const data = [
  {
    image: './images/V3/MoneyExchange.png',
    title: 'Exchange Instantly',
    label: 'and faster than ever',
  },
  {
    image: './images/V3/Highest.png',
    title: 'Exchange Instantly',
    label: 'and faster than ever',
  },
  {
    image: './images/V3/Time.png',
    title: 'Exchange Instantly',
    label: 'and faster than ever',
  },
  {
    image: './images/V3/MoneyTree.png',
    title: 'Exchange Instantly',
    label: 'and faster than ever',
  },
]
const CryptoHome = ({ handleClick }) => {
  return (
    <Crypto className="block">
      <Title color="mainColor" className="title colorchange">
        {/* <StyledText>All-in-One</StyledText> for Your Crypto */}Why TrendyDefi?
      </Title>
      <Content>
        {data.map((items, r) => (
          <Card>
            <img width="120px" height="120px" src={items.image} style={{ marginBottom: '24px' }} />
            <CardTitle>{items.title}</CardTitle>
            <CardLabel>{items.label}</CardLabel>
          </Card>
        ))}
        <Card>
          <img width="120px" height="120px" src="./images/V3/autited.png" style={{ marginBottom: '24px' }} />
          <CardTitle>Audited by Certik</CardTitle>
          <CardLabel style={{ color: '#8544F5' }}>Learn more</CardLabel>
        </Card>
      </Content>
      {/* <ImageLeftMb flexDirection="column" alignItems="center">
          <img className="cyptophone" srcSet={images.phone} alt="" />
        </ImageLeftMb>
        <CustomSpan color="mainColor" className="colorchange">
          <img src={images.star} alt="" />
          <span>Exchange Instantly</span>
        </CustomSpan>
        <CustomSpan color="mainColor" className="colorchange">
          <img src={images.star} alt="" />
          <span>Highest Private & Secure</span>
        </CustomSpan>
        <CustomSpan color="mainColor" className="colorchange">
          <img src={images.star} alt="" />
          <span>Earn Passive Income</span>
        </CustomSpan>
        <CustomSpan color="mainColor" className="colorchange">
          <img src={images.star} alt="" />
          <span>Convenient</span>
        </CustomSpan>
        <CustomSpan color="mainColor" className="colorchange">
          <img src={images.star} alt="" />
          <span>Audited by Certik</span>
        </CustomSpan> */}
    </Crypto>
  )
}

export default CryptoHome
