import { Button, Flex, LinkExternal, Text, useToast } from '@pancakeswap/uikit'
import PageHeader from 'components/PageHeader'
import styled from 'styled-components'
import images from 'configs/images'
import contracts from 'config/constants/contracts'
import { getContract, getPoolsContract } from 'utils/contractHelpers'
import { getBlockExploreLink } from 'utils'
import { trendyColors } from 'style/trendyTheme'
import { useBalance, useSigner } from 'wagmi'
import { setRateType } from 'state/limitOrders/actions'
import CountUp from 'react-countup'
import CircleLoader from 'components/Loader/CircleLoader'
import Dots from 'components/Loader/Dots'
import PageLoader from 'components/Loader/PageLoader'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'
import { ToastDescriptionWithTx } from 'components/Toast'
import useConfirmTransaction from 'hooks/useConfirmTransaction'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { usePoolsContract } from 'hooks/useContract'
import { PageMeta } from 'components/Layout/Page'
import { isMobile } from 'react-device-detect'
import { useState, useEffect } from 'react'
import { formatBigNumber } from 'utils/formatBalance'
import { poolBaseUrl } from 'views/Pools/constants'
import Link from 'next/link'
import { formatEther } from '@ethersproject/units'
import { bnb2Usd, shortenURL, timeDisplayLong, timeDisplay } from './util'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { ChainId, NATIVE } from '../../../packages/swap-sdk/src/constants'
import Rank from './components/Rank'
import numeral from 'numeral'
import refferalAbi from 'config/abi/refferal.json'
import moment from 'moment'
import CountDown from 'views/HomePage1/components/CountDown'

