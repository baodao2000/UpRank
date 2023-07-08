import { PropsWithChildren, useState, useEffect } from 'react'
import styled, { ThemeConsumer } from 'styled-components'
import { trendyColors } from 'style/trendyTheme'
import { Table, Th, Td, Text, useModal, Button } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { getPoolsContract, getPoolsV3Contract } from 'utils/contractHelpers'
import CountUp from 'react-countup'
import contracts from 'config/constants/contracts'
import { Mine, Pool, timeDisplay } from 'views/PoolV2/util'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getContract } from 'utils'
import moment from 'moment'
import { formatEther } from '@ethersproject/units'
import Dots from 'components/Loader/Dots'
import ClaimPoolModal from './ClaimModal'

// STYLE
const TableScroll = styled.div`
  max-width: 100%;
  width: 100%;
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
  Td {
    border-bottom: 0;
    padding: 10px;
  }
`
const TablePool = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: center;
  padding: 20px;
  table > thead {
    width: 800px;
    tr {
      font-weight: 300;
      border-bottom: 1px solid ${trendyColors.BLACK};
    }
  }
  width: auto;
`
const AmountData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
`
const TableTab = styled.div`
  .tabs {
    width: 100%;
    position: relative;
    background: #eeeaf4;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
  }
  .tabs::before,
  .tabs::after {
    content: '';
    display: table;
  }
  .tabs::after {
    clear: both;
  }
  .tab {
    float: left;
    width: 50%;
  }
  .tab-switch {
    display: none;
  }
  .tab-label {
    position: relative;
    display: block;
    line-height: 2.75em;
    padding: 0 1.618em;
    background: #eeeaf4;
    color: #7a6eaa;
    cursor: pointer;
    top: 0;
    transition: all 0.25s;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    @media screen and (max-width: 375px) {
      font-size: 16px;
    }
    @media screen and (max-width: 600px) {
      font-size: 20px;
    }
  }
  .tab-label:hover {
    transition: top 0.25s;
  }
  .tab-switch:checked + .tab-label {
    background: #fff;
    color: #280d5f;
    border-bottom: 0;
    transition: all 0.35s;
    z-index: 1;
  }
  .tab-switch:checked + label + .tab-content {
    z-index: 2;
    opacity: 1;
    transition: all 0.35s;
  }
`
const TableHeader = styled.span`
  font-size: 26px;
`
const responsiveTextSize = ['14px', '14px', '16px', '18px', '20px']
const responsiveTextSizeBNB = ['14px', '14px', '16px', '18px', '20px']
const responsiveTextSizeHeader = ['20px', '24px', '32px', '38px', '48px']

