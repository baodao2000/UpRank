import { Button, Flex, LinkExternal, Text, useToast } from '@pancakeswap/uikit'
import PageHeader from 'components/PageHeader'
import styled from 'styled-components'
import images from 'configs/images'
import contracts from 'config/constants/contracts'
import { getPoolsContract } from 'utils/contractHelpers'
import { getBlockExploreLink } from 'utils'
import { trendyColors } from 'style/trendyTheme'
import { useBalance } from 'wagmi'
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
import { bnb2Usd, shortenURL, timeDisplay } from './util'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { ChainId } from '../../../packages/swap-sdk/src/constants'

// ============= STYLED
const Container = styled.div`
  background: url(${images.poolDetailFooterBg}) no-repeat bottom;
  background-size: contain;
`
const Body = styled.div`
  background: none;
  padding: 50px 70px 70px;
`
const PoolsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
`
const ThreeDots = styled.p`
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
    backgroundColor: '180deg, #CABDE1 0%, #976EDD 100%',
  },
  {
    key: 1,
    name: 'MATIC',
    tagColor: trendyColors.MAIN_GREEN,
    totalLock: '',
    logo: images.logoMatic,
    backgroundColor: '180deg, #CABDE1 0%, #976EDD 100%',
  },
  {
    key: 2,
    name: 'MATIC',
    tagColor: trendyColors.MAIN_GREEN,
    totalLock: '',
    logo: images.logoMatic,
    backgroundColor: '180deg, #CABDE1 0%, #976EDD 100%',
  },
  {
    key: 3,
    name: 'MATIC',
    tagColor: trendyColors.MAIN_GREEN,
    totalLock: '',
    logo: images.logoMatic,
    backgroundColor: '180deg, #CABDE1 0%, #976EDD 100%',
  },
  {
    key: 4,
    name: 'MATIC',
    tagColor: trendyColors.MAIN_GREEN,
    totalLock: '',
    logo: images.logoMatic,
    backgroundColor: '180deg, #CABDE1 0%, #976EDD 100%',
  },
  {
    key: 5,
    name: 'MATIC',
    tagColor: trendyColors.MAIN_GREEN,
    totalLock: '',
    logo: images.logoMatic,
    backgroundColor: '180deg, #CABDE1 0%, #976EDD 100%',
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
  width: 400px;
  height: 456px;
  min-width: 300px;
  border-radius: 30px;
  border: 4px solid #41f3ff;
  padding: 20px;
  @media screen and (max-width: 575px) {
    border: 3px solid #41f3ff;
    padding: 22px;
    gap: 10px;
    height: 420px;
    width: 350px;
  }
  @media screen and (max-width: 400px) {
    width: 340px;
    height: 400px;
    padding: 15px;
  }
`
const LogoAndName = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  align-items: center;
  span {
    font-size: 40px;
    line-height: 48px;
    font-style: normal;
    font-family: Inter;
    color: #ffffff;
    font-weight: 700;
  }
  img {
    width: 100px;
    height: 100px;
  }
  @media screen and (max-width: 575px) {
    span {
      font-size: 36px;
    }
  }
`
const Info = styled.div`
  width: 100%;
`
const Reward = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1.5px solid #d9d9d9;
`
const Time = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1.5px solid #d9d9d9;
`
const Line = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 24px;
    color: ${trendyColors.WHITE};
  }
  &.time {
    span {
      font-size: 20px;
      line-height: 29px;
    }
  }
  &.commission {
    justify-content: center;
    margin: 5px 0 10px;
  }
  @media screen and (max-width: 575px) {
    span {
      font-size: 16px;
      &.value {
        font-weight: 800;
      }
    }
    &.time {
      span {
        font-size: 18px;
        line-height: 22px;
      }
    }
  }
  @media screen and (max-width: 500px) {
    span {
      font-size: 14px;
      &.value {
        font-weight: 600;
      }
    }
    &.time {
      span {
        font-size: 16px;
        line-height: 22px;
      }
    }
  }
  @media screen and (max-width: 450px) {
    span {
      font-size: 13px;
      &.value {
        font-weight: 800;
      }
    }
    &.time {
      span {
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
  @media screen and (max-width: 400px) {
    span {
      font-size: 13px;
      &.value {
        font-weight: 800;
      }
    }
  }
`
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
  const isETHW = chainId === ChainId.ETHW
  const [isLoading, setIsLoading] = useState(true)
  const [rateBnbUsd, setRateBnbUsd] = useState(1)
  const { isConfirming, handleConfirm } = useConfirmTransaction({
    onConfirm: () => {
      return callWithMarketGasPrice(poolContract, 'claimComm', [account])
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess('Claim commission successfully !', <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onSuccess()
    },
  })

  const getCommission = async () => {
    if (account) {
      const comm = await getPoolContract.remainComm(account)
      setRemainCommission(Number(formatEther(comm)))
      setIsClaimableCommission(comm > 0)
    } else {
      setRemainCommission(0)
    }
  }

  const getPools = async (ids: number[]) => {
    try {
      const pools = await getPoolContract.getPools(ids)
      const rateBnbUsd = await getPoolContract.bnbPrice()

      setRateBnbUsd(Number(formatEther(rateBnbUsd[0])) / Number(formatEther(rateBnbUsd[1])))
      const newPoolInfo = Promise.all(
        pools.map(async (pool, id) => {
          console.log(getPoolContract.users)

          let userLock = await getPoolContract.users(account, id)
          console.log(userLock)
          return {
            currentInterest: ((Number(pool.currentInterest.toString()) / 10000) * 365).toFixed(2),
            enable: pool.enable,
            maxLock: formatEther(pool.maxLock),
            minLock: formatEther(pool.minLock),
            timeLock: pool.timeLock.toString(),
            totalLock: formatEther(pool.totalLock),
            rateBNB2USD: Number(formatEther(rateBnbUsd[0])) / Number(formatEther(rateBnbUsd[1])),
            yourLock: Number(formatEther(userLock.totalLock)),
          }
        }),
      )
      setArr(await newPoolInfo)
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
  const unit = isETHW ? 'ETHW' : 'MATIC'

  const onSuccess = () => {
    getCommission()
  }
  useEffect(() => {
    if (!account) return
    getCommission()
    getPools([0, 1, 2, 3, 4, 5])
  }, [account])

  return (
    <Container>
      <PageMeta />
      {isLoading ? (
        <TrendyPageLoader />
      ) : (
        <>
          <PageHeader background="none">
            <Flex flex="1" flexDirection="column" mr={['8px', 0]} alignItems="center">
              <Text fontSize={['22px', '22px', '36px', '40px', '50px', '60px']} fontWeight="600" color="mainColor">
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
                {'$ ~'}
                {
                  <CountUp
                    separator=","
                    start={0}
                    preserveValue
                    delay={0}
                    end={Number(balance)}
                    decimals={2}
                    duration={0.5}
                  />
                }
                {unit}
              </Text>

              <Line className="commission">
                <Text fontSize={['14px', '16px', '18px', '24px', '26px']} className="value" color="mainColor">
                  Your Commission: {remainCommission} {unit}
                </Text>
                <Button
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
              </Line>
              <Text color="text" ellipsis={true}>
                <LinkExternal
                  fontSize={['14px', '16px', '18px', '20px', '22px']}
                  href={getBlockExploreLink(contracts.pools[CHAIN_ID], 'address', CHAIN_ID)}
                  ellipsis={true}
                >
                  {shortenURL(`Contract: ${contracts.pools[CHAIN_ID]}`, 35)}
                </LinkExternal>
              </Text>
            </Flex>
          </PageHeader>

          <Body>
            <PoolsList>
              {arr.map((i, r) => {
                return (
                  <Card
                    key={r}
                    style={{
                      background: `linear-gradient(${pools[r].backgroundColor})`,
                    }}
                  >
                    <LogoAndName>
                      <img src={pools[r].logo} alt="logo" />
                      <span>{pools[r].name}</span>
                    </LogoAndName>
                    <Info>
                      <Reward>
                        <Line>
                          <span>Min Stake</span>
                          <span
                            className="value"
                            style={{
                              borderRadius: '4px',
                              color: `${pools[r].tagColor}`,
                            }}
                          >
                            (
                            {
                              <CountUp
                                separator=","
                                style={{ color: `${pools[r].tagColor}` }}
                                start={0}
                                preserveValue
                                delay={0}
                                end={Number(i.minLock)}
                                decimals={0}
                                duration={1}
                              />
                            }
                            $) {` ~ `}
                            {
                              <CountUp
                                separator=","
                                style={{ color: `${pools[r].tagColor}` }}
                                start={0}
                                preserveValue
                                delay={0}
                                end={Number(i.minLock / i.rateBNB2USD)}
                                decimals={2}
                                duration={1}
                              />
                            }{' '}
                            <img src={images.logoMatic} alt="" width="16px" />
                          </span>
                        </Line>
                        <Line>
                          <span>Max Stake</span>
                          <span
                            className="value"
                            style={{
                              borderRadius: '4px',
                              color: `${pools[r].tagColor}`,
                            }}
                          >
                            (
                            {
                              <CountUp
                                separator=","
                                style={{ color: `${pools[r].tagColor}` }}
                                start={0}
                                preserveValue
                                delay={0}
                                end={Number(i.maxLock)}
                                decimals={0}
                                duration={1}
                              />
                            }
                            $) {` ~ `}
                            {
                              <CountUp
                                separator=","
                                style={{ color: `${pools[r].tagColor}` }}
                                start={0}
                                preserveValue
                                delay={0}
                                end={Number(i.maxLock / i.rateBNB2USD)}
                                decimals={2}
                                duration={1}
                              />
                            }{' '}
                            <img src={images.logoMatic} alt="" width="16px" />
                          </span>
                        </Line>
                        <Line>
                          <span>Interest</span>
                          <span className="value">
                            {
                              <CountUp
                                start={0}
                                preserveValue
                                delay={0}
                                end={Number(i.currentInterest)}
                                decimals={2}
                                duration={1}
                              />
                            }{' '}
                            %
                          </span>
                        </Line>
                        <Line>
                          <span>Time Lock</span>
                          <span className="value">{timeDisplay(i.timeLock)}</span>
                        </Line>
                      </Reward>
                      <Time>
                        <Line className="time">
                          <span>Total Lock</span>
                          <span className="value">
                            (
                            {
                              <CountUp
                                separator=","
                                start={0}
                                preserveValue
                                delay={0}
                                end={Number(i.totalLock * i.rateBNB2USD)}
                                decimals={2}
                                duration={1}
                              />
                            }
                            $) {` ~ `}
                            {
                              <CountUp
                                separator=","
                                start={0}
                                preserveValue
                                delay={0}
                                end={Number(i.totalLock)}
                                decimals={2}
                                duration={1}
                              />
                            }
                            {` `}
                            <img src={images.logoMatic} alt="" width="18px" />
                          </span>
                        </Line>
                        <Line className="time">
                          <span>Your Lock</span>
                          <span className="value">
                            (
                            {
                              <CountUp
                                separator=","
                                start={0}
                                preserveValue
                                delay={0}
                                end={Number(i.yourLock * i.rateBNB2USD)}
                                decimals={2}
                                duration={1}
                              />
                            }
                            $) {` ~ `}
                            {
                              <CountUp
                                separator=","
                                start={0}
                                preserveValue
                                delay={0}
                                end={Number(i.yourLock)}
                                decimals={2}
                                duration={1}
                              />
                            }
                            {` `}
                            <img src={images.logoMatic} alt="" width="18px" />
                          </span>
                        </Line>
                      </Time>
                    </Info>
                    <Link href={`${poolBaseUrl}/${r}?chainId=${CHAIN_ID}`}>
                      {isMobile ? (
                        <Button variant="primary" padding="1em" width="100%" scale="sm">
                          View Detail
                        </Button>
                      ) : (
                        <Button variant="primary" padding="1em" width="100%" scale="md">
                          View Detail
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
    </Container>
  )
}
export default Pools
