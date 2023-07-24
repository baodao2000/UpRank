import { Button, Flex, Heading, LinkExternalDepo, useModal, Text, LinkExternal } from '@pancakeswap/uikit'
import PageHeader from 'components/PageHeader'
import styled from 'styled-components'
import images from 'configs/images'
import { FC, useEffect, useState } from 'react'
import contracts from 'config/constants/contracts'
import { isMobile } from 'react-device-detect'
import { formatEther } from '@ethersproject/units'
import { getBlockExploreLink } from 'utils'
import { shortenURL, timeDisplayLong } from 'views/Pools2/util'
import moment from 'moment'
import { getPoolsV4Contract } from 'utils/contractHelpers'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'
import ClaimPoolModal from './ClaimModal'
import TableDataPool from './TableData'
import DetailInfoPool from './DetailInfo'
import DepositPoolModal from './DepositModal'
import { ChainId, NATIVE } from '../../../../../packages/swap-sdk/src/constants'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const PoolDetail = styled.div`
  * {
    font-family: Inter, sans-serif;
  }
  background: var(--greyscale-background-dark, #0a090d);
  width: 100%;
  .flexx {
    margin-top: 80px;
    @media (max-width: 768px) {
      margin-top: 50px;
    }
    @media (max-width: 575px) {
      margin-top: 20px;
    }
  }
  .root {
    display: flex;
    flex-direction: row;
    gap: 12px;
    @media (max-width: 398px) {
      gap: 8px;
      display: flex;
      flex-direction: column;
    }
  }
  .headingg {
    margin-left: 105px;
    @media (max-width: 575px) {
      margin-left: 0;
      margin-top: 10px;
    }
  }
  .bg {
    background: url(${images.bgV3}) no-repeat;
    background-size: 100% 100%;
  }
`
const Body = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: none;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  @media (max-width: 575px) {
    padding: 32px 20px 70px;
  }
`
const PoolName = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  .title {
    background: var(--primary-primary-gradient-2, linear-gradient(180deg, #7b3fe4 0%, #a726c1 100%));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`
const PoolLogo = styled.img`
  width: 80px;
  height: auto;
  @media screen and (max-width: 1028px) {
    width: 80px;
  }
  @media screen and (max-width: 851px) {
    width: 70px;
  }
  @media screen and (max-width: 575px) {
    width: 60px;
  }
  @media screen and (max-width: 450px) {
    width: 50px;
  }
`
const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`

const BtnBack = styled.a`
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: #fff;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`

