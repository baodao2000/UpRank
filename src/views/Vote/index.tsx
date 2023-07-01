import React, { useEffect, useState } from 'react'
import bg from '../../../public/images/backgroundVote.png'
import { getContract } from 'utils/contractHelpers'
import addresses from '../../config/constants/contracts'
import voteAbi from '../../config/abi/vote.json'
import { useBalance, useSigner } from 'wagmi'
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'
import refferalAbi from 'config/abi/refferal.json'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'
import { ModalCheckRegister } from 'components/ModalRegister/ModalCheckRegister'
import { Button, Text, useModal, useToast } from '@pancakeswap/uikit'
import useVoteConfirmTransaction from 'hooks/useVoteConfirmTransaction'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import { formatBigNumber } from 'utils/formatBalance'
import CountUp from 'react-countup'
import { ChainId, NATIVE } from '../../../packages/swap-sdk/src/constants'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  position: relative;
  @media screen and (max-width: 575px) {
    background-size: cover;
  }
`
const Container = styled.div`
  align-items: center;
  display: flex;
  height: 600px;
  border-radius: 20px;
  border: 1px;
  flex-direction: column;
  padding: 0 20px;
  max-width: 855px;
  @media screen and (max-width: 575px) {
    width: 100%;
    position: absolute;
    padding: 0 20px;
  }
