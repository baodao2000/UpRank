import { Button, Flex, Heading, LinkExternal, useModal, Text } from '@pancakeswap/uikit'
import PageHeader from 'components/PageHeader'
import styled from 'styled-components'
import images from 'configs/images'
import { FC, useEffect, useState } from 'react'
import contracts from 'config/constants/contracts'
import BigNumber from 'bignumber.js'
import { isMobile } from 'react-device-detect'
import { formatEther } from '@ethersproject/units'
import { getBlockExploreLink, getBlockExploreName } from 'utils'
import { shortenURL, timeDisplayLong } from 'views/Pools2/util'
import moment from 'moment'
import { ModalCheckRegister } from 'components/ModalRegister/ModalCheckRegister'
import { ModalRegister } from 'components/ModalRegister'
import refferalAbi from 'config/abi/refferal.json'
import { getContract, getPoolsContract, getPoolsV2Contract, getPoolsV3Contract } from 'utils/contractHelpers'
import { trendyColors } from 'style/trendyTheme'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'
import ClaimPoolModal from './ClaimModal'
import WithDrawModal from './WithDrawModal'
import TableDataPool from './TableData'
import DetailInfoPool from './DetailInfo'
import DepositPoolModal from './DepositModal'
import { ChainId, NATIVE } from '../../../../../packages/swap-sdk/src/constants'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

// ============= STYLED
const PoolDetail = styled.div`
  background: url(${images.backgroundpool}) #1e1e1e no-repeat bottom;
  background-size: contain;
  * {
    font-family: Helvetica, sans-serif;
  }
  @media screen and (max-width: 768px) {
    background: url(${images.backgroundpool}) #1e1e1e no-repeat bottom;
    background-size: fixed;
  }
`
const Body = styled.div`
  background: none;
  padding: 70px;
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
  width: 1000px;
  @media screen and (max-width: 967px) {
    width: 700px;
  }
  @media screen and (max-width: 851px) {
    width: 570px;
  }
  @media screen and (max-width: 575px) {
    width: 100%;
  }
  display: flex;
  justify-content: space-evenly;
  @media screen and (max-width: 851px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`

const NoteDeposit = styled.span`
  color: #fff;
  //background: #ffffcc;
  max-width: 600px;
  padding: 16px;
  border-radius: 10px;
`

const Pool = ({ poolId }) => {
  const { account, chainId } = useActiveWeb3React()
  const [isLoading, setIsLoading] = useState(true)
  const [now, setNow] = useState(0)
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const getPoolContract = getPoolsV3Contract(CHAIN_ID)
  const getPoolV2Contract = getPoolsV3Contract(CHAIN_ID)

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
        // console.log(Number(users2.startTime))
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

      // console.log(Number(formatEther(currentReward)), Number(formatEther(currentReward2)))
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

  // ===> check to open registration modal
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
        <>
          <PageHeader background="none">
            <Flex flex="1" flexDirection="column" mr={['8px', 0]} alignItems="center">
              <PoolName>
                <PoolLogo src={`/images/chains/${chainId}.png`} alt="pool name" />
                <Text fontSize={['28px', '40px', '42px', '50px', '70px']} fontWeight="600">
                  {unit}
                </Text>
              </PoolName>
              <Heading scale="md" color="text">
                <LinkExternal
                  fontSize={['14px', '16px', '18px', '20px', '22px']}
                  href={getBlockExploreLink(contracts.poolsV3[CHAIN_ID], 'address', CHAIN_ID)}
                  ellipsis={true}
                  color="#00F0E1"
                  style={{ color: '#00F0E1' }}
                >
                  {shortenURL(`Root Contract: ${contracts.poolsV3[CHAIN_ID]}`, 35)}
                </LinkExternal>
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
          <Body>
            <DetailInfoPool poolInfo={poolInfo} />
            {getNoteDeposit()}
            <TableDataPool pool={pool} userClaimedLength={poolInfo.userClaimedLength} />
            <ButtonArea>
              <Button
                variant="primary"
                width={['120px', '150px', '180px', '200px']}
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
              <Button
                style={{ color: '#6216B0', backgroundColor: '#D9D9D9' }}
                variant={poolInfo.currentReward > 0 ? 'danger' : 'light'}
                disabled={poolInfo.currentReward === 0}
                width={['120px', '150px', '180px', '200px']}
                onClick={openClaimModal}
                scale={isMobile ? 'sm' : 'md'}
              >
                Claim
              </Button>
            </ButtonArea>
          </Body>
        </>
      )}
    </PoolDetail>
  )
}
export const PoolDetailLayout: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return <PoolDetail>{children}</PoolDetail>
}
export default Pool
