import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Heading, Flex, useModal, LinkExternal, useToast } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import moment from 'moment'
import { getPoolsAddress } from 'utils/addressHelpers'
import truncateHash from '@pancakeswap/utils/truncateHash'
import { formatEther } from '@ethersproject/units'
import addresses from 'config/constants/contracts'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import useConfirmTransaction from 'hooks/useConfirmTransaction'
import { ToastDescriptionWithTx } from 'components/Toast'
import { usePoolsContract } from 'hooks/useContract'
import { getBlockExploreLink } from 'utils'
import PageLoader from 'components/Loader/TrendyLoader'
import DepositPoolModal from './components/DepositModal'
import ClaimModal from './components/ClaimModal'
import BlockCardIncome from './components/BlockCardIncome'
import BlockTotalCard, { StyledButton } from './components/BlockTotalCard'

const PoolPage = styled.div`
  display: flex;
  width: 100%;
  max-width: 1234px;
  margin: 0 auto;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;
  padding: 28px 25px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 0;
  }
`

const StyledSubtitle = styled(LinkExternal)`
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  line-height: 135%;
  margin-bottom: 20px;
  margin: 0 auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
    line-height: 135%;
    margin-bottom: 38px;
  }
`

const StyledHeading = styled(Heading)`
  width: 100%;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  background: linear-gradient(117.55deg, #557af1 -3.69%, #c1d0ff 98.81%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin-top: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 64px;
    line-height: 78px;
  }
`

const WrapperCard = styled(Flex)`
  width: 100%;
  margin-top: 20px;
`

const WrapperButton = styled(Flex)`
  //margin-top: 25px;
  width: 100%;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.md} {
    //margin-top: 50px;
    flex-direction: row;
    justify-content: space-between;
  }
`

const CustomStyledButton = styled(StyledButton)`
  margin-bottom: 22px;
  background: linear-gradient(135deg, #105eec 0%, #061428 100%);

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0;
  }
`

const Pool2 = ({ poolId }) => {
  const { chainId, account } = useActiveWeb3React()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const poolsAddress = getPoolsAddress(chainId)
  const poolsContract = usePoolsContract()
  const { toastSuccess } = useToast()
  const [pool, setPool] = useState({
    minStake: 0,
    currentInterest: 0,
    earlyWDInterest: 0,
    earlyWDFee: 0,
    timeLock: 0,
    totalLock: 0,
    enable: false,
    currentReward: 0,
    totalReward: 0,
    startTime: 0,
    userTotalLock: 0,
    pid: 0,
    unit: 'SOW',
  })
  const [usersClaim, setUsersClaim] = useState([])
  const [limit, setLimit] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isDisableClaim, setIsDisableClaim] = useState(false)
  const getPoolDetail = async () => {
    try {
      const poolData = await poolsContract.pools(poolId)
      const users = await poolsContract.getUser(poolId, account)
      const earlyWDFee = await poolsContract.panaltyFee()
      const interestDecimal = await poolsContract.interestDecimal()
      const minSOWLock = await poolsContract.busd2Token(addresses.sow[chainId], poolData.minLock)
      const interestPeriod = await poolsContract.interestPeriod().then((rs) => rs.toNumber(rs))
      const days = await poolsContract.getDays().then((rs) => rs.toNumber(rs))
      const usersClaimedLength = await poolsContract
        .getUsersClaimedLength(poolId, account)
        .then((rs) => rs.toNumber(rs))
      const userClaimed =
        usersClaimedLength === 0
          ? { date: 0, amount: 0, totalLock: 0, interrest: 0 }
          : await poolsContract.userClaimed(account, poolId, usersClaimedLength - 1)
      // console.log(userClaimed)
      const formatPool = {
        minStake: Math.ceil(Number(formatEther(minSOWLock)) * 100) / 100,
        currentInterest: (poolData.currentInterest.toString() * 365) / 10e3,
        earlyWDInterest: (poolData.earlyWDInterest.toString() * 365) / 10e3,
        earlyWDFee: (earlyWDFee / interestDecimal) * 100,
        timeLock: poolData.timeLock.toString(),
        totalLock: Number(formatEther(poolData.totalLock)).toFixed(2),
        totalLockAsset: Number(formatEther(poolData.totalLockAsset)).toFixed(2),
        enable: poolData.enable,
        currentReward: Number(formatEther(users._currentReward)),
        totalReward: Number(formatEther(users._user.totalReward)),
        startTime: Number(users._user.startTime),
        userTotalLock: Number(formatEther(users._user.totalLock)).toFixed(2),
        userTotalLockAsset: Number(formatEther(users._user.totalLockAsset)).toFixed(2),

        pid: poolId,
        unit: 'SOW',
      }
      // @ts-ignore
      setPool(formatPool)
      // console.log(formatPool.timeLock, formatPool.startTime)

      setIsDisableClaim(days - users._user.startTime.toNumber() / interestPeriod - userClaimed.date.toNumber < 90)
      setIsLoading(false)
    } catch (e) {
      console.error(e)
    }
  }
  const [openDepositModal, closeDeposit] = useModal(
    <DepositPoolModal pool={pool} onSuccess={getPoolDetail} account={account} reload={getPoolDetail} />,
    true,
  )

  const { isConfirming, handleConfirm: unStake } = useConfirmTransaction({
    onConfirm: async () => {
      const tx = await poolsContract.withdraw(poolId)
      return tx
    },
    onSuccess: async ({ receipt }) => {
      await getPoolDetail()
      toastSuccess('Unstake successfully !', <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
    },
  })
  const { isConfirming: isConfirmingClaim, handleConfirm: claim } = useConfirmTransaction({
    onConfirm: async () => {
      const tx = await poolsContract.claimRewardFor6912(poolId)
      return tx
    },
    onSuccess: async ({ receipt }) => {
      await getPoolDetail()
      toastSuccess('Claim successfully !', <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
    },
  })
  useEffect(() => {
    getPoolDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <PoolPage>
      {isLoading && <PageLoader />}
      <StyledHeading textAlign="center" textTransform="uppercase">
        SOW
      </StyledHeading>
      <StyledSubtitle href={getBlockExploreLink(poolsAddress, 'address', chainId)} color="#FFFFFF">
        Contract: {truncateHash(poolsAddress, 6, 6)}
      </StyledSubtitle>
      <WrapperCard flexDirection="column">
        <BlockTotalCard pool={pool} />
        <WrapperButton>
          <CustomStyledButton onClick={openDepositModal}>Stake</CustomStyledButton>
          <CustomStyledButton onClick={unStake} disabled={+pool.userTotalLock === 0 || isConfirming}>
            Unstake
          </CustomStyledButton>
          {pool.currentReward > 0 && poolId > 1 && pool.timeLock > moment().unix() - pool.startTime && (
            <CustomStyledButton onClick={claim} disabled={isDisableClaim || isConfirmingClaim}>
              Claim
            </CustomStyledButton>
          )}
        </WrapperButton>
      </WrapperCard>
    </PoolPage>
  )
}

export default Pool2
