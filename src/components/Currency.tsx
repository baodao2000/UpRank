import styled from 'styled-components'
import { Heading, Flex, Text, Button, useToast, useMatchBreakpoints } from '@pancakeswap/uikit'
import { usePoolsV4Contract } from 'hooks/useContract'
import CountUp from 'react-countup'
import { useEffect, useState } from 'react'
import { formatEther } from '@ethersproject/units'
import axios from 'axios'

const Wrapper = styled.div`
  border-radius: 16px;
  background: var(--primary-primary-gradient-2, linear-gradient(180deg, #7b3fe4 0%, #a726c1 100%));
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;
  position: fixed;
  right: 2%;
  top: 50%;
  z-index: 99;
  @media screen and (max-width: 700px) {
    display: none;
  }
  @media screen and (max-width: 800px) {
    padding: 12px;
    top: 60%;
  }
`
const Card = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: var(--black-black-20, rgba(0, 0, 0, 0.2));
`
const Title = styled(Text)`
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
`
const Label = styled(Text)`
  color: #3aab9d;
  /* Text md/regular */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`

export const CurrencyExchange = () => {
  const [price, setPrice] = useState({
    matic: 0,
    maticChange: 0,
    trend: 0,
    trendChange: 0,
  })

  useEffect(() => {
    getPriceTrend()
  }, [])
  const getPriceTrend = async () => {
    const baseURL = 'https://services.intotheblock.com/api/MATIC/overview'
    const [trend, matic] = await Promise.all([
      fetch('https://api.trendydefi.com/price/trend').then((rs) => rs.json()),
      axios.get(baseURL),
    ])
    setPrice({
      matic: matic.data.price,
      maticChange: (matic.data.priceChange * 100) / matic.data.price,
      trend: trend.data.price,
      trendChange: ((trend.data.price - trend.data.price24h.price) * 100) / trend.data.price,
    })
  }

  return (
    <Wrapper>
      <Card>
        <Title>1</Title>
        <div
          style={{
            background: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
            borderRadius: '4px',
            width: '24px',
            height: '24px',
          }}
        >
          <img width="18px" height="16px" src="/images/V3/V3icon.png" />
        </div>
        <span style={{ color: 'rgba(173, 171, 178, 1)', fontSize: '16px' }}>=</span>
        <Title>
          $
          <CountUp
            separator=","
            start={0}
            preserveValue
            delay={0}
            // end={Number(Number(balance) * rateBnbUsd)}
            decimals={3}
            duration={1}
            end={Number(price.matic)}
          />{' '}
        </Title>

        {price.maticChange >= 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img width="16px" height="16px" src="/images/V3/Arrow.png" />

            <Label>
              +
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                // end={Number(Number(balance) * rateBnbUsd)}
                decimals={3}
                duration={1}
                end={Number(price.maticChange)}
              />
              %
            </Label>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img width="16px" height="16px" src="/images/V3/downArrow.png" />

            <Label style={{ color: '#E30721' }}>
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                // end={Number(Number(balance) * rateBnbUsd)}
                decimals={3}
                duration={1}
                end={Number(price.maticChange)}
              />
              %
            </Label>
          </div>
        )}
      </Card>
      <Card>
        <Title>1</Title>
        <div
          style={{
            background: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
            borderRadius: '4px',
            width: '24px',
            height: '24px',
          }}
        >
          <img width="18px" height="16px" src="/images/trendyloopcoin1.png" />
        </div>
        <span style={{ color: 'rgba(173, 171, 178, 1)', fontSize: '16px' }}>=</span>
        <Title>
          $
          <CountUp
            separator=","
            start={0}
            preserveValue
            delay={0}
            // end={Number(Number(balance) * rateBnbUsd)}
            decimals={3}
            duration={1}
            end={Number(price.trend)}
          />{' '}
        </Title>
        {price.trendChange >= 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img width="16px" height="16px" src="/images/V3/Arrow.png" />

            <Label>
              +
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                // end={Number(Number(balance) * rateBnbUsd)}
                decimals={3}
                duration={1}
                end={Number(price.trendChange)}
              />
              %
            </Label>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img width="16px" height="16px" src="/images/V3/downArrow.png" />

            <Label style={{ color: '#E30721' }}>
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                // end={Number(Number(balance) * rateBnbUsd)}
                decimals={3}
                duration={1}
                end={Number(price.trendChange)}
              />
              %
            </Label>
          </div>
        )}
      </Card>
    </Wrapper>
  )
}
