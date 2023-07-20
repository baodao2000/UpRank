import { PropsWithChildren, useState, useEffect } from 'react'
import styled from 'styled-components'
import { trendyColors } from 'style/trendyTheme'
import { Text, Button, Flex } from '@pancakeswap/uikit'
import { Pool, timeDisplay, timeDisplayLong } from 'views/PoolV2/util'
import moment from 'moment'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import Balance from 'components/Balance'
import CountUp from 'react-countup'
import images from 'configs/images'

const InfoDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
  background: var(--black-black-20, rgba(0, 0, 0, 0.2));
  backdrop-filter: blur(5.5px);
    @media (max-width: 575px) {
      padding: 24px;
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

  .note {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: #adabb2;
      span {
        font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: #fff;
      }
    @media (max-width: 575px) {
      font-size: 12px;
      line-height: 20px;
      span {
        color: #fff;
        font-size: 12px;
        line-height: 20px;
      }
    }
`

const Amount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`
const Line = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    font-style: normal;
    font-weight: 300;
    line-height: 24px;
    &.value {
      font-weight: 700;
    }
  }
  &.time {
    div {
      line-height: 29px;
    }
  }
  &.total-lock,
  &.commission {
    color: #adabb2;
    align-items: flex-end;
    justify-content: flex-end;
    border-radius: 12px;
    padding: 10px 24px;
    background: var(--white-white-8, rgba(255, 255, 255, 0.08));
  }
`
const NoteDeposit = styled.span`
  // color: #adabb2;
  //background: #ffffcc;
  // max-width: 600px;
  // padding: 16px;
  // border-radius: 10px;
`
const maincolor = `${trendyColors.MAIN_GREEN}`
const responsiveTextSize = ['16px', '16px', '16px', '18px', '20px']
const responsiveTextSizeBNB = ['10px', '12px', '12px', '14px', '16px']

const DetailInfoPool: React.FC<
  PropsWithChildren<{
    poolInfo: Pool
    pip?: number
  }>
> = ({ poolInfo, ...props }) => {
  const { account, chainId } = useActiveWeb3React()
  const currentInterest = poolInfo.currentInterest
  const timeLock = poolInfo.timeLock
  const totalLock = poolInfo.totalLock
  const currentReward = poolInfo.currentReward
  const totalReward = poolInfo.totalReward
  const startTime = poolInfo.startTime
  const rateBNB2USD = poolInfo.rateBNB2USD
  const [now, setNow] = useState(moment().unix())

  const getNoteDeposit = () => {
    let note
    if (chainId === 97 && now - poolInfo.startTime > 3600) {
      note = (
        <NoteDeposit className="note">
          {/* <i> */}
          <span>Please note:</span> after <b style={{ textDecoration: 'underline' }}>{timeDisplayLong(3600)}</b> of
          deposit, you can&apos;t add more to this pool. If you would like to stake more, you can stake a different
          wallet or a different pool.
          {/* </i> */}
        </NoteDeposit>
      )
    } else if (chainId === 137 && now - poolInfo.startTime > 604800) {
      note = (
        <NoteDeposit className="note">
          {/* <i> */}
          <span>Please note:</span> after <b style={{ textDecoration: 'underline' }}>{timeDisplayLong(604800)}</b> of
          deposit, you can&apos;t add more to this pool. If you would like to stake more, you can stake a different
          wallet or a different pool.
          {/* </i> */}
        </NoteDeposit>
      )
    } else {
      note = null
    }
    return note
  }
  useEffect(() => {
    setInterval(() => {
      setNow(moment().unix())
    }, 1000)
  }, [])
  return (
    <InfoDetail>
      <Line>
        <Text style={{ color: '#ADABB2', fontWeight: 400 }} fontSize={responsiveTextSize}>
          Current Interest
        </Text>
        <Text style={{ color: '#E2E1E5', fontWeight: '700' }} fontSize={responsiveTextSize} className="value">
          {<CountUp start={0} preserveValue delay={0} end={Number(currentInterest)} decimals={2} duration={0.5} />} %
        </Text>
      </Line>
      <Line>
        <Text style={{ color: '#ADABB2', fontWeight: 400 }} fontSize={responsiveTextSize}>
          Lock Time
        </Text>
        <Text style={{ color: '#E2E1E5', fontWeight: '700' }} fontSize={responsiveTextSize} className="value">
          {timeLock === 0 ? 0 : timeDisplay(timeLock * 57600)}
        </Text>
      </Line>
      <Line>
        <Text style={{ color: '#ADABB2', fontWeight: 400 }} fontSize={responsiveTextSize}>
          Spend Time
        </Text>
        <Text style={{ color: '#E2E1E5', fontWeight: '700' }} fontSize={responsiveTextSize} className="value">
          {startTime === 0 ? 0 : timeDisplay(Number(now - startTime))}
        </Text>
      </Line>
      <Line>
        <Text style={{ color: '#ADABB2', fontWeight: 400 }} fontSize={responsiveTextSize}>
          Current Reward
        </Text>
        {currentReward === 0 ? (
          <Text style={{ color: '#E2E1E5', fontWeight: '700' }} fontSize={responsiveTextSize} className="value">
            0
          </Text>
        ) : (
          <Amount>
            <Text style={{ color: '#E2E1E5' }} fontSize={responsiveTextSize} className="value">
              {'$'}
              <CountUp
                start={0}
                preserveValue
                delay={0}
                end={Number(currentReward * rateBNB2USD)}
                decimals={currentReward > 0 ? 2 : 0}
                duration={0.5}
              />
              &nbsp;
            </Text>
            <Text
              fontSize={responsiveTextSizeBNB}
              className="value"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ADABB2', fontWeight: '400' }}
            >
              ~{' '}
              <CountUp
                start={0}
                preserveValue
                delay={0}
                end={Number(currentReward)}
                decimals={totalReward > 0 ? 4 : 2}
                duration={0.5}
              />{' '}
              <img className="imagesvector" src={images.vector} alt="pool name" width={18} />
            </Text>
          </Amount>
        )}
      </Line>
      <Line>
        <Text fontSize={responsiveTextSize} style={{ fontWeight: 400, color: '#ADABB2' }}>
          Total Reward
        </Text>
        {totalReward === 0 ? (
          <Text style={{ color: '#E2E1E5', fontWeight: '700' }} fontSize={responsiveTextSize} className="value">
            0
          </Text>
        ) : (
          <Amount>
            <Text fontSize={responsiveTextSize} className="value">
              {'$'}
              <CountUp
                start={0}
                preserveValue
                delay={0}
                end={Number(totalReward * rateBNB2USD)}
                decimals={totalReward > 0 ? 2 : 0}
                duration={0.5}
              />
              &nbsp;
            </Text>
            <Text
              fontSize={responsiveTextSizeBNB}
              className="value"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ADABB2', fontWeight: '400' }}
            >
              ~{' '}
              <CountUp
                start={0}
                preserveValue
                delay={0}
                end={Number(totalReward)}
                decimals={totalReward > 0 ? 4 : 0}
                duration={0.5}
              />{' '}
              <img className="imagesvector" src={images.vector} alt="pool name" width={18} />
            </Text>
          </Amount>
        )}
      </Line>
      <Line style={{ display: 'flex', flexDirection: 'column' }} className="total-lock">
        <Text
          fontSize={responsiveTextSize}
          className="value"
          style={{ color: '#ADABB2', fontWeight: '400', fontSize: '16px', lineHeight: '24px' }}
        >
          Total Lock
        </Text>
        <Text
          style={{
            fontSize: '20px',
            fontWeight: '700',
            lineHeight: '30px',
            color: '#E2E1E5',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {`$`}
          <CountUp
            start={0}
            preserveValue
            delay={0}
            end={totalLock * rateBNB2USD}
            decimals={totalLock > 0 ? 2 : 0}
            duration={0.5}
          />
          <div
            style={{
              gap: 6,
              display: 'flex',
              alignItems: 'center',
              color: '#ADABB2',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: '400',
            }}
          >
            &nbsp;{`~`}
            <CountUp
              start={0}
              preserveValue
              delay={0}
              end={Number(totalLock)}
              decimals={totalLock > 0 ? 4 : 0}
              duration={0.5}
              style={{ fontWeight: 400 }}
            />
            <img
              className="imagesvector"
              src={images.vector}
              alt="pool name"
              width={18}
              height={18}
              style={{ transform: 'translate(0, -1px)' }}
            />
          </div>
        </Text>
      </Line>
      <Line>
        {getNoteDeposit()}

        {/* <Text className="note">
          <span>Please note:</span> after 7 days of deposit, you can&lsquo;t add more to this pool. If you would like to
          stake more, you can stake a different wallet or a different pool.
        </Text> */}
      </Line>
    </InfoDetail>
  )
}
export default DetailInfoPool
