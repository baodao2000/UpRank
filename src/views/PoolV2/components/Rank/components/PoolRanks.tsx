import styled from 'styled-components'
import { Heading, Flex, Text, Card, Button, useToast, useMatchBreakpoints } from '@pancakeswap/uikit'
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
import images from 'configs/images'

const ListPoolRanks = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: wrap;
  grid-column-gap: 32px;
  grid-row-gap: 30px;
  flex-direction: row;
  @media screen and (max-width: 575px) {
    padding: 16px;
    grid-row-gap: 16px;
  }
  @media screen and (max-width: 1300px) {
    justify-content: center;
  }
`

export const ImageRank = styled.img`
  @media screen and (min-width: 1024px) {
    width: 58px;
    height: 64px;
  }
  @media (max-width: 1023px) {
    width: 60px;
  }
`
const CardNextRanks = styled.div`
  max-width: 386px;
  height: auto;
  color: #fff;
  border-radius: 24px;
  border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
  background: var(--black-black-20, rgba(0, 0, 0, 0.2));
  backdrop-filter: blur(5.5px);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  gap: 24px;
  width: 100%;
  @media screen and (max-width: 575px) {
    padding: 16px;
  }
  @media screen and (max-width: 800px) {
    width: 336px;
  }
`
const CardYourRanks = styled.div`
  max-width: 386px;
  height: auto;
  color: #fff;
  border-radius: 24px;
  border: 1px solid transparent;
  border-image-slice: 1;

  background-image: linear-gradient(#18171b, #18171b), radial-gradient(circle at top left, #7b3fe4 0%, #a726c1 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  backdrop-filter: blur(5.5px);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: 24px;
  @media screen and (max-width: 575px) {
    padding: 16px;
  }
  @media screen and (max-width: 800px) {
    width: 336px;
  }
`
const CardRanksGold = styled.div`
  max-width: 386px;
  height: auto;
  color: #fff;
  border-radius: 24px;
  background: var(--primary-primary-2, rgba(117, 60, 216, 0.8));
  backdrop-filter: blur(5.5px);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: 24px;

  @media screen and (max-width: 575px) {
    padding: 16px;
  }
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
`

const HeadLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const HeadRight = styled.div`
  position: absolute;
  top: 10%;
  right: -2%;
`

const TitleHeadRight = styled.div`
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

const TitleHeadRightBronze = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  justify-content: center;
  color: inherit;
  @media (max-width: 739px) {
    font-size: 20px;
  }
  background: url(${images.bronze}) no-repeat;
  width: 128px;
  height: 44px;
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

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const ItemInfoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`

const Label = styled.span`
  color: var(--greyscale-grey-scale-text-seconday, #adabb2);
  /* Text md/regular */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

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
const ValueLocked = styled(Text)`
  color: var(--primary-primary-1, #8544f5);
  /* Display xs/Bold */
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  display: flex;
  align-items: center;
  gap: 15px;
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
  const { isMobile } = useMatchBreakpoints()

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
  // console.log(data[userRank.rank].image)
  return (
    <ListPoolRanks>
      <CardNextRanks>
        <CardHead>
          <HeadLeft>
            <ImageRank src={userRank.image} alt="" />
            <TitleHeadRight style={{ color: '#fff' }}>Bronze</TitleHeadRight>
          </HeadLeft>
          <HeadRight style={{ color: getColor(''), display: isMobile ? 'none' : 'block' }}>
            <TitleHeadRightBronze style={{ color: '#fff' }}>Your Rank</TitleHeadRightBronze>
          </HeadRight>
        </CardHead>
        <CardBody>
          <ItemInfoCard>
            <Label>Locked</Label>
            <ValueLocked>
              {userRank.locked}
              <div
                style={{
                  background: 'var(--white-white-6, rgba(255, 255, 255, 0.06))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(6px)',
                  borderRadius: '4px',
                  width: '24px',
                  height: '24px',
                }}
              >
                <img width="18px" height="16px" src="./images/V3/Vector.png" />
              </div>
            </ValueLocked>
          </ItemInfoCard>
          <ItemInfoCard>
            <Label>Volumn on tree</Label>
            <Value>${userRank.volumnOnTree}</Value>
          </ItemInfoCard>
          <ItemInfoCard>
            <Label>Member direct</Label>
            <Value>${userRank.direct}</Value>
          </ItemInfoCard>
          <ItemInfoCard>
            <Label>Member downline:</Label>
            <Value>${userRank.downline}</Value>
          </ItemInfoCard>
        </CardBody>
      </CardNextRanks>
      <CardYourRanks>
        <CardHead>
          <HeadLeft>
            <ImageRank src={data[userRank.rank].image} alt="" />
            <TitleHeadRight style={{ color: '#fff' }}>Silver</TitleHeadRight>
          </HeadLeft>
          <HeadRight style={{ color: getColor('') }}></HeadRight>
        </CardHead>
        <CardBody>
          <ItemInfoCard style={{ color: canUpRank1 ? '#fff' : 'gray' }}>
            <Label>Locked</Label>
            <ValueLocked>
              {userRank.locked}
              <div
                style={{
                  background: 'var(--white-white-6, rgba(255, 255, 255, 0.06))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(6px)',
                  borderRadius: '4px',
                  width: '24px',
                  height: '24px',
                }}
              >
                <img width="18px" height="16px" src="./images/V3/Vector.png" />
              </div>
            </ValueLocked>
          </ItemInfoCard>
          <ItemInfoCard style={{ color: canUpRank2 ? '#fff' : 'gray' }}>
            <Label>Volumn on tree</Label>
            <Value>
              $
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
            <Label>Member direct</Label>
            <Value>${nextRankRequire[userRank.rank].direct}</Value>
          </ItemInfoCard>
          <ItemInfoCard style={{ color: canUpRank4 ? '#fff' : 'gray' }}>
            <Label>Member downline</Label>
            <Value>${nextRankRequire[userRank.rank].downline}</Value>
          </ItemInfoCard>
        </CardBody>
      </CardYourRanks>
      <CardRanksGold>
        <CardHead>
          <HeadLeft>
            <ImageRank src="./images/V3/gold.png" alt="" />
            <TitleHeadRight style={{ color: '#fff' }}>Gold</TitleHeadRight>
          </HeadLeft>
        </CardHead>
        <CardBody>
          <ItemInfoCard style={{ color: canUpRank1 ? '#fff' : 'gray' }}>
            <Label>Locked</Label>
            <ValueLocked style={{ color: 'rgba(226, 225, 229, 1)' }}>
              {userRank.locked}
              <div
                style={{
                  background: 'var(--black-black-60, rgba(0, 0, 0, 0.60))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(6px)',
                  borderRadius: '4px',
                  width: '24px',
                  height: '24px',
                }}
              >
                <img width="18px" height="16px" src="./images/V3/Vector.png" />
              </div>
            </ValueLocked>
          </ItemInfoCard>
          <ItemInfoCard style={{ color: canUpRank2 ? '#fff' : 'gray' }}>
            <Label>Volumn on tree</Label>
            <Value>
              $
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                end={nextRankRequire[userRank.rank].volumnOnTree}
                decimals={0}
                duration={0.5}
                style={{ color: 'inherit !important' }}
              />
            </Value>
          </ItemInfoCard>
          <ItemInfoCard style={{ color: canUpRank3 ? '#fff' : 'gray' }}>
            <Label>Member direct</Label>
            <Value>${nextRankRequire[userRank.rank].direct}</Value>
          </ItemInfoCard>
          <ItemInfoCard style={{ color: canUpRank4 ? '#fff' : 'gray' }}>
            <Label>Member downline</Label>
            <Value>${nextRankRequire[userRank.rank].downline}</Value>
          </ItemInfoCard>
        </CardBody>
        {/* <div style={{ textAlign: 'center', marginTop: 8 }}>
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
        </div> */}
      </CardRanksGold>
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
