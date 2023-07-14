import { formatEther } from '@ethersproject/units'
import { useMatchBreakpoints, useModal } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useWallet } from 'hooks/useWallet'
import Image from 'next/image'
import numeral from 'numeral'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { getPoolsV3Contract, getTrendContract } from 'utils/contractHelpers'
import { useBalance } from 'wagmi'
import { ChainId } from '../../../packages/swap-sdk/src/constants'
import ClaimPoolModal from './components/ClaimModal'
import SendTrendModal from './components/sendModal'
import TableDataPool from './components/yourMineHistory'
const Wrapper = styled.div`
  font-family: Poppins !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #9e86ff 0%, #2b0864 111.24%);
  gap: 10px;
  height: 1200px;
  * {
    font-family: Dosis;
  }
  @media screen and (max-width: 900px) {
    height: 80% !important;
  }
  @media screen and (max-width: 1440px) {
    height: 1200px;
    justify-content: flex-start;
  }
  margin-bottom: 20px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 575px) {
    flex-direction: column;
  }
  @media screen and (max-width: 900px) {
    flex-direction: column;
    margin-top: 0px !important;
  }
  @media screen and (max-width: 1024px) {
    flex-direction: column !important;
  }
  @media screen and (max-width: 1440px) {
    margin-top: 100px;
  }
`
const Table = styled.div`
  height: 580px;
  width: 515px;
  padding: 2px 12px 24px 12px;
  border-radius: 15px;
  border: 1px;
  border: 1px solid;
  border: 1px solid rgba(203, 205, 255, 0.44);

  @media screen and (max-width: 575px) {
    width: 350px !important;
    height: 580px !important;
    margin-top: 1px !important;
  }
  @media screen and (max-width: 900px) {
    width: 670px;
    height: 450px;
  }
  @media screen and (max-width: 1440px) {
  }
`
const TableSystem = styled.div`
  height: 580px;
  width: 490px;
  padding: 24px 12px 24px 12px;
  border-radius: 15px;
  border: 1px;
  border: 1px solid rgba(203, 205, 255, 0.44);

  screen and (max-width: 575px) {
    width: 350px;
    margin-top: 50px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`
const BoxContain = styled.div`
  height: 400px;
  padding: 16px;
  border-radius: 15px;
  border: 1px;
  gap: 12px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 575px) {
    width: 330px !important;
  }
  @media screen and (max-width: 768px) {
    width: 642px !important;
  }
  @media screen and (max-width: 1024px) {
    width: 600px;
  }
`
const Box = styled.div`
  width: 300px;
  padding: 12px 12px 10px 16px;
  border-radius: 12px;
  border: 1px solid;
  border: 1px solid rgba(203, 205, 255, 0.44);

  background: linear-gradient(313deg, 0%, rgba(228, 228, 228, 0) 100%),
    radial-gradient(131.77% 143.25% at -0% -2.74%, rgba(125, 128, 195, 0.6) 0%, rgba(136, 139, 224, 0.26) 100%);
  backdrop-filter: blur(50px);

  // @media screen and (max-width: 575px) {
  //   width: 300px !important;
  // }
  // @media screen and (max-width: 900px) {
  //   width: 300px !important;
  // }
  // @media screen and (max-width: 1024px) {
  //   width: 235px;
  // }
`
const ContentText = styled.text`
  // font-family: Dosis;
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
  width: 100%;
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

const TableMine = styled.div`
  border: 2px solid #00f0e1;
  padding: 28px 28px 46px 28px;
  border: 1px solid rgba(245, 251, 242, 0.2);
  border-radius: 16px;
  max-width: 1240px;
  width: 95%;
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
    flex-direction: column;
  }
