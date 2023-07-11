import { Text, useMatchBreakpoints, useModal } from '@pancakeswap/uikit'
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
import { useWallet } from 'hooks/useWallet'
import CountUp from 'react-countup'
import { useBalance } from 'wagmi'
import contracts from 'config/constants/contracts'
import { formatBigNumber } from 'utils/formatBalance'
import SendTrendModal from './components/sendModal'
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-1, linear-gradient(90deg, #9e86ff 0%, #2b0864 100%));
  gap: 10px;
  height: 100%;
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
  // height: 329px;
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
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
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
`
// const data = [
//   {
//     title: 'Mined Trend',
//     trend: '50 TREND',
//     price: '50 USD',
//   },
//   {
//     title: 'Claimed Trend',
//     trend: '12 TREND',
//     price: '12 USD',
//   },
//   {
//     title: 'Remained Trend',
//     trend: '38 TREND',
//     price: '38 USD',
//   },
// ]
function Mining() {
  const { isMobile, isTablet, isDesktop, isXl } = useMatchBreakpoints()
  const { account, chainId } = useActiveWeb3React()
  const [loadingPage, setLoadingPage] = useState(true)
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const [isLoading, setIsLoading] = useState(false)
  const getPoolContract = getPoolsV3Contract(CHAIN_ID)
  const { onPresentConnectModal } = useWallet()
  const [usersClaimed, setUserClaimed] = useState([])
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
  })

  useEffect(() => {
    getMine()
    // getMineHistory()
  }, [account])
  const [openClaimModal, onDismissModal] = useModal(
    <ClaimPoolModal onDismiss={() => onDismissModal()} onSuccess={() => handleSuccess()} mine={mineData} />,
    true,
    false,
    'removeModal',
  )
  const [openSendModal, onDismissSendModal] = useModal(
    <SendTrendModal onDismiss={() => onDismissSendModal} />,
    true,
    false,
    'removeModal',
  )
  const getMine = async () => {
    try {
      if (!account) {
        setIsLoading(true)
        console.log('dsdsdsd')
      } else {
        setIsLoading(false)
        const getUsersClaimMinedLength = await getPoolContract.getUsersClaimMinedLength(account)
        const users = await getPoolContract.usersMine(account)
        const currentRewardTREND = await getPoolContract.currentRewardTREND(account)
        const trendUSD = await getPoolContract.TREND2USDT()
        setMineData({
          totalMined: Number(formatEther(users.totalMined)),
          claimed: Number(users.claimed),
          remain: Number(formatEther(users.remain)),
          mineSpeed: Number(users.mineSpeed),
          mineSpeedLevel: Number(users.mineSpeedLevel),
          startTime: Number(users.startTime),
          userClaimedMineLength: Number(getUsersClaimMinedLength),
          currentReward: Number(formatEther(currentRewardTREND)),
          trend2USDT: Number(formatEther(trendUSD)),
        })
        // setIsLoading(false)
        await getMineHistory(getUsersClaimMinedLength)
      }
    } catch (error) {
      console.log(error)
    }
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
          await getPoolContract.getUsersClaimMined(account, 10, 0).then((res) => {
            console.log('dsds')

            const arr = res.list.map((claimed: any, i: number) => {
              return {
                date: Number(claimed.date.toString()),
                amount: Number(formatEther(claimed.amount)),
                totalLock: Number(formatEther(claimed.totalLock)),
                power: Number(claimed.interrest.toString()) / 100,
                currentReward: Number(formatEther(currentRewardTREND)),
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
    openSendModal()
  }
  const { data, isFetched } = useBalance({
    addressOrName: account,
  })

  const balance = isFetched && data && data.value ? formatBigNumber(data.value, 6) : 0
  return (
    <Wrapper>
      <Container>
        <Table>
          <Text fontFamily="Poppins, sans-serif" marginLeft="20px" fontWeight="700" fontSize={['18px', '22px', '32px']}>
            Your Wallet
          </Text>
          <BoxContain>
            {/* <Box>
              <div>
                <ContentText style={{ fontSize: '18px', fontWeight: 600 }}>Mined Trend</ContentText>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: isMobile ? '5px' : '10px',
                    marginTop: '10px',
                  }}
                >
                  {!account ? (
                    <ContentText>0 TREND</ContentText>
                  ) : (
                    <ContentText>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={mineData.totalMined}
                        decimals={mineData.totalMined > 0 ? 4 : 0}
                        duration={0.5}
                      />{' '}
                      TREND
                    </ContentText>
                  )}
                  <Image src="/images/wallet.png" alt="" width={30} height={30} />
                  <Text fontSize='36px' lineHeight='0'>~</Text>
                  {!account ? (
                    <ContentText>0 $</ContentText>
                  ) : (
                    <ContentText>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={mineData.totalMined * mineData.trend2USDT}
                        decimals={mineData.totalMined > 0 ? 4 : 0}
                        duration={0.5}
                      />{' '}
                      $
                    </ContentText>
                  )}
                </div>
              </div>
            </Box>
            <Box>
              <div>
                <ContentText style={{ fontSize: '18px', fontWeight: 600 }}>Claimed Trend</ContentText>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: isMobile ? '5px' : '10px',
                    marginTop: '10px',
                  }}
                >
                  {!account ? (
                    <ContentText>0 TREND</ContentText>
                  ) : (
                    <ContentText>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={mineData.claimed}
                        decimals={mineData.claimed > 0 ? 4 : 0}
                        duration={0.5}
                      />{' '}
                      TREND
                    </ContentText>
                  )}
                  <Image src="/images/wallet.png" alt="" width={30} height={30} />
                  <Text fontSize='36px' lineHeight='0'>~</Text>
                  {!account ? (
                    <ContentText>0 $</ContentText>
                  ) : (
                    <ContentText>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={mineData.claimed * mineData.trend2USDT}
                        decimals={mineData.claimed > 0 ? 4 : 0}
                        duration={0.5}
                      />{' '}
                      $
                    </ContentText>
                  )}
                </div>
              </div>
            </Box> */}
            <Box>
              <div>
                <ContentText style={{ fontSize: '18px', fontWeight: 600 }}>Remained Trend (Locking)</ContentText>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: isMobile ? '5px' : '10px',
                    marginTop: '10px',
                  }}
                >
                  {!account ? (
                    <ContentText>0 TREND</ContentText>
                  ) : (
                    <ContentText>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={mineData.remain}
                        decimals={mineData.remain > 0 ? 4 : 0}
                        duration={0.5}
                      />{' '}
                      TREND
                    </ContentText>
                  )}
                  <Image src="/images/trendCoin.png" alt="" width={30} height={30} />
                  <Text fontSize="36px" lineHeight="0">
                    ~
                  </Text>
                  {!account ? (
                    <ContentText>$ 0</ContentText>
                  ) : (
                    <ContentText>
                      ${' '}
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={mineData.remain * mineData.trend2USDT}
                        decimals={mineData.remain > 0 ? 4 : 0}
                        duration={0.5}
                      />
                    </ContentText>
                  )}
                </div>
              </div>
            </Box>
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
                {' '}
                {!account ? (
                  <ContentText>0 TREND</ContentText>
                ) : (
                  <ContentText>
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={mineData.currentReward}
                      decimals={mineData.currentReward > 0 ? 4 : 0}
                      duration={0.5}
                    />{' '}
                    TREND
                  </ContentText>
                )}
                <Image src="/images/trendCoin.png" alt="" width={30} height={30} />
                <Text fontSize="36px" lineHeight="0">
                  ~
                </Text>
                {!account ? (
                  <ContentText>$ 0</ContentText>
                ) : (
                  <ContentText>
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
              <Button onClick={handleClick}>
                <ContentText
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22, color: '#4122FF' }}
                >
                  Claim
                </ContentText>
              </Button>
            </Box>
          </BoxContain>
          <BoxContain
            style={{
              height: '200px',
              background:
                'radial-gradient(101.36% 117.36% at 0% -2.74%, rgba(125, 128, 196, 0.6) 0%, rgba(136, 139, 224, 0.264) 100%)linear-gradient(0deg, rgba(245, 251, 242, 0.2), rgba(245, 251, 242, 0.2))',
            }}
          >
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ContentText>Trend on your wallet</ContentText>
              <div
                style={{ display: 'flex', flexDirection: 'row', gap: isMobile ? '5px' : '10px', alignItems: 'center' }}
              >
                {' '}
                {!account ? (
                  <ContentText>0 TREND</ContentText>
                ) : (
                  <ContentText>
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={Number(balance)}
                      decimals={Number(balance) > 0 ? 4 : 0}
                      duration={0.5}
                    />{' '}
                    TREND
                  </ContentText>
                )}
                <Image src="/images/trendCoin.png" alt="" width={30} height={30} />
                <Text fontSize="36px" lineHeight="0">
                  ~
                </Text>
                {!account ? (
                  <ContentText>0 $</ContentText>
                ) : (
                  <ContentText>
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={mineData.currentReward * mineData.trend2USDT}
                      decimals={mineData.currentReward > 0 ? 4 : 0}
                      duration={0.5}
                    />{' '}
                    $
                  </ContentText>
                )}
              </div>
              <Button onClick={handleSend}>
                <ContentText
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22, color: '#4122FF' }}
                >
                  Send
                </ContentText>
              </Button>
            </Box>
          </BoxContain>
        </Table>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Table style={{ width: isMobile ? '370px' : '600px', height: isMobile ? '400px' : '317px' }}>
            <Text
              fontFamily="Poppins, sans-serif"
              marginLeft="20px"
              fontWeight="700"
              fontSize={['18px', '22px', '32px']}
            >
              System
            </Text>
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
                    <span style={{ display: isMobile ? 'none' : 'block' }}>
                      <Image src="/images/trendCoin.png" alt="" width={30} height={30} />
                    </span>
                    <Text fontSize="36px" lineHeight={['16px', '16px', '24px']}>
                      ~
                    </Text>
                    <span>
                      <ContentText style={{ fontSize: isMobile ? '15px' : '25px' }}>$ 1,250</ContentText>
                    </span>
                  </ContentText>
                </Table>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <Table
                  style={{ width: '140px', height: '107px', display: 'flex', flexDirection: 'column', gap: '10px' }}
                >
                  <ContentText style={{ fontSize: '16px', fontWeight: '500', width: '100px' }}>1 TREND /</ContentText>
                  <ContentText style={{ fontSize: '25px' }}>$ 1.2</ContentText>
                </Table>
                <Table
                  style={{ width: '483px', height: '107px', display: 'flex', flexDirection: 'column', gap: '10px' }}
                >
                  <ContentText style={{ fontSize: '18px', fontWeight: '500' }}>Total Claimed TREND</ContentText>
                  <ContentText
                    style={{ display: 'flex', flexDirection: 'row', gap: '10px', fontSize: isMobile ? '15px' : '25px' }}
                  >
                    1,250 TREND{' '}
                    <span style={{ display: isMobile ? 'none' : 'block' }}>
                      <Image src="/images/trendCoin.png" alt="" width={30} height={30} />
                    </span>
                    <Text fontSize="36px" lineHeight={['16px', '16px', '24px']}>
                      ~
                    </Text>
                    <span>
                      <ContentText style={{ fontSize: isMobile ? '15px' : '25px' }}>$ 1,250</ContentText>
                    </span>
                  </ContentText>
                </Table>
              </div>
            </div>
          </Table>
          <Image src="/images/chart.png" alt="" width={isMobile ? 250 : 600} height={300} />
        </div>
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
