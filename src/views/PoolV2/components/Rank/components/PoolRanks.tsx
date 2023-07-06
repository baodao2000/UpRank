import styled from 'styled-components'
import { Heading, Flex, Text, Card, Button, useToast } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ThreeDots } from 'views/Pool/components/DepositModal'
import useConfirmTransaction from 'hooks/useConfirmTransaction'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { usePoolsV2Contract, usePoolsV3Contract } from 'hooks/useContract'
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
  // background: #7a67ed;
  /* box-shadow: 6px 10px 25px rgba(0, 0, 0, 0.1), inset 0px 4px 16px rgba(255, 233, 190, 0.63); */
  background: radial-gradient(
    101.36% 117.36% at 0% -2.74%,
    rgba(125, 128, 196, 0.6) 0%,
    rgba(136, 139, 224, 0.264) 100%
  );
  border: 1px solid rgba(245, 251, 242, 0.2);
  backdrop-filter: blur(50px);
  border-radius: 15px;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const CardYourRanks = styled.div`
  min-width: 235px;
  height: auto;
  color: #fff;
  // background: #3a3e41;
  // /* box-shadow: 6px 10px 25px rgba(0, 0, 0, 0.1), inset 0px 4px 16px rgba(255, 233, 190, 0.63); */
  // border-radius: 20px;
  background: radial-gradient(
    101.36% 117.36% at 0% -2.74%,
    rgba(125, 128, 196, 0.6) 0%,
    rgba(136, 139, 224, 0.264) 100%
  );
  border: 1px solid rgba(245, 251, 242, 0.2);
  backdrop-filter: blur(50px);
  border-radius: 15px;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const CardPoolRanks = styled.div`
  position: relative;
  width: auto;
  height: auto;
  color: #fff;
  background: radial-gradient(
    101.36% 117.36% at 0% -2.74%,
    rgba(125, 128, 196, 0.6) 0%,
    rgba(136, 139, 224, 0.264) 100%
  );
  border: 1px solid rgba(245, 251, 242, 0.2);
  backdrop-filter: blur(50px);
  border-radius: 15px;
  // background: linear-gradient(244.16deg, #391e67 -21.5%, #c4cff6 104.65%);
  // box-shadow: 6px 10px 25px rgba(0, 0, 0, 0.1), inset 0px 4px 16px rgba(255, 233, 190, 0.63);
  // border-radius: 20px;
  padding: 20px 20px;
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

const HeadLeft = styled.div`
  position: absolute;
  top: -2px;
  right: 10px;
`

const HeadRight = styled.div`
  width: 230px;
`

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
  justify-content: flex-start;
  color: inherit;
  gap: 50px;
  color: #67e4ff;
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
  color: #67e4ff;
`

const CardBody = styled.div``

const ItemInfoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`

const Label = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  display: flex;
  color: #fff;
  align-items: center;
  text-transform: capitalize;

  @media (max-width: 739px) {
    font-size: 12px;
  }
`

const Value = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  gap: 6px;
  color: #fff;

  @media (max-width: 739px) {
    font-size: 12px;
  }
`

const BorderCard = styled.div`
  border: 1px solid #fff;
  margin: 8px 0;
`

const StyledButtonRank = styled.button`
  width: 160px;
  height: 36px;
  color: #f3f3f3;
  background: radial-gradient(
    157.74% 210.61% at 0% 0%,
    rgba(192, 240, 255, 0.8) 0%,
    rgba(159, 169, 213, 0.29) 87.18%,
    rgba(2, 0, 98, 0) 100%
  );
  backdrop-filter: blur(50px);
  border-radius: 22.5px;
  font-size: 18px;
  &:disabled {
    border-radius: 15px;
    border: 1px solid rgba(245, 251, 242, 0.2);
    opacity: 0.30000001192092896;
    background: radial-gradient(
      157.74% 210.61% at 0% 0%,
      rgba(192, 240, 255, 0.8) 0%,
      rgba(159, 169, 213, 0.29) 87.18%,
      rgba(2, 0, 98, 0) 100%
    );
    backdrop-filter: blur(50px);
    color: #f3f3f3;
    font-weight: 700;
  }
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
  const poolContract = usePoolsV3Contract()
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
        return 'rgba(245, 245, 246, 1)'
      case 'Gold':
        return 'rgba(254, 243, 186, 1)'
      case 'Titanium':
        return 'rgba(181, 255, 246, 1)'
      case 'Platinum':
        return 'rgba(183, 229, 255, 1)'
      case 'Diamond':
        return 'rgba(174, 255, 235, 1)'
      default:
        return '#fff'
    }
  }
  // console.log(userRank)
  return (
    <ListPoolRanks>
      <CardNextRanks>
        <CardHead>
          <HeadLeft>
            <ImageRank src={userRank.image} alt="" />
          </HeadLeft>
          <HeadRight style={{ color: getColor('') }}>
            <TitleHeadRight style={{ color: '#fff' }}>Your Rank</TitleHeadRight>
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
            <Value>{userRank.volumnOnTree} $</Value>
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
            <ImageRank src={data[userRank.rank].image} alt="" />
          </HeadLeft>
          <HeadRight style={{ color: getColor(''), marginBottom: '30px' }}>
            <TitleHeadRight style={{ color: '#fff' }}>Next Rank</TitleHeadRight>
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
              $
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
      {/* {data.map((item, index) => (
        <CardPoolRanks key={index}>
          <CardHead>
            <HeadRight style={{ color: getColor(item.title) }}>
              <TitleHeadRight>{item.title}</TitleHeadRight>
              <progress
                className="file"
                value={item.total}
                max={item.max}
                style={{ margin: '4px 0', accentColor: getColor(item.title), width: 160 }}
              />
              <MinMaxPrice>
                <MinMaxItem style={{ color: getColor(item.title) }}>{item.min}$</MinMaxItem>
                <MinMaxItem style={{ color: getColor(item.title) }}>{item.max}$</MinMaxItem>
              </MinMaxPrice>
            </HeadRight>
            <HeadLeft>
              <ImageRank src={item.image} alt="" />
            </HeadLeft>
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
              <Label style={{ fontSize: '24px' }}>Your reward:</Label>
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
      ))} */}
    </ListPoolRanks>
  )
}

export default PoolRanks
