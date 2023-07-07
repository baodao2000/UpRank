import { useMatchBreakpoints } from '@pancakeswap/uikit'
import Image from 'next/image'
import React from 'react'
import { IOSView, isDesktop } from 'react-device-detect'
import { Global } from 'recharts'
import styled from 'styled-components'
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #9e86ff 0%, #2b0864 111.24%);
  gap: 10px;
  height: 900px;
  @media screen and (max-width: 575px) {
    height: 100%;
  }
  @media screen and (max-width: 900px) {
    height: 80%;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  @media screen and (max-width: 575px) {
    flex-direction: column;
  }
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
  @media screen and (max-width: 1440px) {
  }
`
const Table = styled.div`
  height: 625px;
  width: 524px;
  padding: 24px 12px 24px 12px;
  border-radius: 15px;
  border: 1px;
  background: radial-gradient(
    100% 115.26% at 0% -2.74%,
    rgba(125, 128, 196, 0.7) 0%,
    rgba(71, 74, 155, 0.253633) 80.17%,
    rgba(164, 164, 164, 0.308) 100%
  );
  @media screen and (max-width: 575px) {
    width: 350px;
    margin-top: 50px;
  }

  @media screen and (max-width: 1024px) {
    width: 350px;
  }
`
const BoxContain = styled.div`
  width: 492px;
  height: 329px;
  padding: 16px;
  border-radius: 15px;
  border: 1px;
  gap: 12px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  background: radial-gradient(
    101.36% 117.36% at 0% -2.74%,
    rgba(125, 128, 196, 0.6) 0%,
    rgba(136, 139, 224, 0.264) 100%
  );
  @media screen and (max-width: 575px) {
    width: 330px;
  }
  @media screen and (max-width: 1024px) {
    width: 330px;
  }
`
const Box = styled.div`
  width: 460px;
  height: 91px;
  padding: 12px 16px 12px 16px;
  border-radius: 12px;
  border: 1px;

  background: radial-gradient(
        101.36% 117.36% at 0% -2.74%,
        rgba(125, 128, 196, 0.6) 0%,
        rgba(136, 139, 224, 0.264) 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
    linear-gradient(0deg, rgba(245, 251, 242, 0.2), rgba(245, 251, 242, 0.2)),
    linear-gradient(0deg, rgba(254, 254, 254, 0.17), rgba(254, 254, 254, 0.17));
  @media screen and (max-width: 575px) {
    width: 300px;
  }
  @media screen and (max-width: 1024px) {
    width: 300px;
  }
`
const ContentText = styled.div`
  font-family: Poppins, sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: rgba(255, 255, 255, 1);
`
const Button = styled.button`
  cursor: pointer;
  height: 70px;
  margin-top: 20px;
  padding: 12px;
  border-radius: 12px;
  border: 1px;
  background: linear-gradient(0deg, #ececec, #ececec), linear-gradient(0deg, #ffffff, #ffffff);
`

const data = [
  {
    title: 'Mined Trend',
    trend: '50 TREND',
    price: '50 USD',
  },
  {
    title: 'Claimed Trend',
    trend: '12 TREND',
    price: '12 USD',
  },
  {
    title: 'Remained Trend',
    trend: '38 TREND',
    price: '38 USD',
  },
]
function Mining() {
  const { isMobile, isTablet, isDesktop, isXl } = useMatchBreakpoints()

  return (
    <Wrapper>
      <Container>
        <Table>
          <ContentText>Your Wallet</ContentText>
          <BoxContain>
            {data.map((i) => (
              <Box>
                <div>
                  <ContentText style={{ fontSize: '18px', fontWeight: 600 }}>{i.title}</ContentText>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: isMobile ? '5px' : '10px',
                      marginTop: '10px',
                    }}
                  >
                    <ContentText>{i.trend}</ContentText>
                    <Image src="/images/wallet.png" alt="" width={30} height={30} />
                    <Image src="/images/exchange.png" alt="" width={30} height={30} />
                    <ContentText>{i.price}</ContentText>
                  </div>
                </div>
              </Box>
            ))}
          </BoxContain>
          <BoxContain
            style={{
              height: '200px',
              background:
                'radial-gradient(101.36% 117.36% at 0% -2.74%, rgba(125, 128, 196, 0.6) 0%, rgba(136, 139, 224, 0.264) 100%)linear-gradient(0deg, rgba(245, 251, 242, 0.2), rgba(245, 251, 242, 0.2))',
            }}
          >
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ContentText>Available TREND</ContentText>
              <div
                style={{ display: 'flex', flexDirection: 'row', gap: isMobile ? '5px' : '10px', alignItems: 'center' }}
              >
                <ContentText>12 TREND</ContentText>
                <Image src="/images/wallet.png" alt="" width={30} height={30} />
                <Image src="/images/exchange.png" alt="" width={30} height={30} />

                <ContentText>12 USD</ContentText>
              </div>
              <Button>
                <ContentText
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22, color: '#4122FF' }}
                >
                  Claim
                </ContentText>
              </Button>
            </Box>
          </BoxContain>
        </Table>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Table style={{ width: isMobile ? '370px' : '600px', height: isMobile ? '400px' : '317px' }}>
            <ContentText>System</ContentText>
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1px' : '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <Table
                  style={{
                    marginTop: '15px',
                    width: '140px',
                    height: '107px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    background:
                      'radial-gradient(101.36% 117.36% at 0% -2.74%, rgba(125, 128, 196, 0.6) 0%, rgba(136, 139, 224, 0.264) 100%)linear-gradient(0deg, rgba(245, 251, 242, 0.2), rgba(245, 251, 242, 0.2))',
                  }}
                >
                  <ContentText style={{ fontSize: '16px', fontWeight: '500', width: '100px' }}>
                    Number of users mining
                  </ContentText>
                  <ContentText style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '28px' }}>
                    310{' '}
                    <span>
                      <Image src="/images/user.png" alt="" width={20} height={20} />
                    </span>
                  </ContentText>
                </Table>
                <Table
                  style={{
                    width: '483px',
                    height: '107px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginTop: '15px',
                  }}
                >
                  <ContentText style={{ fontSize: '18px', fontWeight: '500' }}>Total TREND</ContentText>
                  <ContentText
                    style={{ display: 'flex', flexDirection: 'row', gap: '10px', fontSize: isMobile ? '15px' : '25px' }}
                  >
                    1,250 TREND{' '}
                    <span>
                      <Image src="/images/wallet.png" alt="" width={30} height={30} />
                    </span>
                    <span>
                      <Image src="/images/exchange.png" alt="" width={30} height={30} />
                    </span>
                    <span>
                      <ContentText style={{ fontSize: isMobile ? '15px' : '25px' }}>1,250 USD</ContentText>
                    </span>
                  </ContentText>
                </Table>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <Table
                  style={{ width: '140px', height: '107px', display: 'flex', flexDirection: 'column', gap: '10px' }}
                >
                  <ContentText style={{ fontSize: '16px', fontWeight: '500', width: '100px' }}>1 TREND /</ContentText>
                  <ContentText style={{ fontSize: '25px' }}>1.2 USD</ContentText>
                </Table>
                <Table
                  style={{ width: '483px', height: '107px', display: 'flex', flexDirection: 'column', gap: '10px' }}
                >
                  <ContentText style={{ fontSize: '18px', fontWeight: '500' }}>Total Claimed TREND</ContentText>
                  <ContentText
                    style={{ display: 'flex', flexDirection: 'row', gap: '10px', fontSize: isMobile ? '15px' : '25px' }}
                  >
                    1,250 TREND{' '}
                    <span>
                      <Image src="/images/wallet.png" alt="" width={30} height={30} />
                    </span>
                    <span>
                      <ContentText style={{ fontSize: isMobile ? '15px' : '25px' }}>1,250 USD</ContentText>
                    </span>
                  </ContentText>
                </Table>
              </div>
            </div>
          </Table>
          <Image src="/images/chart.png" alt="" width={isMobile ? 250 : 600} height={300} />
        </div>
      </Container>
    </Wrapper>
  )
}

export default Mining
