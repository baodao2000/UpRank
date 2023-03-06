import styled from 'styled-components'
import React from 'react'
import { Heading, Text } from '@pancakeswap/uikit'
import PoolRanks, { ImageRank } from './components/PoolRanks'
import { getRankImage } from 'views/Pools2'

const Wrapper = styled.div`
  max-width: 900px;
  width: 100%;
  margin-bottom: 90px;
`

const StyledTitleRank = styled(Text)`
  font-weight: 700;
  line-height: 100%;
  text-transform: capitalize;
  color: #00f0e1;
  text-align: center;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const BlockPoolRanks = styled.div`
  margin-top: 40px;
`

const Rank = ({ userRank, ranks, onSuccess, userIsClaim }) => {
  return (
    <>
      <Wrapper>
        <BlockPoolRanks>
          <StyledTitleRank fontSize={['30px', '30px', '36px', '40px', '48px', '52px']}>
            Pool Rewards
            <ImageRank src={getRankImage(userRank).img} alt="" style={{ marginLeft: 10 }} />
          </StyledTitleRank>
          <PoolRanks data={ranks} onSuccess={onSuccess} userRank={userRank} userIsClaim={userIsClaim} />
        </BlockPoolRanks>
      </Wrapper>
    </>
  )
}

export default Rank