`
const DateTime = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 700px;
  height: 110px;
  align-items: center;
  @media screen and (max-width: 575px) {
    width: 100%;
  }
`
const TextContainer = styled.div`
  max-width: 660px;
  margin-bottom: 10px;
  @media screen and (max-width: 575px) {
    width: 100%;
  }
`
const TextContent = styled(Text)`
  font-size: 18px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  word-wrap: break-word;
  text-align: justify;
  @media screen and (max-width: 575px) {
    font-size: 14px;
    line-height: 18px;
  }
`
const Progress = styled.div`
  width: 624px;
  @media screen and (max-width: 575px) {
    width: 100%;
  }
`
function Vote() {
  let CHAIN_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)
  const { account, chainId } = useWeb3React()
  const { data: signer } = useSigner()
  const voteCt = getContract({ address: addresses.vote[CHAIN_ID], abi: voteAbi, chainId: CHAIN_ID, signer })
  const refferCT = getContract({ address: addresses.refferal[CHAIN_ID], abi: refferalAbi, chainId: CHAIN_ID, signer })
  const [loadingPage, setLoadingPage] = useState(true)
  const [isRegister, setIsRegister] = useState(true)
  const [usersIsVote, setUserIsVote] = useState(false)
  const [totalVoted, setTotalVoted] = useState(0)
  const [userVoted, setUserVoted] = useState(0)

  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const [openModal, onDismiss] = useModal(
    <ModalCheckRegister onCheck={() => checkRegister()} onDismiss={() => onDismiss} />,
    true,
    false,
    'removeModalCheckRegister',
  )

  useEffect(() => {
    if (!account) {
      setLoadingPage(true)
    } else {
      setLoadingPage(false)
      checkRegister()
      checkVote()
      userTotal()
    }
  }, [account])

  const checkRegister = async () => {
    if (!account) {
      setLoadingPage(true)
    } else {
      setLoadingPage(false)
      const usersRegister = await refferCT.isReferrer(account)

      setIsRegister(usersRegister)
    }
  }
  const handleRegister = () => {
    openModal()
  }
  const checkVote = async () => {
    if (!account) {
      setLoadingPage(true)
    } else {
      setLoadingPage(false)
      const users = await voteCt.users(account)
      setUserIsVote(users)
    }
  }
  const { isVotting, isVoted, isConfirmedVote, isConfirmingVote, handleVote, handleConfirmVote } =
    useVoteConfirmTransaction({
      onRequiresVoteval: async () => {
        return Promise.resolve(true)
      },
      onVote: () => {
        setLoadingPage(true)
        return voteCt.vote()
      },
      onVoteSuccess: async ({ receipt }) => {
        toastSuccess(t('Congratdataulations vote success'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
        setLoadingPage(false)
        await checkVote()
      },
      onConfirm: (receipt) => {
        return receipt
      },
      onSuccess: async ({ receipt }) => {
        setLoadingPage(false)
        return Promise.resolve(1)
      },
    })
  const { data, isFetched } = useBalance({
    addressOrName: addresses.pools[CHAIN_ID],
  })
  const { data: data2, isFetched: isFetched2 } = useBalance({
    addressOrName: addresses.poolsV2[CHAIN_ID],
  })
  const balance =
    isFetched && data && data.value && isFetched2 && data2 && data2.value
      ? formatBigNumber(data.value.add(data2.value), 6)
      : 0
  // console.log(balance, Number(totalVoted.toString()))
  const tagert = Number(balance)

  const userTotal = async () => {
    const total = await voteCt.userTotalLockVoted()
    setTotalVoted(Number(formatBigNumber(total, 6)))
    const uv = await voteCt.getUserVote().then((rs) => rs.length)
    setUserVoted(uv)
  }
  return (
    <>
      {loadingPage === true ? (
        <TrendyPageLoader />
      ) : (
        <Wrapper
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundSize: 'cover',
          }}
        >
          <Container
            style={{
              background:
                'linear-gradient(63.67deg, rgb(184 154 247) 11.76%, rgb(109, 33, 233) 71.88%), linear-gradient(146.96deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)',
              position: 'absolute',
              bottom: 150,
            }}
          >
            <DateTime>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                }}
              >
                <img
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  src="/images/start.png"
                  width="14px"
                  height="13px"
                />
                <h1 style={{ color: '#FFFFFF' }}>Start date: 30/06/2023</h1>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                }}
              >
                <img
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  src="/images/start.png"
                  width="14px"
                  height="13px"
                />
                <h1 style={{ color: '#FFFFFF' }}>End date: 01/07/2023</h1>
              </div>
            </DateTime>
            <TextContainer>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  margin: '15px 0',
                }}
              >
                <img
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  src="/images/start.png"
                  width="14px"
                  height="10px"
                />
                <TextContent>Requested from Kols and Trendy Defi community development team.</TextContent>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  margin: '15px 0',
                }}
              >
                <img
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  src="/images/start.png"
                  width="14px"
                  height="10px"
                />
                <TextContent>As well as the upcoming Having BTC period.</TextContent>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  margin: '15px 0',
                }}
              >
                <img
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  src="/images/start.png"
                  width="14px"
                  height="10px"
                />
                <TextContent style={{ fontSize: '14px' }}>
                  Currently, Trendy Defi has reached nearly 1000 members participating in Pool Trendy Defi.
                </TextContent>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  margin: '15px 0',
                }}
              >
                <img
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  src="/images/start.png"
                  width="14px"
                  height="10px"
                />
                <TextContent style={{ fontSize: '14px' }}>
                  We will conduct voting for the issuance of TREND tokens based on the votes of the members.
                </TextContent>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  margin: '15px 0',
                }}
              >
                <img
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  src="/images/start.png"
                  width="14px"
                  height="10px"
                />
                <TextContent> If there is a 51% consensus rate Token Trend will be released in July 2023.</TextContent>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  margin: '15px 0',
                }}
              >
                <img
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  src="/images/start.png"
                  width="14px"
                  height="16px"
                />
                <TextContent>Voting period from June 30 to July 01, 2023.</TextContent>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  margin: '15px 0',
                }}
              >
                <img
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  src="/images/start.png"
                  width="14px"
                  height="13px"
                />
                <TextContent> All implementation plans will be based on majority vote.</TextContent>
              </div>
            </TextContainer>
            <Progress>
              <progress
                value={totalVoted}
                max={tagert}
                style={{ margin: '4px 0', accentColor: 'rgb(255, 199, 0)', height: 40, width: '100%' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', marginBottom: 10 }}>
                <span>0%</span>
                <span>
                  voted: {600 + userVoted} - {(((totalVoted > tagert ? tagert : totalVoted) * 100) / tagert).toFixed(2)}{' '}
                  %
                </span>
                <span>100%</span>
              </div>
            </Progress>
            {isRegister === false ? (
              <Button
                style={{
                  width: '161px',
                  height: '41px',
                  borderRadius: '20px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  padding: '20px',
                  marginBottom: 10,
                  boxShadow: '0px -1px 0px 0px rgba(14,14,44,0.4)',
                }}
                type="button"
                onClick={handleRegister}
              >
                <h1 style={{ fontSize: '20px', color: '#191326' }}>Register</h1>
              </Button>
            ) : (
              <Button
                style={{
                  width: '161px',
                  height: '41px',
                  borderRadius: '20px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  padding: '20px',
                  marginBottom: 10,
                  boxShadow: '0px -1px 0px 0px rgba(14,14,44,0.4)',
                }}
                type="button"
                onClick={handleVote}
                disabled={usersIsVote}
              >
                <h1 style={{ fontSize: '20px', color: '#191326' }}>I agree</h1>
              </Button>
            )}
          </Container>
        </Wrapper>
      )}
    </>
  )
}

export default Vote
