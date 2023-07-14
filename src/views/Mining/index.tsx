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
  @media screen and (max-width: 575px) {
    height: 100%;
  }
  @media screen and (max-width: 900px) {
    height: 80%;
  }
  @media screen and (max-width: 1440px) {
    height: 70%;
  }
  margin-bottom: 20px;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 100px;
  margin-top: 100px;

  @media screen and (max-width: 575px) {
    flex-direction: column;
    margin-top: 20px !important;
  }
  @media screen and (max-width: 900px) {
    flex-direction: column;
    margin-top: 200px !important;
  }
  @media screen and (max-width: 1024px) {
    flex-direction: column !important;
    margin-top: 200px;
  }
  @media screen and (max-width: 1440px) {
    flex-direction: row;
    margin-top: 200px;
  }
`
const Table = styled.div`
  height: 450px;
  width: 515px;
  padding: 2px 12px 24px 12px;
  border-radius: 15px;
  border: 1px;
  background: radial-gradient(
    100% 115.26% at 0% -2.74%,
    rgba(125, 128, 196, 0.7) 0%,
    rgba(71, 74, 155, 0.253633) 80.17%,
    rgba(164, 164, 164, 0.308) 100%
  );
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
  height: 450px;
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
    width: 900px;
  }
`
const Box = styled.div`
  width: 300px;
  height: 172px;
  padding: 12px 16px 12px 16px;
  border-radius: 12px;

  background: radial-gradient(
        101.36% 117.36% at 0% -2.74%,
        rgba(125, 128, 196, 0.6) 0%,
        rgba(136, 139, 224, 0.264) 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
    linear-gradient(0deg, rgba(245, 251, 242, 0.2), rgba(245, 251, 242, 0.2));

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
  // font-family: Poppins;
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
  width: 195px;
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
  margin-top: 10px;
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
  const { chainId } = useActiveWeb3React()
  const account = '0x1ec0f8875B7fc2400a6F44788c6710959614e68A'
  // const {account, chainId } = useActiveWeb3React()

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
        <Table style={{ width: isMobile ? '350px' : isTablet ? '670px' : '510px' }}>
          <BoxContain>
            <ContentText style={{ fontSize: '32px' }}>Your Wallet</ContentText>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <Box
                style={{
                  width: isMobile ? '145px' : isTablet ? '900px' : '210px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  height: isMobile ? '120px' : isTablet ? '150px' : '172px',
                }}
              >
                <div>
                  <Image src="/images/speed.png" width={20} height={15} alt="" />
                </div>
                <ContentText style={{ fontSize: isMobile ? '40px' : '64px', fontWeight: 700 }}>
                  {Number(mineData.mineSpeed / 100 + mineData.mineSpeedLevel)}
                  <span style={{ fontSize: '26px', fontWeight: 700 }}>x</span>
                </ContentText>

                <ContentText style={{ fontSize: '16px', fontWeight: 500, color: '#D1D1D1' }}>Mine Speed</ContentText>
              </Box>
              <Box
                style={{
                  width: isMobile ? '145px' : isTablet ? '900px' : '270px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  height: isMobile ? '120px' : isTablet ? '150px' : '172px',
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {!account ? (
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                        <Image
                          src="/images/trendiCoin.png"
                          width={isMobile ? 30 : 20}
                          height={isMobile ? 30 : 20}
                          alt=""
                        />
                        <ContentText style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 700 }}>0</ContentText>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                          <Image
                            src="/images/trendiCoin.png"
                            width={isMobile ? 30 : 25}
                            height={isMobile ? 30 : 25}
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
                      <ContentText style={{ fontSize: '24px', fontWeight: 600, color: '#DBDBDB' }}> ~ $ 0</ContentText>
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
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  width: isMobile ? '300px' : isTablet ? '300px' : '230px',
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                    {!account ? (
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                        <Image
                          src="/images/trendiCoin.png"
                          width={isMobile ? 30 : 25}
                          height={isMobile ? 30 : 25}
                          alt=""
                        />
                        <ContentText style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 700 }}>0</ContentText>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                        <Image
                          src="/images/trendiCoin.png"
                          width={isMobile ? 30 : 25}
                          height={isMobile ? 30 : 25}
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
                    {!account ? (
                      <ContentText style={{ fontSize: '24px', fontWeight: 600, color: '#D1D1D1' }}>~ $ 0</ContentText>
                    ) : (
                      <ContentText style={{ fontSize: '24px', fontWeight: 600, color: '#D1D1D1' }}>
                        ~${' '}
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
                  </div>
                </div>
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
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  width: isMobile ? '300px' : isTablet ? '300px' : '250px',
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                    {!account ? (
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                        <Image
                          src="/images/trendiCoin.png"
                          width={isMobile ? 30 : 25}
                          height={isMobile ? 30 : 25}
                          alt=""
                        />
                        <ContentText style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 700 }}>0</ContentText>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                        <Image
                          src="/images/trendiCoin.png"
                          width={isMobile ? 30 : 25}
                          height={isMobile ? 30 : 25}
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
                    {!account ? (
                      <ContentText style={{ fontSize: '24px', fontWeight: 600, color: '#D1D1D1' }}>~ $ 0</ContentText>
                    ) : (
                      <ContentText style={{ fontSize: '24px', fontWeight: 600, color: '#D1D1D1' }}>
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
                  </div>
                </div>
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

        <TableSystem>
          <ContentText style={{ fontSize: '32px' }}>System</ContentText>
          <SystemContent
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '10px' : '10px',
              alignItems: 'center',
              justifyItems: 'center',
              marginTop: '20px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '10px' }}>
              <Box
                style={{
                  width: isMobile ? '100%' : '295px',
                  height: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '40px',
                  background:
                    'radial-gradient(101.36% 117.36% at 0% -2.74%, rgba(125, 128, 196, 0.6) 0%, rgba(136, 139, 224, 0.264) 100%) linear-gradient(0deg, rgba(245, 251, 242, 0.2), rgba(245, 251, 242, 0.2))',
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
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isMobile ? '10px' : '40px',
                  height: isMobile ? '150px' : '200px',
                  width: '100%',
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
                      <Image src="/images/trendiCoin.png" width={25} height={25} alt="" />
                      <ContentText style={{ fontWeight: 700, fontSize: isMobile ? '20px' : '36px' }}>
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
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                gap: '10px',
              }}
            >
              <Box
                style={{
                  width: isMobile ? '140px' : '332px',

                  height: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '70px',
                }}
              >
                <ContentText style={{ fontSize: isMobile ? '20px' : '34px', fontWeight: '700' }}>1 TREND</ContentText>
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
              <Box
                style={{
                  width: isMobile ? '140px' : '332px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: isMobile ? '150px' : '200px',
                  gap: isMobile ? '20px' : '40px',
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
                        width={isMobile ? 20 : 25}
                        height={isMobile ? 20 : 25}
                        alt=""
                      />

                      <ContentText style={{ fontWeight: 700, fontSize: isMobile ? '20px' : '36px' }}>
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
                <ContentText style={{ fontSize: '16px', fontWeight: 500, color: '#CACACA' }}>Total Claimed</ContentText>
              </Box>
            </div>
          </SystemContent>
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
