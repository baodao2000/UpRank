import styled from 'styled-components'
import { Text, Heading } from '@pancakeswap/uikit'
import 'aos/dist/aos.css'
import Link from 'next/link'

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
  @media (max-width: 575px) {
    margin-top: 24px;
    gap: 20px;
    justify-content: center;
  }
`
const Card = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid;
  justify-content: center;
  width: 260px;
  &:hover {
    border-radius: 24px;
    border: 2px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 575px) {
    padding: 0px;
    width: 180px;
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
  span {
    color: #8544f5;
    cursor: pointer;
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
    title: 'Transferability',
    label: 'Exchange in real-time, instantl',
  },
  {
    image: './images/V3/Highest.png',
    title: 'Risk-free',
    label: 'Earn with utmost privacy and security',
  },
  {
    image: './images/V3/Time.png',
    title: 'Enriching',
    label: 'Stable & Thriving Passive Income monthly',
  },
  {
    image: './images/V3/MoneyTree.png',
    title: 'Non-complex',
    label: 'Convenient & simple to use',
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
          <CardTitle>Defended</CardTitle>
          <Link href="https://trendydefi.com/REP-final.pdf">
            <CardLabel>
              Audited by Certik - <span>Learn more</span>
            </CardLabel>
          </Link>
        </Card>
      </Content>
    </Crypto>
  )
}

export default CryptoHome
