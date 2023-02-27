import styled from 'styled-components'
import { Card, Heading, Text, Flex, Button, useToast } from '@pancakeswap/uikit'
import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { getContract, getPoolsContract } from 'utils/contractHelpers'
import addresses from 'config/constants/contracts'
import refferalAbi from 'config/abi/refferal.json'
import { useDispatch } from 'react-redux'
import { setRefLink } from 'state/referral'
import { useSigner } from 'wagmi'
import truncateHash from '@pancakeswap/utils/truncateHash'
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'

const ReferralPage = styled.div`
  display: flex;
  width: 100%;
  max-width: 1335px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 32px;
  padding: 0 30px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const CardWidth = styled(Card)`
  width: 100%;
  height: auto;
  max-height: 360px;
  padding: 24px;
  margin-bottom: 30px;
  background: linear-gradient(239.08deg, #f3dda8 11.04%, #ffae3d 92.61%);

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 30px 37px;
  }
`

const StyledHead = styled(Heading)`
  text-align: center;
  font-weight: 700;
  color: #1060ec;
  font-size: 24px;
  line-height: 29px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 48px;
    line-height: 59px;
  }
`

const StyledSubtitle = styled(Text)`
  color: #1060ec;
  font-weight: 500;
  font-size: 14px;
  line-height: 144.5%;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 32px;
  }
`

const GroupLinkRef = styled(Flex)`
  flex-direction: column;
  align-items: center;
`

const WrapperLinkRef = styled.div`
  position: relative;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 584px;
  }
`

const StyledLabelLinkRef = styled.label`
  font-weight: 600;
  font-size: 24px;
  line-height: 144.5%;
  color: #1060ec;
  text-align: center;
  display: block;
  margin: 20px 0 12px 0;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 32px;
  }
`

const StyledLink = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #105eec 0%, #061428 100%);
  border-radius: 10px;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 18px;
  padding: 10px 10px 10px 50px;
  min-height: 34px;

  ${({ theme }) => theme.mediaQueries.md} {
    min-height: 44px;
  }
`

const StyledButton = styled(Button)`
  background: linear-gradient(135deg, #105eec 0%, #061428 100%);
  border-radius: 8px;
  font-weight: 800;
  color: #ffffff;
  margin-top: 30px;
  width: 100%;
  font-size: 16px;
  line-height: 17px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 343px;
    font-size: 32px;
    line-height: 39px;
  }
`

const StyledIconRef = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  cursor: pointer;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 30px;
    height: 30px;
  }
`

const ShowLinkRefPc = styled.span`
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`

const ShowLinkRefMobile = styled.span`
  display: block;
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

const Referral = () => {
  const [linkRef, setLinkRef] = React.useState('')
  const [showCopied, setShowCopied] = React.useState(false)
  const { account, chainId } = useWeb3React()
  const dispatch = useDispatch()
  const { toastSuccess, toastError } = useToast()
  const [loading, setLoading] = React.useState(false)
  const { search } = window.location
  const query = new URLSearchParams(search)
  const referBy = query.get('ref')
  const baseRefUrl = `${window.location.origin}homepage?ref=`
  const { data: signer } = useSigner()
  const [modalIsOpen, setModalIsOpen] = React.useState(true)
  // const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId;
  const CHAIN_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)
  const getPoolContract = getPoolsContract(CHAIN_ID)
  const refferCT = getContract({ address: addresses.refferal[CHAIN_ID], abi: refferalAbi, chainId: CHAIN_ID, signer })
  const [userIsRegister, setUserIsRegister] = React.useState(false)
  const [interest, setInterest] = React.useState(0)

  React.useEffect(() => {
    const checkUserRegister = async () => {
      if (account) {
        const isRegister = await refferCT.isReferrer(account)
        setUserIsRegister(isRegister)
      }
    }
    checkUserRegister()

    if (userIsRegister && account) {
      setLinkRef(getLinkRef())
    } else {
      setLinkRef('')
    }
  }, [account, userIsRegister])

  React.useEffect(() => {
    getRefer()
  }, [])

  const getLinkRef = () => {
    const param = window.location.origin
    const text = `${param}?ref=${account}`

    return text
  }

  const getRefer = async () => {
    const pool = await getPoolContract.pools(5)
    const interest = Number(pool.commPercent.toString()) * 0.000001 * 100
    setInterest(interest)
  }

  const onRegister = async () => {
    try {
      if (referBy) {
        const txReceipt = await refferCT.register(referBy)
        if (txReceipt?.hash) {
          dispatch(setRefLink(`${baseRefUrl}${account}`))
          toastSuccess('Congratulations, you have successfully registered!')
          setLinkRef(getLinkRef())
        } else {
          toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
        }
      } else {
        const ref = localStorage.getItem('saveAdd')
        if (ref?.includes('0x')) {
          const txReceipt = await refferCT.register(ref)
          if (txReceipt?.hash) {
            dispatch(setRefLink(`${baseRefUrl}${account}`))
            toastSuccess('Congratulations, you have successfully registered!')
            setLinkRef(getLinkRef())
          } else {
            toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
          }
        } else {
          const owner = await refferCT.owner()
          const txReceipt = await refferCT.register(owner)
          if (txReceipt?.hash) {
            dispatch(setRefLink(`${baseRefUrl}${account}`))
            toastSuccess('Congratulations, you have successfully registered!')
            setLinkRef(getLinkRef())
          } else {
            toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
          }
        }
      }
      setLoading(false)
    } catch (error) {
      console.log('onRegister error:', error)
      setLoading(false)
      toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
    }
  }

  const handleRef = () => {
    if (userIsRegister) {
      const text = getLinkRef()
      const copyText = (text) => {
        const el = document.createElement('textarea')
        el.value = text
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
      }
      copyText(text)
      setShowCopied(true)
    }
  }

  const handleLeave = () => {
    setTimeout(() => {
      setShowCopied(false)
    }, 100)
  }

  const formatLinkRef = (ref, start, end) => {
    if (ref?.includes('0x')) {
      return truncateHash(ref, start, end)
    }
    return linkRef
  }

  return (
    <ReferralPage>
      <CardWidth>
        <StyledHead>Referral</StyledHead>
        <StyledSubtitle>Refer a friend and get reward together up to {interest}%</StyledSubtitle>
        <GroupLinkRef>
          <StyledLabelLinkRef>My Referral Link</StyledLabelLinkRef>
          <WrapperLinkRef>
            <StyledIconRef
              id="iconRef"
              src="/images/referral/ref-icon.png"
              onClick={handleRef}
              onMouseLeave={handleLeave}
            />
            <Tooltip
              anchorId="iconRef"
              content={userIsRegister ? (showCopied ? 'Copied' : 'Copy') : 'Please Register'}
            />
            <StyledLink>
              <ShowLinkRefPc>{formatLinkRef(linkRef, 50, 4)}</ShowLinkRefPc>
              <ShowLinkRefMobile>{formatLinkRef(linkRef, 20, 4)}</ShowLinkRefMobile>
            </StyledLink>
          </WrapperLinkRef>
          <StyledButton onClick={onRegister} disabled={userIsRegister ? true : false}>
            Register
          </StyledButton>
        </GroupLinkRef>
      </CardWidth>
    </ReferralPage>
  )
}

export default Referral
