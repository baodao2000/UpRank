import styled from 'styled-components'
import { Heading, Card, Text } from '@pancakeswap/uikit'
import images from 'configs/images'

const Wrapper = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 96px;
  * {
    font-family: Inter, sans-serif;
  }
`

const Title = styled(Heading)`
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 60px;
  letter-spacing: -0.96px;
  margin-bottom: 16px;
  text-align: center;
  color: #adabb2;
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

const StyledColorTitle = styled.span`
  font-weight: 700;
  background: var(--primary-primary-gradient-2, linear-gradient(180deg, #7b3fe4 0%, #a726c1 100%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const BlockTranditional = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: auto;
  position: relative;
  row-gap: 20px;
  gap: 20px;
  margin-top: 56px;
`

const CardLeft = styled.div`
  max-width: 600px;
  height: auto;
  border-radius: 24px;
  background: var(--greyscale-grayscale-3, #141217);
  padding: 40px;
  @media (min-width: 900px) and (max-width: 1366px) {
    width: 380px;
  }
`

const StyledCardHeading = styled(Heading)`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  color: rgba(255, 255, 255, 1);

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 24px;
    line-height: 120%;
  }
`

const CardRight = styled.div`
  max-width: 600px;
  height: auto;
  border-radius: 24px;
  border: 2px solid var(--primary-primary-1, #8544f5);
  background: var(--greyscale-blue, #150a27);
  padding: 40px;
  @media (min-width: 900px) and (max-width: 1366px) {
    width: 380px;
  }
`

const ListTextsCard = styled.ul`
  margin-top: 20px;
  list-style: none;
`

const ItemTextCard = styled(Text)`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: rgba(173, 171, 178, 1);
  margin: 20px 0;
  .icon {
    color: #b210ff;
  }
  .text {
    color: rgba(255, 255, 255, 1);
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
    line-height: 26px;
  }
`
// "Instant & Always Accessible with Your Own Money

// Non-Custodial:
// - Users are required to share personal information, leading to potential security breaches.
// - Traditional financial services may not be accessible to those who are unbanked or underbanked.
// - Transactions may take several days to clear and settle.
// - The hours of operation are limited.

// Trendy DeFi:
// - Privacy-focused: No personal details are required, simply connect a digital wallet.
// - Self-custody: Users have custody of their own funds, making it easier to avoid loss of funds.
// - Effortless: No need to worry about whether a protocol will perform as promised.
// - Speedy: Transactions are completed in near real-time.
// - Always available: Operations are conducted around the clock, 24/7/365."
const Tranditional = () => {
  const dataLeft = {
    title: 'Non-Custodial',
    texts: [
      `✦ Users are required to share personal information, leading to potential security breaches.`,
      `✦ Traditional financial services may not be accessible to those who are unbanked or underbanked.`,
      `✦ Transactions may take several days to clear and settle.`,
      `✦ The hours of operation are limited.`,
    ],
  }
  return (
    <Wrapper className="block">
      <Title>
        Traditional Flatform vs <StyledColorTitle>TrendyDefi</StyledColorTitle>
      </Title>
      <Text
        fontSize="18px"
        fontWeight="400"
        lineHeight="28px"
        style={{ color: 'rgba(173, 171, 178, 1)' }}
        textAlign="center"
      >
        Instant & Always Accessible with Your Own Money.
      </Text>
      <BlockTranditional>
        <CardLeft data-aos="fade-up-right">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img width="18px" height="18px" src="./images/V3/circle.svg" />
            <StyledCardHeading>{dataLeft.title}</StyledCardHeading>
          </div>
          <ListTextsCard>
            {dataLeft.texts.map((item, index) => (
              <ItemTextCard key={index}>{item}</ItemTextCard>
            ))}
          </ListTextsCard>
        </CardLeft>
        <CardRight data-aos="fade-up-left">
          <img src="./images/V3/Logo.png" />
          <ListTextsCard>
            <ItemTextCard>
              <p>
                <span className="icon">✦</span>
                <span className="text">
                  Privacy-focused: No personal details are required, simply connect a digital wallet.
                </span>{' '}
              </p>
            </ItemTextCard>
            <ItemTextCard>
              <p>
                <span className="icon">✦</span>
                <span className="text">
                  Self-custody: Users have custody of their own funds, making it easier to avoid loss of funds.
                </span>{' '}
              </p>
            </ItemTextCard>
            <ItemTextCard>
              <p>
                <span className="icon">✦</span>
                <span className="text">
                  Effortless: No need to worry about whether a protocol will perform as promised.
                </span>
              </p>
            </ItemTextCard>
            <ItemTextCard>
              <p>
                <span className="icon">✦</span>
                <span className="text"> Speedy: Transactions are completed in near real-time.</span>{' '}
              </p>
            </ItemTextCard>
            <ItemTextCard>
              <p>
                <span className="icon">✦</span>
                <span className="text">
                  {' '}
                  Always available: Operations are conducted around the clock, 24/7/365
                </span>{' '}
              </p>
            </ItemTextCard>
          </ListTextsCard>
        </CardRight>
      </BlockTranditional>
    </Wrapper>
  )
}

export default Tranditional
