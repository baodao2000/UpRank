import { useMatchBreakpoints, Text, Button, useModal } from '@pancakeswap/uikit'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'
import TableDataPool from './components/yourMineHistory'
import { getPoolsV3Contract } from 'utils/contractHelpers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from '../../../packages/swap-sdk/src/constants'
import { formatEther } from '@ethersproject/units'
import ClaimPoolModal from './components/ClaimModal'

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
const TitleChildren = styled.div`
  color: #c0c0c0;
  font-size: 30px;
`
const Table = styled.div`
  border: 2px solid #00f0e1;
  border-radius: 24px;
  color: black;
  max-width: 1000px;
  width: 100%;
`

function Mining() {
  const { account, chainId } = useActiveWeb3React()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const [loadingPage, setLoadingPage] = useState(true)
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const [isLoading, setIsLoading] = useState(false)
  const getPoolContract = getPoolsV3Contract(CHAIN_ID)

  const [mineData, setMineData] = useState({
    totalMined: 0,
    claimed: 0,
    remain: 0,
    mineSpeed: 0,
    mineSpeedLevel: 0,
    startTime: 0,
    userClaimedMineLength: 0,
    currentReward: 0,
  })
  const getMine = async () => {
    try {
      if (!account) {
        setIsLoading(true)
      } else {
        console.log(account)
        setIsLoading(false)
        const getUsersClaimMinedLength = await getPoolContract.getUsersClaimMinedLength(
          '0x22852cbcF916Dd0B32BB25680ec3a4f9ce223e52',
        )
        const users = await getPoolContract.usersMine(account)
        const currentRewardTREND = await getPoolContract.currentRewardTREND(account)
        setMineData({
          totalMined: Number(formatEther(users.totalMined)),
          claimed: Number(users.claimed),
          remain: Number(formatEther(users.remain)),
          mineSpeed: Number(users.mineSpeed),
          mineSpeedLevel: Number(users.mineSpeedLevel),
          startTime: Number(users.startTime),
          userClaimedMineLength: Number(formatEther(getUsersClaimMinedLength)),
          currentReward: Number(formatEther(currentRewardTREND)),
        })
        // setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMine()
  }, [account])
  // const current = async () => {
  //   const newdd = await getPoolContract.currentRewardTREND(account)
  //   console.log(newdd);

  // }
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

      <Table>
        <TableDataPool mine={mineData} userClaimedMineLength={mineData.userClaimedMineLength} />
      </Table>
    </Wrapper>
  )
}

export default Mining
