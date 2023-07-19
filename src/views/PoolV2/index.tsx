import { Button, Flex, LinkExternal, Text, useMatchBreakpoints, useToast } from '@pancakeswap/uikit'
import PageHeader from 'components/PageHeader'
import styled from 'styled-components'
import images from 'configs/images'
import contracts from 'config/constants/contracts'
import { getPoolsContract, getPoolsV2Contract, getPoolsV3Contract } from 'utils/contractHelpers'
import { getBlockExploreLink } from 'utils'
import { trendyColors } from 'style/trendyTheme'
import { useBalance, useSigner } from 'wagmi'
import CountUp from 'react-countup'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'
import { ToastDescriptionWithTx } from 'components/Toast'
import useConfirmTransaction from 'hooks/useConfirmTransaction'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { usePoolsContract, usePoolsV2Contract, usePoolsV3Contract } from 'hooks/useContract'
import { PageMeta } from 'components/Layout/Page'
import { isMobile } from 'react-device-detect'
import { useState, useEffect } from 'react'
import { formatBigNumber } from 'utils/formatBalance'
import { poolBaseUrlV2 } from 'views/PoolV2/components/PoolDetailsV2/constants'
import Link from 'next/link'
import { formatEther } from '@ethersproject/units'
import { shortenURL, timeDisplayLong } from './util'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { ChainId, NATIVE } from '../../../packages/swap-sdk/src/constants'
import Rank from './components/Rank'
import moment from 'moment'
import { arrayify } from '@ethersproject/bytes'

