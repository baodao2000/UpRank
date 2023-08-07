import styled from 'styled-components'
import images from 'configs/images'
import { Heading, Text, Button } from '@pancakeswap/uikit'
import 'aos/dist/aos.css'

const Title = styled(Heading)`
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 60px;
  color: rgba(173, 171, 178, 1);
  margin-bottom: 14px;
  @media (max-width: 1024px) {
    font-size: 42px;
    line-height: 42px;
  }
  @media (max-width: 575px) {
    margin-bottom: 16px;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }
`

const TitleM = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  color: rgba(173, 171, 178, 1);
`

const Wrapper = styled.div`
* {
  font-family: Inter, sans-serif;
}
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%
  z-index: 1;
  span {
    background: var(--primary-priamry-gradient, linear-gradient(180deg, #8A46FF 0%, #6E38CC 100%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
  }
  @media screen and (max-width: 600px) {
    display: flex;
    align-items: center;
    text-align: center;
  }
`
const Card = styled.div`
  border-radius: 24px;
  position: relative;
  border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
  background: var(--white-white-6, rgba(255, 255, 255, 0.06));
  backdrop-filter: blur(5.5px);
  width: 585px;
  height: 460px;
  margin-bottom: 56px;
  padding: 40px;
  gap: 16px;
  .imgCard {
    position: absolute;
    bottom: 10%;
    @media (max-width: 600px) {
      width: 140px;
      height: 140px;
      display: flex;
      justify-content: flex-start;
    }
  }
  @media (max-width: 1266px) {
    margin-bottom: 20px;
    width: 500px;
  }
  @media (max-width: 1062px) {
    width: 340px;
  }
  @media (max-width: 740px) {
    padding: 30px;
    height: 360px;
    width: 100%;
  }
  @media (max-width: 575px) {
    padding: 25px;
  }
`
const CardList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 56px;
  justify-content: center;
  align-items: start;
  margin-top: 120px;
  background: url(${images.bgV3}) no-repeat;
  width: 100%;
  height: auto;
  background-size: contain;
  background-position: center;
  @media (max-width: 1266px) {
    gap: 20px;
  }
  @media (max-width: 740px) {
    flex-direction: column;
    gap: 0;
  }
  @media (max-width: 575px) {
    margin-top: 20px;
    flex-direction: column;
  }
`
const CardTitle = styled(Text)`
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 38px;
  color: rgba(226, 225, 229, 1);
  margin-bottom: 16px;
  text-align: start;
  @media (max-width: 575px) {
    font-size: 20px;
    line-height: 30px;
    font-weight: 700;
  }
`
const CardLabel = styled(Text)`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  color: rgba(173, 171, 178, 1);
  text-align: start;
`
const CardItem = styled.div`
  margin-top: 175px;
  @media (max-width: 740px) {
    margin-top: 0;
  }
`
const coverdList = [
  {
    img: './images/V3/Custodial.png',
    title: 'Non-Custodial',
    detail: 'Take Full Control of Your Crypto: Freedom to Manage Your Funds and Data.',
  },
  {
    img: './images/V3/Privacy.png',
    title: 'Privacy',
    detail: 'Your Data, Your Control: Safeguarding Privacy with Trendy DeFi.',
  },
]
const coverdListRight = [
  {
    img: './images/V3/Ledger.png',
    title: 'Ledger Support',
    detail: 'Incorporate an extra layer of security by integrating your hardware wallet.',
  },
  {
    img: './images/V3/Bio.png',
    title: 'Biometric authentication',
    detail: 'Safeguard your valuable assets on the go with just a touch or a glance.',
  },
]
const Covered = () => {
  return (
    <Wrapper>
      <Title>
        We’ve got you <span style={{ fontWeight: '700' }}>covered</span>
      </Title>
      <TitleM>Only you can access your wallet. We don’t collect any personal data.</TitleM>
      <CardList>
        <div>
          {coverdList.map((items, t) => (
            <Card data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" key={t}>
              <CardTitle>{items.title}</CardTitle>
              <CardLabel>{items.detail}</CardLabel>
              <img className="imgCard" src={items.img} />
            </Card>
          ))}
        </div>
        <CardItem>
          {coverdListRight.map((items, r) => (
            <Card data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" key={r}>
              <CardTitle>{items.title}</CardTitle>
              <CardLabel>{items.detail}</CardLabel>
              <img className="imgCard" src={items.img} />
            </Card>
          ))}
        </CardItem>
      </CardList>
    </Wrapper>
  )
}

export default Covered
