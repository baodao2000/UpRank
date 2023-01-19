import { useTranslation } from '@pancakeswap/localization'
import { Box, Modal, useToast, Button, Input } from '@pancakeswap/uikit'
import { useWeb3LibraryContext, useWeb3React } from '@pancakeswap/wagmi'
import useTheme from 'hooks/useTheme'
import images from 'configs/images'
import { useState } from 'react'
import styled from 'styled-components'
import { trendyColors } from 'style/trendyTheme'
import useConfirmTransaction from 'hooks/useConfirmTransaction'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { usePoolsContract } from 'hooks/useContract'
import { ToastDescriptionWithTx } from 'components/Toast'
import CountUp from 'react-countup'
import { ethers } from 'ethers'
import { useBalance } from 'wagmi'
import { formatBigNumber } from 'utils/formatBalance'
import { DepositPoolModalProps } from './type'
// STYLE
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5em;
  margin-bottom: 1em;
  color: white;
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
  color: ${trendyColors.ORANGE};
`
const UserBalance = styled.div`
  span {
    font-size: 14px;
    opacity: 0.6;
  }
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const MinMaxButtons = styled.div`
  display: flex;
  gap: 0.5em;
`
const MinMax = styled.button`
  background: none;
  border-radius: 12px;
  border: 1.5px solid ${trendyColors.DARK_PURPLE};
  color: ${trendyColors.DARK_PURPLE};
  font-weight: 600;
  text-align: center;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  &.active {
    background: ${trendyColors.DARK_PURPLE};
    color: ${trendyColors.WHITE};
  }
`
const DepositPoolModal: React.FC<React.PropsWithChildren<DepositPoolModalProps>> = ({
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
  const minLockMatic = Number(pool.minLock / pool.rateBNB2USD).toFixed(2)
  const maxLockMatic = Number(pool.maxLock / pool.rateBNB2USD).toFixed(2)
  const [amount, setAmount] = useState(minLockMatic)
  const [isValidAmount, setIsValidAmount] = useState(true)
  const poolContract = usePoolsContract()
  const handleAmountChange = (e: any) => {
    setAmount(e.target.value)
    checkAmount(e.target.value)
  }
  const [perActive, setPerActive] = useState(0)
  const { data, isFetched } = useBalance({ addressOrName: account })
  const userBalance = isFetched && data && data.value ? formatBigNumber(data.value, 4) : 0
  const checkAmount = (value: number) => {
    if (
      value > Number((pool.maxLock / pool.rateBNB2USD).toFixed(2)) ||
      value < Number((pool.minLock / pool.rateBNB2USD).toFixed(2))
    ) {
      setIsValidAmount(false)
    } else setIsValidAmount(true)
  }
  const minMaxBalanceHandle = (per: number) => {
    switch (per) {
      case 1: {
        setPerActive(1)
        setAmount(minLockMatic)
        checkAmount(Number(minLockMatic))
        break
      }
      case 25: {
        setPerActive(25)
        setAmount((Number(userBalance) * 0.25).toFixed(4))
        checkAmount(Number(userBalance) * 0.25)
        break
      }
      case 50: {
        setPerActive(50)
        setAmount((Number(userBalance) * 0.5).toFixed(4))
        checkAmount(Number(userBalance) * 0.5)
        break
      }
      case 75: {
        setPerActive(75)
        setAmount((Number(userBalance) * 0.75).toFixed(4))
        checkAmount(Number(userBalance) * 0.75)
        break
      }
      case 100: {
        setPerActive(100)
        if (Number(userBalance) > Number(maxLockMatic)) {
          setAmount(maxLockMatic)
          checkAmount(Number(maxLockMatic))
        } else {
          setAmount(Number(userBalance).toFixed(4))
          checkAmount(Number(userBalance))
        }
        break
      }
      default: {
      }
    }
  }
  const { isConfirming, handleConfirm } = useConfirmTransaction({
    onConfirm: () => {
      return callWithMarketGasPrice(poolContract, 'deposit', [pool.pid], {
        value: ethers.utils.parseUnits(amount.toString(), 'ether').toString(),
      })
    },
    onSuccess: async ({ receipt }) => {
      setConfirmedTxHash(receipt.transactionHash)
      toastSuccess(t('Deposit successfully !'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onDismiss()
      onSuccess()
    },
  })

  return (
    <Modal
      style={depositModal}
      title={'DEPOSIT'}
      onDismiss={onDismiss}
      hideCloseButton={false}
      headerBackground={theme.colors.gradientCardHeader}
    >
      <InputArea>
        <span>
          Amount ( from{' '}
          <CountUp start={0} preserveValue delay={0} end={Number(pool.minLock)} decimals={0} duration={0.5} /> $ to{' '}
          <CountUp start={0} preserveValue delay={0} end={Number(pool.maxLock)} decimals={0} duration={0.5}></CountUp> $
          )
        </span>
        <span className="bnb">
          from{' ~'}
          <CountUp
            start={0}
            preserveValue
            delay={0}
            end={Number(pool.minLock / pool.rateBNB2USD)}
            decimals={2}
            duration={0.5}
          />{' '}
          <img src={images.logoMatic} alt="" width="16px" /> to{' ~'}
          <CountUp
            start={0}
            preserveValue
            delay={0}
            end={Number(pool.maxLock / pool.rateBNB2USD)}
            decimals={2}
            duration={0.5}
          ></CountUp>{' '}
          <img src={images.logoMatic} alt="" width="16px" />
        </span>
        <UserBalance>
          <span>
            Balance:{' '}
            {
              <CountUp
                start={0}
                preserveValue
                delay={0}
                end={Number(userBalance)}
                decimals={4}
                duration={0.5}
              ></CountUp>
            }{' '}
            <img src={images.logoMatic} alt="" width="16px" />
            {'  ~'}
            {
              <CountUp
                start={0}
                preserveValue
                delay={0}
                end={Number(userBalance) * pool.rateBNB2USD}
                decimals={4}
                duration={0.5}
              ></CountUp>
            }
            {'$'}
          </span>
        </UserBalance>
        <Input
          value={amount}
          autoFocus={true}
          type="number"
          style={depositInput}
          onChange={handleAmountChange}
          placeholder={`${(pool.minLock / pool.rateBNB2USD).toFixed(2)} ${pool.unit}`}
        />
        <MinMaxButtons>
          <MinMax onClick={() => minMaxBalanceHandle(1)} className={perActive === 1 ? 'active' : ''}>
            Min
          </MinMax>
          <MinMax onClick={() => minMaxBalanceHandle(25)} className={perActive === 25 ? 'active' : ''}>
            25%
          </MinMax>
          <MinMax onClick={() => minMaxBalanceHandle(50)} className={perActive === 50 ? 'active' : ''}>
            50%
          </MinMax>
          <MinMax onClick={() => minMaxBalanceHandle(75)} className={perActive === 75 ? 'active' : ''}>
            75%
          </MinMax>
          <MinMax onClick={() => minMaxBalanceHandle(100)} className={perActive === 100 ? 'active' : ''}>
            Max
          </MinMax>
        </MinMaxButtons>
      </InputArea>
      {isValidAmount ? <></> : <Error>Amount is out of acceptable range !!</Error>}
      <Button
        variant={!isValidAmount ? 'light' : 'primary'}
        disabled={isConfirming || (!isValidAmount ? true : false)}
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
    </Modal>
  )
}

export default DepositPoolModal