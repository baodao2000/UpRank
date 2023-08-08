import { Flex, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import Image from 'next/image'
import styled from 'styled-components'

const Card = styled.div`
  position: relative;
  background-clip: padding-box;
  display: flex;
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;
  align-self: stretch;
  width: 100%;
  border-radius: 24px;
  background: var(--white-white-6, rgba(255, 255, 255, 0.06));
  backdrop-filter: blur(5.5px);
  border: 1px solid transparent;
  border-image-slice: 1;

  background-image: linear-gradient(#18171b, #18171b), radial-gradient(circle at top left, #7b3fe4 0%, #a726c1 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  @media screen and (max-width: 575px) {
    gap: 12px;
    padding: 16px;
  }
`

const TextContent = styled(Text)`
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  @media screen and (max-width: 575px) {
    line-height: 24px;
    font-size: 14px;
  }
`
const TextTitle = styled(Text)`
  color: #fff;

  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  @media screen and (max-width: 575px) {
    line-height: 24px;
    font-size: 18px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  margin-bottom: 142px;
  * {
    font-family: Inter, sans-serif;
  }
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 1224px;
  @media screen and (max-width: 1440px) {
    width: 100%;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
  }
  @media screen and (max-width: 575px) {
    width: 100%;
  }
`
function Info() {
  const { isMobile, isTablet } = useMatchBreakpoints()

  return (
    <Container>
      <ImageContainer>
        <Image src="/images/7.png" width={isMobile ? 375 : 632} height={isMobile ? 266 : 448} alt="" />
      </ImageContainer>
      <CardContainer>
        <Flex style={{ gap: '24px', flexDirection: isMobile ? 'column' : 'row' }}>
          <Card>
            <TextContent>
              Users will receive a 20% conversion to TREND in contract mining for every dollar deposited.
            </TextContent>
          </Card>

          <Card>
            <TextContent>
              TREND tokens can be claimed daily at a rate of 1/730, equivalent to 2 years. However, this speed will
              decrease as the price of TREND on the pool increases, and vice versa.
            </TextContent>
          </Card>
        </Flex>
        <Flex style={{ gap: '24px', flexDirection: isMobile ? 'column' : 'row' }}>
          <Card>
            <TextTitle>Pool Standard</TextTitle>

            <TextTitle>
              <span style={{ fontSize: '16px', fontWeight: 400, color: 'gray' }}>
                ✦ The claim speed is boosted by an extra
              </span>{' '}
              {''}
              0.5%{' '}
              <span style={{ fontSize: '16px', fontWeight: 400, color: 'gray' }}>
                {' '}
                , which means 1/730 claims will have a 1.25x multiplier:
              </span>{' '}
              1/730 * 1.25
            </TextTitle>
          </Card>
          <Card>
            <TextTitle>Pool Pro</TextTitle>
            <TextTitle>
              <span style={{ fontSize: '16px', fontWeight: 400, color: 'gray' }}>
                ✦ The claim speed is boosted by an extra
              </span>{' '}
              0.25%{' '}
              <span style={{ fontSize: '16px', fontWeight: 400, color: 'gray' }}>
                {' '}
                , which means 1/730 claims will have a 1.25x multiplier:
              </span>{' '}
              1/730 * 1.25
            </TextTitle>
          </Card>
        </Flex>
        <Card>
          <TextContent>The mining speed of the TREND token depends on the pool you choose to join.</TextContent>
        </Card>
        <Card>
          <TextContent>
            When the user reaches the target level, such as Silver, the claiming speed increases by{' '}
            <span
              style={{
                color: '#fff',
                fontSize: isMobile ? '18px ' : '24px',

                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: '32px',
              }}
            >
              x0.5
            </span>{' '}
            =&gt; Therefore, the user can claim{' '}
            <span
              style={{
                color: '#fff',
                fontSize: isMobile ? '18px ' : '24px',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: '32px',
              }}
            >
              1/730 * 1.5 + (1/730 * 1.5 * 0.5){' '}
            </span>
            daily.
          </TextContent>
        </Card>
      </CardContainer>
    </Container>
  )
}

export default Info
