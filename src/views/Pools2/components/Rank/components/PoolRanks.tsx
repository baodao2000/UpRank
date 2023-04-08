import styled from 'styled-components'
import { Heading, Flex, Text, Card, Button, useToast } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ThreeDots } from 'views/Pool/components/DepositModal'
import useConfirmTransaction from 'hooks/useConfirmTransaction'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { usePoolsV2Contract } from 'hooks/useContract'
import { ToastDescriptionWithTx } from 'components/Toast'
import { ethers } from 'ethers'
import { timeDisplayLong } from 'views/Pools2/util'

const ListPoolRanks = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  flex-wrap: wrap;
  grid-column-gap: 20px;
  grid-row-gap: 30px;
`

export const ImageRank = styled.img`
  @media screen and (min-width: 1024px) {
    width: 50px;
  }
  @media (max-width: 1023px) {
    width: 40px;
  }
`

const CardPoolRanks = styled.div`
  width: auto;
  height: auto;
  background: linear-gradient(153.15deg, #391e67 8.57%, #c4cff6 100%);
  box-shadow: 6px 10px 25px rgba(0, 0, 0, 0.1), inset 0px 4px 16px rgba(255, 233, 190, 0.63);
  border-radius: 20px;
  padding: 14px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CardHead = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
`

const HeadLeft = styled.div``

const HeadRight = styled.div``

const TitleHeadRight = styled(Heading)`
  font-weight: 700;
  font-size: 20px;
  line-height: 120%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: inherit;
  @media (max-width: 739px) {
    font-size: 20px;
  }
`

const MinMaxPrice = styled.div`
  display: flex;
  justify-content: space-between;
  color: inherit;
  gap: 6px;
`

const MinMaxItem = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: inherit;
  gap: 6px;
`

const CardBody = styled.div``

const ListInfoCard = styled.div``

const ItemInfoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`

const Label = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: #e6e6e6;

  @media (max-width: 739px) {
    font-size: 12px;
  }
`

const Value = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: #e6e6e6;
  gap: 6px;

  @media (max-width: 739px) {
    font-size: 12px;
  }
`

const BorderCard = styled.div`
  border: 1px solid #595959;
  margin: 8px 0;
`

const StyledButtonRank = styled(Button)`
  width: 103px;
  height: 30px;
  background: linear-gradient(
    178.36deg,
    #5c4a8a 1.4%,
    #d2cbef 1.41%,
    rgba(144, 126, 222, 0.62) 26.34%,
    #7b6fef 71.12%,
    #3c59f2 109.1%
  );
  box-shadow: 4px 4px 25px rgba(227, 227, 227, 0.25), 0px 4px 8px rgba(0, 0, 0, 0.25),
    inset 0px 4px 4px rgba(236, 236, 236, 0.25);
  border-radius: 22.5px;
  font-size: 12px;
`

const PoolRanks = ({ data, onSuccess, userRank, userIsClaim }) => {
  const { toastSuccess, toastError } = useToast()
  const { account, chainId } = useActiveWeb3React()
  const poolContract = usePoolsV2Contract()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { isConfirming, handleConfirm } = useConfirmTransaction({
    onConfirm: () => {
      return callWithMarketGasPrice(poolContract, 'claimRankRewardMonthly', [account])
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess(
        'Claim reward commission successfully !',
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
      onSuccess()
    },
  })

  const getColor = (title) => {
    switch (title) {
      case 'Silver':
        return '#ffc700'
      case 'Gold':
        return '#ffc700'
      case 'Titanium':
        return '#ffc700'
      case 'Platinum':
        return '#ffc700'
      case 'Diamond':
        return '#ffc700'
      default:
        return '#ffc700'
    }
  }
  return (
    <ListPoolRanks>
      {data.map((item, index) => (
        <CardPoolRanks key={index}>
          <CardHead>
            <HeadLeft>
              <ImageRank src={item.image} alt="" />
            </HeadLeft>
            <HeadRight style={{ color: getColor(item.title) }}>
              <TitleHeadRight>{item.title}</TitleHeadRight>
              <progress
                className="file"
                value={item.total}
                max={item.max}
                style={{ margin: '4px 0', accentColor: getColor(item.title), width: 130 }}
              />
              <MinMaxPrice>
                <MinMaxItem>{item.min}$</MinMaxItem>
                <MinMaxItem>{item.max}$</MinMaxItem>
              </MinMaxPrice>
            </HeadRight>
          </CardHead>
          <CardBody>
            <ItemInfoCard>
              <Label>Total:</Label>
              <Value>{item.total}$</Value>
            </ItemInfoCard>
            <ItemInfoCard>
              <Label>Current Reward:</Label>
              <Value>{item.currentReward}$</Value>
            </ItemInfoCard>
            <ItemInfoCard>
              <Label>Member:</Label>
              <Value>{item.member}</Value>
            </ItemInfoCard>
            <BorderCard />
            <ItemInfoCard>
              <Label>Your reward:</Label>
              <Value>{`${item.yourReward}`}$</Value>
            </ItemInfoCard>
          </CardBody>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <StyledButtonRank disabled={userRank === index + 1 && !userIsClaim ? false : true} onClick={handleConfirm}>
              {isConfirming ? (
                <ThreeDots className="loading">
                  Claiming<span>.</span>
                  <span>.</span>
                  <span>.</span>
                </ThreeDots>
              ) : (
                'Claim'
              )}
            </StyledButtonRank>
          </div>
        </CardPoolRanks>
      ))}
    </ListPoolRanks>
  )
}

export default PoolRanks