const TableDataPool: React.FC<PropsWithChildren<{ mine: Mine; userClaimedMineLength: number }>> = ({
  mine,
  // mine2,
  userClaimedMineLength,
  ...props
}) => {
  const { account, chainId } = useActiveWeb3React()
  const minesContract = getPoolsContract(chainId)
  const { t } = useTranslation()
  const [usersClaimed, setUserClaimed] = useState([])
  const [tabActive, setTabActive] = useState(true)
  const [totalMined, setTotalMine] = useState()
  const getPoolContract = getPoolsV3Contract(chainId)

  useEffect(() => {
    // getMine()
  }, [userClaimedMineLength, account])
  const power = Number(mine.mineSpeed + mine.mineSpeedLevel) / 100
  const [mineHistory, setMineHistory] = useState([
    {
      amount: 100000,
      date: 16889,
      power: power,
      totalMined: mine.totalMined,
    },
    {
      amount: 51321312,
      date: 16899,
      power: power,
      totalMined: mine.totalMined,
    },
    {
      amount: 146546565,
      date: 16899,
      power: power,
      totalMined: mine.totalMined,
    },
  ])
  // const handleSuccess = async (data) => {
  //   await mineHistory.unshift(...data)
  //   console.log(mineHistory);

  //   // await renderHistory()
  //   setMineHistory(mineHistory)
  // }
  const handleSuccess = () => {
    getMine()
  }
  // const [openClaimModal, onDismissModal] = useModal(
  //   <ClaimPoolModal
  //     onDismiss={() => onDismissModal()}
  //     onSuccess={(dataModal) => handleSuccess(dataModal)}
  //     mine={mine}
  //   />,
  //   true,
  //   false,
  //   'removeModal',
  // )

  const [openClaimModal, onDismissModal] = useModal(
    <ClaimPoolModal onDismiss={() => onDismissModal()} onSuccess={() => handleSuccess()} mine={mine} />,
    true,
    false,
    'removeModal',
  )
  console.log(mine.totalMined)

  const getMine = async () => {
    try {
      if (userClaimedMineLength === 0) {
        await getPoolContract.getUsersClaimMined(account, 10, 0).then((res) => {
          setUserClaimed(
            res.list.map((claimed: any, i: number) => {
              return {
                amount: Number(formatEther(claimed.amount)),
                date: Number(claimed.date.toString()),
                power: (Number(claimed.interrest.toString()) / 10000) * 365,
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
        {mine.totalMined > 0 && (
          <tr>
            <Td textAlign={'left'}>
              <Text fontSize={responsiveTextSize}>Total</Text>
            </Td>
            <Td textAlign={'center'}>
              <Text fontSize={responsiveTextSize}>
                <CountUp start={0} preserveValue delay={0} end={Number(power)} decimals={2} duration={0.5}></CountUp> X
              </Text>
            </Td>
            <Td textAlign={'right'}>
              {mine.totalMined === 0 ? (
                <Text fontSize={responsiveTextSize}>0</Text>
              ) : (
                <AmountData>
                  <Text
                    fontSize={responsiveTextSizeBNB}
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                  >
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={mine.totalMined}
                      decimals={mine.totalMined > 0 ? 4 : 0}
                      duration={0.5}
                    />
                  </Text>
                </AmountData>
              )}
            </Td>
            <Td textAlign={'right'}>
              {mine.claimed === 0 ? (
                <Text fontSize={responsiveTextSize}>0</Text>
              ) : (
                <AmountData>
                  <Text
                    fontSize={responsiveTextSizeBNB}
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                  >
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={mine.totalMined}
                      decimals={mine.claimed > 0 ? 4 : 0}
                      duration={0.5}
                    />
                  </Text>
                </AmountData>
              )}
            </Td>
            <Td textAlign={'right'}>
              {mine.remain === 0 ? (
                <Text fontSize={responsiveTextSize}>0</Text>
              ) : (
                <AmountData>
                  <Text
                    fontSize={responsiveTextSizeBNB}
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                  >
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={mine.remain}
                      decimals={mine.remain > 0 ? 4 : 0}
                      duration={0.5}
                    />
                  </Text>
                </AmountData>
              )}
            </Td>
            <Td textAlign={'right'}>
              {mine.currentReward === 0 ? (
                <Text fontSize={responsiveTextSize}>0</Text>
              ) : (
                <AmountData>
                  <Text fontSize={responsiveTextSize}>
                    ~
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={mine.currentReward}
                      decimals={mine.currentReward > 0 ? 2 : 0}
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
                      end={mine.currentReward}
                      decimals={mine.currentReward > 0 ? 4 : 0}
                      duration={0.5}
                    />
                    <img src={`/images/chains/${chainId}.png`} alt="mine name" width={18} style={{ marginLeft: 6 }} />
                  </Text>
                </AmountData>
              )}
            </Td>
            <Td textAlign={'center'}>
              <Text fontSize={responsiveTextSize}>
                <span>{mine.currentReward <= 0 ? 'Waiting' : 'Claimable'}</span>
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
        {mine.userClaimedMineLength === 0 &&
          mineHistory.map((claimHistory, index) => {
            return (
              <tr key={index}>
                <Td textAlign={'center'}>
                  <Text fontSize={responsiveTextSize}> {moment.unix(claimHistory.date * 86400).format('L')}</Text>
                </Td>
                <Td textAlign={'center'}>
                  <Text fontSize={responsiveTextSize}>
                    <CountUp
                      start={0}
                      preserveValue
                      delay={0}
                      end={Number(power)}
                      decimals={2}
                      duration={0.5}
                    ></CountUp>{' '}
                    X
                  </Text>
                </Td>
                <Td textAlign={'right'}>
                  {claimHistory.totalMined === 0 ? (
                    <Text fontSize={responsiveTextSize}>0</Text>
                  ) : (
                    <AmountData>
                      {/* <Text  fontSize={responsiveTextSize}>
                        ~
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={claimHistory.totalMined}
                          decimals={claimHistory.totalMined > 0 ? 2 : 0}
                          duration={0.5}
                        />
                        $
                      </Text> */}
                      <Text fontSize={responsiveTextSizeBNB}>
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={mine.totalMined}
                          decimals={mine.totalMined > 0 ? 2 : 0}
                          duration={0.5}
                        />{' '}
                        ${mine.unit}
                      </Text>
                    </AmountData>
                  )}
                </Td>
                <Td textAlign={'right'}>
                  {claimHistory.amount === 0 ? (
                    <Text fontSize={responsiveTextSize}>0</Text>
                  ) : (
                    <AmountData>
                      {/* <Text fontSize={responsiveTextSize}>
                        ~
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={claimHistory.amount}
                          decimals={claimHistory.amount > 0 ? 4 : 0}
                          duration={0.5}
                        />
                        $
                      </Text> */}
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
                        {mine.unit}
                      </Text>
                    </AmountData>
                  )}
                </Td>
                <Td textAlign={'right'}>
                  {claimHistory.totalMined === 0 ? (
                    <Text fontSize={responsiveTextSize}>0</Text>
                  ) : (
                    <AmountData>
                      {/* <Text  fontSize={responsiveTextSize}>
                        ~
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={claimHistory.totalMined}
                          decimals={claimHistory.totalMined > 0 ? 2 : 0}
                          duration={0.5}
                        />
                        $
                      </Text> */}
                      <Text fontSize={responsiveTextSizeBNB}>
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={claimHistory.totalMined}
                          decimals={claimHistory.totalMined > 0 ? 4 : 0}
                          duration={0.5}
                        />{' '}
                        ${mine.unit}
                      </Text>
                    </AmountData>
                  )}
                </Td>
                <Td textAlign={'right'}>
                  {claimHistory.totalMined > 0 ? (
                    <Text fontSize={responsiveTextSize}>0</Text>
                  ) : (
                    <AmountData>
                      <Text fontSize={responsiveTextSizeBNB}>
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={claimHistory.totalMined}
                          decimals={claimHistory.totalMined > 0 ? 4 : 0}
                          duration={0.5}
                        />{' '}
                        ${mine.unit}
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
        <Text style={{ color: '#00f0e1' }} textAlign="center" fontSize={responsiveTextSizeHeader}>
          Your Mined History
        </Text>
      </TableHeader>
      <TablePool>
        <TableScroll className="scroll">
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <Th textAlign="left">
                  <Text color={trendyColors.DARK_PURPLE} fontSize={responsiveTextSize} textTransform="capitalize">
                    Date Time
                  </Text>
                </Th>
                <Th textAlign="center">
                  <Text color={trendyColors.DARK_PURPLE} fontSize={responsiveTextSize} textTransform="capitalize">
                    Power
                  </Text>
                </Th>
                <Th textAlign="right">
                  <Text color={trendyColors.DARK_PURPLE} fontSize={responsiveTextSize} textTransform="capitalize">
                    TotalMine
                  </Text>
                </Th>
                <Th textAlign="right">
                  <Text color={trendyColors.DARK_PURPLE} fontSize={responsiveTextSize} textTransform="capitalize">
                    Claimed
                  </Text>
                </Th>
                <Th textAlign="right">
                  <Text color={trendyColors.DARK_PURPLE} fontSize={responsiveTextSize} textTransform="capitalize">
                    Remaind
                  </Text>
                </Th>
                <Th textAlign="right">
                  <Text color={trendyColors.DARK_PURPLE} fontSize={responsiveTextSize} textTransform="capitalize">
                    Available
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
          </table>
        </TableScroll>
      </TablePool>
      <Button
        style={{ color: '#6216B0', backgroundColor: '#D9D9D9' }}
        variant={mine.currentReward > 0 ? 'danger' : 'light'}
        disabled={false}
        width={['120px', '150px', '180px', '200px']}
        onClick={openClaimModal}
        // scale={isMobile ? 'sm' : 'md'}
      >
        Claim
      </Button>
    </>
  )
}
export default TableDataPool
