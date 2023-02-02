import { PropsWithChildren, useState, useEffect } from 'react'
import styled, { ThemeConsumer } from 'styled-components'
import { trendyColors } from 'style/trendyTheme'
import { Table, Th, Td, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { getPoolsContract } from 'utils/contractHelpers'
import CountUp from 'react-countup'
import contracts from 'config/constants/contracts'
import { Pool, timeDisplay } from 'views/Pools2/util'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getContract } from 'utils'
import moment from 'moment'
import { formatEther } from '@ethersproject/units'
import Dots from 'components/Loader/Dots'

// STYLE
const TableContainer = styled.div`
  // max-width: 100%;
  // min-width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: center;
  &.scroll::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &.scroll::-webkit-scrollbar-track {
    background-color: white;
  }
  &.scroll::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background: rgb(0, 240, 225);
  }
  @media screen and (max-width: 480px) {
    overflow-x: auto;
    // white-space: nowrap;
    width: 100%;
    > div > table {
      overflow: auto;
      // white-space: nowrap;
      margin-left: 1.5em;
    }
  }
`

const TableHeader = styled.span`
  font-size: 26px;
`
const TablePool = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: center;
  table > thead {
    tr {
      font-weight: 300;
      bottom-border: 1px solid ${trendyColors.BLACK};
    }
  }
  .left {
    padding-left: 30px;
  }
  width: 800px;
  @media screen and (max-width: 967px) {
    width: 700px;
  }
  @media screen and (max-width: 851px) {
    width: 570px;
  }
  @media screen and (max-width: 575px) {
    width: 100%;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    .hiden {
      display: none;
    }
  }
  @media screen and (max-width: 360px) {
    width: 100%;
    .left {
      padding-left: 60px;
    }
  }