// ============= STYLED
const Container = styled.div`
background:var(--bg-1, linear-gradient(90deg, #9E86FF 0%, #2B0864 100%));
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-1, linear-gradient(90deg, #9E86FF 0%, #2B0864 100%));
  * {
    font-family: "Helvetica Compressed";
  }
  @media screen and (max-width: 1024px) {
    background: none;
    background: linear-gradient(90deg, #9E86FF 0%, #2B0864 100%);
  }
  @media screen and (max-width: 600px) {
    background: none;
    background: linear-gradient(90deg, #9E86FF 0%, #2B0864 100%);
    padding: 20px 0
  }
  .header {
    width: 1000px;
    @media screen and (max-width: 1024px) {
      width: 95%
    }
    @media screen and (max-width: 800px) {
      width: 95%
    }
  }
  width: 100%;
  .fee {
    @media screen and (min-width: 600px ) {
      font-size: 36px;
    }
    {
      @media screen and (min-width: 1024px ) {
        font-size: 48px;
      }
  }
`
const Body = styled.div`
  background: none;
  padding: 20px;
  @media screen and (max-width: 575px) {
    padding: 15px;
  }
`
const PoolsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-items: center;
  grid-column-gap: 40px;
  grid-row-gap: 40px;
  align-items: stretch;
  justify-content: center;
  @media screen and (max-width: 720px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`
const ThreeDots = styled.p`
  color: #6216b0;
  @keyframes blinkdot {
    0% {
      opacity: 0.2;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
  &.loading span {
    animation-name: blinkdot;
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }
  &.loading span:nth-child(2) {
    animation-delay: 0.2s;
  }
  &.loading span:nth-child(3) {
    animation-delay: 0.4s;
  }
`

// ============= ARRAY
const pools = [
  {
    key: 0,
    name: 'MATIC',
    tagColor: trendyColors.MAIN_GREEN,
    totalLock: '',
    logo: images.logoMatic,
  },
  {
    key: 1,
    name: 'MATIC',
    tagColor: trendyColors.MAIN_GREEN,
    totalLock: '',
    logo: images.logoMatic,
  },
  {
    key: 2,
    name: 'MATIC',
    tagColor: trendyColors.MAIN_GREEN,
    totalLock: '',
    logo: images.logoMatic,
  },
  {
    key: 3,
    name: 'MATIC',
    tagColor: trendyColors.MAIN_GREEN,
    totalLock: '',
    logo: images.logoMatic,
  },
  {
    key: 4,
    name: 'MATIC',
    tagColor: trendyColors.MAIN_GREEN,
    totalLock: '',
    logo: images.logoMatic,
  },
  {
    key: 5,
    name: 'MATIC',
    tagColor: trendyColors.MAIN_GREEN,
    totalLock: '',
    logo: images.logoMatic,
  },
]

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  width: 480px;
  height: auto;
  border-radius: 15px;
  padding: 20px;
  @media screen and (max-width: 1300px) {
    width: 100%;
    height: auto;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    height: auto;
  }
  @media screen and (max-width: 575px) {
    width: 100%;
    padding: 15px;
  }
  @media screen and (max-width: 825px) {
    padding: 10px;
  }
  @media screen and (max-width: 375px) {
    width: 100%;
    padding: 10px;
  }
  @media screen and (max-width: 320px) {
    width: 100%;
    padding: 10px;
  }
`
const LogoAndName = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  height: 100%;
  align-items: center;
  span {
    font-size: 40px;
    line-height: 48px;
    font-style: normal;
    color: #ffffff;
    font-weight: 700;
    font-family: 'Helvetica Compressed';
  }
  @media screen and (max-width: 1024px) {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  @media screen and (max-width: 800px) {
    span {
      font-size: 24px;
    }
  }
`
const Info = styled.div`
  width: 100%;
`
const Reward = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  padding: 10px 20px;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    padding: 10px 0;
  }
`
const Time = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px 0;
`
const Line = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  span {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: rgba(238, 238, 238, 1);
  }
  &.commission {
    justify-content: center;
    margin: 5px 0 10px;
  }
  @media screen and (max-width: 1024px) {
    span {
      font-size: 15px;
    }
  }
  @media screen and (max-width: 852px) {
    span {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 720px) {
    span {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 380px) {
    span {
      font-size: 12px;
    }
  }
  .value {
    @media screen and (max-width: 575px) {
      font-size: 16px;
    }
    @media screen and (min-width: 600px) {
      font-size: 24px;
    }
  }
`

const TitelandIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(221, 221, 223, 1);
  .label {
    font-size: 16px;
    font-weight: 400;
    @media screen and (max-width: 825px) {
      font-size: 14px;
    }
  }
  @media screen and (min-width: 601px) and (max-width: 768px) {
    gap: 5px;
  }
`
const LinkReffer = styled.a`
  margin-left: 6px;
  text-decoration: underline;
  color: #00f0e1;
`
const Lineleft = styled.div``
const Lineright = styled.div``
const LineText = styled.div`
  text-align: center;
  background: radial-gradient(
    131.77% 143.25% at -0% -2.74%,
    rgba(173, 175, 224, 0.6) 0%,
    rgba(136, 139, 224, 0.26) 100%
  );
  backdrop-filter: blur(50px);
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  display: flex;
  margin: 20px 100px;
  @media screen and (max-width: 600px) {
    margin: 20px 0;
  }
  border-radius: 15px;
`

export const getRankImage = (index) => {
  let obj = {
    img: '',
    title: '',
  }
  switch (index) {
    case 0:
      obj.img = '/images/poolsV2/bronze.svg?t=1'
      obj.title = 'Bronze'
      break
    case 1:
      obj.img = '/images/poolsV2/silver.svg?t=1'
      obj.title = 'Silver'
      break
    // case 2:
    //   obj.img = '/images/poolsV2/gold.svg?t=1'
    //   obj.title = 'Gold'
    //   break
    // case 3:
    //   obj.img = '/images/poolsV2/titanium.svg?t=1'
    //   obj.title = 'Titanium'
    //   break
    // case 4:
    //   obj.img = '/images/poolsV2/platinum.svg?t=1'
    //   obj.title = 'Platinum'
    //   break
    // case 5:
    //   obj.img = '/images/poolsV2/diamond.svg?t=1'
    //   obj.title = 'Diamond'
    //   break
    default:
      break
  }
  return obj
}
// STYLED
const MinMax = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`
const LineStake = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: rgba(238, 238, 238, 1);
  }
  &.commission {
    justify-content: center;
    margin: 5px 0 10px;
  }
  @media screen and (max-width: 1024px) {
    span {
      font-size: 15px;
    }
  }
  @media screen and (max-width: 852px) {
    span {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 720px) {
    span {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 380px) {
    span {
      font-size: 12px;
    }
    .label {
      font-size: 12px;
    }
  }
`
const Icon = styled.img`
  width: 16px;
`
const Logo = styled.img`
  width: 80px;
  @media screen and (max-width: 380px) {
    width: 50px;
  }
  @media screen and (max-width: 825px) {
    width: 60px;
  }
`
const PoolsReward = styled.div`
  background: radial-gradient(
    131.77% 143.25% at -0% -2.74%,
    rgba(125, 128, 195, 0.6) 0%,
    rgba(136, 139, 224, 0.26) 100%
  );
  backdrop-filter: blur(50px);
  width: 1000px;
  padding: 0 10px;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  border-radius: 15px;
`

const Loading = styled.div`
  display: flex;
`
const ImageMine = styled.img`
  position: absolute;
  top: 0;
  right: 0;
`
const Background = styled.div`
  background: url(${images.mask}) no-repeat;
  background-size: contain;
  background-position: top;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const PoolsV2 = () => {
  const { account, chainId } = useActiveWeb3React()
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const getPoolV3Contract = getPoolsV3Contract(CHAIN_ID)
  const [arr, setArr] = useState([])
  const [remainCommission, setRemainCommission] = useState(0)
  const [commission, setCommission] = useState(0)
  const [commission2, setCommission2] = useState(0)
  const [isClaimableCommission, setIsClaimableCommission] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const poolContract = usePoolsV3Contract()
  const [ranks, setRanks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [rateBnbUsd, setRateBnbUsd] = useState(1)
  const [rankLoading, setRankLoading] = useState(true)

  const [userRank, setUserRank] = useState({
    rank: 0,
    image: '',
    locked: 0,
    volumnOnTree: 0,
    direct: 0,
    downline: 0,
  })
  const [userClaimed, setUserClaimed] = useState(false)
  const { isConfirming, handleConfirm } = useConfirmTransaction({
    onConfirm: () => {
      return callWithMarketGasPrice(commission > 0 && poolContract, 'claimComm', [account])
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess('Claim commission successfully !', <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onSuccess()
    },
  })
  const indexRank = [1, 2, 3, 4, 5]
  const { isMobile } = useMatchBreakpoints()

  const getCommission = async () => {
    if (account) {
      const comm = await getPoolV3Contract.remainComm(account)
      // const comm2 = await getPoolV2Contract.remainComm(account)
      setCommission(Number(formatEther(comm)))
      // setCommission2(Number(formatEther(comm2)))
      const commRemain = Number(formatEther(comm))
      setRemainCommission(commRemain)
      setIsClaimableCommission(commRemain > 0)
    } else {
      setRemainCommission(0)
    }
  }

  const getLinkReferral = () => {
    if (!account) {
      return null
    }
    const param = window.location.origin
    let linkRef = `${param}/referral`
    return linkRef
  }
  const getPools = async (ids: number[]) => {
    try {
      const bnbPrice = await getPoolV3Contract.MATIC2USDT()
      const pools = ids.map((item) => getPoolV3Contract.pools(item))
      await getInfoRank(Number(formatEther(bnbPrice)))
      // await getInfoRank()
      setRateBnbUsd(Number(formatEther(bnbPrice)))
      // console.log(Promise.all([pools[0]]))
      if (!account) {
        const newPoolInfo = await Promise.all(
          pools.map(async (items) => {
            const arr = await Promise.all([items])
            return {
              currentInterest: ((Number(arr[0].currentInterest.toString()) / 10000) * 365).toFixed(2),
              enable: arr[0].enable,
              maxLock: formatEther(arr[0].maxLock),
              minLock: formatEther(arr[0].minLock),
              timeLock: 1095,
              totalLock: formatEther(arr[0].totalLock),
              rateBNB2USD: Number(formatEther(bnbPrice)),
              yourLock: 0,
              currentInterestWithMine: ((Number(arr[0].currentInterestWithMine.toString()) / 10000) * 365).toFixed(2),
            }
          }),
        )
        setArr(newPoolInfo)
        setIsLoading(false)
      } else {
        const newPoolInfo = await Promise.all(
          pools.map(async (item, id) => {
            const userLockAndPool = await Promise.all([getPoolV3Contract.users(account, id), item])
            return {
              currentInterest: ((Number(userLockAndPool[1].currentInterest.toString()) / 10000) * 365).toFixed(2),
              enable: userLockAndPool[1].enable,
              maxLock: formatEther(userLockAndPool[1].maxLock),
              minLock: formatEther(userLockAndPool[1].minLock),
              timeLock: 1095,
              totalLock: formatEther(userLockAndPool[1].totalLock),
              rateBNB2USD: Number(formatEther(bnbPrice)),
              yourLock: Number(formatEther(userLockAndPool[0].totalLock)),
              currentInterestWithMine: (
                (Number(userLockAndPool[1].currentInterestWithMine.toString()) / 10000) *
                365
              ).toFixed(2),
            }
          }),
        )
        setArr(newPoolInfo)
        setIsLoading(false)
      }
    } catch (e) {
      console.log('error', e)
    }
  }
  const getInfoRank = async (rateBnbUsd) => {
    if (!rateBnbUsd) {
      setIsLoading(true)
    } else {
      const months = await getPoolV3Contract.getMonths()
      const infoRank = await Promise.all([
        getPoolV3Contract.userRank(account),
        getPoolV3Contract.userRankRewardClaimed(account, Number(months.toString())),
        getPoolV3Contract.getUserTotalLock(account),
        getPoolV3Contract.getVolumeOnTre(account),
        getPoolV3Contract.getChildren(account),
      ])

      const arr = await Promise.all(
        indexRank.map(async (item) => {
          const rank = await getPoolV3Contract.rankRewards(item)

          return {
            image: getRankImage(item).img,
            title: getRankImage(item).title,
            currentReward: formatEther(rank.remainInMonth.toString()),
            total: Number(Number(formatEther(rank.total)) * rateBnbUsd).toFixed(3),
            min: Number(Number(formatEther(rank.total)) * rateBnbUsd).toFixed(3),
            max: Number(formatEther(rank.minStart)),
            member: rank.totalMember.toString(),
            yourReward:
              Number(formatEther(rank.rewardInMonth.toString())) && Number(rank.totalMember.toString())
                ? Number(formatEther(rank.rewardInMonth.toString())) / Number(rank.totalMember.toString())
                : 0,
          }
        }),
      )
      setUserRank({
        ...userRank,
        rank: Number(infoRank[0]),
        image: getRankImage(Number(infoRank[0])).img,
        locked: Number(Number(formatEther(infoRank[2])).toFixed(3)),
        volumnOnTree: Number(Number(formatEther(infoRank[3])).toFixed(3)),
        direct: Number(infoRank[4].direct),
        downline: Number(infoRank[4].downLine),
      })
      await setRanks(arr)
      setUserClaimed(infoRank[1])
    }
  }
  // BALANCE
  const { data, isFetched } = useBalance({
    addressOrName: contracts.poolsV3[CHAIN_ID],
  })
  // console.log(contracts.poolsV3[CHAIN_ID])
  // console.log(data , isFetched);

  // const { data: data2, isFetched: isFetched2 } = useBalance({
  //   addressOrName: contracts.poolsV2[CHAIN_ID],
  // })

  const balance = isFetched && data && data.value ? formatBigNumber(data.value, 6) : 0
  const unit = NATIVE[chainId].symbol

  const onSuccess = () => {
    getCommission()
  }

  const onSuccessRank = () => {
    getInfoRank(rateBnbUsd)
  }
  useEffect(() => {
    getCommission()
    getPools([0, 1, 2, 3, 4, 5])
  }, [account])

  const [countDown, setCountDown] = useState(1679997600 - moment().unix())
  useEffect(() => {
    const timerId = setInterval(() => {
      setCountDown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [countDown])

  return (
    <Container style={{ backgroundColor: 'var(--bg-1, linear-gradient(90deg, #9E86FF 0%, #2B0864 100%))' }}>
      <Background>
        <PageMeta />
        {isLoading === true ? (
          <TrendyPageLoader />
        ) : (
          <>
            {!isMobile && (
              <PageHeader
                className="header"
                marginTop="30px"
                style={{
                  borderRadius: '15px',
                  border: '1px solid rgba(245, 251, 242, 0.20)',
                  background:
                    'radial-gradient(131.77% 143.25% at -0.00% -2.74%, rgba(125, 128, 195, 0.60) 0%, rgba(136, 139, 224, 0.26) 100%)',
                  backdropFilter: 'blur(50px)',
                }}
              >
                <Flex width="100%" flex="1" flexDirection="column" mr={['8px', 0]} alignItems="center">
                  <div style={{ width: '250px', display: 'flex', justifyContent: 'flex-start', marginBottom: '30px' }}>
                    <Text
                      fontSize={['22px', '22px', '24px', '24px', '24px', '24px']}
                      fontWeight="600"
                      style={{ color: 'rgba(253, 253, 253, 1)', textAlign: 'center' }}
                    >
                      Total Lock:{' '}
                    </Text>
                  </div>
                  <Flex
                    width="100%"
                    flex="1"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{ gap: '24px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                      {
                        <CountUp
                          separator=","
                          start={0}
                          preserveValue
                          delay={0}
                          end={Number(balance) * rateBnbUsd}
                          decimals={2}
                          duration={0.5}
                          className="fee"
                          style={{ color: 'rgba(250, 255, 73, 1)', fontWeight: 700 }}
                        />
                      }
                      <Text fontSize="32px" lineHeight="1.1">
                        $
                      </Text>
                    </div>
                    <div
                      style={{
                        background: 'rgba(240, 238, 238, 1)',
                        border: '2px solid rgba(240, 238, 238, 1)',
                        width: '37px',
                        borderRadius: '20px',
                      }}
                    ></div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                      {
                        <CountUp
                          separator=","
                          start={0}
                          preserveValue
                          delay={0}
                          end={Number(balance)}
                          decimals={4}
                          duration={0.5}
                          className="fee"
                          style={{ color: 'rgba(107, 255, 228, 1)', fontWeight: 700 }}
                        />
                      }
                      <Text fontSize="32px" color="rgba(250, 250, 250, 1)" lineHeight="1.25">
                        {unit}
                      </Text>
                    </div>
                  </Flex>
                </Flex>
              </PageHeader>
            )}

            {isMobile && (
              <PageHeader
                style={{
                  borderRadius: '15px',
                  width: '90%',
                  border: '1px solid rgba(245, 251, 242, 0.20)',
                  background:
                    'radial-gradient(131.77% 143.25% at -0.00% -2.74%, rgba(125, 128, 195, 0.60) 0%, rgba(136, 139, 224, 0.26) 100%)',
                  backdropFilter: 'blur(50px)',
                }}
              >
                <Flex style={{ gap: '10px' }} flex="1" flexDirection="column" mr={['8px', 0]} alignItems="center">
                  <Text
                    fontSize={['22px', '22px', '36px', '40px', '50px', '60px']}
                    fontWeight="500"
                    style={{ color: '#FDFDFD', textAlign: 'center' }}
                  >
                    Total Lock:{' '}
                    {
                      <CountUp
                        separator=","
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(balance) * rateBnbUsd}
                        decimals={2}
                        duration={0.5}
                        style={{ color: 'rgba(250, 255, 73, 1)', fontWeight: 700, margin: '0 5px' }}
                      />
                    }
                    {'$ ~ '}
                    {
                      <CountUp
                        separator=","
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(balance)}
                        decimals={4}
                        duration={0.5}
                        style={{ color: 'rgba(107, 255, 228, 1)', fontWeight: 700, margin: '0 5px' }}
                      />
                    }
                    {unit}
                  </Text>
                </Flex>
              </PageHeader>
            )}
            <Body>
              <PoolsList>
                {arr.map((i, r) => {
                  return (
                    <Card
                      key={r}
                      style={{
                        background:
                          'radial-gradient(131.77% 143.25% at -0.00% -2.74%, rgba(125, 128, 195, 0.60) 0%, rgba(136, 139, 224, 0.26) 100%)',
                        backdropFilter: 'blur(50px)',
                      }}
                    >
                      {r === 0 ? null : <ImageMine src="./images/Mine.png" />}
                      <LogoAndName>
                        <Logo src={images.iconpoolsV2} alt="logo" />
                        <MinMax>
                          <span>{unit}</span>
                          <LineStake>
                            <TitelandIcon>
                              <span className="label">Min Stake : </span>
                            </TitelandIcon>
                            <span
                              className="value"
                              style={{
                                color: '#E4E6E7',
                                display: 'flex',
                                flexWrap: 'wrap',
                              }}
                            >
                              &ensp;
                              {
                                <CountUp
                                  separator=","
                                  style={{ color: '#E4E6E7' }}
                                  start={0}
                                  preserveValue
                                  delay={0}
                                  end={Number(i.minLock)}
                                  decimals={0}
                                  duration={1}
                                />
                              }
                              $ {` ~`}&ensp;
                              {
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <CountUp
                                    separator=","
                                    style={{ color: 'rgba(228, 230, 231, 1)' }}
                                    start={0}
                                    preserveValue
                                    delay={0}
                                    end={i.minLock / i.rateBNB2USD}
                                    decimals={4}
                                    duration={1}
                                  />
                                  <Icon src={images.iconpoolsV2} alt="" />
                                </div>
                              }{' '}
                            </span>
                          </LineStake>
                          <LineStake>
                            <TitelandIcon>
                              <span className="label">Max Stake : </span>
                            </TitelandIcon>
                            <span
                              className="value"
                              style={{
                                color: 'rgba(228, 230, 231, 1)',
                                display: 'flex',
                                flexWrap: 'wrap',
                              }}
                            >
                              &ensp;
                              {
                                <CountUp
                                  separator=","
                                  style={{ color: 'rgba(228, 230, 231, 1)' }}
                                  start={0}
                                  preserveValue
                                  delay={0}
                                  end={Number(i.maxLock)}
                                  decimals={0}
                                  duration={1}
                                />
                              }
                              $ {` ~ `}&ensp;
                              {
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <CountUp
                                    separator=","
                                    style={{ color: 'rgba(228, 230, 231, 1)' }}
                                    start={0}
                                    preserveValue
                                    delay={0}
                                    end={i.maxLock / i.rateBNB2USD}
                                    decimals={4}
                                    duration={1}
                                  />
                                  <Icon src={images.iconpoolsV2} alt="" width="16px" />
                                </div>
                              }{' '}
                            </span>
                          </LineStake>
                        </MinMax>
                      </LogoAndName>
                      <Info>
                        <Reward>
                          <Lineleft>
                            <Line style={{ height: '70px' }}>
                              <span style={{ fontWeight: 400, fontSize: 14 }}>Interest</span>
                              <Text
                                style={{
                                  color: 'rgba(228, 230, 231, 1)',
                                  marginBottom: 10,
                                }}
                                fontSize={['16px, 24px']}
                                className="value"
                              >
                                {
                                  <CountUp
                                    start={0}
                                    preserveValue
                                    delay={0}
                                    end={Number(i.currentInterest)}
                                    decimals={2}
                                    duration={1}
                                    className="value"
                                    style={{
                                      borderRadius: '4px',
                                      color: 'rgba(228, 230, 231, 1)',
                                    }}
                                  />
                                }{' '}
                                %
                              </Text>
                            </Line>
                            <Line style={{ height: '70px' }}>
                              <span style={{ fontWeight: 400, fontSize: 14 }}>Interest With Mine</span>
                              <Text
                                style={{
                                  color: 'rgba(228, 230, 231, 1)',
                                  marginBottom: 10,
                                }}
                                fontSize={['16px, 24px']}
                                className="value"
                              >
                                {
                                  <CountUp
                                    start={0}
                                    preserveValue
                                    delay={0}
                                    end={Number(i.currentInterestWithMine)}
                                    decimals={2}
                                    duration={1}
                                    className="value"
                                    style={{
                                      borderRadius: '4px',
                                      color: 'rgba(228, 230, 231, 1)',
                                    }}
                                  />
                                }{' '}
                                %
                              </Text>
                            </Line>
                            <Line>
                              <TitelandIcon>
                                <span className="label">Total Lock</span>
                              </TitelandIcon>

                              <TitelandIcon>
                                <span
                                  style={{
                                    color: 'rgba(228, 230, 231, 1)',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 10,
                                  }}
                                >
                                  {
                                    <CountUp
                                      separator=","
                                      start={0}
                                      preserveValue
                                      delay={0}
                                      end={Number(i.totalLock * i.rateBNB2USD)}
                                      decimals={2}
                                      duration={1}
                                      className="value"
                                      style={{
                                        color: 'rgba(228, 230, 231, 1)',
                                      }}
                                    />
                                  }
                                  $ {` ~ `}&ensp;
                                  {
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                      <CountUp
                                        separator=","
                                        start={0}
                                        preserveValue
                                        delay={0}
                                        end={Number(i.totalLock)}
                                        decimals={4}
                                        duration={1}
                                        className="value"
                                        style={{
                                          color: 'rgba(228, 230, 231, 1)',
                                        }}
                                      />
                                      <img src={images.iconpoolsV2} alt="" width="16px" />
                                    </div>
                                  }
                                  {` `}
                                </span>
                              </TitelandIcon>
                            </Line>
                          </Lineleft>
                          <Lineright>
                            <Line style={{ height: '70px' }}>
                              <span style={{ fontWeight: 400, fontSize: 14 }}>Time Lock</span>
                              <span
                                style={{
                                  color: 'rgba(228, 230, 231, 1)',
                                  marginBottom: 10,
                                }}
                                className="value"
                              >
                                {timeDisplayLong(i.timeLock) ? timeDisplayLong(i.timeLock * 57600) : '0'}
                              </span>
                            </Line>
                            <Line>
                              <TitelandIcon>
                                <span className="label">Your Lock</span>
                              </TitelandIcon>

                              <TitelandIcon>
                                <span
                                  style={{
                                    color: 'rgba(228, 230, 231, 1)',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 10,
                                  }}
                                >
                                  {
                                    <CountUp
                                      separator=","
                                      start={0}
                                      preserveValue
                                      delay={0}
                                      end={Number(i.yourLock * i.rateBNB2USD)}
                                      decimals={2}
                                      duration={1}
                                      className="value"
                                      style={{
                                        color: 'rgba(228, 230, 231, 1)',
                                      }}
                                    />
                                  }
                                  $ {` ~ `}&ensp;
                                  {
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                      <CountUp
                                        separator=","
                                        start={0}
                                        preserveValue
                                        delay={0}
                                        end={Number(i.yourLock)}
                                        decimals={4}
                                        duration={1}
                                        className="value"
                                        style={{
                                          color: 'rgba(228, 230, 231, 1)',
                                        }}
                                      />
                                      <img src={images.iconpoolsV2} alt="" width="16px" />
                                    </div>
                                  }
                                  {` `}
                                </span>
                              </TitelandIcon>
                            </Line>
                          </Lineright>
                        </Reward>
                        <Time></Time>
                      </Info>
                      <Link href={`${poolBaseUrlV2}/${r}?chainId=${CHAIN_ID}`}>
                        {isMobile ? (
                          <Button
                            style={{
                              color: 'rgba(243, 243, 243, 1)',
                              borderRadius: '15px',
                              border: '1px solid rgba(245, 251, 242, 0.20)',
                              background:
                                'radial-gradient(157.74% 210.61% at 0.00% 0.00%, rgba(192, 240, 255, 0.80) 0%, rgba(159, 169, 213, 0.29) 87.18%, rgba(2, 0, 98, 0.00) 100%)',
                              backdropFilter: 'blur(50px)',
                            }}
                            variant="primary"
                            width={'180px'}
                            padding="1em"
                            scale="sm"
                            marginBottom="20px"
                          >
                            Detail
                          </Button>
                        ) : (
                          <Button
                            style={{
                              color: 'rgba(243, 243, 243, 1)',
                              borderRadius: '15px',
                              border: '1px solid rgba(245, 251, 242, 0.20)',
                              background:
                                'radial-gradient(157.74% 210.61% at 0.00% 0.00%, rgba(192, 240, 255, 0.80) 0%, rgba(159, 169, 213, 0.29) 87.18%, rgba(2, 0, 98, 0.00) 100%)',
                              backdropFilter: 'blur(50px)',
                            }}
                            variant="primary"
                            width={'180px'}
                            padding="1em"
                            scale="md"
                          >
                            Detail
                          </Button>
                        )}
                      </Link>
                    </Card>
                  )
                })}
              </PoolsList>
            </Body>

            <PageHeader background="none">
              <Flex flex="1" flexDirection="column" mr={['8px', 0]} alignItems="center">
                <PoolsReward>
                  <Text fontSize={['24px', '36px', '48px']} fontWeight="500" textAlign="center">
                    Pool Rewards
                  </Text>
                  <Text
                    fontSize={['14px', '14px', '16px', '16px', '16px', '16px']}
                    fontWeight="600"
                    style={{ color: '#C5C5C5', maxWidth: 1000, margin: '10px 0', textAlign: 'center' }}
                  >
                    These Pool Rewards are only for Referral. Let invite your friends and get our rewards
                    <LinkReffer href={getLinkReferral()}>[LINK]</LinkReffer>
                  </Text>
                  <LineText className="commission">
                    <Text
                      fontSize={['14px', '16px', '18px', '24px', '26px']}
                      className="value"
                      style={{ color: 'rgba(103, 228, 255, 1)', fontFamily: 'Poppins, sans-serif', fontWeight: '700' }}
                    >
                      Your Commission: {remainCommission.toFixed(6)} {unit}
                    </Text>
                    <Text style={{ color: '#C5C5C5' }} ellipsis={true}>
                      <LinkExternal
                        fontSize={['14px', '16px', '18px', '20px', '22px']}
                        href={getBlockExploreLink(contracts.poolsV3[CHAIN_ID], 'address', CHAIN_ID)}
                        ellipsis={true}
                        style={{ color: 'rgba(249, 249, 249, 1)' }}
                        color="#00F0E1"
                      >
                        {shortenURL(`Root Contract: ${contracts.poolsV3[CHAIN_ID]}`, 35)}
                      </LinkExternal>
                    </Text>
                  </LineText>
                </PoolsReward>
                {!account ? null : (
                  <Rank
                    unit={unit}
                    ranks={ranks}
                    userRank={userRank}
                    onSuccess={onSuccessRank}
                    userIsClaim={userClaimed}
                  />
                )}
              </Flex>
            </PageHeader>
          </>
        )}
      </Background>
    </Container>
  )
}
export default PoolsV2
