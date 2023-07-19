import styled from 'styled-components'
import images from 'configs/images'
import { Heading, Text, Button } from '@pancakeswap/uikit'
import 'aos/dist/aos.css'

const Title = styled(Heading)`
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 60px; /* 125% */
  letter-spacing: -0.96px;
  color: rgba(173, 171, 178, 1);
  margin-bottom: 16px;
`

const TitleM = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  margin-top: 6px;
  color: rgba(173, 171, 178, 1);
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%
  z-index: 1;
  * {
    font-family: Inter, sans-serif;
  }
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
  }
`
const CardList = styled.div`
  display: flex;
  // flex-wrap: wrap;
  flex-direction: row;
  gap: 56px;
  jutify-content: center;
  margin-top: 120px;
  background: url(${images.bgV3}) no-repeat;
  width: 100%;
  height: auto;
  background-size: contain;
  background-position: center;
`
const CardTitle = styled(Text)`
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 38px;
  color: rgba(226, 225, 229, 1);
  margin-bottom: 16px;
`
const CardLabel = styled(Text)`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  color: rgba(173, 171, 178, 1);
`

const coverdList = [
  {
    img: './images/V3/Custodial.png',
    title: 'Non-Custodial',
    detail: 'We never have access to any of your data or funds. Ever.',
  },
  {
    img: './images/V3/Privacy.png',
    title: 'Privacy',
    detail: 'Phantom doesn’t track any personal identifiable information, your account addresses, or asset balances.',
  },
]
const coverdListRight = [
  {
    img: './images/V3/Ledger.png',
    title: 'Ledger Support',
    detail: 'For additional security you can connect your hardware wallet.',
  },
  {
    img: './images/V3/Bio.png',
    title: 'Biometric authentication',
    detail: 'Protect your assets on the go with the convenience you expect.',
  },
]
const Covered = () => {
  return (
    <Wrapper className="block">
      <Title>
        We’ve got you <span>covered</span>
      </Title>
      <TitleM>Only you can access your wallet. We don’t collect any personal data.</TitleM>
      <CardList>
        <div>
          {coverdList.map((items, t) => (
            <Card key={t}>
              <CardTitle>{items.title}</CardTitle>
              <CardLabel>{items.detail}</CardLabel>
              <img className="imgCard" src={items.img} />
            </Card>
          ))}
        </div>
        <div style={{ marginTop: '175px' }}>
          {coverdListRight.map((items, r) => (
            <Card key={r}>
              <CardTitle>{items.title}</CardTitle>
              <CardLabel>{items.detail}</CardLabel>
              <img className="imgCard" src={items.img} />
            </Card>
          ))}
        </div>
      </CardList>
    </Wrapper>
  )
}

export default Covered
