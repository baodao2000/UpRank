import { Text, useMatchBreakpoints, useModal } from '@pancakeswap/uikit'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IOSView, isDesktop } from 'react-device-detect'
import { Global } from 'recharts'
import styled from 'styled-components'
import ClaimPoolModal from './components/ClaimModal'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'
import TableDataPool from './components/yourMineHistory'
import { getPoolsV3Contract, getTrendContract } from 'utils/contractHelpers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from '../../../packages/swap-sdk/src/constants'
import { formatEther } from '@ethersproject/units'
import { useWallet } from 'hooks/useWallet'
import CountUp from 'react-countup'
import { useBalance } from 'wagmi'
import contracts from 'config/constants/contracts'
import { formatBigNumber } from 'utils/formatBalance'
import SendTrendModal from './components/sendModal'
import numeral from 'numeral'
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
  margin-bottom: 20px;
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
const TableSystem = styled.div`
  height: 590px;
  width: 668px;
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
    width: 100%;
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
    ),
    linear-gradient(0deg, rgba(245, 251, 242, 0.2), rgba(245, 251, 242, 0.2));
  &:disabled {
    opacity: 0.6000000238418579;
    cursor: no-drop;
  }
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
  padding: 28px 28px 46px 28px;
  border: 1px solid rgba(245, 251, 242, 0.2);
  border-radius: 16px;
  max-width: 1240px;
  width: 95%;
  margin-top: 20px;
  background: linear-gradient(
    131deg,
    rgba(125, 128, 195, 0.7) 0%,
    rgba(71, 74, 155, 0.25) 57.58%,
    rgba(153, 159, 204, 0.28) 82.49%,
    rgba(239, 248, 255, 0.31) 100%
  );
  backdrop-filter: blur(50px);
  height: 380px;
  margin-bottom: 150px;
`
const SystemContent = styled.div`
  width: 100% @media screen and (max-width: 575px) {
    display: flex;
    flexdirection: column;
  }
`
function Mining() {
  const { isMobile, isTablet } = useMatchBreakpoints()
  const { account, chainId } = useActiveWeb3React()
  const [loadingPage, setLoadingPage] = useState(true)
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const [isLoading, setIsLoading] = useState(false)
  const getPoolContract = getPoolsV3Contract(CHAIN_ID)
  const getTokenTrendContract = getTrendContract(CHAIN_ID)
  const { onPresentConnectModal } = useWallet()
  const [usersClaimed, setUserClaimed] = useState([])
  const [claimDisable, setClaimDisable] = useState(false)
  const [sendDisable, setSendDisable] = useState(false)

  const [mineData, setMineData] = useState({
    totalMined: 0,
    claimed: 0,
    remain: 0,
    mineSpeed: 0,
    mineSpeedLevel: 0,
    startTime: 0,
    userClaimedMineLength: 0,
    currentReward: 0,
    trend2USDT: 0,
    balanceTrend: 0,
  })

  const [systemData, setSystemData] = useState({
    totalMiner: 0,
    defaultTrend: 0,
    totalMined: 0,
    totalClaimed: 0,
  })
  var available = 0
  useEffect(() => {
    getMine()
    getMineSystem()
    getAvailable()
    // getMineHistory()
  }, [account])
  const [openClaimModal, onDismissModal] = useModal(
    <ClaimPoolModal onDismiss={() => onDismissModal()} onSuccess={() => handleSuccess()} mine={mineData} />,
    true,
    false,
    'removeModal',
  )
  const [openSendModal, onDismissSendModal] = useModal(
    <SendTrendModal onDismiss={() => onDismissSendModal} mine={mineData} />,
    true,
    false,
    'removeModal',
  )
  const getMine = async () => {
    try {
      if (!account) {
        setIsLoading(true)
      } else {
        setIsLoading(false)
        const getUsersClaimMinedLength = await getPoolContract.getUsersClaimMinedLength(account)
        const users = await getPoolContract.usersMine(account)
        const mineSpeedLevel = await getPoolContract.userRank(account)
        const currentRewardTREND = await getPoolContract.currentRewardTREND(account)
        if (Number(formatEther(currentRewardTREND)) === 0) {
          setClaimDisable(true)
        } else {
          setClaimDisable(false)
        }
        // mineSpeedLevel
        const trendUSD = await getPoolContract.TREND2USDT()
        const balance = await getTokenTrendContract.balanceOf(account)
        const balanceAccount = Number(formatEther(balance))
        if (balanceAccount === 0) {
          setSendDisable(true)
        } else {
          setSendDisable(false)
        }
        setMineData({
          totalMined: Number(formatEther(users.totalMined)),
          claimed: Number(users.claimed),
          remain: Number(formatEther(users.remain)),
          mineSpeed: Number(users.mineSpeed),
          mineSpeedLevel: Number(mineSpeedLevel),
          startTime: Number(users.startTime),
          userClaimedMineLength: Number(getUsersClaimMinedLength),
          currentReward: Number(formatEther(currentRewardTREND)),
          trend2USDT: Number(formatEther(trendUSD)),
          balanceTrend: balance,
        })
        // setIsLoading(false)
        await getMineHistory(getUsersClaimMinedLength)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAvailable = async () => {
    if (!account) {
      available = 0
    } else {
      const currentRewardTREND = await getPoolContract.currentRewardTREND(account)
      available = Number(formatEther(currentRewardTREND))
      console.log('sasas')
    }
  }
  const interval = setInterval(getAvailable, 30000)
  const getMineSystem = async () => {
    const totalMiner = await getPoolContract.totalMiner()
    const totalMined = await getPoolContract.totalMined()
    const totalClaimed = await getPoolContract.totalClaimed()
    const trend2USDT = await getPoolContract.TREND2USDT()
    setSystemData({
      totalMiner: Number(totalMiner),
      defaultTrend: Number(formatEther(trend2USDT)),
      totalMined: Number(formatEther(totalMined)),
      totalClaimed: Number(formatEther(totalClaimed)),
    })
  }
  // const current = async () => {
  //   const newdd = await getPoolContract.currentRewardTREND(account)
  //   console.log(newdd);

  // }

  const getMineHistory = async (getUsersClaimMinedLength) => {
    try {
      if (!account) {
        setIsLoading(true)
      } else {
        setIsLoading(false)

        if (Number(getUsersClaimMinedLength) > 0) {
          const currenReward = await getPoolContract.currentRewardTREND(account)
          const currentRewardTREND = currenReward.toString()
          const trendUSD = await getPoolContract.TREND2USDT()
          await getPoolContract.getUsersClaimMined(account, 10, 0).then((res) => {
            const arr = res.list.map((claimed: any, i: number) => {
              return {
                date: Number(claimed.date.toString()),
                amount: Number(formatEther(claimed.amount)),
                totalLock: Number(formatEther(claimed.totalLock)),
                power: Number(claimed.interrest.toString()) / 100,
                currentReward: Number(formatEther(currentRewardTREND)),
                rateUSD: Number(formatEther(trendUSD)),
              }
            })
            setUserClaimed(arr)
          })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleSuccess = () => {
    getMine()
  }

  const handleClick = () => {
    if (!account) {
      onPresentConnectModal()
    } else {
      openClaimModal()
    }
  }
  const handleSend = () => {
    if (!account) {
      onPresentConnectModal()
    } else {
      openSendModal()
    }
  }
  const { data, isFetched } = useBalance({
    addressOrName: account,
  })
  //   var number = Number(formatEther(mineData.balanceTrend));

  // var newaa = numeral(number).format('0,0.0000');
  // console.log(Number(newaa));

  // '1,000'
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
                  {!account ? (
                    <ContentText style={{ fontSize: '20px', fontWeight: 700, color: 'black' }}>0</ContentText>
                  ) : (
                    <ContentText style={{ fontSize: '20px', fontWeight: 700, color: 'black' }}>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={mineData.totalMined}
                        decimals={mineData.totalMined > 0 ? 4 : 0}
                        duration={0.5}
                      />
                    </ContentText>
                  )}
                  {!account ? (
                    <ContentText style={{ fontSize: '16px', fontWeight: 500 }}>$ 0</ContentText>
                  ) : (
                    <ContentText style={{ fontSize: '16px', fontWeight: 500 }}>
                      ${' '}
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={mineData.totalMined * mineData.trend2USDT}
                        decimals={mineData.totalMined > 0 ? 4 : 0}
                        duration={0.5}
                      />
                    </ContentText>
                  )}
                </div>
              </div>
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ContentText>
                Available
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
                  {!account ? (
                    <ContentText style={{ fontSize: '20px', fontWeight: 700, color: 'black' }}>0</ContentText>
                  ) : (
                    <ContentText style={{ fontSize: '20px', fontWeight: 700, color: 'black' }}>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={available}
                        decimals={available > 0 ? 6 : 0}
                        duration={0.5}
                      />
                    </ContentText>
                  )}
                  {!account ? (
                    <ContentText style={{ fontSize: '16px', fontWeight: 500 }}>$ 0</ContentText>
                  ) : (
                    <ContentText style={{ fontSize: '16px', fontWeight: 500 }}>
                      ${' '}
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={mineData.currentReward * mineData.trend2USDT}
                        decimals={mineData.currentReward > 0 ? 4 : 0}
                        duration={0.5}
                      />
                    </ContentText>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleClick} disabled={claimDisable}>
                  <ContentText
                    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, color: '#FFFFFF' }}
                  >
                    Claim
                  </ContentText>
                </Button>
              </div>
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ContentText>
                Your Wallet Balance
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
                  {!account ? (
                    <ContentText style={{ fontSize: '20px', fontWeight: 700, color: 'black' }}>0</ContentText>
                  ) : (
                    <ContentText style={{ fontSize: '20px', fontWeight: 700, color: 'black' }}>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(formatEther(mineData.balanceTrend))}
                        decimals={Number(mineData.balanceTrend) > 0 ? 4 : 0}
                        duration={0.5}
                      />
                    </ContentText>
                  )}
                  {!account ? (
                    <ContentText style={{ fontSize: '16px', fontWeight: 500 }}>$ 0</ContentText>
                  ) : (
                    <ContentText style={{ fontSize: '16px', fontWeight: 500 }}>
                      ${' '}
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(formatEther(mineData.balanceTrend)) * mineData.trend2USDT}
                        decimals={Number(formatEther(mineData.balanceTrend)) > 0 ? 4 : 0}
                        duration={0.5}
                      />
                    </ContentText>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  style={{
                    background:
                      'radial-gradient(193.01% 318.93% at -0.00% -0.00%, #FBFDFF 0%, rgba(192, 203, 251, 0.36) 87.18%, rgba(2, 0, 98, 0.00) 100%)',
                    backdropFilter: 'blur(50px)',
                  }}
                  onClick={handleSend}
                  disabled={sendDisable}
                >
                  <ContentText
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 700,
                      fontSize: 16,
                      color: 'rgba(139, 22, 255, 1), rgba(13, 22, 100, 1)',
                    }}
                  >
                    Send
                  </ContentText>
                </Button>
              </div>
            </Box>
          </BoxContain>
        </Table>
        <TableSystem>
          <ContentText style={{ fontSize: '32px' }}>System</ContentText>
          <SystemContent
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '1px' : '10px',
              alignItems: 'center',
              justifyItems: 'center',
              marginTop: '20px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              <Box
                style={{
                  width: isMobile ? '100%' : '195px',
                  height: '96px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  background:
                    'radial-gradient(101.36% 117.36% at 0% -2.74%, rgba(125, 128, 196, 0.6) 0%, rgba(136, 139, 224, 0.264) 100%) linear-gradient(0deg, rgba(245, 251, 242, 0.2), rgba(245, 251, 242, 0.2))',
                }}
              >
                <ContentText style={{ fontSize: '18px', fontWeight: 700 }}>Miners</ContentText>
                <ContentText style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '28px' }}>
                  <CountUp
                    start={0}
                    preserveValue
                    delay={0}
                    end={Number(systemData.totalMiner)}
                    // decimals={Number((mineData.balanceTrend)) > 0 ? 4 : 0}
                    duration={0.5}
                  />
                  <span>
                    <Image src="/images/user.png" alt="" width={20} height={20} />
                  </span>
                </ContentText>
              </Box>
              <Box
                style={{
                  width: isMobile ? '100%' : '195px',

                  height: '96px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <ContentText style={{ fontSize: '18px', fontWeight: '700' }}>1 TREND</ContentText>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <ContentText style={{ fontSize: '36px', fontWeight: 500, lineHeight: '16px' }}>~</ContentText>
                  <ContentText style={{ fontSize: '18px', fontWeight: 500 }}>
                    ${' '}
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={Number(systemData.defaultTrend)}
                      decimals={Number(systemData.defaultTrend) > 0 ? 4 : 0}
                      duration={0.5}
                    />
                  </ContentText>
                </div>
              </Box>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginTop: isMobile ? '15px' : '1px',
                width: '100%',
              }}
            >
              <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100px', width: '100%' }}>
                <ContentText>
                  Total Mined
                  <div
                    style={{
                      width: isMobile ? '100%' : '394px',
                      height: '1px',
                      backgroundColor: ' #DFDFDF3D ',
                      marginTop: '4px',
                    }}
                  />
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
                    <ContentText style={{ fontSize: '20px', fontWeight: 700, color: 'black' }}>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(systemData.totalMined)}
                        decimals={Number(systemData.totalMined) > 0 ? 4 : 0}
                        duration={0.5}
                      />
                    </ContentText>
                    <ContentText style={{ fontSize: '16px', fontWeight: 500 }}>
                      ${' '}
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(systemData.totalMined) * systemData.defaultTrend}
                        decimals={Number(systemData.totalMined) > 0 ? 4 : 0}
                        duration={0.5}
                      />
                    </ContentText>
                  </div>
                </div>
              </Box>
              <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100px', width: '100%' }}>
                <ContentText>
                  Total Claimed
                  <div
                    style={{
                      width: isMobile ? '100%' : '394px',
                      height: '1px',
                      backgroundColor: ' #DFDFDF3D ',
                      marginTop: '4px',
                    }}
                  />
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
                    <ContentText style={{ fontSize: '20px', fontWeight: 700, color: 'black' }}>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(systemData.totalClaimed)}
                        decimals={Number(systemData.totalClaimed) > 0 ? 4 : 0}
                        duration={0.5}
                      />
                    </ContentText>
                    <ContentText style={{ fontSize: '16px', fontWeight: 500 }}>
                      ${' '}
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(systemData.totalClaimed) * systemData.defaultTrend}
                        decimals={Number(systemData.totalClaimed) > 0 ? 4 : 0}
                        duration={0.5}
                      />
                    </ContentText>
                  </div>
                </div>
              </Box>
            </div>
          </SystemContent>
          {/* <Image style={{ marginTop: '30px' }} src="/images/Lines.png" alt="" width="900px" height="300px" /> */}
        </TableSystem>
      </Container>
      {!account ? null : (
        <TableMine>
          <TableDataPool
            mine={mineData}
            userClaimedMineLength={mineData.userClaimedMineLength}
            mineHistory={usersClaimed}
          />
        </TableMine>
      )}
    </Wrapper>
  )
}

export default Mining
