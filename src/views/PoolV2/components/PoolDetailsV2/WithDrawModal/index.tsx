import { useTranslation } from '@pancakeswap/localization'
import { Box, Modal, useToast, Button, Input, Text } from '@pancakeswap/uikit'
import { useWeb3LibraryContext, useWeb3React } from '@pancakeswap/wagmi'
import useTheme from 'hooks/useTheme'
import { useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { trendyColors } from 'style/trendyTheme'
import useConfirmTransaction from 'hooks/useConfirmTransaction'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { usePoolsContract, usePoolsV3Contract } from 'hooks/useContract'
import { ToastDescriptionWithTx } from 'components/Toast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ClaimPoolModalProps } from './type'
import { ChainId } from '../../../../../../packages/swap-sdk/src/constants'

// STYLE
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  justify-content: center;
  gap: 1.5em;
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
const AmountWithDraw = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0;
`

const WithDrawModal: React.FC<React.PropsWithChildren<ClaimPoolModalProps>> = ({
  pool,
  account,
  onDismiss,
  onSuccess,
}) => {
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [isPending, setIsPending] = useState(false)
  const [confirmedTxHash, setConfirmedTxHash] = useState('')
  const { t } = useTranslation()
  const library = useWeb3LibraryContext()
  const { toastSuccess, toastError } = useToast()
  const { theme } = useTheme()
  const [amount, setAmount] = useState(0)
  const [isValidAmount, setIsValidAmount] = useState(true)
  const poolContract = usePoolsV3Contract()
  const { chainId } = useActiveWeb3React()
  const isETHW = chainId === ChainId.ETHW
  const unit = isETHW ? 'ETHW' : 'tBNB'

  const { isConfirming, handleConfirm } = useConfirmTransaction({
    onConfirm: () => {
      return callWithMarketGasPrice(poolContract, 'withdraw', [pool.pid])
    },
    onSuccess: async ({ receipt }) => {
      setConfirmedTxHash(receipt.transactionHash)
      toastSuccess(t('Unlock Pool successfully !'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onDismiss()
      onSuccess()
    },
  })

  return (
    <Modal
      style={depositModal}
      title={'UNLOCK POOL'}
      onDismiss={onDismiss}
      hideCloseButton={false}
      headerBackground={theme.colors.gradientCardHeader}
    >
      <Wrapper>
        <AmountWithDraw>
          <Text fontSize="18px">
            Your Income:{' '}
            {
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                end={Number((pool.currentReward + pool.totalLock) * pool.rateBNB2USD)}
                decimals={pool.currentReward + pool.totalLock === 0 ? 0 : 4}
                duration={0.5}
              />
            }{' '}
            $
          </Text>
          <Text fontSize="16px">
            ~{' '}
            {
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                end={Number(pool.currentReward + pool.totalLock)}
                decimals={pool.currentReward + pool.totalLock === 0 ? 0 : 4}
                duration={0.5}
              />
            }{' '}
            {pool.unit}
          </Text>
        </AmountWithDraw>
        <Text fontSize="14px" fontStyle="oblique" mt="-1.3em">
          {`(Including your total lock and current reward)`}
        </Text>
        <Button
          variant={'subtle'}
          width="180px"
          disabled={isConfirming || (!isValidAmount ? true : false)}
          onClick={handleConfirm}
        >
          {isConfirming ? (
            <ThreeDots className="loading">
              Unlocking<span>.</span>
              <span>.</span>
              <span>.</span>
            </ThreeDots>
          ) : (
            'Unlock'
          )}
        </Button>
      </Wrapper>
    </Modal>
  )
}

export default WithDrawModal
