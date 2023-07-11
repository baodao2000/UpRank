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
import { usePoolsContract, usePoolsV2Contract, usePoolsV3Contract } from 'hooks/useContract'
import { ToastDescriptionWithTx } from 'components/Toast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
// import { ChainId } from '../../../../../../../packages/swap-sdk/src/constants'
// import { ClaimPoolModalProps } from './type'
import { Mine } from 'views/PoolV2/util'
import { useBalance } from 'wagmi'
import { formatBigNumber } from 'utils/formatBalance'

// STYLE
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
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
}: {
  // onSuccess: (dataModal) => void
  onDismiss: () => void
}) => {
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const [confirmedTxHash, setConfirmedTxHash] = useState('')
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const [isValidAmount, setIsValidAmount] = useState(true)
  const mineContract = usePoolsV3Contract()
  const { chainId } = useActiveWeb3React()
  const date = Math.floor(new Date().getTime() / 1000)
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState(0)
  const { account } = useActiveWeb3React()

  const { data, isFetched } = useBalance({
    addressOrName: account,
  })
  const balance = isFetched && data && data.value ? formatBigNumber(data.value, 6) : 0
  const { isConfirming, handleConfirm } = useConfirmTransaction({
    onConfirm: () => {
      return callWithMarketGasPrice(mineContract, 'claimRewardTREND')
    },
    onSuccess: async ({ receipt }) => {
      setConfirmedTxHash(receipt.transactionHash)
      toastSuccess(t('Claim reward successfully !'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onDismiss()
    },
  })
  const onChange = (e) => {
    setAddress(e)
  }
  const changeAmount = (e) => {
    setAmount(e)
  }
  const setAmountMax = () => {
    setAmount(Number(balance))
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
        <ClaimAmount>
          <Text fontSize="18px">Amount:</Text>
          <div style={{ position: 'relative' }}>
            <InputAmount value={amount} onChange={(e) => changeAmount(e.target.value)} />
            <ButtonMax onClick={setAmountMax}>Max</ButtonMax>
          </div>
        </ClaimAmount>
        <StyledButton
          variant={'danger'}
          width="180px"
          disabled={isConfirming || (!isValidAmount ? true : false)}
          onClick={handleConfirm}
        >
          {isConfirming ? (
            <ThreeDots className="loading">
              Claiming<span>.</span>
              <span>.</span>
              <span>.</span>
            </ThreeDots>
          ) : (
            'Claim'
          )}
        </StyledButton>
      </Wrapper>
    </Modal>
  )
}

export default SendTrendModal
