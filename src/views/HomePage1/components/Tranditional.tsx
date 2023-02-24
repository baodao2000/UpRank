import styled from 'styled-components'
import { Heading, Card } from '@pancakeswap/uikit'
import images from 'configs/images'

const Wrapper = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  padding-bottom: 50px;
`

const Title = styled(Heading)`
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0.001em;
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 40px;
    line-height: 46px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 48px;
    line-height: 60px;
  }
`

const StyledColorTitle = styled.span`
  color: #00f0e1;
`

const BlockTranditional = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  height: auto;
  position: relative;
  row-gap: 20px;
  gap: 20px;
`

const CardLeft = styled.div`
  max-width: 415px;
  height: auto;
  border-radius: 10px;
  @media (min-width: 900px) and (max-width: 1366px) {
    width: 380px;
  }
`

const StyledCardHeading = styled(Heading)`
  font-weight: 700;
  font-size: 18px;
  line-height: 100%;
  text-align: center;
  background: linear-gradient(89.88deg, #02736c 0.17%, rgba(20, 107, 188, 0.94) 104.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 24px;
    line-height: 120%;
  }
`

const ImageCenter = styled.img`
  @media (min-width: 900px) and (max-width: 1366px) {
    width: 130px;
  }
  @media only screen and (max-width: 1020px) {
    display: none;
  }
`

const CardRight = styled.div`
  max-width: 415px;
  height: auto;
  border-radius: 10px;
  @media (min-width: 900px) and (max-width: 1366px) {
    width: 380px;
  }
`

const ListTextsCard = styled.ul`
  margin-top: 20px;
  list-style: none;
`

const ItemTextCard = styled.li`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #898989;
  margin: 20px 0;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
    line-height: 26px;
  }
`

const Tranditional = () => {
  const dataLeft = {
    title: 'Non-Custodial',
    texts: [
      `Users must share personal data, which is vulnerable to security breaches.`,
      `The unbanked or underbaked can't access traditional financial services.`,
      `Payments can be intercepted and markets can be shut down.`,
      `The clearing and settling of transactions can take days.`,
      `The hours of operation are limited.`,
    ],
  }
  const dataRight = {
    title: 'TrendyDefi',
    texts: [
      `No need to disclose personal details, just connect a digital wallet.`,
      `Users custody their own funds, easier to avoid loss of funds.`,
      `Trustless - no need to worry if a protocol will do what it says it will do.`,
      `Speedy - transactions are completed in near real-time.`,
      `Operate around the clock, 24/7/365.`,
    ],
  }
  return (
    <Wrapper className="block">
      <Title>
        Traditional Flatform vs <StyledColorTitle>TrendyDefi</StyledColorTitle>
      </Title>
      <BlockTranditional>
        <CardLeft data-aos="fade-up-right">
          <StyledCardHeading>{dataLeft.title}</StyledCardHeading>
          <ListTextsCard>
            {dataLeft.texts.map((item, index) => (
              <ItemTextCard key={index}>
                <img src={images.circle} style={{ marginRight: 20 }} />
                {item}
              </ItemTextCard>
            ))}
          </ListTextsCard>
        </CardLeft>
        <ImageCenter src={images.vs} />
        <CardRight data-aos="fade-up-left">
          <StyledCardHeading>{dataRight.title}</StyledCardHeading>
          <ListTextsCard>
            {dataRight.texts.map((item, index) => (
              <ItemTextCard key={index}>
                <img src={images.circle} style={{ marginRight: 20 }} />
                {item}
              </ItemTextCard>
            ))}
          </ListTextsCard>
        </CardRight>
      </BlockTranditional>
    </Wrapper>
  )
}

export default Tranditional
