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
import BigNumber from 'bignumber.js'
import { getFullDecimalMultiplier } from 'utils/getFullDecimalMultiplier'

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
  align-items: flex-start;
`
const StyledButton = styled(Button)`
  border-radius: 24px;
  background: radial-gradient(131.77% 143.25% at -0% -2.74%, #bae4e7 0%, rgba(136, 139, 224, 0.44) 100%);
  backdrop-filter: blur(5px);
  width: 378px;
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
  border-radius: 24px;
  background: linear-gradient(359deg, rgba(158, 134, 255, 0.8) 0%, rgba(43, 8, 100, 0.8) 100%);
`
const InputAmount = styled(Input)`
  width: 378px;
  border-radius: 36px;
  border: 1px solid #3749aa;
  background: #f2f3f4;
  backdrop-filter: blur(5px);
  height: 20px;
  padding: 20px 16px;
  color: black;
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
  const [amount, setAmount] = useState('')
  const [valueAmount, setValueAmount] = useState(0)
  const [checkError, setCheckError] = useState(false)
  const { account } = useActiveWeb3React()
  const [inValid, setInvalid] = useState(false)
  const balance = Number(mine.balanceTrend)
  const amountMax = Number(mine.balanceTrend)
  const { isConfirming, handleConfirm } = useConfirmTransaction({
    onConfirm: () => {
      console.log(amount)

      return callWithMarketGasPrice(trendContranct, 'transfer', [address], [amount])
    },

    onSuccess: async ({ receipt }) => {
      setConfirmedTxHash(receipt.transactionHash)
      toastSuccess(t('Send TREND successfully !'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
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
    setCheckError(false)
  }
  // const changeAmount = (e) => {
  //   setAmount(Number(new BigNumber(e).times(getFullDecimalMultiplier(18)).toString()))
  //   setValueAmount(e)
  // }
  const setAmountMax = () => {
    setAmount(balance.toString())
    setValueAmount(amountMax)
  }
  const min = 0
  const max = Number(balance)
  const handleInputChange = (e) => {
    if (!e) {
      setAmount('')
      setValueAmount(0)
      setInvalid(true)
      return
    }
    if (!Number.isNaN(+e)) {
      const val = String(Math.max(min, Math.min(max, Number(e))))
      setAmount(new BigNumber(val).times(getFullDecimalMultiplier(18)).toString())
      // console.log(new BigNumber(e).times(getFullDecimalMultiplier(18)).toString());
      setValueAmount(Number(val))
      setInvalid(false)
    }
  }
  return (
    <Modal
      style={{ width: '400px', boxShadow: '0px 4px 16px 0px rgba(17, 10, 65, 0.36)', backdropFilter: 'blur(50px)' }}
      title={'SEND TREND'}
      onDismiss={onDismiss}
      hideCloseButton={false}
      borderRadius={25}
      headerBackground="rgba(238, 238, 241, 0.51)"
      background={'linear-gradient(112deg, rgba(34, 39, 45, 0.40) 0%, rgba(50, 73, 95, 0.40) 100%)'}
      width="800px"
    >
      <Wrapper>
        <ClaimAmount>
          <Text fontSize="18px">To</Text>
          <InputAmount style={{ fontSize: '14px' }} value={address} onChange={(e) => onChange(e.target.value)} />
        </ClaimAmount>
        {checkError === true ? <Error>You do not enter an address !!!</Error> : null}
        <ClaimAmount>
          <Text fontSize="18px">Amount</Text>
          <div style={{ position: 'relative' }}>
            <InputAmount value={valueAmount} onChange={(e) => handleInputChange(e.target.value)} />
            <ButtonMax onClick={setAmountMax}>Max</ButtonMax>
          </div>
        </ClaimAmount>
        {inValid === true ? <Error>Please enter the value !!!</Error> : null}
        {/* {amount > balance ? <Error>You don &#39;t have enough Trend to send !!</Error> : null} */}
        <StyledButton
          variant={'danger'}
          width="180px"
          disabled={isConfirming || (!isValidAmount ? true : false) || inValid === true}
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
