import { Heading, Flex, Button, Card } from '@pancakeswap/uikit'
import styled from 'styled-components'
import NextLink from 'next/link'
import { timeDisplay } from 'views/Pool2/util'

const CardWidth = styled(Card)`
  height: auto;
  width: 100%;
  height: 348px;
  padding: 26px 19px;
  margin-bottom: 30px;
  background: linear-gradient(239.08deg, #f3dda8 11.04%, #ffae3d 92.61%);

  ${({ theme }) => theme.mediaQueries.md} {
    width: 400px;
    height: 456px;
    margin-bottom: 42px;
  }
`

const CardHead = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 30px;
  }
`

const StyledHeadingRight = styled(Heading)`
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  color: #4a5178;
  text-transform: uppercase;
`

const ImageWidth = styled.img`
  width: 76px;
  height: 76px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 100px;
    height: 100px;
  }
`

const WrapperText = styled.div`
  margin-top: 21px;
`

const StyledTextLeft = styled(Heading)`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #4a5178;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
    line-height: 24px;
  }
`

const StyledTextRight = styled(Heading)`
  font-weight: 800;
  font-size: 14px;
  line-height: 17px;
  color: #4a5178;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
    line-height: 24px;
  }
`

const StyledTotalLock = styled(Flex)`
  height: 45px;
  padding: 8px 0;
  border-top: 1px solid #4a5178;
  border-bottom: 1px solid #4a5178;
  margin: 10px 0 34px 0;
`

const StyledButton = styled(Button)`
  width: 100%;
  height: 37px;
  background: linear-gradient(135deg, #105eec 0%, #061428 100%);
  opacity: 0.95;
  color: white;
  font-size: 18px;
  border-radius: 10px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 56px;
    font-size: 32px;
  }
`

export type CardPoolItem = { image: string; title: string; listText: any; totalLock: object }

const CardPool: React.FC<React.PropsWithChildren<{ pool: any; id: any }>> = ({ pool, id }) => {
  return (
    <CardWidth>
      <Flex flexDirection="column">
        <CardHead alignItems="center" justifyContent="space-around">
          <ImageWidth src={pool.image} alt="coin" />
          <StyledHeadingRight>{pool.tokenStake}</StyledHeadingRight>
        </CardHead>
        <WrapperText>
          {/* {pool.listText.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Flex justifyContent="space-between" key={index}>
              <StyledTextLeft>{item.title}</StyledTextLeft>
              <StyledTextRight>{item.value}</StyledTextRight>
            </Flex>
          ))} */}
          <Flex justifyContent="space-between">
            <StyledTextLeft>Min Stake</StyledTextLeft>
            <StyledTextRight>{pool.minStake}</StyledTextRight>
          </Flex>
          <Flex justifyContent="space-between">
            <StyledTextLeft>Interest</StyledTextLeft>
            <StyledTextRight>{pool.currentInterest + '.00'} %</StyledTextRight>
          </Flex>
          <Flex justifyContent="space-between">
            <StyledTextLeft>Early Interest</StyledTextLeft>
            <StyledTextRight>{pool.earlyWDInterest + '.00'} %</StyledTextRight>
          </Flex>
          <Flex justifyContent="space-between">
            <StyledTextLeft>Time Lock</StyledTextLeft>
            <StyledTextRight>{timeDisplay(pool.timeLock)}</StyledTextRight>
          </Flex>
        </WrapperText>
        <StyledTotalLock justifyContent="space-between" alignItems="center">
          <StyledTextLeft>Total Lock</StyledTextLeft>
          <StyledTextRight>{pool.totalLock}</StyledTextRight>
        </StyledTotalLock>
        <StyledButton>
          <NextLink href={`/pool/${id}`} passHref>
            View Detail
          </NextLink>
        </StyledButton>
      </Flex>
    </CardWidth>
  )
}

export default CardPool
