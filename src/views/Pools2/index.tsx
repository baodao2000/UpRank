import { useEffect, useState } from 'react'
import numeral from 'numeral'
import Page from 'components/Layout/Page'
import styled from 'styled-components'
import { formatEther } from '@ethersproject/units'
import { Heading, Flex, Image, Text, Link, LinkExternal } from '@pancakeswap/uikit'
import { getPoolsContract } from 'utils/contractHelpers'
import { getPoolsAddress } from 'utils/addressHelpers'
import { useERC20 } from 'hooks/useContract'
import { getBlockExploreLink } from 'utils'
import truncateHash from '@pancakeswap/utils/truncateHash'
import addresses from 'config/constants/contracts'
import PageLoader from 'components/Loader/TrendyLoader'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'
import CardPool from './components/CardPool'

const PoolsPage = styled.div`
  display: flex;
  width: 100%;
  max-width: 1335px;
  height: 100%;
  margin: 0 auto;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;
  padding: 0 57px;

  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
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

const WrapperListCard = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  flex-direction: column;
  margin-top: 20px;
  flex-wrap: wrap;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const Pools2 = () => {
  const { chainId } = useActiveWeb3React()
  const poolsContract = getPoolsContract(chainId)
  const poolsAddress = getPoolsAddress(chainId)
  const [pools, setPools] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalLock, setTotalLock] = useState({
    sow: 0,
    busd: 0,
  })
  console.log(chainId)
  const SOWContract = useERC20(addresses.sow[chainId])
  const getPools = async () => {
    const data = await poolsContract.getPools([0, 1, 2, 3, 4])
    const totalLockSOW = await SOWContract.balanceOf(poolsAddress)
    const totalLockBUSD =
      totalLockSOW.toString() === '0'
        ? 0
        : await poolsContract.token2Busd(addresses.sow[chainId], totalLockSOW.toString())
    setTotalLock({ sow: Number(formatEther(totalLockSOW)), busd: Number(formatEther(totalLockBUSD)) })
    const formatPools = data.map((pool) => ({
      tokenStake: 'SOW',
      image: '/images/pools2/subcoin1.png',
      currentInterest: Math.round((pool.currentInterest.toString() * 365) / 10e3),
      earlyWDInterest: Math.round((pool.earlyWDInterest.toString() * 365) / 10e3),
      minStake: formatEther(pool.minLock),
      timeLock: pool.timeLock.toString(),
      totalLock: Number(formatEther(pool.totalLock)).toFixed(2),
      enable: pool.enable,
    }))
    setPools(formatPools)
    setIsLoading(false)
  }
  useEffect(() => {
    getPools()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])
  if (isLoading) return <PageLoader />
  return (
    <PoolsPage>
      <StyledHeading textAlign="center">
        Total Lock: {numeral(totalLock.sow).format('0,0.00')} SOW ~ {numeral(totalLock.busd).format('0,0.00')} BUSD
      </StyledHeading>
      <StyledSubtitle href={getBlockExploreLink(poolsAddress, 'address', chainId)}>
        Contract: {truncateHash(poolsAddress, 6, 6)}
      </StyledSubtitle>
      <WrapperListCard>
        {pools.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CardPool key={index} pool={item} id={index} />
        ))}
      </WrapperListCard>
    </PoolsPage>
  )
}

export default Pools2
