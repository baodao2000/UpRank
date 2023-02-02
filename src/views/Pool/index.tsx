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
import { shortenURL } from 'views/Pools2/util'
import moment from 'moment'
import { ModalCheckRegister } from 'components/ModalRegister/ModalCheckRegister'
import { ModalRegister } from 'components/ModalRegister'
import refferalAbi from 'config/abi/refferal.json'
import { getContract, getPoolsContract } from 'utils/contractHelpers'
import { trendyColors } from 'style/trendyTheme'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'
import ClaimPoolModal from './components/ClaimModal'
import WithDrawModal from './components/WithDrawModal'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import TableDataPool from './components/TableData'
import DetailInfoPool from './components/DetailInfo'
import DepositPoolModal from './components/DepositModal'
import { ChainId, NATIVE } from '../../../packages/swap-sdk/src/constants'

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

const StyledButton = styled(Button)`
  color: white;
`

const Pool = ({ poolId }) => {
  const { account, chainId, chain } = useActiveWeb3React()
  const [isLoading, setIsLoading] = useState(true)
  const [isRef, setIsRef] = useState(false)
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const getPoolContract = getPoolsContract(CHAIN_ID)
  const refferCT = getContract({
    address: contracts.refferal[CHAIN_ID],
    abi: refferalAbi,
    chainId: CHAIN_ID,
  })
  const isETHW = chainId === ChainId.ETHW
  const unit = NATIVE[chainId].symbol
  const [poolInfo, setPoolInfo] = useState({
    currentInterest: 0,
    enable: true,
    maxLock: 0,
    minLock: 0,
    timeLock: 0,
    totalLock: 0,
    pid: -1,
    currentReward: 0,
    totalReward: 0,
    startTime: 0,
    userClaimedLength: 0,
    userTotalLock: 0,
    rateBNB2USD: 1,
    unit: '',
    minUSD2BNB: 0,
    maxUSD2BNB: 0,
  })
  const [isUnLockable, setIsUnLockable] = useState(false)
  const [openModalCheckRegisterModal] = useModal(<ModalCheckRegister />, false, false, 'removeModalCheckRegister')

  const getPool = async () => {
    try {
      const pool = await getPoolContract.pools(poolId)
      const currentReward = await getPoolContract.currentReward(poolId, account)
      const rateBnbUsd = await getPoolContract.bnbPrice()
      const users = await getPoolContract.users(account, poolId)
      const minMaxUSD2BNB = await getPoolContract.minMaxUSD2BNB(poolId)
      const getUsersClaimedLength = await getPoolContract.getUsersClaimedLength(poolId, account)
      setPoolInfo({
        currentInterest: (Number(pool.currentInterest.toString()) / 10000) * 365,
        enable: pool.enable,
        maxLock: Number(formatEther(pool.maxLock)),
        minLock: Number(formatEther(pool.minLock)),
        timeLock: pool.timeLock.toString(),
        totalLock: Number(formatEther(pool.totalLock)),
        pid: poolId,
        currentReward: Number(formatEther(currentReward)),
        totalReward: Number(formatEther(users.totalReward)),
        startTime: Number(users.startTime),
        userTotalLock: Number(formatEther(users.totalLock)),
        userClaimedLength: Number(getUsersClaimedLength),
        rateBNB2USD: Number(formatEther(rateBnbUsd[0])) / Number(formatEther(rateBnbUsd[1])),
        unit,
        minUSD2BNB: Number(formatEther(minMaxUSD2BNB._min)),
        maxUSD2BNB: Number(formatEther(minMaxUSD2BNB._max)),
      })
      setIsUnLockable(Number(users.startTime) > 0 && moment().unix() - Number(users.startTime) > pool.timeLock)
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }
  const handleSuccess = () => {
    getPool()
  }
  const [openDepositModal] = useModal(
    <DepositPoolModal pool={poolInfo} onSuccess={handleSuccess} account={account} />,
    true,
  )

  // ===> check to open registration modal
  const handleOpenDepositModal = () => {
    if (isRef === true) {
      openModalCheckRegisterModal()
    } else openDepositModal()
  }

  // ===> handle when click Deposit Button
  const checkRegisAccount = async () => {
    if (account) {
      const a = await refferCT.isReferrer(account)
      setIsRef(!a)
    }
  }

  const [openClaimModal] = useModal(
    <ClaimPoolModal account={account} onSuccess={handleSuccess} pool={poolInfo} />,
    true,
  )
  const [openUnlockModal] = useModal(<WithDrawModal pool={poolInfo} onSuccess={handleSuccess} account={account} />)
  useEffect(() => {
    getPool()
    checkRegisAccount()
  }, [account])

  return (
    <PoolDetail>
      {' '}
      {isLoading ? (
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
                  href={getBlockExploreLink(contracts.pools[CHAIN_ID], 'address', CHAIN_ID)}
                  ellipsis={true}
                  color="#00F0E1"
                  style={{ color: '#00F0E1' }}
                >
                  {shortenURL(`Contract: ${contracts.pools[CHAIN_ID]}`, 35)}
                </LinkExternal>
              </Heading>
            </Flex>
          </PageHeader>
          <Body>
            <DetailInfoPool poolInfo={poolInfo} />
            <TableDataPool pool={poolInfo} userClaimedLength={poolInfo.userClaimedLength} />
            <ButtonArea>
              <Button
                variant="primary"
                width={['120px', '150px', '180px', '200px']}
                onClick={() => handleOpenDepositModal()}
                scale={isMobile ? 'sm' : 'md'}
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
              {isUnLockable && (
                <Button
                  variant="subtle"
                  width={['120px', '150px', '180px', '200px']}
                  onClick={openUnlockModal}
                  scale={isMobile ? 'sm' : 'md'}
                >
                  Unlock
                </Button>
              )}
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
