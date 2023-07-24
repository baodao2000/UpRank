import { Button, Flex, Heading, LinkExternal, Text, useMatchBreakpoints, useToast } from '@pancakeswap/uikit'
import contracts from 'config/constants/contracts'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useBalance, useSigner } from 'wagmi'
import { ChainId, NATIVE } from '../../../packages/swap-sdk/src/constants'
import { formatBigNumber } from 'utils/formatBalance'
import { useEffect, useState } from 'react'
import { formatEther } from '@ethersproject/units'
import { getPoolsContract, getPoolsV2Contract, getPoolsV4Contract } from 'utils/contractHelpers'
import PoolsV2 from 'views/PoolV2'
import Pools from 'views/Pools2'
import images from 'configs/images'
import { getBlockExploreLink } from 'utils'
import { shortenURL } from 'views/PoolV2/util'

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
  @media screen and (max-width: 575px) {
    padding: 40px 16px;
  }
  @media screen and (max-width: 1440px) {
    padding: 40px;
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
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`
const Total = styled(Text)`
  color: var(--white-white, #fff);
  text-align: right;
  /* Display lg/Semibold */
  font-family: Inter;
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
  font-family: Inter;
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
  curosr: pointer;
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
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 38px;
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
  }
  @media screen and (max-width: 575px) {
    flex-wrap: wrap;
  }
`
const PoolV3 = () => {
  const { account, chainId } = useActiveWeb3React()
  const [getBalance, setGetBlance] = useState(0)
  const [pool, setPool] = useState('poolV2')
  const [rateBnbUsd, setRateBnbUsd] = useState(0)
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const getPoolContract = getPoolsContract(CHAIN_ID)
  const getPoolV2Contract = getPoolsV2Contract(CHAIN_ID)
  const getPoolV3Contract = getPoolsV4Contract(CHAIN_ID)
  const { isMobile } = useMatchBreakpoints()

  const { data, isFetched } = useBalance({
    addressOrName: pool === 'poolV1' ? contracts.pools[CHAIN_ID] : contracts.poolsV4[CHAIN_ID],
  })
  useEffect(() => {
    CheckBalance()
  }, [pool, data.value])

  const { data: data2, isFetched: isFetched2 } = useBalance({
    addressOrName: contracts.poolsV2[CHAIN_ID],
  })
  const CheckBalance = async () => {
    if (pool === 'poolV1' && data) {
      const bnbPrice = await getPoolContract.bnbPrice()
      setRateBnbUsd(Number(formatEther(bnbPrice[0])) / Number(formatEther(bnbPrice[1])))
      const balance =
        isFetched && data && data.value && isFetched2 && data2 && data2.value
          ? formatBigNumber(data.value.add(data2.value), 6)
          : 0
      setGetBlance(Number(balance))
      console.log('dsdsds')
    } else if (pool === 'poolV2') {
      const bnbPrice = await getPoolV3Contract.MATIC2USDT()
      setRateBnbUsd(Number(formatEther(bnbPrice)))
      const balance = isFetched && data && data.value ? formatBigNumber(data.value, 6) : 0
      setGetBlance(Number(balance))
    }
  }
  return (
    <>
      <Wraper>
        <Head>
          <Left>
            <StyledHead>Pools</StyledHead>
            <StyledSubtitle>
              Pooling resources or assets from multiple participants in a collective manner, often seen in decentralized
              finance (DeFi) ecosystems, to enhance liquidity, generate returns, or facilitate shared investments.
            </StyledSubtitle>
            <Version>
              <Text
                style={{ cursor: 'pointer' }}
                onClick={() => setPool('poolV1')}
                fontSize="16px"
                fontWeight="500"
                lineHeight="20px"
              >
                Pool Version 1
              </Text>
              <Text
                style={{ cursor: 'pointer' }}
                onClick={() => setPool('poolV2')}
                fontSize="16px"
                fontWeight="500"
                lineHeight="20px"
              >
                Pool Version 2
              </Text>
            </Version>
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
                end={Number(getBalance)}
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
                  end={Number(getBalance * rateBnbUsd)}
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
              These Pool Rewards are only for Referral. Let invite your friends and get our rewards{' '}
              <span className="link">Invite Now</span>
            </LabelContent>
            {pool === 'poolV2' && (
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
            )}
            {pool === 'poolV1' && (
              <>
                <LabelContent>
                  <span style={{ color: 'rgba(173, 171, 178, 1)' }}>Root Contract:</span>
                  <LinkExternal
                    fontSize="14px"
                    href={getBlockExploreLink(contracts.pools[CHAIN_ID], 'address', CHAIN_ID)}
                    ellipsis={true}
                    style={{ color: 'rgba(249, 249, 249, 1)' }}
                    color="#00F0E1"
                  >
                    {shortenURL(`${contracts.pools[CHAIN_ID]}`, 18)}
                  </LinkExternal>
                  <a href={getBlockExploreLink(contracts.pools[CHAIN_ID], 'address', CHAIN_ID)} className="link">
                    Check Details
                  </a>{' '}
                </LabelContent>
                <LabelContent>
                  <span style={{ color: 'rgba(173, 171, 178, 1)' }}>Root Contract:</span>
                  <LinkExternal
                    fontSize="14px"
                    href={getBlockExploreLink(contracts.poolsV2[CHAIN_ID], 'address', CHAIN_ID)}
                    ellipsis={true}
                    style={{ color: 'rgba(249, 249, 249, 1)' }}
                    color="#00F0E1"
                  >
                    {shortenURL(`${contracts.poolsV2[CHAIN_ID]}`, 18)}
                  </LinkExternal>
                  <a href={getBlockExploreLink(contracts.poolsV2[CHAIN_ID], 'address', CHAIN_ID)} className="link">
                    Check Details
                  </a>{' '}
                </LabelContent>
              </>
            )}
          </div>
          {isMobile ? null : <img className="pool" src="./images/V3/pools.svg" />}
        </HeadContent>
        {isMobile ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <img src="./images/V3/pools.svg" />
          </div>
        ) : null}
        {pool === 'poolV2' && <PoolsV2 />}
        {pool === 'poolV1' && <Pools />}
      </Wraper>
    </>
  )
}
export default PoolV3