`
function Mining() {
  const { isMobile, isTablet } = useMatchBreakpoints()
  // const { account, chainId } = useActiveWeb3React()
  const { chainId } = useActiveWeb3React()
  const account = '0x1ec0f8875B7fc2400a6F44788c6710959614e68A'
  const [loadingPage, setLoadingPage] = useState(true)
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const [isLoading, setIsLoading] = useState(false)
  const getPoolContract = getPoolsV3Contract(CHAIN_ID)
  const getTokenTrendContract = getTrendContract(CHAIN_ID)
  const { onPresentConnectModal } = useWallet()
  const [usersClaimed, setUserClaimed] = useState([])
  const [claimDisable, setClaimDisable] = useState(false)
  const [sendDisable, setSendDisable] = useState(false)
  const [available, setAvailable] = useState(0)
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
  const getAvailable = async () => {
    if (!account) {
      setAvailable(0)
    } else {
      const currentRewardTREND = await getPoolContract.currentRewardTREND(account)
      if (available !== Number(formatEther(currentRewardTREND)))
        await setAvailable(Number(formatEther(currentRewardTREND)))
      // console.log(Number(formatEther(currentRewardTREND)))
    }
  }
  useEffect(() => {
    getMine()
    getMineSystem()
    let interval
    if (account) interval = setInterval(() => getMine(), 30000)
    return () => clearInterval(interval)
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
        let mineSpeedLevel = await getPoolContract.userRank(account)
        const currentRewardTREND = await getPoolContract.currentRewardTREND(account)

        if (Number(formatEther(currentRewardTREND)) === 0) {
          setClaimDisable(true)
        } else {
          setClaimDisable(false)
        }
        if (Number(mineSpeedLevel) === 0) {
          mineSpeedLevel = 0
        } else {
          mineSpeedLevel = ((Number(mineSpeedLevel) + 1) * 25) / 100
        }
        await getAvailable()
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
          balanceTrend: balanceAccount,
        })
        // setIsLoading(false)
        await getMineHistory(getUsersClaimMinedLength)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getMineSystem = async () => {
    if (!account) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
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
  }

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

  return (
    <Wrapper>
      <Container>
        <ContentText
          style={{
            fontSize: '36px',
            fontWeight: 700,
            textAlign: 'center',
            marginTop: '30px',
          }}
        >
          Dashboard
        </ContentText>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : isTablet ? 'column' : 'row', gap: '20px' }}>
          <Table
            style={{
              width: isMobile ? '350px' : isTablet ? '670px' : '635px',
              background: ' linear-gradient(313deg, rgba(228, 228, 228, 0.00) 0%, rgba(228, 228, 228, 0.00) 100%)',
              backdropFilter: 'blur(50px)',
            }}
          >
            <BoxContain>
              <ContentText style={{ fontSize: '32px' }}>Your Wallet</ContentText>

              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <Box
                  style={{
                    width: isMobile ? '145px' : isTablet ? '900px' : '268px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    height: isMobile ? '120px' : isTablet ? '150px' : '172px',
                    background:
                      'linear-gradient(313deg, rgba(228, 228, 228, 0.10) 0%, rgba(228, 228, 228, 0.00) 100%), radial-gradient(131.77% 143.25% at -0.00% -2.74%, rgba(125, 128, 195, 0.60) 0%, rgba(136, 139, 224, 0.26) 100%)',
                    backdropFilter: 'blur(50px)',
                  }}
                >
                  <div>
                    <Image src="/images/speed.png" width={30} height={25} alt="" />
                  </div>
                  <ContentText style={{ fontSize: isMobile ? '30px' : isTablet ? '45px' : '64px', fontWeight: 700 }}>
                    {Number(mineData.mineSpeed / 100 + mineData.mineSpeedLevel)}
                    <span style={{ fontSize: '26px', fontWeight: 700 }}>x</span>
                  </ContentText>

                  <ContentText style={{ fontSize: '16px', fontWeight: 500, color: '#D1D1D1' }}>Mine Speed</ContentText>
                </Box>
                <Box
                  style={{
                    width: isMobile ? '145px' : isTablet ? '900px' : '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '5px' : isTablet ? '10px' : '30px',
                    height: isMobile ? '120px' : isTablet ? '150px' : '172px',
                    background:
                      'linear-gradient(313deg, rgba(228, 228, 228, 0.10) 0%, rgba(228, 228, 228, 0.00) 100%), radial-gradient(131.77% 143.25% at -0.00% -2.74%, rgba(125, 128, 195, 0.60) 0%, rgba(136, 139, 224, 0.26) 100%)',
                    backdropFilter: 'blur(50px)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '15px' : '30px' }}>
                      {!account ? (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                          <Image
                            src="/images/trendiCoin.png"
                            width={isMobile ? 30 : 40}
                            height={isMobile ? 30 : 40}
                            alt=""
                          />
                          <ContentText style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 700 }}>0</ContentText>
                        </div>
                      ) : (
                        <>
                          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <Image
                              src="/images/trendiCoin.png"
                              width={isMobile ? 30 : 40}
                              height={isMobile ? 30 : 40}
                              alt=""
                            />
                            <ContentText style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 700 }}>
                              <CountUp
                                start={0}
                                preserveValue
                                delay={0}
                                end={mineData.totalMined}
                                decimals={mineData.totalMined > 0 ? 4 : 0}
                                duration={0.5}
                              />
                            </ContentText>
                          </div>
                        </>
                      )}
                      {!account ? (
                        <ContentText style={{ fontSize: '24px', fontWeight: 600, color: '#DBDBDB' }}>
                          {' '}
                          ~ $ 0
                        </ContentText>
                      ) : (
                        <ContentText style={{ fontSize: '24px', fontWeight: 600, color: '#DBDBDB' }}>
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
                  <ContentText style={{ fontSize: isMobile ? '12px' : '15px', fontWeight: 500, color: '#D1D1D1' }}>
                    Remained TREND
                    <span style={{ fontSize: isMobile ? '10px' : '13px', fontWeight: 500, color: '#D1D1D1' }}>
                      (Locking)
                    </span>
                  </ContentText>
                </Box>
              </div>
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px' }}>
                <Box
                  style={{
                    height: isMobile ? '170px' : isTablet ? '210px' : '314px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '10px' : isTablet ? '20px' : '55px',
                    width: isMobile ? '50%' : '100%',

                    background:
                      'linear-gradient(313deg, rgba(228, 228, 228, 0.10) 0%, rgba(228, 228, 228, 0.00) 100%), radial-gradient(131.77% 143.25% at -0.00% -2.74%, rgba(125, 128, 195, 0.60) 0%, rgba(136, 139, 224, 0.26) 100%)',
                    backdropFilter: 'blur(50px)',
                  }}
                >
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', alignItems: 'center' }}>
                      {!account ? (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                          <Image
                            src="/images/trendiCoin.png"
                            width={isMobile ? 30 : 40}
                            height={isMobile ? 30 : 40}
                            alt=""
                          />
                          <ContentText style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 700 }}>0</ContentText>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                          <Image
                            src="/images/trendiCoin.png"
                            width={isMobile ? 30 : 40}
                            height={isMobile ? 30 : 40}
                            alt=""
                          />

                          <ContentText style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 700 }}>
                            <CountUp
                              start={0}
                              preserveValue
                              delay={0}
                              end={available}
                              decimals={available > 0 ? 8 : 0}
                              duration={0.5}
                            />
                          </ContentText>
                        </div>
                      )}
                    </div>
                  </div>
                  {!account ? (
                    <ContentText style={{ fontSize: '20px', fontWeight: 600, color: '#D1D1D1' }}>~ $ 0</ContentText>
                  ) : (
                    <ContentText style={{ fontSize: '20px', fontWeight: 600, color: '#D1D1D1' }}>
                      ~ ${' '}
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={available * mineData.trend2USDT}
                        decimals={available > 0 ? 6 : 0}
                        duration={0.5}
                      />
                    </ContentText>
                  )}
                  <ContentText style={{ fontSize: '16px', fontWeight: 500, color: '#D1D1D1' }}>
                    Available TREND
                  </ContentText>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      style={{
                        background:
                          'linear-gradient(0deg, rgba(245, 251, 242, 0.5), rgba(245, 251, 242, 0.5)),radial-gradient(170.62% 269.44% at 0% 0%, #FBFDFF 0%, rgba(192, 203, 251, 0.362332) 87.18%, rgba(2, 0, 98, 0) 100%)',
                        backdropFilter: 'blur(50px)',
                      }}
                      onClick={handleClick}
                      disabled={claimDisable}
                    >
                      <ContentText
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 700,
                          fontSize: 16,
                          background: 'linear-gradient(89.3deg, #8B16FF -6.75%, #0D1664 105.61%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        Claim
                      </ContentText>
                    </Button>
                  </div>
                </Box>
                <Box
                  style={{
                    height: isMobile ? '170px' : isTablet ? '210px' : '314px',

                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '10px' : isTablet ? '20px' : '55px',
                    width: isMobile ? '50%' : '100%',
                    background:
                      'linear-gradient(313deg, rgba(228, 228, 228, 0.10) 0%, rgba(228, 228, 228, 0.00) 100%), radial-gradient(131.77% 143.25% at -0.00% -2.74%, rgba(125, 128, 195, 0.60) 0%, rgba(136, 139, 224, 0.26) 100%)',
                    backdropFilter: 'blur(50px)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', alignItems: 'center' }}>
                      {!account ? (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                          <Image
                            src="/images/trendiCoin.png"
                            width={isMobile ? 30 : 40}
                            height={isMobile ? 30 : 40}
                            alt=""
                          />
                          <ContentText style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 700 }}>0</ContentText>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                          <Image
                            src="/images/trendiCoin.png"
                            width={isMobile ? 30 : 40}
                            height={isMobile ? 30 : 40}
                            alt=""
                          />
                          <ContentText style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 700 }}>
                            {
                              <CountUp
                                separator=","
                                start={0}
                                preserveValue
                                delay={0}
                                end={Number(mineData.balanceTrend)}
                                decimals={1}
                                duration={0.5}
                              />
                            }
                            {/* {numeral(Number(formatEther(mineData.balanceTrend))).format('0,0')} */}
                          </ContentText>
                        </div>
                      )}
                    </div>
                  </div>
                  {!account ? (
                    <ContentText style={{ fontSize: '20px', fontWeight: 600, color: '#D1D1D1' }}>~ $ 0</ContentText>
                  ) : (
                    <ContentText style={{ fontSize: '20px', fontWeight: 600, color: '#D1D1D1' }}>
                      ~ ${' '}
                      <CountUp
                        separator=","
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(mineData.balanceTrend) * mineData.trend2USDT}
                        decimals={Number(mineData.balanceTrend) > 0 ? 3 : 0}
                        duration={0.5}
                      />
                    </ContentText>
                  )}
                  <ContentText style={{ fontSize: '16px', fontWeight: 500, color: '#D1D1D1' }}>
                    Your Wallet Balance
                  </ContentText>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      style={{
                        background:
                          'linear-gradient(0deg, rgba(245, 251, 242, 0.5), rgba(245, 251, 242, 0.5)),radial-gradient(170.62% 269.44% at 0% 0%, #FBFDFF 0%, rgba(192, 203, 251, 0.362332) 87.18%, rgba(2, 0, 98, 0) 100%)',
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
                          background: 'linear-gradient(89.3deg, #8B16FF -6.75%, #0D1664 105.61%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        Send
                      </ContentText>
                    </Button>
                  </div>
                </Box>
              </div>
            </BoxContain>
          </Table>

          <TableSystem
            style={{
              background: ' linear-gradient(313deg, rgba(228, 228, 228, 0.00) 0%, rgba(228, 228, 228, 0.00) 100%)',
              backdropFilter: 'blur(50px)',
            }}
          >
            <ContentText style={{ fontSize: '32px' }}>System</ContentText>
            <SystemContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',

                marginTop: '20px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'row', gap: '10px' }}>
                <Box
                  style={{
                    width: '100%',
                    height: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    background:
                      'linear-gradient(313deg, rgba(228, 228, 228, 0.10) 0%, rgba(228, 228, 228, 0.00) 100%), radial-gradient(131.77% 143.25% at -0.00% -2.74%, rgba(125, 128, 195, 0.60) 0%, rgba(136, 139, 224, 0.26) 100%)',
                    backdropFilter: 'blur(50px)',
                  }}
                >
                  <ContentText
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: isMobile ? '40px' : '64px',
                    }}
                  >
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={Number(systemData.totalMiner)}
                      // decimals={Number((mineData.balanceTrend)) > 0 ? 4 : 0}
                      duration={0.5}
                    />
                    <span>
                      <Image src="/images/user.png" alt="" width={isMobile ? 30 : 50} height={isMobile ? 30 : 50} />
                    </span>
                  </ContentText>
                  <ContentText style={{ fontSize: '16px', fontWeight: 500, color: '#D1D1D1' }}>Miners</ContentText>
                </Box>
                <Box
                  style={{
                    width: '100%',
                    background:
                      'linear-gradient(313deg, rgba(228, 228, 228, 0.10) 0%, rgba(228, 228, 228, 0.00) 100%), radial-gradient(131.77% 143.25% at -0.00% -2.74%, rgba(125, 128, 195, 0.60) 0%, rgba(136, 139, 224, 0.26) 100%)',
                    backdropFilter: 'blur(50px)',
                    height: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <ContentText style={{ fontSize: isMobile ? '20px' : '30px', fontWeight: '700' }}>1 TREND</ContentText>
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
                }}
              >
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '10px' : '30px',
                    height: isMobile ? '150px' : '175px',
                    width: '100%',
                    background:
                      'linear-gradient(313deg, rgba(228, 228, 228, 0.10) 0%, rgba(228, 228, 228, 0.00) 100%), radial-gradient(131.77% 143.25% at -0.00% -2.74%, rgba(125, 128, 195, 0.60) 0%, rgba(136, 139, 224, 0.26) 100%)',
                    backdropFilter: 'blur(50px)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '5px',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                        <Image src="/images/trendiCoin.png" width={40} height={40} alt="" />
                        <ContentText style={{ fontWeight: 700, fontSize: '36px' }}>
                          <CountUp
                            start={0}
                            preserveValue
                            delay={0}
                            end={Number(systemData.totalMined)}
                            decimals={Number(systemData.totalMined) > 0 ? 4 : 0}
                            duration={0.5}
                          />
                        </ContentText>
                      </div>

                      <ContentText style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 700, color: '#D1D1D1' }}>
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
                  <ContentText style={{ fontSize: '16px', fontWeight: 500, color: '#CACACA' }}>Total Mined</ContentText>
                </Box>
                <Box
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    height: isMobile ? '150px' : '175px',
                    gap: isMobile ? '20px' : '30px',
                    background:
                      'linear-gradient(313deg, rgba(228, 228, 228, 0.10) 0%, rgba(228, 228, 228, 0.00) 100%), radial-gradient(131.77% 143.25% at -0.00% -2.74%, rgba(125, 128, 195, 0.60) 0%, rgba(136, 139, 224, 0.26) 100%)',
                    backdropFilter: 'blur(50px)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '15px',
                      width: '100%',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '20px' : '35px' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                        <Image
                          src="/images/trendiCoin.png"
                          width={isMobile ? 20 : 40}
                          height={isMobile ? 20 : 40}
                          alt=""
                        />

                        <ContentText style={{ fontWeight: 700, fontSize: '36px' }}>
                          <CountUp
                            start={0}
                            preserveValue
                            delay={0}
                            end={Number(systemData.totalClaimed)}
                            decimals={Number(systemData.totalClaimed) > 0 ? 4 : 0}
                            duration={0.5}
                          />
                        </ContentText>
                      </div>

                      <ContentText style={{ fontSize: '24px', fontWeight: 700, color: '#D1D1D1' }}>
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
                  <ContentText style={{ fontSize: '16px', fontWeight: 500, color: '#CACACA' }}>
                    Total Claimed
                  </ContentText>
                </Box>
              </div>
            </SystemContent>
          </TableSystem>
        </div>
      </Container>
      {!account ? null : (
        <TableMine style={{ fontFamily: 'Poppins, sans-serif !important' }}>
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
