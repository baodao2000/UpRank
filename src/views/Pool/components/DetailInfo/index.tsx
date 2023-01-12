import { PropsWithChildren, useState, useEffect } from 'react'
import styled from 'styled-components'
import { trendyColors } from 'style/trendyTheme'
import { Text, Button } from '@pancakeswap/uikit'
import { Pool, timeDisplayLong } from 'views/Pools2/util'
import moment from 'moment'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import Balance from 'components/Balance'
import CountUp from 'react-countup'

const InfoDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  width: 800px;
  padding: 2%;
  border-radius: 40px;
  background: linear-gradient(153.15deg, #7c07d8 8.57%, rgba(129, 69, 255, 0.02) 100%);
  @media screen and (max-width: 967px) {
    width: 700px;
  }
  @media screen and (max-width: 851px) {
    width: 570px;
  }
  @media screen and (max-width: 575px) {
    width: 100%;
  }
`

const Amount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const Line = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    line-height: 24px;
    &.value {
      font-weight: 300;
    }
  }
  &.time {
    div {
      line-height: 29px;
    }
  }
  &.total-lock,
  &.commission {
    color: white;
    algin-items: flex-end;
    justify-content: flex-end;
    div {
      background: ${trendyColors.MAIN_GREEN};
      border-radius: 8px;
      padding: 12px 30px;
      font-weight: 600;
    }
    @media screen and (max-width: 967px) {
      div {
        padding: 12px 28px;
      }
    }
    @media screen and (max-width: 851px) {
      div {
        padding: 10px 24px;
      }
    }
    @media screen and (max-width: 575px) {
      div {
        padding: 8px 20px;
      }
    }
    @media screen and (max-width: 450px) {
      div {
        padding: 6px 15px;
      }
    }
  }
`
const maincolor = `${trendyColors.MAIN_GREEN}`
const responsiveTextSize = ['12px', '14px', '16px', '18px', '20px']
const responsiveTextSizeBNB = ['10px', '12px', '12px', '14px', '16px']

const DetailInfoPool: React.FC<
  PropsWithChildren<{
    poolInfo: Pool
    pip?: number
  }>
> = ({ poolInfo, ...props }) => {
  const { account } = useActiveWeb3React()
  const currentInterest = poolInfo.currentInterest
  const timeLock = poolInfo.timeLock
  const totalLock = poolInfo.totalLock
  const currentReward = poolInfo.currentReward
  const totalReward = poolInfo.totalReward
  const startTime = poolInfo.startTime
  const rateBNB2USD = poolInfo.rateBNB2USD
  const [now, setNow] = useState(moment().unix())
  useEffect(() => {
    setInterval(() => {
      setNow(moment().unix())
    }, 1000)
  }, [])
  return (
    <InfoDetail>
      <Line>
        <Text fontSize={responsiveTextSize}>Current Interest</Text>
        <Text style={{ color: `${maincolor}` }} fontSize={responsiveTextSize} className="value">
          {<CountUp start={0} preserveValue delay={0} end={Number(currentInterest)} decimals={2} duration={0.5} />} %
        </Text>
      </Line>
      <Line>
        <Text fontSize={responsiveTextSize}>Lock Time</Text>
        <Text style={{ color: '#48E3E3' }} fontSize={responsiveTextSize} className="value">
          {timeLock === 0 ? 0 : timeDisplayLong(timeLock)}
        </Text>
      </Line>
      <Line>
        <Text fontSize={responsiveTextSize}>Spend Time</Text>
        <Text style={{ color: '#48E3E3' }} fontSize={responsiveTextSize} className="value">
          {startTime === 0 ? 0 : timeDisplayLong(Number(now - startTime))}
        </Text>
      </Line>
      <Line>
        <Text fontSize={responsiveTextSize}>Current Reward</Text>
        {currentReward === 0 ? (
          <Text style={{ color: '#48E3E3' }} fontSize={responsiveTextSize} className="value">
            0
          </Text>
        ) : (
          <Amount>
            <Text fontSize={responsiveTextSize} className="value">
              ~{' '}
              <CountUp
                start={0}
                preserveValue
                delay={0}
                end={Number(currentReward * rateBNB2USD)}
                decimals={currentReward > 0 ? 2 : 0}
                duration={0.5}
              />
              $
            </Text>
            <Text fontSize={responsiveTextSizeBNB} className="value">
              ~{' '}
              <CountUp
                start={0}
                preserveValue
                delay={0}
                end={Number(currentReward)}
                decimals={totalReward > 0 ? 6 : 0}
                duration={0.5}
              />{' '}
              {poolInfo.unit}
            </Text>
          </Amount>
        )}
      </Line>
      <Line>
        <Text fontSize={responsiveTextSize}>Total Reward</Text>
        {totalReward === 0 ? (
          <Text style={{ color: '#48E3E3' }} fontSize={responsiveTextSize} className="value">
            0
          </Text>
        ) : (
          <Amount>
            <Text fontSize={responsiveTextSize} className="value">
              ~{' '}
              <CountUp
                start={0}
                preserveValue
                delay={0}
                end={Number(totalReward * rateBNB2USD)}
                decimals={totalReward > 0 ? 2 : 0}
                duration={0.5}
              />
              $
            </Text>
            <Text fontSize={responsiveTextSizeBNB} className="value">
              ~{' '}
              <CountUp
                start={0}
                preserveValue
                delay={0}
                end={Number(totalReward)}
                decimals={totalReward > 0 ? 6 : 0}
                duration={0.5}
              />{' '}
              {poolInfo.unit}
            </Text>
          </Amount>
        )}
      </Line>
      <Line className="total-lock">
        <Text fontSize={responsiveTextSize} className="value">
          Total Lock:{' '}
          <CountUp
            start={0}
            preserveValue
            delay={0}
            end={totalLock * rateBNB2USD}
            decimals={totalLock > 0 ? 2 : 0}
            duration={0.5}
          />
          {' $ ~ '}
          <CountUp
            start={0}
            preserveValue
            delay={0}
            end={Number(totalLock)}
            decimals={totalLock > 0 ? 2 : 0}
            duration={0.5}
          />{' '}
          {poolInfo.unit}
        </Text>
      </Line>
    </InfoDetail>
  )
}
export default DetailInfoPool
