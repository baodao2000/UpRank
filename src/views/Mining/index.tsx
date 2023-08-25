import { formatEther } from '@ethersproject/units'
import { Text, useMatchBreakpoints, useModal } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useWallet } from 'hooks/useWallet'
import Image from 'next/image'
import images from 'configs/images'
import numeral from 'numeral'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { getPoolsV4Contract, getTrendContract } from 'utils/contractHelpers'
import { useBalance } from 'wagmi'
import { ChainId } from '../../../packages/swap-sdk/src/constants'
import ClaimPoolModal from './components/ClaimModal'
import SendTrendModal from './components/sendModal'
import TableDataPool from './components/yourMineHistory'

const responsiveTextSizeHeader = ['20px', '24px', '28px', '32px', '32px']

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background: linear-gradient(90deg, #9e86ff 0%, #2b0864 111.24%);
  // background: black;
  background: url(${images.bg}) no-repeat;
  background-size: cover;
  /* margin-top: 30px; */

  gap: 32px;
  /* height: 1200px; */

  * {
    font-family: Inter, sans-serif;
  }
  @media screen and (max-width: 900px) {
    height: 80% !important;
  }
  @media screen and (max-width: 1440px) {
    /* height: 1200px; */
    justify-content: flex-start;
  }
  margin-bottom: 20px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  width: 95%;
  max-width: 1240px;
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

const IntroWapper = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
  @media screen and (max-width: 575px) {
    flex-direction: column;
  }
`

const Title = styled.div`
  font-size: 60px;
  font-weight: 700;
  line-height: 72px;
  letter-spacing: -0.02em;
  text-align: left;
  /* letter-spacing: -1.2px; */
  margin-top: 30px;
  background: linear-gradient(180deg, #7b3fe4 0%, #a726c1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 575px) {
    font-size: 24px;
    text-align: center;
    line-height: 32px;
  }
`

const IntrotText = styled.div`
  color: #adabb2;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  max-width: 600px;
  @media screen and (max-width: 575px) {
    width: 90%;
    margin: auto;
    text-align: center;
    line-height: 24px;
  }
`

const Table = styled.div`
  min-width: 50%;
  min-height: 490px;
  /* width: 585px; */
  padding: 2px 1px;
  border-radius: 24px;
  border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));

  @media screen and (max-width: 575px) {
    /* width: 350px !important;
    height: 580px !important; */
    margin-top: 1px !important;
  }
  @media screen and (max-width: 1024px) {
    /* width: 670px; */
    /* height: 450px; */
  }
  @media screen and (max-width: 1440px) {
  }
`
const TableSystem = styled.div`
  min-height: 490px;
  width: 585px;
  padding: 40px;
  border-radius: 24px;
  /* border: 1px;
  border: 1px solid rgba(203, 205, 255, 0.44); */
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(5.5px);
  background: rgba(0, 0, 0, 0.2);
  screen and (max-width: 575px) {
    width: 350px;
    margin-top: 50px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 16px;
  }
`
const BoxContain = styled.div`
  min-height: 400px;
  padding: 40px;
  border-radius: 15px;
  border: 1px;
  gap: 32px;
  /* margin-top: 10px; */
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 575px) {
    /* width: 330px !important; */
    gap: 16px;
  }
  @media screen and (max-width: 768px) {
    /* width: 642px !important; */
  }
  @media screen and (max-width: 1024px) {
    /* width: 600px; */
    padding: 16px;
  }
`
const Box = styled.div`
  /* width: 300px; */
  padding: 24px;
  border-radius: 15px;
  /* border: 1px solid;
  border: 1px solid rgba(203, 205, 255, 0.44); */

  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(50px);
  border: 1px solid rgba(255, 255, 255, 0.12);
`
const ContentText = styled.text`
  font-weight: 700;
  font-size: 30px;
  color: rgba(255, 255, 255, 1);
  @media screen and (max-width: 575px) {
    font-size: 20px;
  }
`
const Button = styled.button`
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  height: 40px;
  width: 66px;
  margin-top: 10px;
  border-radius: 8px;
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
  @media screen and (max-width: 575px) {
    width: 100% !important;
    height: 40px;
  }
