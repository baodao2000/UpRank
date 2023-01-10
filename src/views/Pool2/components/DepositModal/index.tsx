import { useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { Box, Modal, useToast, Button, Input, Alert } from '@pancakeswap/uikit'
import { useWeb3LibraryContext, useWeb3React } from '@pancakeswap/wagmi'
import useTheme from 'hooks/useTheme'
import { ethers } from 'ethers'
import styled from 'styled-components'
// import { trendyColors } from 'style/trendyTheme'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import useConfirmTransaction from 'hooks/useConfirmTransaction'
import { requiresApproval } from 'utils/requiresApproval'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { useERC20, usePoolsContract } from 'hooks/useContract'
import { ToastDescriptionWithTx } from 'components/Toast'
import CountUp from 'react-countup'
import { toast } from 'react-toastify'
import { getPoolsAddress } from 'utils/addressHelpers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import addresses from 'config/constants/contracts'
import { DepositPoolModalProps } from './type'

// STYLE
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5em;
  margin-bottom: 1em;
  span.bnb {
    font-style: italic;
  }
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
`
const CustomModal = styled(Modal)`
  /* width:90%; */
  ${({ theme }) => theme.mediaQueries.sm} {
    /* bottom: 0 */
    bottom: unset;
    width: unset;
  }
  width: 90%;
  bottom: 45vh;
  border-radius: 32px;
`
const DepositPoolModal: React.FC<React.PropsWithChildren<DepositPoolModalProps>> = ({
  pool,
  account,
  reload,
  onDismiss,
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
  const poolsContract = usePoolsContract()
  const { chainId } = useActiveWeb3React()
  const poolsAddress = getPoolsAddress(chainId)
  const SOWContract = useERC20(addresses.sow[chainId])
  const handleAmountChange = (e: any) => {
    setAmount(e.target.value)
    checkAmount(e.target.value)
  }
  const checkAmount = (value: number) => {
    if (value < Number((pool.minStake / pool.rateBNB2USD).toFixed(4))) {
      setIsValidAmount(false)
    } else setIsValidAmount(true)
  }
  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        if (account) {
          const currentAllowance = await SOWContract.allowance(account, poolsAddress)
          return currentAllowance.gt(0)
        }
        return false
      } catch (error) {
        console.error('onRequiresApproval error', error)
        return false
      }
    },
    onApprove: () => {
      return SOWContract.approve(poolsAddress, ethers.constants.MaxUint256)
    },
    onApproveSuccess: () => {
      toast.success('Contract approved! You can deposit now')
    },
    onConfirm: async () => {
      const tx = await poolsContract.deposit(pool.pid, ethers.utils.parseEther(amount.toString()).toString())
      return tx
    },
    onSuccess: () => {
      toast.success('Stake successfully')
      reload()
      onDismiss()
    },
  })
  return (
    <CustomModal
      style={depositModal}
      title="DEPOSIT"
      // onBack={handleBack}
      onDismiss={onDismiss}
      hideCloseButton={false}
      headerBackground={theme.colors.gradientCardHeader}
    >
      <InputArea>
        <span style={{ color: '#d2d6ef' }}>
          Amount ( at least{' '}
          <CountUp
            // style={{ color: `${pools[r].tagColor}` }}
            start={0}
            preserveValue
            delay={0}
            end={Number(pool.minStake)}
            decimals={2}
            duration={0.5}
          />{' '}
          SOW )
        </span>
        <Input
          autoFocus
          type="number"
          style={depositInput}
          onChange={handleAmountChange}
          placeholder={`min ${pool.minStake} ${pool.unit}`}
        />
      </InputArea>
      {isValidAmount ? <></> : <Error>Amount is out of acceptable range !!</Error>}

      {isApproved ? (
        <Button
          variant={!isValidAmount ? 'light' : 'primary'}
          disabled={isConfirming || !isValidAmount}
          onClick={handleConfirm}
        >
          {isConfirming ? (
            <ThreeDots className="loading">
              Depositing<span>.</span>
              <span>.</span>
              <span>.</span>
            </ThreeDots>
          ) : (
            'Deposit'
          )}
        </Button>
      ) : (
        <Button
          variant={!isValidAmount ? 'light' : 'primary'}
          disabled={isApproving || isApproved}
          onClick={handleApprove}
        >
          {isApproving ? 'APPROVING' : 'APPROVE'}
        </Button>
      )}
    </CustomModal>
  )
}

export default DepositPoolModal
