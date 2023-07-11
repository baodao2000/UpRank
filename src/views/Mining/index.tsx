import { useMatchBreakpoints } from '@pancakeswap/uikit'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IOSView, isDesktop } from 'react-device-detect'
import { Global } from 'recharts'
import styled from 'styled-components'
import ClaimPoolModal from './components/ClaimModal'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'
import TableDataPool from './components/yourMineHistory'
import { getPoolsV3Contract } from 'utils/contractHelpers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from '../../../packages/swap-sdk/src/constants'
import { formatEther } from '@ethersproject/units'
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #9e86ff 0%, #2b0864 111.24%);
  gap: 10px;
  height: 1200px;
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
  margin-bottom: 100px;
  margin-top: 100px;

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
  height: 590px;
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
  height: 500px;
  padding: 16px;
  border-radius: 15px;
  border: 1px;
  gap: 12px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 575px) {
    width: 330px;
  }

  @media screen and (max-width: 1024px) {
    width: 330px;
  }
`
const Box = styled.div`
  width: 460px;
  height: 167px;
  padding: 12px 16px 12px 16px;
  border-radius: 12px;
  border: 1px;
  background: radial-gradient(
        101.36% 117.36% at 0% -2.74%,
        rgba(125, 128, 196, 0.6) 0%,
        rgba(136, 139, 224, 0.264) 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
    linear-gradient(0deg, rgba(245, 251, 242, 0.2), rgba(245, 251, 242, 0.2));

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
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  height: 36px;
  width: 80px;
  margin-top: 10px;
  border-radius: 12px;
  border: 1px;
  background: radial-gradient(
        136.39% 160.48% at 0% 0%,
        rgba(192, 240, 255, 0.8) 0%,
        rgba(159, 169, 213, 0.289866) 87.18%,
        rgba(2, 0, 98, 0) 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
    linear-gradient(0deg, rgba(245, 251, 242, 0.2), rgba(245, 251, 242, 0.2));
`
const Animation = styled.div`
  -webkit-animation: mover 1s infinite alternate;
  animation: mover 1s infinite alternate;
  @-webkit-keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-5px);
    }
  }
  @keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-15px);
    }
  }
`
const TableMine = styled.div`
  border: 2px solid #00f0e1;
  border-radius: 24px;
  color: black;
  max-width: 1000px;
  width: 95%;
  margin-top: 20px;