`

const TableMine = styled.div`
  border: 2px solid #00f0e1;
  padding: 16px;
  border: 1px solid rgba(245, 251, 242, 0.2);
  border-radius: 16px;
  max-width: 1240px;
  width: 95%;
  /* background: linear-gradient(
    131deg,
    rgba(125, 128, 195, 0.7) 0%,
    rgba(71, 74, 155, 0.25) 57.58%,
    rgba(153, 159, 204, 0.28) 82.49%,
    rgba(239, 248, 255, 0.31) 100%
  ); */
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
  let { account, chainId } = useActiveWeb3React()
  // account = '0x0ef7b247af103aa6ae66b8530875732a73f4bf68'

  const [loadingPage, setLoadingPage] = useState(true)
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const [isLoading, setIsLoading] = useState(false)
  const getPoolContract = getPoolsV4Contract(CHAIN_ID)
  const getTokenTrendContract = getTrendContract(CHAIN_ID)
  const { onPresentConnectModal } = useWallet()
  const [usersClaimed, setUserClaimed] = useState([])
  const [claimDisable, setClaimDisable] = useState(false)
  const [sendDisable, setSendDisable] = useState(false)
  const [available, setAvailable] = useState({
    total: 0,
    show: 0,
  })
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
  const initAvailable = async () => {
    const currentRewardTREND = await getPoolContract.currentRewardTREND(account)
    const total = Number(formatEther(currentRewardTREND))
    const avai = {
      total,
      show: total - total / 2880,
    }
    if (available.total === 0) updateAvailable(avai)
    await setAvailable(avai)
  }
  const getAvailable = () => {
    if (!account) {
      setAvailable({
        total: 0,
        show: 0,
      })
    } else {
      initAvailable()
      setTimeout(async () => {
        initAvailable()
      }, 30000)
    }
  }
  const updateAvailable = (avai) => {
    const newAvai = {
      ...avai,
      show: avai.show + ((avai.total - avai.show) * 10) / 100,
    }
    setTimeout(async () => {
      if (avai.show > 0) await setAvailable(newAvai)
      updateAvailable(newAvai)
    }, 3000)
  }
  useEffect(() => {
    getMine()
    getMineSystem()
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
  // const { data, isFetched } = useBalance({
  //   addressOrName: account,
  // })

  return (
    <Wrapper>
      <Container>
        <IntroWapper>
          <div>
            <Title>Mining</Title>
            <IntrotText>
              Blockchain mining validates transactions, secures the network, and maintains decentralized integrity.
            </IntrotText>
          </div>
          <Image
            src="/images/Mining.png"
            width={isMobile ? 196 : 228}
            height={isMobile ? 196 : 228}
            objectFit="contain"
            alt="mining"
          />
        </IntroWapper>
        {/* <ContentText
          style={{
            fontSize: '36px',
            fontWeight: 700,
            textAlign: 'center',
            marginTop: '30px',
            marginLeft: isMobile ? '0px' : isTablet ? '0px' : '50px',
          }}
        >
          Dashboard
        </ContentText> */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : isTablet ? 'column' : 'row', gap: '20px' }}>
          <Table
            style={{
              // width: isMobile ? '350px' : isTablet ? '670px' : '635px',
              background: 'rgba(0, 0, 0, 0.20)',
              backdropFilter: 'blur(5.5px)',
            }}
          >
            <BoxContain>
              <ContentText
                style={{
                  fontSize: isMobile ? '24px' : '30px',
                  lineHeight: isMobile ? '32px' : '38px',
                  fontWeight: '400',
                }}
              >
                Your Wallet
              </ContentText>

              <div
                style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? '16px' : '32px',
                  order: isMobile ? 2 : 1,
                }}
              >
                <Box
                  style={{
                    width: isMobile ? '100%' : '40%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isTablet ? '5px' : '15px',
                    // height: isMobile ? '120px' : isTablet ? '120px' : '172px',

                    backdropFilter: 'blur(50px)',
                  }}
                >
                  <div>
                    <Image src="/images/V3/speed.svg" width={30} height={30} alt="" />
                  </div>
                  <ContentText style={{ fontSize: isMobile ? '20px' : isTablet ? '36px' : '36px', fontWeight: 700 }}>
                    {Number(mineData.mineSpeed / 100 + mineData.mineSpeedLevel)}
                    <span style={{ fontSize: '26px', fontWeight: 700 }}>x</span>
                  </ContentText>

                  <ContentText style={{ fontSize: '20px', fontWeight: 400, color: '#ADABB2' }}>Your Speed</ContentText>
                </Box>
                <Box
                  style={{
                    // width: isMobile ? '145px' : isTablet ? '900px' : '100%',
                    // width: isMobile ? '100%' : '60%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '5px' : isTablet ? '5px' : '15px',
                    // height: isMobile ? '120px' : isTablet ? '120px' : '172px',
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
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isMobile ? '15px' : isTablet ? '10px' : '15px',
                      }}
                    >
                      {!account ? (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                          <Image
                            src="/images/trendyloop.png"
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
                              src="/images/trendyloop.png"
                              width={isMobile ? 30 : 40}
                              height={isMobile ? 30 : 40}
                              alt=""
                            />
                            <ContentText style={{ fontSize: isMobile ? '20px' : '30px', fontWeight: 700 }}>
                              <CountUp
                                start={0}
                                preserveValue
                                delay={0}
                                end={mineData.totalMined}
                                decimals={mineData.totalMined > 0 ? 4 : 0}
                                duration={0.5}
                                separator=","
                              />
                            </ContentText>
                          </div>
                        </>
                      )}
                      {!account ? (
                        <ContentText
                          style={{ fontSize: isMobile ? '20px' : '30px', fontWeight: 600, color: '#DBDBDB' }}
                        >
                          {' '}
                          ~ $ 0
                        </ContentText>
                      ) : (
                        <ContentText
                          style={{ fontSize: isMobile ? '20px' : '30px', fontWeight: 600, color: '#DBDBDB' }}
                        >
                          ${' '}
                          <CountUp
                            start={0}
                            preserveValue
                            delay={0}
                            end={mineData.totalMined * mineData.trend2USDT}
                            decimals={mineData.totalMined > 0 ? 4 : 0}
                            duration={0.5}
                            separator=","
                          />
                        </ContentText>
                      )}
                    </div>
                  </div>
                  <ContentText style={{ fontSize: '20px', fontWeight: 400, color: '#ADABB2' }}>
                    {`Remained TREND `}
                    <span style={{ fontSize: '20px', fontWeight: 400, color: '#ADABB2' }}>(Locking)</span>
                  </ContentText>
                </Box>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isMobile ? '16px' : '40px',
                  order: isMobile ? 1 : 2,
                }}
              >
                <Box
                  style={{
                    // height: isMobile ? '150px' : '103px',

                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '10px' : isTablet ? '20px' : '55px',
                    // width: isMobile ? '50%' : '100%',
                    backdropFilter: 'blur(50px)',
                    order: isMobile ? 2 : 1,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '100%',
                      gap: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                        <Image
                          src="/images/trendyloop.png"
                          width={isMobile ? 30 : 40}
                          height={isMobile ? 30 : 40}
                          alt=""
                        />
                        {!account ? (
                          <ContentText style={{ fontSize: isMobile ? '20px' : '30px', fontWeight: 700 }}>0</ContentText>
                        ) : (
                          <ContentText style={{ fontSize: isMobile ? '20px' : '30px', fontWeight: 700 }}>
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
                        )}
                        {!account ? (
                          <ContentText
                            style={{ fontSize: isMobile ? '15px' : '20px', fontWeight: 600, color: '#FFFFFF' }}
                          >
                            ~ $ 0
                          </ContentText>
                        ) : (
                          <ContentText
                            style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 500, color: '#ADABB2' }}
                          >
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
                    <ContentText style={{ fontSize: '20px', fontWeight: 500, color: '#FFFFFF' }}>
                      Your Wallet Balance
                    </ContentText>
                  </div>

                  <Button
                    style={{
                      background: 'rgba(175, 137, 238, 0.20)',
                      boxShadow: '0px 2px 0px 0px rgba(0, 0, 0, 0.02)',
                      // backdropFilter: 'blur(50px)',
                      padding: '0 30px',
                      alignSelf: 'center',
                    }}
                    onClick={handleSend}
                    disabled={mineData.balanceTrend <= 0}
                  >
                    <ContentText
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 400,
                        fontSize: 14,
                        color: '#E2E1E5',
                      }}
                    >
                      Send
                    </ContentText>
                  </Button>
                </Box>
                <Box
                  style={{
                    // height: isMobile ? '150px' : '103px',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    // width: isMobile ? '50%' : '100%',
                    backdropFilter: 'blur(50px)',
                    background: 'linear-gradient(180deg, #7B3FE4 0%, #A726C1 100%)',
                    order: isMobile ? 1 : 2,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: '5px',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                        <Image
                          src="/images/trendyloop.png"
                          width={isMobile ? 30 : 40}
                          height={isMobile ? 30 : 40}
                          alt=""
                        />
                        {!account ? (
                          <ContentText style={{ fontSize: isMobile ? '24px' : '30px', fontWeight: 700 }}>0</ContentText>
                        ) : (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: isMobile ? 'column' : 'row',
                              alignItems: 'center',
                              gap: '10px',
                            }}
                          >
                            <ContentText style={{ fontSize: '36px', fontWeight: 700 }}>
                              <CountUp
                                start={0}
                                preserveValue
                                delay={0}
                                end={available.show}
                                decimals={available.show > 0 ? 6 : 0}
                                duration={0.5}
                                separator=","
                              />
                            </ContentText>
                          </div>
                        )}
                        {!account ? (
                          <ContentText style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF' }}>
                            ~ $ 0
                          </ContentText>
                        ) : (
                          <ContentText
                            style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 500, color: '#ADABB2' }}
                          >
                            ~ ${' '}
                            <CountUp
                              start={0}
                              preserveValue
                              delay={0}
                              end={available.show * mineData.trend2USDT}
                              decimals={available.show > 0 ? 6 : 0}
                              duration={0.5}
                              separator=","
                            />
                          </ContentText>
                        )}
                      </div>

                      <ContentText style={{ fontSize: '20px', fontWeight: 400, color: '#FFFFFF' }}>
                        Available TREND
                      </ContentText>
                    </div>
                  </div>

                  {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
                  <Button
                    style={{
                      background: 'rgba(175, 137, 238, 0.20)',
                      boxShadow: '0px 2px 0px 0px rgba(0, 0, 0, 0.02)',
                      alignSelf: 'center',
                      // backdropFilter: 'blur(50px)',
                    }}
                    onClick={handleClick}
                    disabled={claimDisable}
                  >
                    <ContentText
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 400,
                        fontSize: 14,
                        color: '#E2E1E5',
                      }}
                    >
                      Claim
                    </ContentText>
                  </Button>
                  {/* </div> */}
                </Box>
              </div>
            </BoxContain>
          </Table>

          <TableSystem
            style={{
              background: ' linear-gradient(313deg, rgba(228, 228, 228, 0.00) 0%, rgba(228, 228, 228, 0.00) 100%)',
              backdropFilter: 'blur(50px)',
              flexShrink: '1',
              width: '100%',
            }}
          >
            <SystemContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '16px' : '32px',

                marginTop: '5px',
              }}
            >
              <ContentText style={{ fontSize: isMobile ? '24px' : '30px', marginBottom: '5px', fontWeight: '500' }}>
                System
              </ContentText>

              <div
                style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '16px' : '32px' }}
              >
                <Box
                  style={{
                    // width: '50%',
                    // height: '120px',
                    // flex:
                    // minWidth: '290px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    backdropFilter: 'blur(50px)',
                  }}
                >
                  <span>
                    <Image src="/images/V3/miner.svg" alt="" width={isMobile ? 30 : 30} height={isMobile ? 30 : 30} />
                  </span>
                  <CountUp
                    start={0}
                    preserveValue
                    delay={0}
                    end={Number(systemData.totalMiner)}
                    // decimals={Number((mineData.balanceTrend)) > 0 ? 4 : 0}
                    duration={0.5}
                    separator=","
                    style={{
                      color: '#E2E1E5',
                      fontSize: '36px',
                      fontWeight: '700',
                      lineHeight: '44px',
                    }}
                  />

                  <ContentText style={{ fontSize: '20px', fontWeight: 400, color: '#ADABB2' }}>Miners</ContentText>
                </Box>
                <Box
                  style={{
                    width: '100%',
                    backdropFilter: 'blur(50px)',
                    // height: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '30px' : isTablet ? '40px' : '25px',
                  }}
                >
                  <Text fontSize={['24px', '20px', '24px', '24px', '20px', '34px']} fontWeight="700">
                    1 TREND
                  </Text>
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <ContentText style={{ fontSize: '22px', lineHeight: '16px', color: '#FFFFFF' }}>~</ContentText>
                    <ContentText style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 400, color: '#ADABB2' }}>
                      ${' '}
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(systemData.defaultTrend)}
                        decimals={Number(systemData.defaultTrend) > 0 ? 4 : 0}
                        duration={0.5}
                        separator=","
                      />
                    </ContentText>
                  </div>
                </Box>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isMobile ? '16px' : '40px',
                }}
              >
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    // height: '130px',
                    width: '100%',
                    backdropFilter: 'blur(50px)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <Image src="/images/trendyloop.png" width={40} height={40} alt="" />
                    <ContentText style={{ fontWeight: 700, alignItems: 'center' }}>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(systemData.totalMined)}
                        decimals={Number(systemData.totalMined) > 0 ? 4 : 0}
                        duration={0.5}
                        separator=","
                      />
                      <ContentText
                        style={{
                          fontSize: isMobile ? '20px' : '24px',
                          fontWeight: 400,
                          color: '#ADABB2',
                          alignItems: 'center',
                        }}
                      >
                        {' ~ $ '}
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={Number(systemData.totalMined) * systemData.defaultTrend}
                          decimals={Number(systemData.totalMined) > 0 ? 4 : 0}
                          duration={0.5}
                          separator=","
                        />
                      </ContentText>
                    </ContentText>
                  </div>
                  <ContentText style={{ fontSize: '20px', fontWeight: 400, color: '#CACACA' }}>Total Mined</ContentText>
                </Box>

                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    // height: '130px',
                    width: '100%',
                    backdropFilter: 'blur(50px)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <Image src="/images/trendyloop.png" width={40} height={40} alt="" />
                    <ContentText style={{ fontWeight: 700, alignItems: 'center' }}>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(systemData.totalClaimed)}
                        decimals={Number(systemData.totalClaimed) > 0 ? 4 : 0}
                        duration={0.5}
                      />
                      <ContentText
                        style={{
                          fontSize: isMobile ? '20px' : '24px',
                          fontWeight: 400,
                          color: '#ADABB2',
                          alignItems: 'center',
                        }}
                      >
                        {' ~ $ '}
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={Number(systemData.totalClaimed) * systemData.defaultTrend}
                          decimals={Number(systemData.totalClaimed) > 0 ? 4 : 0}
                          duration={0.5}
                        />
                      </ContentText>
                    </ContentText>
                  </div>
                  <ContentText style={{ fontSize: '20px', fontWeight: 400, color: '#CACACA' }}>
                    Total Claimed
                  </ContentText>
                </Box>
              </div>
            </SystemContent>
          </TableSystem>
        </div>
      </Container>
      {account && (
        <Text
          style={{
            color: '#F5F5F6',
            fontWeight: 500,
            paddingTop: '40px',
            textAlign: 'start',
            maxWidth: '1240px',
            width: '96%',
            // padding: '0 10px'
          }}
          fontSize={responsiveTextSizeHeader}
        >
          Your Mined History
        </Text>
      )}
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
