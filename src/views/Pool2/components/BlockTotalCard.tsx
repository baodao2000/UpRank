import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, Flex, Text, Button } from '@pancakeswap/uikit'
import moment from 'moment'
import numeral from 'numeral'
import { timeDisplay } from '../util'

const CardWidth = styled(Card)`
  width: 100%;
  height: 374px;
  padding: 15px 10px;
  margin-bottom: 30px;
  background: linear-gradient(239.08deg, #f3dda8 11.04%, #ffae3d 92.61%);

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 36px 50px;
    height: 496px;
  }
`

const WrapperText = styled(Flex)`
  margin-bottom: 22px;
  &.total-card {
    justify-content: space-between;
    align-items: center;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 26px;
  }
`

const StyledTextLeft = styled(Text)`
  font-weight: 600;
  font-size: 12px;
  line-height: 144.5%;
  color: #4a5178;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
    line-height: 24px;
  }
`
const StyledTextLeftTotal = styled(Text)`
  font-weight: 600;
  font-size: 12px;
  line-height: 144.5%;
  color: #0cbe48;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
    line-height: 24px;
  }
`

const StyledTextRight = styled(Text)`
  font-size: 12px;
  line-height: 144.5%;
  color: #4a5178;

  ${({ theme }) => theme.mediaQueries.md} {
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
  }
`

export const StyledButton = styled(Button)`
  width: auto;
  min-width: 167px;
  height: 30px;
  background: linear-gradient(135deg, #495076 0%, #424869 100%);
  opacity: 0.95;
  box-shadow: rgba(85, 93, 131, 0.48) -6px -6px 8px, rgba(54, 59, 87, 0.24) 8px 8px 5px,
    rgba(38, 49, 105, 0.05) 1px 1px 1px inset, rgba(83, 92, 136, 0.12) -1px -1px 4px inset;
  color: white;
  border-radius: 10px;
  font-weight: 800;
  font-size: 12px;
  line-height: 20px;
  color: #d2d6ef;

  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 335px;
    height: 61px;
    font-size: 29px;
    line-height: 32px;
  }
`

export const WrapperButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const CustomStyledButton = styled(StyledButton)`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  align-items: flex-start;
  padding: 10px;
  height: auto;
  text-transform: uppercase;
  font-size: 12px;
  row-gap: 6px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 24px;
    padding: 20px;
    row-gap: 10px;
    width: unset;
  }
`
const CardTotal = ({ pool }) => {
  const cardtotal = [
    {
      title: 'Min-Max interest',
      value: '5-25%',
    },
    {
      title: 'Current Interest',
      value: '15%',
    },
    {
      title: 'Lock time',
      value: '3 years',
    },
    {
      title: 'Spend Time',
      value: '2 years 3 months 10 days 11:30',
    },
    {
      title: 'Claim Fee',
      value: '0.1% ~ 11%',
    },
    {
      title: 'Current Reward',
      value: '123',
    },
    {
      title: 'Total Rewards',
      value: '1000',
    },
  ]
  const [now, setNow] = useState(moment().unix())
  useEffect(() => {
    const loop = setInterval(() => {
      setNow(moment().unix())
    }, 1000)
    return () => clearInterval(loop)
  }, [])
  return (
    <CardWidth background="linear-gradient(239.08deg, #F3DDA8 11.04%, #FFAE3D 92.61%);">
      <WrapperText className="total-card">
        <StyledTextLeft>Min Stake</StyledTextLeft>
        <StyledTextRight>{numeral(pool.minStake).format('0,0.00')}</StyledTextRight>
      </WrapperText>
      <WrapperText className="total-card">
        <StyledTextLeft>Current Interest</StyledTextLeft>
        <StyledTextRight>{numeral(pool.currentInterest).format('0,0.00')} %</StyledTextRight>
      </WrapperText>
      <WrapperText className="total-card">
        <StyledTextLeft>Lock time</StyledTextLeft>
        <StyledTextRight>{timeDisplay(pool.timeLock)}</StyledTextRight>
      </WrapperText>
      <WrapperText className="total-card">
        <StyledTextLeft>Spend Time</StyledTextLeft>
        <StyledTextRight>{pool.startTime === 0 ? 0 : timeDisplay(Number(now - pool.startTime))}</StyledTextRight>
      </WrapperText>
      <WrapperText className="total-card">
        <StyledTextLeft>Early Claim Fee</StyledTextLeft>
        <StyledTextRight>{pool.earlyWDFee} %</StyledTextRight>
      </WrapperText>
      <WrapperText className="total-card">
        <StyledTextLeft>Current Reward</StyledTextLeft>
        <StyledTextRight>{pool.currentReward}</StyledTextRight>
      </WrapperText>
      <WrapperText className="total-card">
        <StyledTextLeftTotal>Total locked:</StyledTextLeftTotal>
        <StyledTextRight>
          {numeral(pool.totalLockAsset).format('0,0.00')} SOW ~ {numeral(pool.totalLock).format('0,0.00')} BUSD
        </StyledTextRight>
      </WrapperText>
      <WrapperText className="total-card">
        <StyledTextLeftTotal>Your staked:</StyledTextLeftTotal>
        <StyledTextRight>
          {numeral(pool.userTotalLockAsset).format('0,0.00')} SOW ~ ({numeral(pool.userTotalLock).format('0,0.00')}{' '}
          BUSD)
        </StyledTextRight>
      </WrapperText>
    </CardWidth>
  )
}

const BlockTotalCard = ({ pool }) => {
  return (
    <Flex flexDirection="column">
      <CardTotal pool={pool} />
    </Flex>
  )
}

export default BlockTotalCard
