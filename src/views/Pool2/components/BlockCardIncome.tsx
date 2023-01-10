import styled from 'styled-components'
import { Text, Heading, Flex, Card, CardHeader } from '@pancakeswap/uikit'
import { getPoolsContract } from 'utils/contractHelpers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useRouter } from 'next/router'
import { WrapperButton, StyledButton } from './BlockTotalCard'

const CardWidth = styled(Card)`
  width: 100%;
  height: auto;
  padding: 13px 10px;
  margin-bottom: 30px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 14px 16px;
    height: 188px;
  }
`

const StyledSubtitle = styled(Text)`
  display: block;
  width: 100%;
  color: #9598a7;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  margin-bottom: 24px;
  margin-top: 50px;
`

const CardHead = styled(Flex)`
  border-bottom: 1px solid #d2d6ef;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0 0 15px 35px;
  }
`

const StyledHeading = styled(Heading)`
  font-weight: 500;
  font-size: 10px;
  line-height: 20px;
  color: #9598a7;

  ${({ theme }) => theme.mediaQueries.md} {
    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
  }
`

const CardBody = styled(Flex)`
  flex-direction: column;
`

const WrapperText = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  padding-top: 12px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 35px;
    padding-top: 40px;
  }

  &:first-child {
    padding-top: 14px;

    ${({ theme }) => theme.mediaQueries.md} {
      padding-top: 25px;
    }
  }
`

const StyledText = styled(Heading)`
  font-weight: 500;
  font-size: 10px;
  line-height: 20px;
  color: #9598a7;

  ${({ theme }) => theme.mediaQueries.md} {
    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
  }

  &:nth-child(3) {
    transform: translateX(30px);
  }

  &:nth-child(4) {
    transform: translateX(26px);

    ${({ theme }) => theme.mediaQueries.md} {
      transform: translateX(50px);
    }
  }

  &:nth-child(5) {
    transform: translateX(20px);

    ${({ theme }) => theme.mediaQueries.md} {
      transform: translateX(40px);
    }
  }
`

const CardIncorm = ({ usersClaim }) => {
  const head = ['Date Time', 'Locked Amount', 'Interest', 'Total Lock', 'Income', 'Action']
  const body = [
    {
      value: ['01/11/2022', '100', '15', '1000', '36', 'Claimed'],
    },
    {
      value: ['01/11/2022', '100', '12', '900', '12', 'Waiting'],
    },
  ]
  const poolId = useRouter().query?.poolId
  const { chainId, account } = useActiveWeb3React()
  const poolsContract = getPoolsContract(chainId)
  const getUserInfor = async () => {
    const userInfor = await poolsContract.getUsersClaimed(poolId, account)
  }
  return (
    <CardWidth>
      <CardHead justifyContent="space-between">
        {head.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <StyledHeading key={index}>{item}</StyledHeading>
        ))}
      </CardHead>
      <CardBody>
        {body.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <WrapperText key={index}>
            {item.value.map((value, key) => (
              // eslint-disable-next-line react/no-array-index-key
              <StyledText key={key}>{value}</StyledText>
            ))}
          </WrapperText>
        ))}
      </CardBody>
    </CardWidth>
  )
}

const BlockCardIncorm = ({ usersClaim }) => {
  return (
    <Flex flexDirection="column">
      <StyledSubtitle textAlign="center">Your Income</StyledSubtitle>
      <CardIncorm usersClaim={usersClaim} />
      <WrapperButton>
        <StyledButton>Your Staked: 1000</StyledButton>
      </WrapperButton>
    </Flex>
  )
}

export default BlockCardIncorm
