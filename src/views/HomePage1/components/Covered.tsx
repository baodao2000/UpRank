import styled from 'styled-components'
import images from 'configs/images'
import { Heading, Text, Button } from '@pancakeswap/uikit'
import 'aos/dist/aos.css'

const Title = styled(Heading)`
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 40px;
    line-height: 46px;
    text-align: start;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 48px;
    line-height: 60px;
  }
`

const TitleM = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  color: #ced8e1;
  margin-top: 6px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 0;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 24px;
    line-height: 23px;
  }
`

const StyledText = styled.p`
  color: #8145ff;
  display: inline;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: start;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  @media screen and (max-width: 600px) {
    display: flex;
    align-items: center;
    text-align: center;
  }
`

const CoveredList = styled.div`
  display: flex;
  flex-wrap: wrap;
  // background: url(${images.bgcovered}) no-repeat;
  // background-attachment: fixed, scroll;
  // background-size: cover;
  padding-bottom: 48px;
  gap: 30px;
  row-gap: 50px;
  padding-left: 10%;
  @media screen and (max-width: 600px) {
    padding-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 20%;
  }
`

const CoveredItem = styled.div`
  flex: 40%;
  @media screen and (max-width: 500px) {
    flex: 0%;
    text-align: center;
  }
`

const TagCustom = styled(Text)`
  margin-bottom: 24px;
  margin-top: 24px;
  font-weight: 700;
  font-size: 20px;
  font-family: Helvetica, sans-serif;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 32px;
    line-height: 39px;
  }
`

const ContentCustom = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  font-family: Helvetica, sans-serif;
  max-width: 284px;
  @media screen and (max-width: 600px) {
    margin-bottom: 15px;
    margin-top: 15px;
    width: 100%;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 18px;
    line-height: 20px;
    max-width: 284px;
  }
`

const coverdList = [
  {
    img: images.key2,
    title: 'Non-Custodial',
    detail: 'We never have access to any of your data or funds. Ever.',
  },
  {
    img: images.bookOpen,
    title: 'Ledger Support',
    detail: 'For additional security you can connect your hardware wallet.',
  },
  {
    img: images.lock2,
    title: 'Privacy',
    detail: 'Phantom doesn’t track any personal identifiable information, your account addresses, or asset balances.',
  },
  {
    img: images.person,
    title: 'Biometric authentication',
    detail: 'Protect your assets on the go with the convenience you expect.',
  },
]

const Covered = () => {
  return (
    <Wrapper className="block">
      <Title color="mainColor">We’ve got you covered</Title>
      <TitleM color="mainColor">
        <StyledText>Only you</StyledText> can access your wallet.
      </TitleM>
      <TitleM color="mainColor" style={{ marginBottom: 50 }}>
        We <StyledText>don’t collect</StyledText> any personal data.
      </TitleM>
      <CoveredList>
        {coverdList.map((n, i) => {
          i += 600
          return (
            <CoveredItem data-aos="zoom-in" data-aos-duration={i} data-aos-easing="linear" key={n.title}>
              <img style={{ width: '140px', height: '140px', objectFit: 'contain' }} src={n.img} alt="" />
              <TagCustom color="mainColor">{n.title}</TagCustom>
              <ContentCustom color="mainColor">{n.detail}</ContentCustom>
            </CoveredItem>
          )
        })}
      </CoveredList>
    </Wrapper>
  )
}

export default Covered
