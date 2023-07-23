import { useTranslation } from '@pancakeswap/localization'
import { Box, Modal, useToast, Button, Input, Text } from '@pancakeswap/uikit'
import CountUp from 'react-countup'
import { useState } from 'react'
import styled from 'styled-components'
import { trendyColors } from 'style/trendyTheme'
import useConfirmTransaction from 'hooks/useConfirmTransaction'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { usePoolsContract, usePoolsV2Contract, usePoolsV4Contract } from 'hooks/useContract'
import { ToastDescriptionWithTx } from 'components/Toast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from '../../../../../../packages/swap-sdk/src/constants'
import { ClaimPoolModalProps } from './type'
import images from 'configs/images'

// STYLE
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  justify-content: start;
  gap: 1em;
  .imagesvector {
    margin-left: 4px;
    padding: 3px;
    display: flex;
    width: 18px;
    height: 18px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: var(--white-white-8, rgba(255, 255, 255, 0.08));
  }
`
const ClaimAmount = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledButton = styled(Button)`
  background: #8544f5;
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

const ClaimPoolModal: React.FC<React.PropsWithChildren<ClaimPoolModalProps>> = ({
  pool,
  // isV2,
  account,
  onDismiss,
  onSuccess,
}) => {
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const [confirmedTxHash, setConfirmedTxHash] = useState('')
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const [isValidAmount, setIsValidAmount] = useState(true)
  const poolContract = usePoolsV4Contract()

  const { isConfirming, handleConfirm } = useConfirmTransaction({
    onConfirm: () => {
      return callWithMarketGasPrice(poolContract, 'claimReward', [pool.pid])
    },
    onSuccess: async ({ receipt }) => {
      setConfirmedTxHash(receipt.transactionHash)
      toastSuccess(t('Claim reward successfully !'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onDismiss()
      onSuccess()
    },
  })

  return (
    <Modal
      style={depositModal}
      title={'Claim'}
      onDismiss={onDismiss}
      hideCloseButton={false}
      borderRadius={25}
      headerBackground="#24272A"
      background={'#24272A'}
    >
      <Wrapper>
        <ClaimAmount>
          <Text fontSize="18px">Current reward:</Text>
          <Text fontSize="16px" style={{ display: 'flex', color: '#8544F5' }}>
            {
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                end={Number(pool.currentReward * pool.rateBNB2USD)}
                decimals={pool.currentReward === 0 ? 0 : 2}
                duration={0.5}
              />
            }
            $&ensp;~&ensp;
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                end={Number(pool.currentReward)}
                decimals={pool.currentReward === 0 ? 0 : 4}
                duration={0.5}
              />
              &ensp;
              <img className="imagesvector" src={images.vector} alt="pool name" width={18} />
            </div>
          </Text>
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

export default ClaimPoolModal
