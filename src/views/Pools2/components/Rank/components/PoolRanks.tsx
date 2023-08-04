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
import { formatEther } from '@ethersproject/units'
import CountUp from 'react-countup'

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
    width: 75px;
  }
  @media (max-width: 1023px) {
    width: 60px;
  }
`
const CardNextRanks = styled.div`
  min-width: 235px;
  height: auto;
  color: #fff;
  background: #7a67ed;
  /* box-shadow: 6px 10px 25px rgba(0, 0, 0, 0.1), inset 0px 4px 16px rgba(255, 233, 190, 0.63); */
  border-radius: 20px;
  padding: 14px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const CardYourRanks = styled.div`
  min-width: 235px;
  height: auto;
  color: #fff;
  background: #3a3e41;
  /* box-shadow: 6px 10px 25px rgba(0, 0, 0, 0.1), inset 0px 4px 16px rgba(255, 233, 190, 0.63); */
  border-radius: 20px;
  padding: 14px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const CardPoolRanks = styled.div`
  width: auto;
  height: auto;
  color: #fff;
  background: linear-gradient(244.16deg, #391e67 -21.5%, #c4cff6 104.65%);
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
  gap: 6px;
  text-transform: capitalize;
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
const nextRankRequire = [
  {
    locked: 500,
    volumnOnTree: 50000,
    direct: 2,
    downline: 10,
  },
  {
    locked: 1000,
    volumnOnTree: 200000,
    direct: 5,
    downline: 50,
  },
  {
    locked: 2000,
    volumnOnTree: 500000,
    direct: 10,
    downline: 100,
  },
  {
    locked: 4000,
    volumnOnTree: 1000000,
    direct: 11,
    downline: 200,
  },
  {
    locked: 8000,
    volumnOnTree: 3000000,
    direct: 12,
    downline: 500,
  },
]
const PoolRanks = ({ data, onSuccess, userRank, userIsClaim, unit }) => {
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
  const { isConfirming: isConfirmingUpRank, handleConfirm: handleConfirmUpRank } = useConfirmTransaction({
    onConfirm: () => {
      return callWithMarketGasPrice(poolContract, 'upRank', [])
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess('Up Rank successfully !', <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onSuccess()
    },
  })
  const canUpRank1 = userRank.locked >= nextRankRequire[userRank.rank].locked
  const canUpRank2 = userRank.volumnOnTree >= nextRankRequire[userRank.rank].volumnOnTree
  const canUpRank3 = userRank.direct >= nextRankRequire[userRank.rank].direct
  const canUpRank4 = userRank.downline >= nextRankRequire[userRank.rank].downline
  const canUpRank = canUpRank1 && canUpRank2 && canUpRank3 && canUpRank4
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
  // console.log(userRank)
  return (
    <ListPoolRanks>
      <CardNextRanks>
        <CardHead>
          <HeadLeft>
            <TitleHeadRight style={{ color: '#fff' }}>Your Rank</TitleHeadRight>
          </HeadLeft>
          <HeadRight style={{ color: getColor('') }}>
            <ImageRank src={userRank.image} alt="" />
          </HeadRight>
        </CardHead>
        <CardBody>
          <ItemInfoCard>
            <Label>Locked:</Label>
            <Value>
              {userRank.locked} {unit}
            </Value>
          </ItemInfoCard>
          <ItemInfoCard>
            <Label>Volumn on tree:</Label>
            <Value>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(6px)',
                  borderRadius: '4px',
                  width: '14px',
                  height: '14px',
                }}
              >
                <img width="14px" height="14px" src="./images/V3/Vector.png" />
              </div>
              {userRank.volumnOnTree}
            </Value>
          </ItemInfoCard>
          <ItemInfoCard>
            <Label>Member direct:</Label>
            <Value>{userRank.direct}</Value>
          </ItemInfoCard>
          <ItemInfoCard>
            <Label>Member downline:</Label>
            <Value>{userRank.downline}</Value>
          </ItemInfoCard>
        </CardBody>
        <div style={{ textAlign: 'center', marginTop: 8 }}></div>
      </CardNextRanks>
      <CardYourRanks>
        <CardHead>
          <HeadLeft>
            <TitleHeadRight style={{ color: '#fff' }}>Next Rank</TitleHeadRight>
          </HeadLeft>
          <HeadRight style={{ color: getColor('') }}>
            <ImageRank src={data[userRank.rank].image} alt="" />
          </HeadRight>
        </CardHead>
        <CardBody>
          <ItemInfoCard style={{ color: canUpRank1 ? '#fff' : 'gray' }}>
            <Label>Locked:</Label>
            <Value>
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                end={nextRankRequire[userRank.rank].locked}
                decimals={0}
                duration={0.5}
                style={{ color: 'inherit !important' }}
              />
              {unit}
            </Value>
          </ItemInfoCard>
          <ItemInfoCard style={{ color: canUpRank2 ? '#fff' : 'gray' }}>
            <Label>Volumn on tree:</Label>
            <Value>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(6px)',
                  borderRadius: '4px',
                  width: '14px',
                  height: '14px',
                }}
              >
                <img width="14px" height="14px" src="./images/V3/Vector.png" />
              </div>
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                end={nextRankRequire[userRank.rank].volumnOnTree}
                decimals={0}
                duration={0.5}
                style={{ color: 'inherit !important' }}
              />{' '}
            </Value>
          </ItemInfoCard>
          <ItemInfoCard style={{ color: canUpRank3 ? '#fff' : 'gray' }}>
            <Label>Member direct:</Label>
            <Value>{nextRankRequire[userRank.rank].direct}</Value>
          </ItemInfoCard>
          <ItemInfoCard style={{ color: canUpRank4 ? '#fff' : 'gray' }}>
            <Label>Member downline:</Label>
            <Value>{nextRankRequire[userRank.rank].downline}</Value>
          </ItemInfoCard>
        </CardBody>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <StyledButtonRank disabled={!canUpRank} onClick={handleConfirmUpRank}>
            {isConfirmingUpRank ? (
              <ThreeDots className="loading">
                Claiming<span>.</span>
                <span>.</span>
                <span>.</span>
              </ThreeDots>
            ) : (
              'Up Rank'
            )}
          </StyledButtonRank>
        </div>
      </CardYourRanks>
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
              <Label>Volumn on tree:</Label>
              <Value>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(6px)',
                    borderRadius: '4px',
                    width: '14px',
                    height: '14px',
                  }}
                >
                  <img width="14px" height="14px" src="./images/V3/Vector.png" />
                </div>
                {userRank.volumnOnTree}
              </Value>
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