// ============= STYLED
const Container = styled.div`
  background: url(${images.backgroundpool}) #1e1e1e no-repeat;
  background-size: contain;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  * {
    font-family: Helvetica, sans-serif;
  }
  @media screen and (max-width: 1024px) {
    background: none;
    background-color: #1e1e1e;
  }
  @media screen and (max-width: 600px) {
    background: none;
    background-color: #1e1e1e;
  }
  width: 100%;
`
const Body = styled.div`
  background: none;
  padding: 20px;
  @media screen and (max-width: 575px) {
    padding: 10px;
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

  // {
  //   key: 6,
  //   name: "BUSD",
  //   totalReward: "100,000,000",
  //   rewardPerFlag: "10,000",
  //   timeEnd: "24:00:00",
  //   logo: images.logoBusd,
  //   backgroundColor: "180deg, #F3DDA8 0%, #FFAE3D 100%",
  // },
  // {
  //   key: 7,
  //   name: "BTC",
  //   totalReward: "100,000,000",
  //   rewardPerFlag: "10,000",
  //   timeEnd: "24:00:00",
  //   logo: images.logoBtc,
  //   backgroundColor: "180deg, #F9BAAD 0%, #EF7752 100%",
  // },
]

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  width: 480px;
  height: auto;
  border-radius: 20px;
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
  @media screen and (max-width: 375px) {
    width: 100%;
  }
`
const LogoAndName = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 150px;
  width: 100%;
  height: 100%;
  align-items: center;
  span {
    font-size: 40px;
    line-height: 48px;
    font-style: normal;
    color: #ffffff;
    font-weight: 700;
    font-family: Helvetica, sans-serif;
  }
  img {
    width: 80px;
  }
  @media screen and (max-width: 1024px) {
    display: flex;
    gap: 0px;
    justify-content: space-between;
    img {
      width: 70px;
    }
  }
  @media screen and (max-width: 800px) {
    img {
      width: 50px;
    }
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
`
const TitelandIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .label {
    font-weight: 400;
    font-size: 14px;
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
`

export const getRankImage = (index) => {
  let obj = {
    img: '',
    title: '',
  }
  switch (index) {
    case 0:
      obj.img = '/images/pools/bronze.svg'
      obj.title = 'Bronze'
      break
    case 1:
      obj.img = '/images/pools/silver.svg'
      obj.title = 'Silver'
      break
    case 2:
      obj.img = '/images/pools/gold.svg'
      obj.title = 'Gold'
      break
    case 3:
      obj.img = '/images/pools/titanium.svg'
      obj.title = 'Titanium'
      break
    case 4:
      obj.img = '/images/pools/platinum.svg'
      obj.title = 'Platinum'
      break
    case 5:
      obj.img = '/images/pools/diamond.svg'
      obj.title = 'Diamond'
      break
    default:
      break
  }
  return obj
}
// STYLED

const Pools = () => {
  const { account, chainId } = useActiveWeb3React()
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const getPoolContract = getPoolsContract(CHAIN_ID)
  const [arr, setArr] = useState([])
  const [remainCommission, setRemainCommission] = useState(0)
  const [isClaimableCommission, setIsClaimableCommission] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const poolContract = usePoolsContract()
  const [userRegister, setUserRegister] = useState(false)
  const { data: signer } = useSigner()
  const [ranks, setRanks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [rateBnbUsd, setRateBnbUsd] = useState(1)
  const [userRank, setUserRank] = useState(0)
  const refferCT = getContract({ address: contracts.refferal[CHAIN_ID], abi: refferalAbi, chainId: CHAIN_ID, signer })
  const [userClaimed, setUserClaimed] = useState(false)
  const { isConfirming, handleConfirm } = useConfirmTransaction({
    onConfirm: () => {
      return callWithMarketGasPrice(poolContract, 'claimComm', [account])
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess('Claim commission successfully !', <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onSuccess()
    },
  })
  const indexRank = [1, 2, 3, 4, 5]

  const getCommission = async () => {
    if (account) {
      const comm = await getPoolContract.remainComm(account)
      setRemainCommission(Number(formatEther(comm)))
      setIsClaimableCommission(comm > 0)
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

    // if (userRegister) {
    //   linkRef = `${param}?ref=${account}`
    // } else {
    //   linkRef = `${param}/referral`
    // }
    return linkRef
  }

  const getInfoRank = async (rateBNB2USD) => {
    const months = await getPoolContract.getMonths()

    const infoRank = await Promise.all([
      getPoolContract.userRank(account),
      getPoolContract.userRankRewardClaimed(account, Number(months.toString())),
    ])
    const arr = await Promise.all(
      indexRank.map(async (item) => {
        const rank = await getPoolContract.rankRewards(item)
        return {
          image: getRankImage(item).img,
          title: getRankImage(item).title,
          currentReward: formatEther(rank.remainInMonth.toString()),
          total: Number(Number(formatEther(rank.total)) * rateBNB2USD).toFixed(3),
          min: Number(Number(formatEther(rank.total)) * rateBNB2USD).toFixed(3),
          max: Number(formatEther(rank.minStart)),
          member: rank.totalMember.toString(),
          yourReward:
            Number(formatEther(rank.rewardInMonth.toString())) && Number(rank.totalMember.toString())
              ? Number(formatEther(rank.rewardInMonth.toString())) / Number(rank.totalMember.toString())
              : 0,
        }
      }),
    )
    setUserRank(Number(infoRank[0].toString()))
    setRanks(arr)
    setUserClaimed(infoRank[1])
  }

  const getPools = async (ids: number[]) => {
    try {
      const rateAndRegister = await Promise.all([getPoolContract.bnbPrice(), refferCT.isReferrer(account)])
      const pools = ids.map((item) => getPoolContract.pools(item))
      await getInfoRank(Number(formatEther(rateAndRegister[0][0])) / Number(formatEther(rateAndRegister[0][1])))

      setRateBnbUsd(Number(formatEther(rateAndRegister[0][0])) / Number(formatEther(rateAndRegister[0][1])))
      const newPoolInfo = await Promise.all(
        pools.map(async (item, id) => {
          const userLockAndPool = await Promise.all([getPoolContract.users(account, id), item])
          return {
            currentInterest: ((Number(userLockAndPool[1].currentInterest.toString()) / 10000) * 365).toFixed(2),
            enable: userLockAndPool[1].enable,
            maxLock: formatEther(userLockAndPool[1].maxLock),
            minLock: formatEther(userLockAndPool[1].minLock),
            timeLock: 1095,
            totalLock: formatEther(userLockAndPool[1].totalLock),
            rateBNB2USD: Number(formatEther(rateAndRegister[0][0])) / Number(formatEther(rateAndRegister[0][1])),
            yourLock: Number(formatEther(userLockAndPool[0].totalLock)),
          }
        }),
      )
      setUserRegister(rateAndRegister[1])
      setArr(newPoolInfo)
      setIsLoading(false)
    } catch (e) {
      console.log('error', e)
    }
  }

  // BALANCE
  const { data, isFetched } = useBalance({
    addressOrName: contracts.pools[CHAIN_ID],
  })
  const balance = isFetched && data && data.value ? formatBigNumber(data.value, 6) : 0
  const unit = NATIVE[chainId].symbol

  const onSuccess = () => {
    getCommission()
  }

  const onSuccessRank = () => {
    getInfoRank(rateBnbUsd)
  }
  useEffect(() => {
    if (!account) return
    getCommission()
    getPools([0, 1, 2, 3, 4, 5])
  }, [account])

  const [countDown, setCountDown] = useState(1679306400 - moment().unix())
  useEffect(() => {
    const timerId = setInterval(() => {
      setCountDown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [countDown])

  return (
    <Container>
      <PageMeta />
      {isLoading ? (
        <TrendyPageLoader />
      ) : (
        <>
          {countDown > 0 ? (
            <CountDown title="Wait for Certik report, [Beta version]" />
          ) : (
            <>
              <PageHeader background="none">
                <Flex flex="1" flexDirection="column" mr={['8px', 0]} alignItems="center">
                  <Rank ranks={ranks} userRank={userRank} onSuccess={onSuccessRank} userIsClaim={userClaimed} />
                  <Text
                    fontSize={['14px', '14px', '18px', '22px', '22px', '26px']}
                    fontWeight="600"
                    style={{ color: '#C5C5C5', textAlign: 'center', maxWidth: 700, margin: '30px 0' }}
                  >
                    These Pool Rewards are only for Referral. Let invite your friends and get our rewards
                    <LinkReffer href={getLinkReferral()}>[LINK]</LinkReffer>
                  </Text>
                  <Text
                    fontSize={['22px', '22px', '36px', '40px', '50px', '60px']}
                    fontWeight="600"
                    style={{ color: '#C5C5C5', textAlign: 'center' }}
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
                      />
                    }
                    {unit}
                  </Text>

                  <LineText className="commission">
                    <Text
                      fontSize={['14px', '16px', '18px', '24px', '26px']}
                      className="value"
                      style={{ color: '#C5C5C5' }}
                    >
                      Your Commission: {remainCommission.toFixed(6)} {unit}
                    </Text>
                  </LineText>
                  <Text style={{ color: '#C5C5C5' }} ellipsis={true}>
                    <LinkExternal
                      fontSize={['14px', '16px', '18px', '20px', '22px']}
                      href={getBlockExploreLink(contracts.pools[CHAIN_ID], 'address', CHAIN_ID)}
                      ellipsis={true}
                      style={{ color: '#00F0E1' }}
                      color="#00F0E1"
                    >
                      {shortenURL(`Contract: ${contracts.pools[CHAIN_ID]}`, 35)}
                    </LinkExternal>
                  </Text>
                  <Button
                    style={{ color: '#6216B0', backgroundColor: '#D9D9D9' }}
                    marginTop={'30px'}
                    ml={['6px', '1em']}
                    variant="primary"
                    width={['90px', '80px', '150px']}
                    p={['6px', '0 8px', '10px']}
                    scale="md"
                    display={isMobile ? 'none' : 'block'}
                    onClick={handleConfirm}
                    disabled={!isClaimableCommission}
                  >
                    {isConfirming ? (
                      <ThreeDots className="loading">
                        Claiming<span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </ThreeDots>
                    ) : (
                      'Claim'
                    )}
                  </Button>
                  <Button
                    style={{ color: '#6216B0', backgroundColor: '#D9D9D9' }}
                    marginTop={'30px'}
                    ml={['6px', '1em']}
                    variant="primary"
                    width={['90px', '80px', '150px']}
                    p={['6px', '0 8px', '10px']}
                    scale="sm"
                    display={isMobile ? 'block' : 'none'}
                    onClick={handleConfirm}
                    disabled={!isClaimableCommission}
                  >
                    {isConfirming ? (
                      <ThreeDots className="loading">
                        Claiming<span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </ThreeDots>
                    ) : (
                      'Claim'
                    )}
                  </Button>
                </Flex>
              </PageHeader>

              <Body>
                <PoolsList>
                  {arr.map((i, r) => {
                    return (
                      <Card
                        key={r}
                        style={{
                          background: `linear-gradient(153.15deg, #7C07D8 8.57%, rgba(129, 69, 255, 0.02) 100%)`,
                        }}
                      >
                        <LogoAndName>
                          <img src={`/images/chains/${chainId}.png`} alt="logo" />
                          <span>{unit}</span>
                        </LogoAndName>
                        <Info>
                          <Reward>
                            <Lineleft>
                              <Line>
                                <TitelandIcon>
                                  <span className="label">Min Stake</span>
                                </TitelandIcon>
                                <span
                                  className="value"
                                  style={{
                                    color: `${pools[r]?.tagColor}`,
                                    marginBottom: 10,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                  }}
                                >
                                  {
                                    <CountUp
                                      separator=","
                                      style={{ color: `${pools[r]?.tagColor}` }}
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
                                        style={{ color: `${pools[r]?.tagColor}` }}
                                        start={0}
                                        preserveValue
                                        delay={0}
                                        end={i.minLock / i.rateBNB2USD}
                                        decimals={4}
                                        duration={1}
                                      />
                                      <img src={`/images/chains/${chainId}.png`} alt="" width="16px" />
                                    </div>
                                  }{' '}
                                </span>
                              </Line>
                              <Line>
                                <span style={{ fontWeight: 400, fontSize: 14 }}>Interest</span>
                                <span
                                  style={{
                                    color: `${pools[r]?.tagColor}`,
                                    marginBottom: 10,
                                  }}
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
                                      style={{
                                        borderRadius: '4px',
                                        color: `${pools[r]?.tagColor}`,
                                      }}
                                    />
                                  }{' '}
                                  %
                                </span>
                              </Line>
                              <Line>
                                <TitelandIcon>
                                  <span className="label">Total Lock</span>
                                </TitelandIcon>

                                <TitelandIcon>
                                  <span
                                    style={{
                                      color: `${pools[r]?.tagColor}`,
                                      marginBottom: 10,
                                      display: 'flex',
                                      flexWrap: 'wrap',
                                    }}
                                    className="value"
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
                                        style={{
                                          color: `${pools[r]?.tagColor}`,
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
                                          style={{
                                            color: `${pools[r]?.tagColor}`,
                                          }}
                                        />
                                        <img src={`/images/chains/${chainId}.png`} alt="" width="16px" />
                                      </div>
                                    }
                                    {` `}
                                  </span>
                                </TitelandIcon>
                              </Line>
                            </Lineleft>
                            <Lineright>
                              <Line>
                                <TitelandIcon>
                                  <span className="label">Max Stake</span>
                                </TitelandIcon>
                                <span
                                  className="value"
                                  style={{
                                    color: `${pools[r]?.tagColor}`,
                                    marginBottom: 10,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                  }}
                                >
                                  {
                                    <CountUp
                                      separator=","
                                      style={{ color: `${pools[r]?.tagColor}` }}
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
                                        style={{ color: `${pools[r]?.tagColor}` }}
                                        start={0}
                                        preserveValue
                                        delay={0}
                                        end={i.maxLock / i.rateBNB2USD}
                                        decimals={4}
                                        duration={1}
                                      />
                                      <img src={`/images/chains/${chainId}.png`} alt="" width="16px" />
                                    </div>
                                  }{' '}
                                </span>
                              </Line>
                              <Line>
                                <span style={{ fontWeight: 400, fontSize: 14 }}>Time Lock</span>
                                <span
                                  style={{
                                    color: `${pools[r]?.tagColor}`,
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
                                      color: `${pools[r]?.tagColor}`,
                                      display: 'flex',
                                      flexWrap: 'wrap',
                                    }}
                                    className="value"
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
                                        style={{
                                          color: `${pools[r]?.tagColor}`,
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
                                          style={{
                                            color: `${pools[r]?.tagColor}`,
                                          }}
                                        />
                                        <img src={`/images/chains/${chainId}.png`} alt="" width="16px" />
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
                        <Link href={`${poolBaseUrl}/${r}?chainId=${CHAIN_ID}`}>
                          {isMobile ? (
                            <Button
                              style={{ color: '#6216B0', backgroundColor: '#D9D9D9' }}
                              variant="primary"
                              width={'180px'}
                              padding="1em"
                              scale="sm"
                            >
                              Detail
                            </Button>
                          ) : (
                            <Button
                              style={{ color: '#6216B0', backgroundColor: '#D9D9D9' }}
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
            </>
          )}
        </>
      )}
    </Container>
  )
}
export default Pools