`
const data = [
  {
    title: 'Available TREND',
    trend: '38',
    price: '12',
  },
  {
    title: 'Your Wallet Balance',
    trend: '38',
    price: '12',
  },
]
function Mining() {
  const { isMobile, isTablet, isDesktop, isXl } = useMatchBreakpoints()
  const { account, chainId } = useActiveWeb3React()
  const [loadingPage, setLoadingPage] = useState(true)
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const [isLoading, setIsLoading] = useState(false)
  const getPoolContract = getPoolsV3Contract(CHAIN_ID)

  const [mineData, setMineData] = useState({
    totalMined: 0,
    claimed: 0,
    remain: 0,
    mineSpeed: 0,
    mineSpeedLevel: 0,
    startTime: 0,
    userClaimedMineLength: 0,
    currentReward: 0,
  })
  useEffect(() => {
    if (!account) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
      getMine()
    }
  }, [account])

  const getMine = async () => {
    try {
      if (!account) {
        setIsLoading(true)
      } else {
        setIsLoading(false)
        const getUsersClaimMinedLength = await getPoolContract.getUsersClaimMinedLength(account)
        const users = await getPoolContract.usersMine(account)
        const currentRewardTREND = await getPoolContract.currentRewardTREND(account)
        setMineData({
          totalMined: Number(formatEther(users.totalMined)),
          claimed: Number(users.claimed),
          remain: Number(formatEther(users.remain)),
          mineSpeed: Number(users.mineSpeed),
          mineSpeedLevel: Number(users.mineSpeedLevel),
          startTime: Number(users.startTime),
          userClaimedMineLength: Number(formatEther(getUsersClaimMinedLength)),
          currentReward: Number(formatEther(currentRewardTREND)),
        })
        // setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const current = async () => {
  //   const newdd = await getPoolContract.currentRewardTREND(account)
  //   console.log(newdd);

  // }

  return (
    <Wrapper>
      <Container>
        <Table>
          <ContentText style={{ fontSize: '32px' }}>Your Wallet</ContentText>
          <BoxContain>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                height: isMobile ? '120px' : isTablet ? '120px' : '120px',
              }}
            >
              <ContentText>
                Remained TREND <span style={{ fontSize: '20px', fontWeight: 400 }}>(Locking)</span>
                <div style={{ width: '100%', height: '1px', backgroundColor: ' #DFDFDF3D ', marginTop: '4px' }} />
              </ContentText>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '5px',
                  alignItems: 'flex-start',

                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                  <Image src="/images/trendiCoin.png" width={25} height={25} alt="" />
                  <ContentText>TREND</ContentText>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <ContentText style={{ fontSize: '20px', fontWeight: 700, color: 'black' }}>38</ContentText>
                  <ContentText style={{ fontSize: '16px', fontWeight: 500 }}>$12</ContentText>
                </div>
              </div>
            </Box>
            {data.map((i) => (
              <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <ContentText>
                  {i.title}
                  <div style={{ width: '100%', height: '1px', backgroundColor: ' #DFDFDF3D ', marginTop: '4px' }} />
                </ContentText>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '5px',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <Image src="/images/trendiCoin.png" width={25} height={25} alt="" />
                    <ContentText>TREND</ContentText>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <ContentText style={{ fontSize: '20px', fontWeight: 700, color: 'black' }}>{i.trend}</ContentText>
                    <ContentText style={{ fontSize: '16px', fontWeight: 500 }}>${i.price}</ContentText>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button>
                    <ContentText
                      style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, color: '#FFFFFF' }}
                    >
                      Claim
                    </ContentText>
                  </Button>
                </div>
              </Box>
            ))}
          </BoxContain>
        </Table>
        <Table>
          <ContentText style={{ fontSize: '32px' }}>System</ContentText>
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1px' : '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <Box
                style={{
                  marginTop: '15px',
                  width: '50%',
                  height: '107px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '40px',
                  background:
                    'radial-gradient(101.36% 117.36% at 0% -2.74%, rgba(125, 128, 196, 0.6) 0%, rgba(136, 139, 224, 0.264) 100%) linear-gradient(0deg, rgba(245, 251, 242, 0.2), rgba(245, 251, 242, 0.2))',
                }}
              >
                <ContentText style={{ fontSize: '18px', fontWeight: 700 }}>Number of users mining</ContentText>
                <ContentText style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '28px' }}>
                  310{' '}
                  <span>
                    <Image src="/images/user.png" alt="" width={20} height={20} />
                  </span>
                </ContentText>
              </Box>
              <Box
                style={{
                  width: '50%',
                  height: '107px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '40px',
                  marginTop: '15px',
                }}
              >
                <ContentText style={{ fontSize: '18px', fontWeight: '700' }}>1 TREND/</ContentText>
                <ContentText
                  style={{ display: 'flex', flexDirection: 'row', gap: '10px', fontSize: isMobile ? '15px' : '25px' }}
                >
                  1.2 USD
                </ContentText>
              </Box>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: isMobile ? '15px' : '1px' }}
            >
              <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100px', width: '100%' }}>
                <ContentText>
                  Total TREND
                  <div style={{ width: '100%', height: '1px', backgroundColor: ' #DFDFDF3D ', marginTop: '4px' }} />
                </ContentText>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '5px',
                    alignItems: 'flex-start',

                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <Image src="/images/trendiCoin.png" width={25} height={25} alt="" />
                    <ContentText>TREND</ContentText>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <ContentText style={{ fontSize: '20px', fontWeight: 700, color: 'black' }}>38</ContentText>
                    <ContentText style={{ fontSize: '16px', fontWeight: 500 }}>$12</ContentText>
                  </div>
                </div>
              </Box>
              <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100px', width: '100%' }}>
                <ContentText>
                  Total Claimed TREND
                  <div style={{ width: '100%', height: '1px', backgroundColor: ' #DFDFDF3D ', marginTop: '4px' }} />
                </ContentText>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '5px',
                    alignItems: 'flex-start',

                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <Image src="/images/trendiCoin.png" width={25} height={25} alt="" />
                    <ContentText>TREND</ContentText>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <ContentText style={{ fontSize: '20px', fontWeight: 700, color: 'black' }}>38</ContentText>
                    <ContentText style={{ fontSize: '16px', fontWeight: 500 }}>$12</ContentText>
                  </div>
                </div>
              </Box>
            </div>
          </div>
          <Image style={{ marginTop: '10px' }} src="/images/Lines.png" alt="" width="900px" height="300px" />
        </Table>
      </Container>
      <TableMine>
        <TableDataPool mine={mineData} userClaimedMineLength={mineData.userClaimedMineLength} />
      </TableMine>
    </Wrapper>
  )
}

export default Mining
