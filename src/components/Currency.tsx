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
  gap: 24px;
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
  color: #21cf9a;
  /* Text md/regular */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`

export const CurrencyExchange = () => {
  const poolsV4Contract = usePoolsV4Contract()
  const [matic, setMatic] = useState(0)
  const [trend, setTrend] = useState(0)
  const [maticPrice, setMaticPrice] = useState(0)
  const [manticPriceChange, setMaticPriceChange] = useState(0)
  const [trendPrice, setTrendPrice] = useState(0)
  const [trendPriceChange, setTrendPriceChange] = useState(0)

  const baseURL = 'https://services.intotheblock.com/api/MATIC/overview'
  useEffect(() => {
    getCurrencyExchange()
    axios.get(baseURL).then((data) => {
      setMaticPrice(data.data.price)
      setMaticPriceChange(data.data.priceChange)
    })
    getPriceTrend()
  }, [])
  const getPriceTrend = async () => {
    await axios
      .get('https://api.dextools.io/v1/pair?chain=polygon&address=0x6e430d59ba145c59b73a6db674fe3d53c1f31cae', {
        headers: {
          accept: 'application/json',
          Authorization: '01e54e9712d16936f7a4a333fc6c789f',
        },
      })
      .then((data) => {
        // setMaticPrice(data.data.price)
        // setMaticPriceChange(data.data.priceChange)
        console.log(data)
      })
  }
  const getCurrencyExchange = async () => {
    const trend2USDT = await poolsV4Contract.TREND2USDT()
    // const matic2USDT = await poolsV4Contract.MATIC2USDT()
    // setMatic(1 / Number(formatEther(matic2USDT)))
    // setTrend(1 / Number(formatEther(trend2USDT)))
  }
  return (
    <Wrapper>
      <Card>
        <Title>
          <CountUp
            separator=","
            start={0}
            preserveValue
            delay={0}
            // end={Number(Number(balance) * rateBnbUsd)}
            decimals={3}
            duration={1}
            end={Number(maticPrice)}
          />
        </Title>
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
        <Title>$1 </Title>

        {manticPriceChange > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img width="16px" height="16px" src="/images/V3/Arrow.png" />

            <Label>
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                // end={Number(Number(balance) * rateBnbUsd)}
                decimals={3}
                duration={1}
                end={Number(manticPriceChange)}
              />
              %
            </Label>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img width="16px" height="16px" src="/images/V3/downArrow.png" />

            <Label style={{ color: '#E30721' }}>
              {' '}
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                // end={Number(Number(balance) * rateBnbUsd)}
                decimals={3}
                duration={1}
                end={Number(manticPriceChange)}
              />
              %
            </Label>
          </div>
        )}
      </Card>
      <Card>
        <Title>
          <CountUp
            separator=","
            start={0}
            preserveValue
            delay={0}
            // end={Number(Number(balance) * rateBnbUsd)}
            decimals={3}
            duration={1}
            end={Number(trend)}
          />
        </Title>
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
        <Title>$1 </Title>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img width="16px" height="16px" src="/images/V3/arrowUp.png" />
          <Label>+0.030%</Label>
        </div>
      </Card>
    </Wrapper>
  )
}
