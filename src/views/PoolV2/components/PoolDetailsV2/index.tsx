import { Button, Flex, Heading, LinkExternal, useModal, Text } from '@pancakeswap/uikit'
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
import { getPoolsV3Contract } from 'utils/contractHelpers'
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
  .headingg {
    margin-left: 105px;
    @media (max-width: 557px) {
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
  // width: 1000px;
  // @media screen and (max-width: 967px) {
  //   width: 700px;
  // }
  // @media screen and (max-width: 851px) {
  //   width: 570px;
  // }
  // @media screen and (max-width: 575px) {
  //   width: 100%;
  // }
  // display: flex;
  // justify-content: space-evenly;
  // @media screen and (max-width: 851px) {
  //   flex-direction: column;
  //   align-items: center;
  //   gap: 20px;
  // }
`
const NoteDeposit = styled.span`
  color: #fff;
  //background: #ffffcc;
  max-width: 600px;
  padding: 16px;
  border-radius: 10px;
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
  // account = '0xe024af9AD5518468abFb617eEAbE10219498ee50'
  const [isLoading, setIsLoading] = useState(true)
  const [now, setNow] = useState(0)
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const getPoolContract = getPoolsV3Contract(CHAIN_ID)

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
  const getNoteDeposit = () => {
    let note
    if (chainId === 97 && now - poolInfo.startTime > 3600) {
      note = (
        <NoteDeposit>
          <i>
            <b>Please note:</b> after <b style={{ textDecoration: 'underline' }}>{timeDisplayLong(3600)}</b> of deposit,
            you can&apos;t add more to this pool. If you would like to stake more, you can stake a different wallet or a
            different pool.
          </i>
        </NoteDeposit>
      )
    } else if (chainId === 137 && now - poolInfo.startTime > 604800) {
      note = (
        <NoteDeposit>
          <i>
            <b>Please note:</b> after <b style={{ textDecoration: 'underline' }}>{timeDisplayLong(604800)}</b> of
            deposit, you can&apos;t add more to this pool. If you would like to stake more, you can stake a different
            wallet or a different pool.
          </i>
        </NoteDeposit>
      )
    } else {
      note = null
    }
    return note
  }

  const getPool = async () => {
    try {
      if (!account) {
        setIsLoading(true)
      } else {
        setIsLoading(false)
        // const account = '0x5B0B6Bc92Ac002AB85512619b884738d22CcB3B6'
        const pool = await getPoolContract.pools(poolId)
        // const pool2 = await getPoolV2Contract.pools(poolId)
        const currentReward = await getPoolContract.currentReward(poolId, account)
        // const currentReward2 = await getPoolV2Contract.currentReward(poolId, account)
        const rateBnbUsd = await getPoolContract.MATIC2USDT()
        const users = await getPoolContract.users(account, poolId)
        // const users2 = await getPoolV2Contract.users(account, poolId)
        const minMaxUSD2BNB = await getPoolContract.minMaxUSD2BNB(poolId)
        const getUsersClaimedLength = await getPoolContract.getUsersClaimedLength(poolId, account)
        // const getUsersClaimedLength2 = await getPoolV2Contract.getUsersClaimedLength(poolId, account)
        setPool({
          currentInterest: (Number(pool.currentInterest.toString()) / 10000) * 365,
          enable: pool.enable,
          maxLock: Number(formatEther(pool.maxLock)),
          minLock: Number(formatEther(pool.minLock)),
          timeLock: 1095,
          totalLock: Number(formatEther(pool.totalLock)),
          pid: poolId,
          currentRewardV1: Number(formatEther(currentReward)),
          currentRewardV2: 0,
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
            <BtnBack href="/poolv2">
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
              <Heading className="headingg" scale="md" color="text">
                <LinkExternal
                  fontSize={['14px', '16px', '18px', '20px', '20px']}
                  href={getBlockExploreLink(contracts.poolsV3[CHAIN_ID], 'address', CHAIN_ID)}
                  ellipsis={true}
                  color="#ffffff"
                  style={{ color: '#ffffff' }}
                >
                  <span>Root Contract:</span>
                  {shortenURL(`${contracts.poolsV3[CHAIN_ID]}`, 20)}
                </LinkExternal>
                <span
                  style={{
                    paddingLeft: '12px',
                    fontSize: '14px',
                    lineHeight: '20xp',
                    fontWeight: '400',
                    color: '#8544F5',
                  }}
                >
                  Check Details
                </span>
                {/* <LinkExternal
                  fontSize={['14px', '16px', '18px', '20px', '22px']}
                  href={getBlockExploreLink(contracts.poolsV2[CHAIN_ID], 'address', CHAIN_ID)}
                  ellipsis={true}
                  color="#00F0E1"
                  style={{ color: '#00F0E1' }}
                >
                  {shortenURL(`Root Contract 2: ${contracts.poolsV2[CHAIN_ID]}`, 35)}
                </LinkExternal> */}
              </Heading>
            </Flex>
          </PageHeader>
          <PageHeader background="none">
            <DetailInfoPool poolInfo={poolInfo} />
          </PageHeader>
          <PageHeader background="none">
            <TableDataPool pool={pool} userClaimedLength={poolInfo.userClaimedLength} />
          </PageHeader>

          <Body>
            {getNoteDeposit()}
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
                // variant="primary"
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
