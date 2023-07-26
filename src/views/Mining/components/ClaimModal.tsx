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
import { usePoolsContract, usePoolsV2Contract, usePoolsV4Contract } from 'hooks/useContract'
import { ToastDescriptionWithTx } from 'components/Toast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
// import { ChainId } from '../../../../../../../packages/swap-sdk/src/constants'
import { ClaimPoolModalProps } from './type'
import { Mine } from 'views/PoolV2/util'
import Image from 'next/image'

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
  /* background: #1fc7d4; */
  background: linear-gradient(180deg, #7b3fe4 0%, #a726c1 100%);
`
const depositModal = {
  padding: '-10px',
}
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

const ClaimPoolModal = ({
  mine,
  // isV2,
  //   account,
  onDismiss,
  onSuccess,
}: {
  // onSuccess: (dataModal) => void
  onSuccess: () => void
  onDismiss: () => void
  mine: Mine
}) => {
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const [confirmedTxHash, setConfirmedTxHash] = useState('')
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const [isValidAmount, setIsValidAmount] = useState(true)
  const mineContract = usePoolsV4Contract()
  const power = Number(mine.mineSpeed + mine.mineSpeedLevel) / 100
  const [data, setData] = useState([])
  const { chainId } = useActiveWeb3React()
  const date = Math.floor(new Date().getTime() / 1000)

  const { isConfirming, handleConfirm } = useConfirmTransaction({
    onConfirm: () => {
      return callWithMarketGasPrice(mineContract, 'claimRewardTREND')
    },
    onSuccess: async ({ receipt }) => {
      setConfirmedTxHash(receipt.transactionHash)
      toastSuccess(t('Claim reward TREND successfully !'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
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
      headerBackground="#24272A"
      background="#24272A"
      bodyPadding="0"
    >
      <Wrapper>
        <ClaimAmount>
          <Text fontSize="24px">CLAIM TREND</Text>
          <Text fontSize="18px">Current reward TREND:</Text>
          <Text fontSize="16px" style={{ display: 'flex' }}>
            {/* $&ensp;~&ensp; */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Image
                src="/images/trendyloop.png"
                width={24}
                height={24}
                alt=""
                /* style={{marginRight: '10px'}} */
              />
              <CountUp
                separator=","
                start={0}
                preserveValue
                delay={0}
                end={Number(mine.currentReward)}
                decimals={mine.currentReward === 0 ? 0 : 8}
                duration={0.5}
              />
              &ensp;
            </div>
          </Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
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
