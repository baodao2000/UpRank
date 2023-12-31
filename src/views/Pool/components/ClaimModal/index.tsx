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
import { usePoolsContract, usePoolsV2Contract } from 'hooks/useContract'
import { ToastDescriptionWithTx } from 'components/Toast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from '../../../../../packages/swap-sdk/src/constants'
import { ClaimPoolModalProps } from './type'

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
  const poolContract = usePoolsContract()
  const poolV2Contract = usePoolsV2Contract()
  const { chainId } = useActiveWeb3React()

  // console.log(pool)
  const { isConfirming, handleConfirm } = useConfirmTransaction({
    onConfirm: () => {
      return callWithMarketGasPrice(
        pool.currentRewardV1 < pool.currentRewardV2 ? poolV2Contract : poolContract,
        'claimReward',
        [pool.pid],
      )
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
      title={''}
      onDismiss={onDismiss}
      hideCloseButton={false}
      borderRadius={25}
      // headerBackground="rgb(105 84 156 / 77%)"
      // background={'linear-gradient(139.08deg, #171718 1.7%, rgba(86, 27, 211, 0.84) 108.66%)'}
    >
      <Wrapper>
        <ClaimAmount>
          <Text fontSize="28px" textAlign="center">
            CLAIM
          </Text>
          <Text fontSize="18px">Current reward:</Text>
          <Text fontSize="16px" style={{ display: 'flex' }}>
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
              <img src={`/images/chains/${chainId}.png`} alt="pool name" width={18} />
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
