import styled from 'styled-components'
import { Heading, Flex, Text, Card, Button, useToast, useMatchBreakpoints } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ThreeDots } from 'views/Pool/components/DepositModal'
import useConfirmTransaction from 'hooks/useConfirmTransaction'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { usePoolsV2Contract, usePoolsV3Contract, usePoolsV4Contract } from 'hooks/useContract'
import { ToastDescriptionWithTx } from 'components/Toast'
import { ethers } from 'ethers'
import { timeDisplayLong } from 'views/Pools2/util'
import { formatEther } from '@ethersproject/units'
import CountUp from 'react-countup'
import images from 'configs/images'
import { getRankImage } from 'views/PoolV2'
import { getBlockExploreLink } from 'utils'
import contracts from 'config/constants/contracts'
import { ChainId } from '../../../../../../packages/swap-sdk/src/constants'
import axios from 'axios'
import { useEffect, useRef } from 'react'

const ListPoolRanks = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  grid-column-gap: 32px;
  grid-row-gap: 40px;
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
    width: 54px;
    height: 60px;
  }
  @media (max-width: 1023px) {
    width: 60px;
    height: 60px;
  }
`
const CardRankSilver = styled.div`
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
  position: relative;
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
  top: 5%;
  right: -2%;
  @media (max-width: 575px) {
    top: 3%;
    right: -2%;
  }
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
  @media (max-width: 575px) {
    font-size: 16px;
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
  @media (max-width: 575px) {
    font-size: 16px;
  }
  background: url(${images.bronze}) no-repeat;
  width: 128px;
  height: 44px;
  @media (max-width: 575px) {
    width: 108px;
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

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 575px) {
    gap: 6px;
  }
`

const ItemInfoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`

const Label = styled.span`
  // color: var(--greyscale-grey-scale-text-seconday, #adabb2);
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
  gap: 5px;
  @media (max-width: 739px) {
    font-size: 12px;
  }
`

const BorderCard = styled.div`
  border: 1px solid #fff;
  margin: 8px 0;
`

const StyledButtonRank = styled.button`
  width: 200px;
  height: 36px;
  color: #f3f3f3;
  border-radius: var(--border-radius-lg, 12px);
  background: var(--primary-primary-1, #8544f5);
  /* light effect/boxShadow */
  box-shadow: 2px 2px 8px 16px rgba(0, 0, 0, 0.1);

  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  &:disabled {
    border-radius: 15px;
    border: 1px solid rgba(245, 251, 242, 0.2);
    opacity: 0.30000001192092896;
    background: rgba(131, 131, 145, 1);
    backdrop-filter: blur(50px);
    color: #f3f3f3;
    font-weight: 700;
  }
`
const ValueLocked = styled(Text)`
  color: var(--primary-primary-1, #8544f5);
  /* Display xs/Bold */
  font-family: Inter, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  display: flex;
  align-items: center;
  gap: 5px;
`
const UpRanks = styled(Button)`
  border-radius: var(--border-radius-lg, 8px);
  background: var(--primary-primary-1, #8544f5);
  /* light effect/boxShadow */
  box-shadow: 2px 2px 8px 16px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
`
const nextRankRequire = [
  {
    locked: 0,
    volumnOnTree: 0,
    direct: 0,
    downline: 0,
  },
  {
    locked: 500,
    volumnOnTree: 50000,
    direct: 2,
    downline: 10,
  },
  {
    locked: 1000,
    volumnOnTree: 100000,
    direct: 5,
    downline: 50,
  },
  {
    locked: 2000,
    volumnOnTree: 200000,
    direct: 10,
    downline: 100,
  },
  {
    locked: 4000,
    volumnOnTree: 300000,
    direct: 11,
    downline: 200,
  },
  {
    locked: 4000,
    volumnOnTree: 500000,
    direct: 12,
    downline: 500,
  },
]
const PoolRanks = ({ onSuccess, userRank, unit, accountUsers }) => {
  const { toastSuccess, toastError } = useToast()
  const { account, chainId } = useActiveWeb3React()
  // account = '0x1ec0f8875B7fc2400a6F44788c6710959614e68A'
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId

  const poolContract = usePoolsV4Contract()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()

  // const { isConfirming, handleConfirm } = useConfirmTransaction({
  //   onConfirm: () => {
  //     return callWithMarketGasPrice(poolContract, 'claimRankRewardMonthly', [account])
  //   },
  //   onSuccess: async ({ receipt }) => {
  //     toastSuccess(
  //       'Claim reward commission successfully !',
  //       <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
  //     )
  //     onSuccess()
  //   },
  // })

  const { isConfirming: isConfirmingUpRank, handleConfirm: handleConfirmUpRank } = useConfirmTransaction({
    onConfirm: () => {
      console.log(accountUsers, userRank.rank + 1)
      return callWithMarketGasPrice(poolContract, 'upRankByAdmin', [accountUsers], [userRank.rank + 1])
    },

    onSuccess: async ({ receipt }) => {
      toastSuccess('Up Rank successfully !', <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onSuccess()
    },
  })
  const shortenURL = (s: string, max: number) => {
    return s.length > max ? s.substring(0, max / 2 - 1) + '...' + s.substring(s.length - max / 2 + 2, s.length) : s
  }
  const sendRequest = async () => {
    const linkAccount = getBlockExploreLink(contracts.trend[CHAIN_ID], 'address', CHAIN_ID)
    const usersAccount = shortenURL(account, 25)
    toastSuccess('your upRank request has been sent please wait...')
    const link = `${window.location.href}/?ref=${account}#review`

    const linkRequest = shortenURL(link, 25)
    const data = `
    [Request UpRank]
    The user is requesting to upRank.
    - User: <a href='${linkAccount.toString()}'>${usersAccount}</a>.
    - Level: ${dataRank[userRank.rank].title}.
    - Level up to: ${dataRank[userRank.rank + 1].title}.
    - Link review: <a href='${link}'>${linkRequest}</a>.
    `

    const options = {
      chat_id: '-1001956272867',
      text: data,
      parse_mode: 'html',
    }

    await axios.post(`https://api.telegram.org/bot6454483501:AAFLPg8DJV_RtoS736xfHETEx9l7ZHMrRSQ/sendMessage`, options)
  }
  const { isMobile } = useMatchBreakpoints()

  const canUpRank1 = userRank.locked >= nextRankRequire[userRank.rank + 1].locked
  const canUpRank2 = userRank.volumnOnTree >= nextRankRequire[userRank.rank + 1].volumnOnTree
  const canUpRank3 = userRank.direct >= nextRankRequire[userRank.rank + 1].direct
  const canUpRank4 = userRank.downline >= nextRankRequire[userRank.rank + 1].downline
  // const canUpRank1 = userRank.locked >= 0
  // const canUpRank2 = userRank.volumnOnTree >= 0
  // const canUpRank3 = userRank.direct >= 0
  // const canUpRank4 = userRank.downline >= 0
  // const canUpRank = canUpRank1 && canUpRank2 && canUpRank3 && canUpRank4
  const canUpRank = true
  const dataRank = [
    {
      title: 'Bronze',
      mine: '0',
    },
    {
      title: 'Silver',
      mine: '0.5',
    },
    {
      title: 'Gold',
      mine: '0.75',
    },
    {
      title: 'Titanium',
      mine: '1.0',
    },
    {
      title: 'Platinum',
      mine: '1.25',
    },
    {
      title: 'Diamond',
      mine: '1.5',
    },
  ]

  return (
    <ListPoolRanks>
      {dataRank.map((items, r) => (
        <CardRankSilver style={{ background: r === 5 ? 'rgba(117, 60, 216, 0.80)' : '' }} key={r}>
          <CardHead>
            <HeadLeft>
              <ImageRank src={getRankImage(r).img} alt="" />
              <TitleHeadRight style={{ color: '#fff' }}>{items.title}</TitleHeadRight>
            </HeadLeft>
            {userRank.rank === r && (
              <HeadRight>
                {accountUsers === '' ? (
                  <TitleHeadRightBronze style={{ color: '#fff' }}>Your Rank</TitleHeadRightBronze>
                ) : (
                  <TitleHeadRightBronze style={{ color: '#fff' }}>User Rank</TitleHeadRightBronze>
                )}
              </HeadRight>
            )}
            {userRank.rank + 1 === r && (
              <HeadRight>
                <TitleHeadRightBronze style={{ color: '#fff' }}>Next Rank</TitleHeadRightBronze>
              </HeadRight>
            )}
          </CardHead>
          <CardBody>
            <ItemInfoCard>
              <Label style={{ color: 'gray' }}>TREND Token Mining Speed </Label>
              <Value>
                x{items.mine}
                <img width="24px" height="18px" src="/images/V3/IconMine.png" />
              </Value>
            </ItemInfoCard>
            <ItemInfoCard>
              <Label
                style={{
                  color:
                    (canUpRank1 && userRank.rank + 1 === r) || (canUpRank1 && r === userRank.rank) ? '#fff' : 'gray',
                }}
              >
                Locked
              </Label>
              <ValueLocked style={{ color: r === 5 ? 'gray' : '#8544f5' }}>
                $
                {r === 0 ? (
                  <CountUp
                    separator=","
                    start={0}
                    preserveValue
                    delay={0}
                    end={userRank.locked}
                    decimals={0}
                    duration={0.5}
                  />
                ) : (
                  <>
                    {userRank.locked >= nextRankRequire[r].locked && userRank.rank === r ? (
                      <CountUp
                        separator=","
                        start={0}
                        preserveValue
                        delay={0}
                        end={userRank.locked}
                        decimals={0}
                        duration={0.5}
                      />
                    ) : (
                      <CountUp
                        separator=","
                        start={0}
                        preserveValue
                        delay={0}
                        end={nextRankRequire[r].locked}
                        decimals={0}
                        duration={0.5}
                      />
                    )}
                  </>
                )}
                {/* <div
                  style={{
                    background: r === 5 ? 'black' : 'var(--white-white-6, rgba(255, 255, 255, 0.06))',
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
                </div> */}
              </ValueLocked>
            </ItemInfoCard>
            <ItemInfoCard
              style={{
                color: (canUpRank2 && r === userRank.rank + 1) || (canUpRank2 && r === userRank.rank) ? '#fff' : 'gray',
              }}
            >
              <Label>Volume on tree</Label>
              <Value>
                $
                {r === 0 ? (
                  <CountUp
                    separator=","
                    start={0}
                    preserveValue
                    delay={0}
                    end={userRank.volumnOnTree}
                    decimals={0}
                    duration={0.5}
                  />
                ) : (
                  <>
                    {userRank.volumnOnTree >= nextRankRequire[r].volumnOnTree && userRank.rank === r ? (
                      <CountUp
                        separator=","
                        start={0}
                        preserveValue
                        delay={0}
                        end={userRank.volumnOnTree}
                        decimals={0}
                        duration={0.5}
                      />
                    ) : (
                      <CountUp
                        separator=","
                        start={0}
                        preserveValue
                        delay={0}
                        end={nextRankRequire[r].volumnOnTree}
                        decimals={0}
                        duration={0.5}
                      />
                    )}
                  </>
                )}
              </Value>
            </ItemInfoCard>
            <ItemInfoCard
              style={{
                color: (canUpRank3 && r === userRank.rank + 1) || (canUpRank3 && r === userRank.rank) ? '#fff' : 'gray',
              }}
            >
              <Label>Member direct</Label>
              {r === 0 ? (
                <CountUp
                  separator=","
                  start={0}
                  preserveValue
                  delay={0}
                  end={userRank.direct}
                  decimals={0}
                  duration={0.5}
                />
              ) : (
                <>
                  {userRank.direct >= nextRankRequire[r].direct && userRank.rank === r ? (
                    <CountUp
                      separator=","
                      start={0}
                      preserveValue
                      delay={0}
                      end={userRank.direct}
                      decimals={0}
                      duration={0.5}
                    />
                  ) : (
                    <CountUp
                      separator=","
                      start={0}
                      preserveValue
                      delay={0}
                      end={nextRankRequire[r].direct}
                      decimals={0}
                      duration={0.5}
                    />
                  )}
                </>
              )}
            </ItemInfoCard>
            <ItemInfoCard
              style={{
                color: (canUpRank4 && r === userRank.rank + 1) || (canUpRank4 && r === userRank.rank) ? '#fff' : 'gray',
              }}
            >
              <Label>Member downline</Label>
              {r === 0 ? (
                <CountUp
                  separator=","
                  start={0}
                  preserveValue
                  delay={0}
                  end={userRank.downline}
                  decimals={0}
                  duration={0.5}
                />
              ) : (
                <>
                  {userRank.downLine >= nextRankRequire[r].downline && userRank.rank === r ? (
                    <CountUp
                      separator=","
                      start={0}
                      preserveValue
                      delay={0}
                      end={userRank.downLine}
                      decimals={0}
                      duration={0.5}
                    />
                  ) : (
                    <CountUp
                      separator=","
                      start={0}
                      preserveValue
                      delay={0}
                      end={nextRankRequire[r].downline}
                      decimals={0}
                      duration={0.5}
                    />
                  )}
                </>
              )}
            </ItemInfoCard>
          </CardBody>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              marginTop: 8,
            }}
          >
            {accountUsers !== '' ? (
              <StyledButtonRank
                style={{ display: r === userRank.rank ? 'block' : 'none' }}
                onClick={handleConfirmUpRank}
              >
                {isConfirmingUpRank ? (
                  <ThreeDots className="loading">
                    Updating<span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </ThreeDots>
                ) : (
                  'Up Rank'
                )}
              </StyledButtonRank>
            ) : (
              <StyledButtonRank
                style={{ display: canUpRank && r === userRank.rank ? 'block' : 'none' }}
                disabled={!canUpRank}
                onClick={sendRequest}
              >
                {isConfirmingUpRank ? (
                  <ThreeDots className="loading">
                    Requesting<span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </ThreeDots>
                ) : (
                  'Request Up Rank'
                )}
              </StyledButtonRank>
            )}
          </div>
        </CardRankSilver>
      ))}
    </ListPoolRanks>
  )
}

export default PoolRanks
