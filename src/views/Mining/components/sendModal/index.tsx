import { useTranslation } from '@pancakeswap/localization'
import { Box, Modal, useToast, Button, Input, Text } from '@pancakeswap/uikit'
import { useWeb3LibraryContext, useWeb3React } from '@pancakeswap/wagmi'
import CountUp from 'react-countup'
import useTheme from 'hooks/useTheme'
import { useState } from 'react'
import styled from 'styled-components'
import { trendyColors } from 'style/trendyTheme'
import useConfirmTransaction from 'hooks/useConfirmTransaction'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { usePoolsContract, usePoolsV2Contract, usePoolsV3Contract, useTrendContract } from 'hooks/useContract'
import { ToastDescriptionWithTx } from 'components/Toast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
// import { ChainId } from '../../../../../../../packages/swap-sdk/src/constants'
// import { ClaimPoolModalProps } from './type'
import { Mine } from 'views/PoolV2/util'
import { useBalance } from 'wagmi'
import { formatBigNumber } from 'utils/formatBalance'
import { formatEther } from '@ethersproject/units'

// STYLE
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  justify-content: center;
  gap: 1em;
`
const ClaimAmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledButton = styled(Button)`
  background: #1fc7d4;
`
const depositModal = {}
const depositInput = {
  borderRadius: '10px',
}
const ThreeDots = styled.p`
  @keyframes blinkdot {
    0% {
      opacity: 0.2;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
  &.loading span {
    animation-name: blinkdot;
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }
  &.loading span:nth-child(2) {
    animation-delay: 0.2s;
  }
  &.loading span:nth-child(3) {
    animation-delay: 0.4s;
  }
`
const Error = styled.span`
  margin: -0.5em 0 1em;
  color: ${trendyColors.ORANGE};
  font-size: 18px;
`
const ButtonMax = styled(Button)`
  position: absolute;
  top: 5px;
  right: 10px;
  height: 30px;
  color: white;
  padding: 10px;
`
const InputAmount = styled(Input)`
  width: 300px;
`

const SendTrendModal = ({
  onDismiss,
  mine,
}: {
  // onSuccess: (dataModal) => void
  onDismiss: () => void
  mine: Mine
}) => {
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const [confirmedTxHash, setConfirmedTxHash] = useState('')
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const [isValidAmount, setIsValidAmount] = useState(true)
  const mineContract = usePoolsV3Contract()
  const trendContranct = useTrendContract()
  const { chainId } = useActiveWeb3React()
  const date = Math.floor(new Date().getTime() / 1000)
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState(0)
  const [valueAmount, setValueAmount] = useState(0)
  const [checkError, setCheckError] = useState(false)
  const { account } = useActiveWeb3React()
  const [inValid, setInvalid] = useState(false)
  const balance = Number(mine.balanceTrend)
  const amountMax = Number(formatEther(mine.balanceTrend))
  const { isConfirming, handleConfirm } = useConfirmTransaction({
    onConfirm: () => {
      return callWithMarketGasPrice(trendContranct, 'transfer', [address], [amount])
    },

    onSuccess: async ({ receipt }) => {
      setConfirmedTxHash(receipt.transactionHash)
      toastSuccess(t('Claim reward successfully !'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onDismiss()
    },
  })
  const handleCheck = () => {
    if (address === '') {
      setCheckError(true)
    } else {
      handleConfirm()
    }
  }
  const onChange = (e) => {
    setAddress(e)
  }
  const changeAmount = (e) => {
    setAmount(e)
    setValueAmount(e)
  }
  const setAmountMax = () => {
    setAmount(balance)
    setValueAmount(amountMax)
  }
  const min = 0
  const max = Number(balance)
  const handleInputChange = (e) => {
    if (!e) {
      setAmount(0)
      setInvalid(true)
      return
    }
    if (!Number.isNaN(+e)) {
      const val = String(Math.max(min, Math.min(max, Number(e))))
      setAmount(Number(val))
      setInvalid(false)
    }
  }
  return (
    <Modal
      style={{ width: '400px' }}
      title={'SEND TREND'}
      onDismiss={onDismiss}
      hideCloseButton={false}
      borderRadius={25}
      headerBackground="rgb(105 84 156 / 77%)"
      background={'linear-gradient(139.08deg, #171718 1.7%, rgba(86, 27, 211, 0.84) 108.66%)'}
      width="800px"
    >
      <Wrapper>
        <ClaimAmount>
          <Text fontSize="18px">To:</Text>
          <InputAmount value={address} onChange={(e) => onChange(e.target.value)} />
        </ClaimAmount>
        {checkError === true ? <Error>You do not enter an address !!!</Error> : null}
        <ClaimAmount>
          <Text fontSize="18px">Amount:</Text>
          <div style={{ position: 'relative' }}>
            <InputAmount value={amountMax} onChange={(e) => handleInputChange(e.target.value)} />
            <ButtonMax onClick={setAmountMax}>Max</ButtonMax>
          </div>
        </ClaimAmount>
        {inValid === true ? <Error>Please enter the value !!!</Error> : null}
        {/* {amount > balance ? <Error>You don &#39;t have enough Trend to send !!</Error> : null} */}
        <StyledButton
          variant={'danger'}
          width="180px"
          disabled={isConfirming || (!isValidAmount ? true : false)}
          onClick={handleCheck}
        >
          {isConfirming ? (
            <ThreeDots className="loading">
              Sending<span>.</span>
              <span>.</span>
              <span>.</span>
            </ThreeDots>
          ) : (
            'Send'
          )}
        </StyledButton>
      </Wrapper>
    </Modal>
  )
}

export default SendTrendModal
