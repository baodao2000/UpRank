import styled from 'styled-components'
import { Heading, Flex, Text, Link } from '@pancakeswap/uikit'
import PoolRanks, { ImageRank } from './components/PoolRanks'

const Wrapper = styled.div`
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

const Rank = () => {
  const yourRank = 'silver'
  const poolRanks = [
    {
      image: '/images/pools/silver.svg',
      title: 'Silver',
      total: 12000,
      currentReward: 20,
      process: 15000,
      min: 10000,
      max: 20000,
      member: 10,
      yourReward: 3000,
    },
    {
      image: '/images/pools/gold.svg',
      title: 'Gold',
      currentReward: 20,
      total: 12000,
      process: 15000,
      min: 10000,
      max: 20000,
      member: 10,
      yourReward: 3000,
    },
    {
      image: '/images/pools/titanium.svg',
      title: 'Titanium',
      currentReward: 20,
      total: 12000,
      process: 45000,
      min: 20000,
      max: 50000,
      member: 10,
      yourReward: 3000,
    },
    {
      image: '/images/pools/platinum.svg',
      title: 'Platinum',
      currentReward: 20,
      total: 12000,
      process: 35000,
      min: 20000,
      max: 50000,
      member: 10,
      yourReward: 3000,
    },
    {
      image: '/images/pools/diamond.svg',
      title: 'Diamond',
      currentReward: 20,
      total: 12000,
      process: 50000,
      min: 10000,
      max: 50000,
      member: 10,
      yourReward: 8000,
    },
  ]
  return (
    <Wrapper>
      <BlockPoolRanks>
        <StyledTitleRank fontSize={['30px', '30px', '36px', '40px', '50px', '60px']}>
          Pool Rewards
          <ImageRank src={`/images/pools/${yourRank}.svg`} alt="" style={{ marginLeft: 10 }} />
        </StyledTitleRank>
        <PoolRanks data={poolRanks} />
      </BlockPoolRanks>
    </Wrapper>
  )
}

export default Rank
