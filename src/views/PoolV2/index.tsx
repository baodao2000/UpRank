import { Button, Flex, Heading, LinkExternal, Text, useMatchBreakpoints, useToast } from '@pancakeswap/uikit'
import PageHeader from 'components/PageHeader'
import styled from 'styled-components'
import images from 'configs/images'
import contracts from 'config/constants/contracts'
import { getBlockExploreLink } from 'utils'
import { trendyColors } from 'style/trendyTheme'
import { useBalance, useSigner } from 'wagmi'
import CountUp from 'react-countup'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'
import { ToastDescriptionWithTx } from 'components/Toast'
import useConfirmTransaction from 'hooks/useConfirmTransaction'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { getContract, getPoolsV4Contract } from 'utils/contractHelpers'
import { usePoolsContract, usePoolsV4Contract } from 'hooks/useContract'
import { PageMeta } from 'components/Layout/Page'
// import { isMobile } from 'react-device-detect'
import { useState, useEffect, useRef } from 'react'
import { formatBigNumber } from 'utils/formatBalance'
import { poolBaseUrlV2 } from 'views/PoolV2/components/PoolDetailsV2/constants'
import { formatEther } from '@ethersproject/units'
import { shortenURL, timeDisplayLong } from './util'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { ChainId, NATIVE } from '../../../packages/swap-sdk/src/constants'
import Rank from './components/Rank'
import moment from 'moment'
import readTrendyAbi from '../../config/abi/readTrendy.json'
// import addresses from 'config/constants/contracts'

import { arrayify } from '@ethersproject/bytes'
import { Link, Route, useRouteMatch } from 'react-router-dom'
import Pool from './components/PoolDetailsV2'