`
const AmountData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
`
const responsiveTextSize = ['11px', '12px', '16px', '18px', '20px']
const responsiveTextSizeBNB = ['9px', '10px', '12px', '14px', '16px']
const responsiveTextSizeHeader = ['16px', '18px', '22px', '26px', '30px']
const TableDataPool: React.FC<PropsWithChildren<{ pool: Pool; userClaimedLength: number }>> = ({
  pool,
  userClaimedLength,
  ...props
}) => {
  const { account, chainId } = useActiveWeb3React()
  const poolsContract = getPoolsContract(chainId)
  const { t } = useTranslation()
  const [usersClaimed, setUserClaimed] = useState([])

  useEffect(() => {
    getPool()
  }, [userClaimedLength])
  const getPool = () => {
    try {
      if (userClaimedLength > 0) {
        poolsContract.getUsersClaimed(pool.pid, account, 10, 0).then((res) => {
          setUserClaimed(
            res.list.map((claimed: any, i: number) => {
              return {
                amount: Number(formatEther(claimed.amount)),
                date: Number(claimed.date.toString()),
                interest: (Number(claimed.interrest.toString()) / 10000) * 365,
                totalLock: Number(formatEther(claimed.totalLock)),
              }
            }),
          )
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  const renderClaimHistory = () => {
    return (
      <>
        {pool.totalLock > 0 && (
          <tr>
            <Td textAlign={'right'} className="hiden">
              <Text fontSize={responsiveTextSize}>Total</Text>
            </Td>
            <Td textAlign={'right'}>
              <Text fontSize={responsiveTextSize}>
                <CountUp
                  start={0}
                  preserveValue
                  delay={0}
                  end={Number(pool.currentInterest)}
                  decimals={2}
                  duration={0.5}
                ></CountUp>
              </Text>
            </Td>
            <Td textAlign={'right'}>
              {pool.userTotalLock === 0 ? (
                <Text fontSize={responsiveTextSize}>0</Text>
              ) : (
                <AmountData>
                  <Text fontSize={responsiveTextSize}>
                    ~
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={pool.userTotalLock * pool.rateBNB2USD}
                      decimals={pool.userTotalLock > 0 ? 2 : 0}
                      duration={0.5}
                      style={{ marginRight: 6 }}
                    />
                    $
                  </Text>
                  <Text
                    fontSize={responsiveTextSizeBNB}
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 6 }}
                  >
                    ~
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={pool.userTotalLock}
                      decimals={pool.userTotalLock > 0 ? 2 : 0}
                      duration={0.5}
                    />
                    <img src={`/images/chains/${chainId}.png`} alt="pool name" width={18} />
                  </Text>
                </AmountData>
              )}
            </Td>
            <Td textAlign={'right'}>
              {pool.currentReward === 0 ? (
                <Text fontSize={responsiveTextSize}>0</Text>
              ) : (
                <AmountData>
                  <Text fontSize={responsiveTextSize}>
                    ~
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={pool.currentReward * pool.rateBNB2USD}
                      decimals={pool.currentReward > 0 ? 2 : 0}
                      duration={0.5}
                      style={{ marginRight: 6 }}
                    />
                    $
                  </Text>
                  <Text
                    fontSize={responsiveTextSizeBNB}
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 6 }}
                  >
                    ~
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={pool.currentReward}
                      decimals={pool.currentReward > 0 ? 2 : 0}
                      duration={0.5}
                    />
                    <img src={`/images/chains/${chainId}.png`} alt="pool name" width={18} />
                  </Text>
                </AmountData>
              )}
            </Td>
            <Td textAlign={'center'}>
              <Text fontSize={responsiveTextSize}>
                <span>{pool.currentReward <= 0 ? 'Waiting' : 'Claimable'}</span>
              </Text>
            </Td>
          </tr>
        )}
        {renderHistory()}
      </>
    )
  }
  const renderHistory = () => {
    return (
      <>
        {userClaimedLength > 0 &&
          usersClaimed.map((claimHistory, index) => {
            return (
              <tr key={index}>
                <Td textAlign={'right'}>
                  <Text fontSize={responsiveTextSize}> {moment.unix(claimHistory.date * 86400).format('L')}</Text>
                </Td>
                <Td textAlign={'right'}>
                  <Text fontSize={responsiveTextSize}> {claimHistory.interest}</Text>
                </Td>
                <Td textAlign={'right'}>
                  {claimHistory.totalLock === 0 ? (
                    <Text fontSize={responsiveTextSize}>0</Text>
                  ) : (
                    <AmountData>
                      <Text fontSize={responsiveTextSize}>
                        ~
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={claimHistory.totalLock * pool.rateBNB2USD}
                          decimals={claimHistory.totalLock > 0 ? 2 : 0}
                          duration={0.5}
                        />
                        $
                      </Text>
                      <Text fontSize={responsiveTextSizeBNB}>
                        ~
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={claimHistory.totalLock}
                          decimals={claimHistory.totalLock > 0 ? 2 : 0}
                          duration={0.5}
                        />
                        {pool.unit}
                      </Text>
                    </AmountData>
                  )}
                </Td>
                <Td textAlign={'right'}>
                  {claimHistory.amount === 0 ? (
                    <Text fontSize={responsiveTextSize}>0</Text>
                  ) : (
                    <AmountData>
                      <Text fontSize={responsiveTextSize}>
                        ~
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={claimHistory.amount * pool.rateBNB2USD}
                          decimals={claimHistory.amount > 0 ? 4 : 0}
                          duration={0.5}
                        />
                        $
                      </Text>
                      <Text fontSize={responsiveTextSizeBNB}>
                        ~
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={claimHistory.amount}
                          decimals={claimHistory.amount > 0 ? 4 : 0}
                          duration={0.5}
                        />
                        {pool.unit}
                      </Text>
                    </AmountData>
                  )}
                </Td>
                <Td textAlign={'center'}>
                  <Text fontSize={responsiveTextSize}>Claimed</Text>
                </Td>
              </tr>
            )
          })}
      </>
    )
  }

  return (
    <>
      <TableHeader>
        <Text fontSize={responsiveTextSizeHeader}>Your Income </Text>
      </TableHeader>
      <TableContainer>
        <TablePool>
          <Table>
            <thead>
              <tr>
                <Th textAlign="right" className="hiden">
                  <Text color={trendyColors.DARK_PURPLE} fontSize={responsiveTextSize} textTransform="capitalize">
                    Date Time
                  </Text>
                </Th>
                <Th textAlign="right" className="left">
                  <Text color={trendyColors.DARK_PURPLE} fontSize={responsiveTextSize} textTransform="capitalize">
                    Interest (%)
                  </Text>
                </Th>
                <Th textAlign="right">
                  <Text color={trendyColors.DARK_PURPLE} fontSize={responsiveTextSize} textTransform="capitalize">
                    Your Lock
                  </Text>
                </Th>
                <Th textAlign="right">
                  <Text color={trendyColors.DARK_PURPLE} fontSize={responsiveTextSize} textTransform="capitalize">
                    Your Income
                  </Text>
                </Th>
                <Th textAlign="center">
                  <Text color={trendyColors.DARK_PURPLE} fontSize={responsiveTextSize} textTransform="capitalize">
                    Action
                  </Text>
                </Th>
              </tr>
            </thead>
            <tbody>
              <>{renderClaimHistory()}</>
            </tbody>
          </Table>
        </TablePool>
      </TableContainer>
    </>
  )
}
export default TableDataPool