const Pool = ({ poolId }) => {
  const { account, chainId } = useActiveWeb3React()
  const [isLoading, setIsLoading] = useState(true)
  const [now, setNow] = useState(0)
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const getPoolContract = getPoolsV4Contract(CHAIN_ID)
  const [usersClaimed, setUserClaimed] = useState([])

  const unit = NATIVE[chainId].symbol

  const [poolInfo, setPoolInfo] = useState({
    currentInterest: 0,
    enable: true,
    maxLock: 0,
    minLock: 0,
    timeLock: 0,
    totalLock: 0,
    pid: -1,
    currentRewardV1: 0,
    currentRewardV2: 0,
    currentReward: 0,
    totalReward: 0,
    startTime: 0,
    userClaimedLength: 0,
    userTotalLock: 0,
    rateBNB2USD: 1,
    unit: '',
    minUSD2BNB: 0,
    maxUSD2BNB: 0,
    currentInterestWithMine: 0,
  })

  const [pool, setPool] = useState({
    currentInterest: 0,
    enable: true,
    maxLock: 0,
    minLock: 0,
    timeLock: 0,
    totalLock: 0,
    totalLockUSD: 0,
    pid: -1,
    currentRewardV1: 0,
    currentRewardV2: 0,
    currentReward: 0,
    totalReward: 0,
    totalRewardUSD: 0,
    remainRewardUSD: 0,
    startTime: 0,
    userClaimedLength: 0,
    userTotalLock: 0,
    rateBNB2USD: 1,
    unit: '',
    minUSD2BNB: 0,
    maxUSD2BNB: 0,
    currentInterestWithMine: 0,
  })

  const getPool = async () => {
    try {
      if (!account) {
        setIsLoading(true)
      } else {
        setIsLoading(false)
        const pool = await getPoolContract.pools(poolId)
        const currentReward = await getPoolContract.currentReward(poolId, account)
        const rateBnbUsd = await getPoolContract.MATIC2USDT()
        const users = await getPoolContract.users(account, poolId)
        const minMaxUSD2BNB = await getPoolContract.minMaxUSD2BNB(poolId)
        const getUsersClaimedLength = await getPoolContract.getUsersClaimedLength(poolId, account)
        setPool({
          currentInterest: (Number(pool.currentInterest.toString()) / 10000) * 365,
          enable: pool.enable,
          maxLock: Number(formatEther(pool.maxLock)),
          minLock: Number(formatEther(pool.minLock)),
          timeLock: 1095,
          totalLock: Number(formatEther(pool.totalLock)),
          totalLockUSD: Number(formatEther(users.totalLockUSD)),
          pid: poolId,
          currentRewardV1: Number(formatEther(currentReward)),
          currentRewardV2: 0,
          currentReward: Number(formatEther(currentReward)),
          totalReward: Number(formatEther(users.totalReward)),
          totalRewardUSD: Number(formatEther(users.totalRewardUSD)),
          remainRewardUSD: Number(formatEther(users.remainRewardUSD)),
          startTime: Number(users.startTime),
          userTotalLock: Number(formatEther(users.totalLock)),
          userClaimedLength: Number(getUsersClaimedLength),
          rateBNB2USD: Number(formatEther(rateBnbUsd)),
          unit,
          minUSD2BNB: Number(formatEther(minMaxUSD2BNB._min)),
          maxUSD2BNB: Number(formatEther(minMaxUSD2BNB._max)),
          currentInterestWithMine: (Number(pool.currentInterestWithMine.toString()) / 10000) * 365,
        })
        if (Number(getUsersClaimedLength) > 0)
          getPoolContract.getUsersClaimed(poolId, account, 10, 0).then((res) => {
            console.log(res)
            setUserClaimed(
              res.list.map((claimed: any, i: number) => {
                return {
                  amount: Number(formatEther(claimed.amount)),
                  date: Number(claimed.date.toString()),
                  interest: (Number(claimed.interrest.toString()) / 10000) * 365,
                  currentInterestWithMine: Number(pool.currentInterestWithMine),
                  totalLock: Number(formatEther(claimed.totalLock)),
                  totalLockUSD: Number(formatEther(claimed.totalLockUSD)),
                }
              }),
            )
          })
        setPoolInfo({
          currentInterest: (Number(pool.currentInterest.toString()) / 10000) * 365,
          enable: pool.enable,
          maxLock: Number(formatEther(pool.maxLock)),
          minLock: Number(formatEther(pool.minLock)),
          timeLock: 1095,
          totalLock: Number(formatEther(pool.totalLock)),
          pid: poolId,
          currentRewardV1: Number(formatEther(currentReward)),
          currentRewardV2: Number(formatEther(currentReward)),
          currentReward: Number(formatEther(currentReward)),
          totalReward: Number(formatEther(users.totalReward)),
          startTime: Number(users.startTime),
          userTotalLock: Number(formatEther(users.totalLock)),
          userClaimedLength: Number(getUsersClaimedLength),
          rateBNB2USD: Number(formatEther(rateBnbUsd)),
          unit,
          minUSD2BNB: Number(formatEther(minMaxUSD2BNB._min)),
          maxUSD2BNB: Number(formatEther(minMaxUSD2BNB._max)),
          currentInterestWithMine: (Number(pool.currentInterestWithMine.toString()) / 10000) * 365,
        })
        // setIsLoading(false)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const handleSuccess = () => {
    getPool()
  }
  const [openDepositModal] = useModal(
    <DepositPoolModal pool={poolInfo} onSuccess={handleSuccess} account={account} chainId={chainId} />,
    true,
  )

  const handleOpenDepositModal = () => {
    // if (isRef === true) {
    //   openModalCheckRegisterModal()
    // } else openDepositModal()
    openDepositModal()
  }

  const [openClaimModal] = useModal(
    <ClaimPoolModal account={account} onSuccess={handleSuccess} pool={poolInfo} />,
    true,
  )
  // const [openUnlockModal] = useModal(<WithDrawModal pool={poolInfo} onSuccess={handleSuccess} account={account} />)
  useEffect(() => {
    getPool()
  }, [account])

  useEffect(() => {
    setInterval(() => {
      setNow(moment().unix())
    }, 1000)
  }, [])

  return (
    <PoolDetail>
      {isLoading === true ? (
        <TrendyPageLoader />
      ) : (
        <div className="bg">
          <img
            style={{ position: 'absolute', top: '200px', width: '100%', zIndex: '-1' }}
            src={images.bgV3}
            alt="iconback"
          />
          <PageHeader background="none">
            <BtnBack href="/pools">
              <img src={images.iconback} alt="iconback" />
              Back
            </BtnBack>
            <Flex className="flexx" flex="1" flexDirection="column" mr={['80px', 0, 0]} alignItems="start">
              <PoolName>
                <PoolLogo src={images.bscoin} alt="pool name" />
                <Text className="title" fontSize={['28px', '40px', '42px', '50px', '60px']} fontWeight="700">
                  {unit}
                </Text>
              </PoolName>
              <Heading
                className="headingg"
                scale="md"
                color="text"
                style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'center' }}
              >
                <LinkExternal
                  fontSize={['14px', '16px', '18px', '20px', '22px']}
                  href={getBlockExploreLink(contracts.poolsV3[CHAIN_ID], 'address', CHAIN_ID)}
                  ellipsis={true}
                  color="#fff"
                  style={{ color: '#fff' }}
                >
                  {shortenURL(`Contract: ${contracts.poolsV3[CHAIN_ID]}`, 35)}
                </LinkExternal>
              </Heading>
            </Flex>
          </PageHeader>
          <PageHeader background="none">
            <DetailInfoPool poolInfo={poolInfo} />
          </PageHeader>
          <PageHeader background="none">
            <TableDataPool pool={pool} usersClaimed={usersClaimed} userClaimedLength={poolInfo.userClaimedLength} />
          </PageHeader>

          <Body>
            <ButtonArea>
              <Button
                style={{ color: '#000', backgroundColor: '#D9D9D9' }}
                variant={poolInfo.currentReward > 0 ? 'danger' : 'light'}
                disabled={poolInfo.currentReward === 0}
                width={['120px', '150px', '180px', '200px']}
                height={48}
                onClick={openClaimModal}
                scale={isMobile ? 'sm' : 'md'}
              >
                Claim
              </Button>
              <Button
                style={{ background: 'var(--primary-primary-1, #8544F5)', color: '#ffffff' }}
                width={['120px', '150px', '180px', '200px']}
                height={48}
                onClick={() => handleOpenDepositModal()}
                scale={isMobile ? 'sm' : 'md'}
                disabled={
                  chainId === 97
                    ? poolInfo.startTime > 0 && now - poolInfo.startTime > 3600
                    : poolInfo.startTime > 0 && now - poolInfo.startTime > 604800
                }
              >
                Deposit
              </Button>
            </ButtonArea>
          </Body>
        </div>
      )}
    </PoolDetail>
  )
}
export const PoolDetailLayout: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return <PoolDetail>{children}</PoolDetail>
}
export default Pool
