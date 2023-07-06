import { useMatchBreakpoints } from '@pancakeswap/uikit'

import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'

const Title = styled.div`
  color: #00f0e1;
  font-size: 58px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  @media screen and (max-width: 575px) {
    font-size: 36px;
  }
`
const Wrapper = styled.div`
  background: linear-gradient(153.15deg, rgb(124, 7, 216) 8.57%, rgba(129, 69, 255, 0.02) 100%);
  border: 1px solid black;
  border-radius: 10px;
  height: 95%;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 50px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  color: white;
  font-size: 30px;
`
const Text = styled.div`
  color: #ffffff;
  font-size: 30px;
  display: flex;
  font-weight: 600;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`
const TitleChildren = styled.div`
  color: #c0c0c0;
  font-size: 30px;
`

function Mining() {
  const { isMobile, isTablet } = useMatchBreakpoints()
  const [loadingPage, setLoadingPage] = useState(true)

  return (
    <Wrapper>
      <Container>
        <Title style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>1570</Title>
        <Text>
          Miners <TitleChildren>Online</TitleChildren>
        </Text>
      </Container>
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          width: isMobile ? '60%' : isTablet ? '90%' : '60%',
          marginTop: isMobile ? '10px' : '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Title>
            2.45 <TitleChildren>TH/s</TitleChildren>
          </Title>
          <Text>
            Pool <TitleChildren>Hashrate</TitleChildren>
          </Text>
          <Title>
            10.68 <TitleChildren>TH/s</TitleChildren>
          </Title>
          <Text>
            Network <TitleChildren>Hashrate</TitleChildren>
          </Text>
          <Title>17424620</Title>
          <Text>
            Mining <TitleChildren>Block</TitleChildren>
          </Text>
          <Title>14%</Title>
          <Text>Luck</Text>
          <Title>580</Title>
          <Text>Epoch</Text>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Title>
            146.19 <TitleChildren>T</TitleChildren>
          </Title>
          <Text>
            Network <TitleChildren>Difficulty</TitleChildren>
          </Text>
          <Title>2 minutes ago</Title>
          <Text>
            Last <TitleChildren>Block</TitleChildren>
          </Text>
          <Title>
            2.11 <TitleChildren>$</TitleChildren>
          </Title>
          <Text>
            Price <TitleChildren>ETHW</TitleChildren>
          </Text>
          <Title>1.0%</Title>
          <Text>
            Pool <TitleChildren>Fee</TitleChildren>
          </Text>
          <Title>
            5.531 <TitleChildren>GB</TitleChildren>
          </Title>
          <Text>
            DAG <TitleChildren>Size</TitleChildren>
          </Text>
        </div>
      </div>
    </Wrapper>
  )
}

export default Mining