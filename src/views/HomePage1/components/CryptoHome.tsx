import styled from 'styled-components'
import { Text, Heading } from '@pancakeswap/uikit'
import 'aos/dist/aos.css'

const Crypto = styled.div`
  * {
    font-family: Inter, sans-serif;
  }
  position: relative;
  z-index: 1;
  margin-top: 60px;
  @media (max-width: 575px) {
    margin-top: 40px;
  }
`

const Title = styled(Heading)`
  font-size: 60px;
  font-style: normal;
  font-weight: 500;
  line-height: 72px;
  text-align: center;
  @media (max-width: 575px) {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }
`
const Content = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  @media (max-width: 575px) {
    margin-top: 24px;
    gap: 9px;
  }
  @media (max-width: 345px) {
    margin-top: 24px;
    gap: 6px;
  }
`
const Card = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid;
  justify-content: center;
  &:hover {
    border-radius: 24px;
    border: 2px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 575px) {
    padding: 13px;
  }
  @media (max-width: 345px) {
    padding: 9px;
  }
`
const CardTitle = styled(Text)`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  color: #fff;
  @media (max-width: 575px) {
    font-size: 14px;
    line-height: 20px;
  }
`
const CardLabel = styled(Text)`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: rgba(103, 102, 110, 1);
  text-align: center;
  @media (max-width: 575px) {
    font-size: 12px;
    line-height: 18px;
  }
`
const Img = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 24px;
  @media (max-width: 575px) {
    width: 96px;
    height: 96px;
  }
  @media (max-width: 345px) {
    width: 93px;
    height: 93px;
  }
`

const data = [
  {
    image: './images/V3/MoneyExchange.png',
    title: 'Exchange Instantly',
    label: 'and faster than ever',
  },
  {
    image: './images/V3/Highest.png',
    title: 'Highest Private ',
    label: 'Most Secure',
  },
  {
    image: './images/V3/Time.png',
    title: 'Earn Passive Income',
    label: 'Every month',
  },
  {
    image: './images/V3/MoneyTree.png',
    title: 'Convenient',
    label: 'and simple to use',
  },
]
const CryptoHome = () => {
  return (
    <Crypto className="block">
      <Title color="mainColor" className="title colorchange">
        Why TrendyDefi ?
      </Title>
      <Content data-aos="fade-left">
        {data.map((items, r) => (
          <Card>
            <Img src={items.image} />
            <CardTitle>{items.title}</CardTitle>
            <CardLabel>{items.label}</CardLabel>
          </Card>
        ))}
        <Card>
          <Img src="./images/V3/autited.png" />
          <CardTitle>Audited by Certik</CardTitle>
          <CardLabel style={{ color: '#8544F5' }}>Learn more</CardLabel>
        </Card>
      </Content>
    </Crypto>
  )
}

export default CryptoHome
