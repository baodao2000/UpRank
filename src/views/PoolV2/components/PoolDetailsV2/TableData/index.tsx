import { PropsWithChildren, useState, useEffect } from 'react'
import styled from 'styled-components'
import { trendyColors } from 'style/trendyTheme'
import { Table, Th, Td, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { getPoolsV3Contract } from 'utils/contractHelpers'
import CountUp from 'react-countup'
import { Pool, PoolV4, timeDisplay } from 'views/PoolV2/util'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import moment from 'moment'
import { formatEther } from '@ethersproject/units'
import images from 'configs/images'

// STYLE
const TableScroll = styled.div`
  // max-width: 100%;
  width: auto;
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
    width: 100%;
  }
  Th {
    padding: 20px 10px;
    @media screen and (max-width: 896px) {
      padding: 20px 25px;
    }
    @media screen and (max-width: 530px) {
      padding: 20px 16px;
    }
  }
  Td {
    border-bottom: 0;
    padding: 10px 40px;
    @media screen and (max-width: 730px) {
      padding: 10px 20px;
    }
  }
  .imagesvector {
    padding: 4px;
    display: flex;
    width: 24px;
    height: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: var(--white-white-8, rgba(255, 255, 255, 0.08));
  }
`

const TableHeader = styled.span`
  width: 100%;
  font-size: 26px;
  padding: 40px 0;
  display: flex;
  justify-content: start;
  @media (max-width: 575px) {
    padding: 30px 0;
  }
`
const TablePool = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: center;
  border-radius: 16px;
  border: 1px solid var(--white-white-8, rgba(255, 255, 255, 0.08));
  background: var(--black-black-5, rgba(0, 0, 0, 0.05));
  table > thead {
    tr {
      font-weight: 300;
      border-bottom: 1px solid ${trendyColors.BLACK};
    }
  }

  @media screen and (max-width: 360px) {
    width: 100%;
  }
`
const AmountData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
`
const responsiveTextTH = ['11px', '12px', '16px', '16px', '16px']
const responsiveTextSize = ['11px', '12px', '16px', '18px', '20px']
const responsiveTextSizeBNB = ['9px', '10px', '12px', '14px', '16px']
const responsiveTextSizeHeader = ['16px', '18px', '22px', '26px', '30px']
const TableDataPool: React.FC<PropsWithChildren<{ pool: PoolV4; userClaimedLength: number; usersClaimed: any }>> = ({
  pool,
  usersClaimed,
  userClaimedLength,
  ...props
}) => {
  // console.log(pool)
  const { account, chainId } = useActiveWeb3React()
  const renderClaimHistory = () => {
    return (
      <>
        {pool.userTotalLock > 0 && (
          <tr>
            <Td textAlign={'center'}>
              <Text fontSize={responsiveTextSize}>Total</Text>
            </Td>
            <Td textAlign={'center'}>
              <Text fontSize={responsiveTextSize}>
                {pool.currentInterestWithMine ? (
                  <CountUp
                    start={0}
                    preserveValue
                    delay={0}
                    end={Number(pool.currentInterestWithMine)}
                    decimals={2}
                    duration={0.5}
                  ></CountUp>
                ) : (
                  <CountUp
                    start={0}
                    preserveValue
                    delay={0}
                    end={Number(pool.currentInterest)}
                    decimals={2}
                    duration={0.5}
                  ></CountUp>
                )}
              </Text>
            </Td>
            <Td textAlign={'right'}>
              {pool.userTotalLock === 0 ? (
                <Text fontSize={responsiveTextSize}>0</Text>
              ) : (
                <AmountData>
                  <Text
                    fontSize={responsiveTextSizeBNB}
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                  >
                    $
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={pool.totalLockUSD}
                      decimals={pool.userTotalLock > 0 ? 4 : 0}
                      duration={0.5}
                    />
                  </Text>
                </AmountData>
              )}
            </Td>
            <Td textAlign={'right'}>
              {pool.totalRewardUSD + pool.remainRewardUSD === 0 ? (
                <Text fontSize={responsiveTextSize}>0</Text>
              ) : (
                <AmountData>
                  <Text
                    fontSize={responsiveTextSizeBNB}
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                  >
                    $
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={pool.totalRewardUSD + pool.remainRewardUSD}
                      decimals={pool.totalRewardUSD + pool.remainRewardUSD > 0 ? 4 : 0}
                      duration={0.5}
                    />
                  </Text>
                </AmountData>
              )}
            </Td>
            <Td textAlign={'right'}>
              {pool.remainRewardUSD === 0 ? (
                <Text fontSize={responsiveTextSize}>0</Text>
              ) : (
                <AmountData>
                  <Text
                    fontSize={responsiveTextSizeBNB}
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                  >
                    $
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={pool.remainRewardUSD}
                      decimals={pool.remainRewardUSD > 0 ? 4 : 0}
                      duration={0.5}
                    />
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
                      decimals={pool.currentReward > 0 ? 3 : 0}
                      duration={0.5}
                      style={{ marginRight: 6 }}
                    />
                    $
                  </Text>
                  <Text
                    fontSize={responsiveTextSizeBNB}
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                  >
                    ~
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={pool.currentReward}
                      decimals={pool.currentReward > 0 ? 4 : 0}
                      duration={0.5}
                    />
                    <img
                      className="imagesvector"
                      src={images.vector}
                      alt="pool name"
                      width={18}
                      style={{ marginLeft: 6 }}
                    />
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
    // console.log(userClaimedLength, usersClaimed)
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
                        $
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={claimHistory.totalLock * pool.rateBNB2USD}
                          decimals={claimHistory.totalLock > 0 ? 2 : 0}
                          duration={0.5}
                        />
                      </Text>
                    </AmountData>
                  )}
                </Td>
                <Td textAlign={'right'}>
                  {pool.totalRewardUSD + pool.remainRewardUSD === 0 ? (
                    <Text fontSize={responsiveTextSize}>0</Text>
                  ) : (
                    <AmountData>
                      <Text
                        fontSize={responsiveTextSizeBNB}
                        style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                      >
                        $
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={pool.totalRewardUSD + pool.remainRewardUSD}
                          decimals={pool.totalRewardUSD + pool.remainRewardUSD > 0 ? 4 : 0}
                          duration={0.5}
                        />
                      </Text>
                    </AmountData>
                  )}
                </Td>
                <Td textAlign={'right'}> -- / --</Td>
                <Td textAlign={'right'}>
                  {claimHistory.amount === 0 ? (
                    <Text fontSize={responsiveTextSize}>0</Text>
                  ) : (
                    <AmountData>
                      <Text fontSize={responsiveTextSize}>
                        $
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={claimHistory.amount * pool.rateBNB2USD}
                          decimals={claimHistory.amount > 0 ? 4 : 0}
                          duration={0.5}
                        />
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
      <TablePool>
        <TableScroll className="scroll">
          <thead>
            <tr>
              <Th textAlign="left">
                <Text
                  className="th"
                  style={{ color: '#777E90', fontWeight: '600' }}
                  color={trendyColors.COLORTABLE}
                  fontSize={responsiveTextTH}
                  textTransform="capitalize"
                >
                  Date Time
                </Text>
              </Th>
              <Th textAlign="center">
                <Text
                  style={{ color: '#777E90', fontWeight: '600' }}
                  color={trendyColors.COLORTABLE}
                  fontSize={responsiveTextTH}
                  textTransform="capitalize"
                >
                  Interest (%)
                </Text>
              </Th>
              <Th textAlign="right">
                <Text
                  style={{ color: '#777E90', fontWeight: '600' }}
                  color={trendyColors.COLORTABLE}
                  fontSize={responsiveTextTH}
                  textTransform="capitalize"
                >
                  Your Lock
                </Text>
              </Th>
              <Th textAlign="right">
                <Text
                  style={{ color: '#777E90', fontWeight: '600' }}
                  color={trendyColors.COLORTABLE}
                  fontSize={responsiveTextTH}
                  textTransform="capitalize"
                >
                  Total Reward
                </Text>
              </Th>
              <Th>
                <Text
                  style={{ color: '#777E90', fontWeight: '600' }}
                  color={trendyColors.COLORTABLE}
                  fontSize={responsiveTextTH}
                  textTransform="capitalize"
                >
                  Remain
                </Text>
              </Th>
              <Th textAlign="right">
                <Text
                  style={{ color: '#777E90', fontWeight: '600' }}
                  color={trendyColors.COLORTABLE}
                  fontSize={responsiveTextTH}
                  textTransform="capitalize"
                >
                  Your Income
                </Text>
              </Th>
              <Th textAlign="center">
                <Text
                  style={{ color: '#777E90', fontWeight: '600' }}
                  color={trendyColors.COLORTABLE}
                  fontSize={responsiveTextTH}
                  textTransform="capitalize"
                >
                  Action
                </Text>
              </Th>
            </tr>
          </thead>
          <tbody>
            <>{renderClaimHistory()}</>
          </tbody>
        </TableScroll>
      </TablePool>
    </>
  )
}
export default TableDataPool