// ============= STYLED
const Container = styled.div`
  // background:var(--bg-1, linear-gradient(90deg, #9E86FF 0%, #2B0864 100%));
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  * {
    font-family: Inter, sans-serif;
  }
  .header {
    width: 1000px;
    @media screen and (max-width: 1024px) {
      width: 95%;
    }
    @media screen and (max-width: 800px) {
      width: 95%;
    }
  }
  width: 100%;
  .fee {
    @media screen and (min-width: 600px) {
      font-size: 36px;
    }

    @media screen and (min-width: 1024px) {
      font-size: 48px;
    }
  }
`
const Body = styled.div`
  background: none;
  width: 100%;
`
const PoolsList = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, auto);
  justify-items: center;
  grid-column-gap: 40px;
  grid-row-gap: 40px;
  align-items: stretch;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    grid-row-gap: 32px;
  }
  @media screen and (max-width: 1300px) {
    grid-column-gap: 20px;
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
const Wraper = styled.div`
  * {
    font-family: Inter, sans-serif;
  }
  background: url(${images.bgV3}) no-repeat;
  background-size: contain;
  width: 100%;
  max-width: 1320px;
  height: auto;
  min-height: 500px;
  margin-left: auto;
  margin-right: auto;
  padding: 96px 0;
  position: relative;
  @media screen and (max-width: 1440px) {
    padding: 20px;
  }
  @media screen and (max-width: 575px) {
    padding: 40px 16px;
  }
`
const StyledHead = styled(Heading)`
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 60px; /* 125% */
  letter-spacing: -0.96px;
  background: var(--primary-primary-gradient-2, linear-gradient(180deg, #7b3fe4 0%, #a726c1 100%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 575px) {
    font-size: 24px;
  }
`
const StyledSubtitle = styled(Text)`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  color: rgba(173, 171, 178, 1);
  margin-bottom: 20px;
  @media screen and (max-width: 575px) {
    font-size: 16px;
  }
`
const Head = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 90px;
  width: 100%;
  align-items: center;
  @media screen and (max-width: 575px) {
    flex-direction: column;
    margin-bottom: 24px;
  }
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 80%;
  border-bottom: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
  @media screen and (max-width: 575px) {
    width: 100%;
  }
`
const Right = styled.div`
  display: flex;
  width: 347px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  border-radius: 16px;
  border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
  background: var(--greyscale-grayscale-3, #141217);
  /* depth/4 */
  box-shadow: 0px 64px 64px -48px rgba(15, 15, 15, 0.1);
  @media screen and (max-width: 575px) {
    width: 100%;
  }
`
const Label = styled(Text)`
  color: var(--greyscale-grey-scale-text-seconday, #adabb2);
  text-align: right;
  /* Text md/Medium */
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`
const Total = styled(Text)`
  color: var(--white-white, #fff);
  text-align: right;
  /* Display lg/Semibold */
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 60px; /* 125% */
  letter-spacing: -0.96px;
  @media screen and (max-width: 575px) {
    font-size: 24px;
    line-height: 32px; /* 125% */
  }
`
const TotalUsd = styled(Text)`
  color: var(--greyscale-grey-scale-text-seconday, #adabb2);
  text-align: right;
  /* Text xl/Bold */
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  @media screen and (max-width: 575px) {
    font-size: 24px;
    line-height: 24px;
  }
`
const Version = styled.div`
  display: flex;
  gap: 20px;
  cursor: pointer;
`
const HeadContent = styled.div`
  border-radius: 16px;
  background: var(--greyscale-grayscale-3, #141217);
  box-shadow: 0px 64px 64px -48px rgba(15, 15, 15, 0.1);
  display: flex;
  padding: 40px;
  flex-direction: row;
  align-items: flex-start;
  gap: 48px;
  align-self: stretch;
  justify-content: space-between;
  position: relative;
  .pool {
    position: absolute;
    top: -50%;
    right: 0;
    z-index: 10;
  }
  .circle {
    position: absolute;
    bottom: 20%;
    right: 5%;
  }
  @media screen and (max-width: 575px) {
    padding: 16px;
  }
`
const TitleContent = styled(Text)`
  color: var(--white-white, #fff);
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 38px;
  @media screen and (max-width: 575px) {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
  }
`
const LabelContent = styled(Text)`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 12px;
  .link {
    color: rgba(133, 68, 245, 1);
    cursor: pointer;
  }
  @media screen and (max-width: 575px) {
    flex-wrap: wrap;
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
  align-items: flex-end;
  justify-content: flex-end;
  gap: 15px;
  width: 630px;
  height: auto;
  padding: 40px 20px;
  border-radius: 24px;
  border: 1px solid transparent;
  border-image-slice: 1;
  position: relative;
  background-image: linear-gradient(#18171b, #18171b), radial-gradient(circle at top left, #7b3fe4 0%, #a726c1 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  backdrop-filter: blur(5.5px);
  @media screen and (max-width: 1300px) {
    width: 90%;
    height: auto;
    padding: 20px;
  }
  @media screen and (max-width: 800px) {
    width: 70%;
    height: auto;
    padding: 20px;
    position: relative;
  }
  @media only screen and (min-width: 375px) and (max-width: 575px) {
    width: 100%;
    padding: 15px;
    position: relative;
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
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    color: rgba(255, 255, 255, 1);
  }
  @media screen and (max-width: 1024px) {
    display: flex;
    gap: 10px;
    justify-content: flex-start;
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
  flex-direction: column;
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
  flex-direction: row;
  align-items: stretch;
  // align-items: flex-start;
  justify-content: space-between;
  .value {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    color: rgba(226, 225, 229, 1);
  }
  span {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    color: rgba(173, 171, 178, 1);
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
  @media screen and (max-width: 575px) {
    span {
      font-size: 14px;
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
  backdrop-filter: blur(5.5px);
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
      obj.img = '/images/V3/Bronze.svg'
      obj.title = 'Bronze'
      break
    case 1:
      obj.img = '/images/V3/Silver.svg'
      obj.title = 'Silver'
      break
    case 2:
      obj.img = '/images/V3/Gold.svg'
      obj.title = 'Gold'
      break
    case 3:
      obj.img = '/images/V3/Titanium.svg'
      obj.title = 'Titanium'
      break
    case 4:
      obj.img = '/images/V3/Platinum.svg'
      obj.title = 'Platinum'
      break
    case 5:
      obj.img = '/images/pools/diamond.svg?t=1'
      obj.title = 'Diamond'
      break
    default:
      break
  }
  return obj
}
// STYLED
const MinMax = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  border-radius: 12px;
  background: var(--white-white-8, rgba(255, 255, 255, 0.08));
`
const LineStake = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 24px;
  .label {
    color: var(--greyscale-grey-scale-text-seconday, #adabb2);
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
  .value {
    color: var(--greyscale-text, #e2e1e5);
    font-family: Inter, sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
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
  @media screen and (max-width: 575px) {
    .value {
      display: flex;
      flex-wrap: wrap;
      font-size: 16px;
    }
    padding: 8px 12px;
  }
  @media screen and (max-width: 1300px) {
    .value {
      display: flex;
      flex-wrap: wrap;
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
  border: 1px solid transparent;
  border-image-slice: 1;

  background-image: linear-gradient(#18171b, #18171b), radial-gradient(circle at top left, #7b3fe4 0%, #a726c1 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  backdrop-filter: blur(5.5px);
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  top: 4%;
  right: 0;
  @media screen and (max-width: 1300px) {
    top: 0;
  }
  @media screen and (max-width: 575px) {
    width: 80px;
    height: 80px;
  }
`
const LogoContain = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: var(--white-white-8, rgba(255, 255, 255, 0.08));
  align-items: center;
  display: flex;
  justify-content: center;
`
const Background = styled.div`
  // background: url(${images.mask}) no-repeat;
  // background-size: contain;
  // background-position: top;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const ButtonDetails = styled.div`
  display: flex;
  height: 40px;
  padding: 0px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-8, 8px);
  border-radius: var(--border-radius-lg, 8px);
  border: 1px solid var(--color-bg-color-bg-container, #fff);
  width: 70px;
`
const Pools = () => {
  const { account, chainId } = useActiveWeb3React()
  let match = useRouteMatch()
  // account = '0x1ec0f8875B7fc2400a6F44788c6710959614e68A'
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const getPoolV4Contract = getPoolsV4Contract(CHAIN_ID)
  const [arr, setArr] = useState([])
  const [remainCommission, setRemainCommission] = useState(0)
  const [commission, setCommission] = useState(0)
  const [commission2, setCommission2] = useState(0)
  const [isClaimableCommission, setIsClaimableCommission] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const poolContract = usePoolsV4Contract()
  // const [ranks, setRanks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [rateBnbUsd, setRateBnbUsd] = useState(1)
  const { data: signer } = useSigner()
  const [all, setAll] = useState({
    direct: 0,
    downLine: 0,
    rank: 0,
    locked: 0,
    volumnOnTree: 0,
  })
  const [accountUsers, setAccount] = useState('')
  const [rankLoading, setRankLoading] = useState(true)
  const readTrendyCT = getContract({
    address: contracts.readTrendy[CHAIN_ID],
    abi: readTrendyAbi,
    chainId: CHAIN_ID,
    signer,
  })

  const [userClaimed, setUserClaimed] = useState(false)
  const { isMobile, isTablet } = useMatchBreakpoints()
  const link = window.location.href

  const review = () => {
    if (link.indexOf('review') !== -1) {
      window.location.href = '# + review'
      window.history.replaceState(null, null, link)
      const a = link.slice(link.indexOf('='))
      setAccount(a.slice(1, a.indexOf('#')))
    }
  }

  const getAll = async (ids: number[]) => {
    if (!account) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
      const [usersV1, getVolume] = await Promise.all([
        readTrendyCT.getUsersV41(accountUsers !== '' ? accountUsers : account, ids),
        readTrendyCT.getTotalVolumeByUp7(accountUsers !== '' ? accountUsers : account),
      ])

      setAll({
        rank: Number(usersV1.userRank),
        locked: Number(Number(formatEther(usersV1.userTotalLock)).toFixed(3)),
        direct: usersV1.direct,
        downLine: usersV1.downLine,
        volumnOnTree: Number(Number(formatEther(getVolume)).toFixed(3)),
      })
    }
  }
  // console.log(all.volumnOnTree)
  const getCommission = async (ids: number[]) => {
    if (account) {
      const getremainComm = await readTrendyCT.getUsersV41(account, ids)
      const commRemain = Number(formatEther(getremainComm.remainComm))
      setRemainCommission(commRemain)
      setIsClaimableCommission(commRemain > 0)
    } else {
      setRemainCommission(0)
      setIsLoading(false)
    }
  }
  const { isConfirming, handleConfirm } = useConfirmTransaction({
    onConfirm: () => {
      return callWithMarketGasPrice(remainCommission > 0 && poolContract, 'claimComm', [account])
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess('Claim commission successfully !', <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onSuccess()
    },
  })
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
      const bnbPrice = await getPoolV4Contract.MATIC2USDT()
      const pools = await getPoolV4Contract.getPools(ids)
      // await getInfoRank()
      setRateBnbUsd(Number(formatEther(bnbPrice)))
      if (!account) {
        const newPoolInfo = await Promise.all(
          pools.map((items) => {
            return {
              title: ['Experience', 'Starter', 'Standard', 'Pro', 'Advance', 'Premium'],
              currentInterest: ((Number(items.currentInterest.toString()) / 10000) * 365).toFixed(2),
              enable: items.enable,
              maxLock: formatEther(items.maxLock),
              minLock: formatEther(items.minLock),
              timeLock: 1095,
              totalLock: formatEther(items.totalLock),
              rateBNB2USD: Number(formatEther(bnbPrice)),
              yourLock: 0,
              currentInterestWithMine: ((Number(items.currentInterestWithMine.toString()) / 10000) * 365).toFixed(2),
            }
          }),
        )

        setArr(newPoolInfo)
        setIsLoading(false)
      } else {
        const newPoolInfo = await Promise.all(
          pools.map(async (item, id) => {
            const userLockAndPool = await readTrendyCT.getUsersV41(account, ids)
            return {
              title: ['Experience', 'Starter', 'Standard', 'Pro', 'Advance', 'Premium'],
              currentInterest: ((Number(item.currentInterest.toString()) / 10000) * 365).toFixed(2),
              enable: item.enable,
              maxLock: formatEther(item.maxLock),
              minLock: formatEther(item.minLock),
              timeLock: 1095,
              totalLock: formatEther(item.totalLock),
              rateBNB2USD: Number(formatEther(bnbPrice)),
              yourLock: Number(formatEther(userLockAndPool.totalLock[id])),
              currentInterestWithMine: ((Number(item.currentInterestWithMine.toString()) / 10000) * 365).toFixed(2),
            }
          }),
        )
        await getAll([0, 1, 2, 3, 4, 5])
        setArr(newPoolInfo)
        setIsLoading(false)
      }
    } catch (e) {
      console.log('error', e)
    }
  }

  // BALANCE
  const { data, isFetched } = useBalance({
    addressOrName: contracts.pools[CHAIN_ID],
  })
  const { data: data2, isFetched: isFetched2 } = useBalance({
    addressOrName: contracts.poolsV2[CHAIN_ID],
  })
  const { data: data3, isFetched: isFetched3 } = useBalance({
    addressOrName: contracts.poolsV4[CHAIN_ID],
  })

  const balance =
    isFetched && data && data.value && isFetched2 && data2 && data2.value && data3 && isFetched3
      ? formatBigNumber(data.value.add(data2.value).add(data3.value), 6)
      : 0
  const unit = NATIVE[chainId].symbol

  const onSuccess = () => {
    getCommission([0, 1, 2, 3, 4, 5])
  }

  const onSuccessRank = () => {
    getAll([0, 1, 2, 3, 4, 5])
  }
  useEffect(() => {
    getCommission([0, 1, 2, 3, 4, 5])
    getPools([0, 1, 2, 3, 4, 5])
  }, [account, all])
  const [countDown, setCountDown] = useState(1679997600 - moment().unix())
  useEffect(() => {
    const timerId = setInterval(() => {
      setCountDown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [countDown])
  useEffect(() => {
    review()
  }, [link])
  // console.log(all);

  return (
    <Wraper>
      <Head>
        <Left>
          <StyledHead>Pools</StyledHead>
          <StyledSubtitle>
            Pooling resources or assets from multiple participants in DeFi ecosystems to enhance liquidity, generate
            returns, or facilitate shared investments.
          </StyledSubtitle>
        </Left>
        <Right>
          <Label>Total Lock</Label>
          <Total>
            $
            <CountUp
              separator=","
              start={0}
              preserveValue
              delay={0}
              end={Number(Number(balance) * rateBnbUsd)}
              decimals={3}
              duration={1}
            />
          </Total>
          <TotalUsd>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                marginTop: '12px',
                gap: '12px',
              }}
            >
              ~
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                end={Number(balance)}
                decimals={3}
                duration={1}
              />
              <div
                style={{
                  background: 'var(--white-white-6, rgba(255, 255, 255, 0.06))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(6px)',
                  padding: '4px',
                  borderRadius: '4px',
                  width: '30px',
                }}
              >
                <img width="18px" height="18px" src="./images/V3/Vector.png" />
              </div>
            </div>
          </TotalUsd>
        </Right>
      </Head>
      <HeadContent>
        <div>
          <TitleContent>Pools Rewards</TitleContent>
          <LabelContent>
            <p>
              Rewards are exclusively reserved for referrals. Invite your friends get our rewards.
              <Link to="/referral">
                <span className="link">Invite Now</span>
              </Link>
            </p>
          </LabelContent>
          <LabelContent>
            <span style={{ color: 'rgba(173, 171, 178, 1)' }}>Root Contract:</span>
            <LinkExternal
              fontSize="14px"
              href={getBlockExploreLink(contracts.poolsV4[CHAIN_ID], 'address', CHAIN_ID)}
              ellipsis={true}
              style={{ color: 'rgba(249, 249, 249, 1)' }}
              color="#00F0E1"
            >
              {shortenURL(`${contracts.poolsV4[CHAIN_ID]}`, 18)}
            </LinkExternal>
            <a href={getBlockExploreLink(contracts.poolsV4[CHAIN_ID], 'address', CHAIN_ID)} className="link">
              Check Details
            </a>{' '}
          </LabelContent>
        </div>
        {isMobile ? null : <img className="pool" src="./images/V3/pools.svg" />}
      </HeadContent>
      {isMobile ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <img src="./images/V3/pools.svg" />
        </div>
      ) : null}
      <Container style={{ backgroundColor: 'var(--bg-1, linear-gradient(90deg, #9E86FF 0%, #2B0864 100%))' }}>
        <Background>
          <PageMeta />
          {isLoading === true ? (
            <TrendyPageLoader />
          ) : (
            <>
              <Body>
                <PoolsList>
                  {arr.map((i, r) => {
                    return (
                      <Card key={r}>
                        {r === 0 ? null : <ImageMine src="/images/V3/mine.png" />}
                        <LogoAndName>
                          <Logo src="./images/V3/bsc.svg" alt="logo" />
                          <span>{i.title[r]}</span>
                        </LogoAndName>
                        <MinMax>
                          <LineStake>
                            <TitelandIcon>
                              <span className="label">Min Stake</span>
                            </TitelandIcon>
                            <span className="value">
                              $
                              {
                                <CountUp
                                  style={{ fontSize: isMobile ? '16px' : '20px', lineHeight: '30px' }}
                                  separator=","
                                  start={0}
                                  preserveValue
                                  delay={0}
                                  end={Number(i.minLock)}
                                  decimals={0}
                                  duration={1}
                                />
                              }
                              {
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                  ~
                                  <CountUp
                                    separator=","
                                    style={{ color: 'rgba(173, 171, 178, 1)', fontSize: isMobile ? '14px' : '18px' }}
                                    start={0}
                                    preserveValue
                                    delay={0}
                                    end={i.minLock / i.rateBNB2USD}
                                    decimals={4}
                                    duration={1}
                                  />
                                  <div
                                    style={{
                                      background: 'var(--white-white-8, rgba(255, 255, 255, 0.08))',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      backdropFilter: 'blur(6px)',
                                      borderRadius: '16px',
                                      width: '26px',
                                      height: '26px',
                                    }}
                                  >
                                    <img width="18px" height="16px" src="./images/V3/Vector.png" />
                                  </div>
                                </div>
                              }{' '}
                            </span>
                          </LineStake>
                          <LineStake>
                            <TitelandIcon>
                              <span className="label">Max Stake</span>
                            </TitelandIcon>
                            <span className="value">
                              $
                              {
                                <CountUp
                                  style={{
                                    fontSize: isMobile ? '16px' : '20px',
                                    lineHeight: isMobile ? '20px' : '30px',
                                  }}
                                  separator=","
                                  start={0}
                                  preserveValue
                                  delay={0}
                                  end={Number(i.maxLock)}
                                  decimals={0}
                                  duration={1}
                                />
                              }
                              {
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                  {` ~ `}
                                  <CountUp
                                    separator=","
                                    style={{ color: 'rgba(173, 171, 178, 1)', fontSize: isMobile ? '14px' : '18px' }}
                                    start={0}
                                    preserveValue
                                    delay={0}
                                    end={i.maxLock / i.rateBNB2USD}
                                    decimals={4}
                                    duration={1}
                                  />
                                  <div
                                    style={{
                                      background: 'var(--white-white-8, rgba(255, 255, 255, 0.08))',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      backdropFilter: 'blur(6px)',
                                      borderRadius: '16px',
                                      width: '26px',
                                      height: '26px',
                                    }}
                                  >
                                    <img width="18px" height="16px" src="./images/V3/Vector.png" />
                                  </div>
                                </div>
                              }{' '}
                            </span>
                          </LineStake>
                        </MinMax>
                        <Info>
                          <Reward>
                            <Lineleft>
                              <Line>
                                <span>Interest</span>
                                <Text
                                  style={{
                                    color: 'rgba(228, 230, 231, 1)',
                                    marginBottom: 10,
                                    fontSize: isMobile ? '16px' : '20px',
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
                                      className="value"
                                      style={{ fontSize: isMobile ? '16px' : '20px', lineHeight: '30px' }}
                                    />
                                  }{' '}
                                  %
                                </Text>
                              </Line>
                              <Line>
                                <span>Time Lock</span>
                                <span
                                  style={{
                                    color: 'rgba(228, 230, 231, 1)',
                                    marginBottom: 10,
                                    fontSize: isMobile ? '16px' : '20px',
                                  }}
                                  className="value"
                                >
                                  {timeDisplayLong(i.timeLock) ? timeDisplayLong(i.timeLock * 57600) : '0'}
                                </span>
                              </Line>
                              <Line>
                                <span>Interest With Mine</span>
                                <Text
                                  style={{
                                    color: 'rgba(228, 230, 231, 1)',
                                    marginBottom: 10,
                                    fontSize: isMobile ? '16px' : '20px',
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
                                        fontSize: isMobile ? '16px' : '20px',
                                      }}
                                    />
                                  }{' '}
                                  %
                                </Text>
                              </Line>
                            </Lineleft>
                            <Lineright>
                              <Line>
                                <TitelandIcon>
                                  <span className="label">Your Lock</span>
                                </TitelandIcon>

                                <TitelandIcon>
                                  <span
                                    className="value"
                                    style={{
                                      color: 'rgba(228, 230, 231, 1)',
                                      display: 'flex',
                                      flexWrap: 'wrap',
                                      gap: 10,
                                      // marginTop: 10,
                                      fontSize: isMobile ? '16px' : '20px',
                                    }}
                                  >
                                    <div>
                                      $
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
                                          style={{ fontSize: isMobile ? '16px' : '20px', lineHeight: '30px' }}
                                        />
                                      }
                                    </div>

                                    {
                                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        {` ~ `}
                                        <CountUp
                                          separator=","
                                          start={0}
                                          preserveValue
                                          delay={0}
                                          end={Number(i.yourLock)}
                                          decimals={4}
                                          duration={1}
                                          style={{
                                            color: 'rgba(228, 230, 231, 1)',
                                          }}
                                        />
                                        <div
                                          style={{
                                            background: 'var(--white-white-8, rgba(255, 255, 255, 0.08))',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backdropFilter: 'blur(6px)',
                                            borderRadius: '16px',
                                            width: '26px',
                                            height: '26px',
                                          }}
                                        >
                                          <img width="18px" height="16px" src="./images/V3/Vector.png" />
                                        </div>
                                      </span>
                                    }
                                    {` `}
                                  </span>
                                </TitelandIcon>
                              </Line>
                              <Line>
                                <TitelandIcon>
                                  <span className="label">Total Lock</span>
                                </TitelandIcon>

                                <TitelandIcon>
                                  <span
                                    className="value"
                                    style={{
                                      color: 'rgba(228, 230, 231, 1)',
                                      display: 'flex',
                                      flexWrap: 'wrap',
                                      gap: 10,
                                      // marginTop: 10,

                                      fontSize: isMobile ? '16px' : '20px',
                                    }}
                                  >
                                    <div>
                                      $
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
                                          style={{ fontSize: isMobile ? '16px' : '20px', lineHeight: '30px' }}
                                        />
                                      }
                                    </div>

                                    {
                                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        {` ~ `}
                                        <CountUp
                                          separator=","
                                          start={0}
                                          preserveValue
                                          delay={0}
                                          end={Number(i.totalLock)}
                                          decimals={4}
                                          duration={1}
                                          style={{
                                            color: 'rgba(228, 230, 231, 1)',
                                          }}
                                        />
                                        <div
                                          style={{
                                            background: 'var(--white-white-8, rgba(255, 255, 255, 0.08))',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backdropFilter: 'blur(6px)',
                                            borderRadius: '16px',
                                            width: '26px',
                                            height: '26px',
                                          }}
                                        >
                                          <img width="18px" height="16px" src="./images/V3/Vector.png" />
                                        </div>
                                      </span>
                                    }
                                    {` `}
                                  </span>
                                </TitelandIcon>
                              </Line>
                            </Lineright>
                          </Reward>
                          <Time></Time>
                        </Info>
                        <Link to={`${poolBaseUrlV2}/${r}/chainId=${CHAIN_ID}`}>
                          {isMobile && isTablet ? (
                            <Button
                              style={{
                                color: 'rgba(255, 255, 255, 1)',
                                backgroundColor: '#141217',
                                border: '1px solid #FFF',
                                borderRadius: '10px',
                              }}
                              variant="primary"
                              width={'100px'}
                              padding="10px"
                              scale="md"
                            >
                              Detail
                            </Button>
                          ) : (
                            <Button
                              style={{
                                color: 'rgba(255, 255, 255, 1)',
                                backgroundColor: '#141217',
                                border: '1px solid #FFF',
                                borderRadius: '10px',
                                marginRight: '20px',
                              }}
                              variant="primary"
                              width={'100px'}
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
                        style={{
                          color: 'rgba(103, 228, 255, 1)',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: '700',
                        }}
                      >
                        Your Commission: {remainCommission.toFixed(6)} {unit}
                      </Text>
                      <Text style={{ color: '#C5C5C5' }} ellipsis={true}>
                        <LinkExternal
                          fontSize={['14px', '16px', '18px', '20px', '22px']}
                          href={getBlockExploreLink(contracts.poolsV4[CHAIN_ID], 'address', CHAIN_ID)}
                          ellipsis={true}
                          style={{ color: 'rgba(249, 249, 249, 1)' }}
                          color="#00F0E1"
                        >
                          {shortenURL(`Root Contract: ${contracts.poolsV4[CHAIN_ID]}`, 35)}
                        </LinkExternal>
                      </Text>
                    </LineText>
                    <Button
                      style={{ color: '#6216B0', backgroundColor: '#D9D9D9' }}
                      marginTop={'30px'}
                      marginBottom={'30px'}
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
                      marginBottom={'30px'}
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
                  </PoolsReward>
                </Flex>
              </PageHeader>
              {!account ? null : (
                <div id="review">
                  <Rank unit={unit} userRank={all} onSuccess={onSuccessRank} accountUsers={accountUsers} />
                </div>
              )}
            </>
          )}
        </Background>
      </Container>
    </Wraper>
  )
}
export default Pools
