import { useTranslation } from '@pancakeswap/localization'
import { Box, Modal, useToast, Button, Input, Text } from '@pancakeswap/uikit'
import { useWeb3LibraryContext, useWeb3React } from '@pancakeswap/wagmi'
import useTheme from 'hooks/useTheme'
import images from 'configs/images'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { trendyColors } from 'style/trendyTheme'
import useConfirmTransaction from 'hooks/useConfirmTransaction'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPriceV2'
import { usePoolsContract, usePoolsV2Contract, usePoolsV3Contract } from 'hooks/useContract'
import { ToastDescriptionWithTx } from 'components/Toast'
import CountUp from 'react-countup'
import { ethers } from 'ethers'
import { useBalance } from 'wagmi'
import { formatBigNumber } from 'utils/formatBalance'
import { DepositPoolModalProps } from './type'
import numeral from 'numeral'
import { vaultPoolConfig } from '../../../../../config/constants/pools'

// STYLE
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin-bottom: 1em;
  color: white;
  font-weight: 600;
  span.bnb {
    font-style: italic;
    color: white;
  }
  span {
    color: white;
  }
`
const depositModal = {}
const depositInput = {
  borderRadius: '10px',
}
const CheckMine = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  gap: 20px;
`
const Switch = styled.div`
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 18px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    top: 2px;
    left: 4px;
    background-color: white;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: rgb(44, 224, 213);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px rgb(44, 224, 213);
  }

  input:checked + .slider:before {
    transform: translateX(21px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }
  input:disabled {
    cursor: none;
  }
  .slider.round:before {
    border-radius: 50%;
  }
`
export const ThreeDots = styled.p`
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
    font-weight: 600;
    opacity: 0.6;
    color: #ffffff;
  }
  width: 100%;
  display: flex;
  align-items: center;
`
const MinMaxButtons = styled.div`
  display: flex;
  gap: 0.5em;
  margin-top: 8px;
`
const MinMax = styled.button`
  background: none;
  border-radius: 8px;
  border: 1px solid #00f0e1;
  color: #00f0e1;
  font-weight: 600;
  text-align: center;
  font-size: 12px;
  line-height: 16px;
  padding: 2px 12px;
  cursor: pointer;
  &.active {
    background: #00f0e1;
    color: black;
  }
`

const StyledButton = styled(Button)`
  max-width: 240px;
  max-height: 40px;
  width: 100%;
`

const StyledInput = styled(Input)`
  outline: none;
  border: 3px solid #009571;
`

const DepositPoolModal: React.FC<React.PropsWithChildren<DepositPoolModalProps>> = ({
  pool,
  account,
  chainId,
  onDismiss,
  onSuccess,
}) => {
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [confirmedTxHash, setConfirmedTxHash] = useState('')
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const { theme } = useTheme()
  const minLockMatic =
    chainId === 137
      ? Number(Number(pool.minLock / pool.rateBNB2USD) + 0.01)
      : Number(Number(pool.minLock / pool.rateBNB2USD) + 0.0001)

  const maxLockMatic = Number(pool.maxLock / pool.rateBNB2USD).toFixed(4)
  const [amount, setAmount] = useState(minLockMatic.toFixed(4))
  const [isValidAmount, setIsValidAmount] = useState(true)
  const poolContract = usePoolsV3Contract()
  const handleAmountChange = (e: any) => {
    setAmount(e.target.value)
    checkAmount(e.target.value)
  }
  const [perActive, setPerActive] = useState(0)
  const { data, isFetched } = useBalance({ addressOrName: account })
  const userBalance = isFetched && data && data.value ? formatBigNumber(data.value, 4) : 0
  const [userTotal, setUserTotal] = useState(false)
  const [mine, setMine] = useState(false)
  const [checked, setChecked] = useState(false)
  const [pid, setPid] = useState(pool.pid)
  const checkAmount = (value: any) => {
    if (
      // value > Number((pool.maxLock / pool.rateBNB2USD).toFixed(4)) ||
      value < Number((pool.minLock / pool.rateBNB2USD).toFixed(4))
    ) {
      setIsValidAmount(false)
    } else setIsValidAmount(true)
  }
  const minMaxBalanceHandle = (per: number) => {
    switch (per) {
      case 1: {
        setPerActive(1)
        setAmount(minLockMatic.toFixed(4))
        checkAmount(minLockMatic.toFixed(4))
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
        // if (Number(userBalance) > Number(maxLockMatic)) {
        //   setAmount(maxLockMatic)
        //   checkAmount(Number(maxLockMatic))
        // } else {
        if (Number(userBalance) > 0) {
          setAmount((Number(userBalance) - 0.009).toFixed(4))
        } else {
          setAmount(Number(userBalance).toFixed(4))
        }
        checkAmount(Number(userBalance))
        // }
        break
      }
      default: {
      }
    }
  }
  const { isConfirming, handleConfirm } = useConfirmTransaction({
    onConfirm: () => {
      console.log(poolContract, pool, mine)
      return callWithGasPrice(poolContract, 'deposit', [pool.pid], mine, {
        value: ethers.utils.parseUnits(amount.toString(), 'ether').toString(),
        gasLimit: '1000000',
      })

      // return callWithMarketGasPrice(poolContract, 'deposit', [pool.pid], {
      //   value: ethers.utils.parseUnits(amount.toString(), 'ether').toString(),
      // })
    },
    onSuccess: async ({ receipt }) => {
      setConfirmedTxHash(receipt.transactionHash)
      toastSuccess(t('Deposit successfully !'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onDismiss()
      onSuccess()
    },
  })
  const checkUsers = async () => {
    const users = await poolContract.users(account, pid)

    setChecked(users.isMine)
    setMine(users.isMine)
    if (users.totalLock.toString() === '0') {
      setUserTotal(false)
    } else {
      setUserTotal(true)
    }
  }
  const onChange = () => {
    setMine(!mine)
  }
  useEffect(() => {
    checkUsers()
  }, [account, pool.pid])

  return (
    <Modal
      style={depositModal}
      title={'DEPOSIT'}
      onDismiss={onDismiss}
      hideCloseButton={false}
      borderRadius={25}
      headerBackground="rgb(105 84 156 / 77%)"
      background={'linear-gradient(139.08deg, #171718 1.7%, rgba(86, 27, 211, 0.84) 108.66%)'}
    >
      <InputArea>
        <span>
          Amount: <br></br>
          <div style={{ marginTop: '10px' }}>
            <CountUp
              start={0}
              preserveValue
              delay={0}
              end={Number(pool.minLock)}
              decimals={0}
              duration={0.5}
              style={{ color: '#2CE0D5', fontWeight: 600 }}
            />
            <span style={{ color: '#2CE0D5', fontWeight: 600 }}>$</span>
            <span style={{ color: '#2CE0D5' }}>{' ~ '}</span>
            <CountUp
              start={0}
              preserveValue
              delay={0}
              end={minLockMatic}
              decimals={4}
              duration={0.5}
              style={{ color: '#2CE0D5', fontWeight: 400 }}
            />{' '}
            <img src={`/images/chains/${chainId}.png`} alt="logo" width="12px" /> to{' '}
            <CountUp
              start={0}
              preserveValue
              delay={0}
              end={Number(pool.maxLock)}
              decimals={0}
              duration={0.5}
              style={{ color: '#2CE0D5', fontWeight: 600 }}
            ></CountUp>
            <span style={{ color: '#2CE0D5', fontWeight: 600 }}>$</span>
            <span style={{ color: '#2CE0D5' }}>{' ~ '}</span>
            <CountUp
              start={0}
              preserveValue
              delay={0}
              end={Number(pool.maxLock / pool.rateBNB2USD)}
              decimals={4}
              duration={0.5}
              style={{ color: '#2CE0D5', fontWeight: 400 }}
            />{' '}
            <img src={`/images/chains/${chainId}.png`} alt="logo" width="12px" />
          </div>
        </span>
        <span className="bnb"></span>
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
            <img src={`/images/chains/${chainId}.png`} alt="logo" width="12px" />
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
        {mine === true ? (
          <UserBalance>
            <span>
              Interest With Mine :{' '}
              {
                <CountUp
                  start={0}
                  preserveValue
                  delay={0}
                  end={Number(pool.currentInterestWithMine)}
                  decimals={2}
                  duration={0.5}
                />
              }{' '}
              %
            </span>
          </UserBalance>
        ) : (
          <UserBalance>
            <span>
              Interest :{' '}
              {
                <CountUp
                  start={0}
                  preserveValue
                  delay={0}
                  end={Number(pool.currentInterest)}
                  decimals={2}
                  duration={0.5}
                />
              }{' '}
              %
            </span>
          </UserBalance>
        )}

        <StyledInput
          value={amount}
          autoFocus={true}
          type="number"
          style={depositInput}
          onChange={handleAmountChange}
          placeholder={`${minLockMatic.toFixed(4)} ${pool.unit}`}
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
      {userTotal === false ? (
        <>
          {pool.pid.toString() === '0' ? null : (
            <CheckMine>
              <Text>Mine Trend</Text>
              <Switch>
                <label htmlFor="switchMine" className="switch">
                  <input id="switchMine" onChange={onChange} disabled={userTotal} type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </Switch>
            </CheckMine>
          )}
        </>
      ) : (
        <>
          {pool.pid.toString() === '0' ? null : (
            <CheckMine>
              <Text>Mine Trend</Text>
              <Switch>
                <label htmlFor="switchMine" className="switch">
                  <input
                    id="switchMine"
                    defaultChecked={checked}
                    onChange={onChange}
                    disabled={userTotal}
                    type="checkbox"
                  />
                  <span className="slider round"></span>
                </label>
              </Switch>
            </CheckMine>
          )}
        </>
      )}

      {isValidAmount ? <></> : <Error>Amount is out of acceptable range !!</Error>}
      <div style={{ textAlign: 'center' }}>
        <StyledButton
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
        </StyledButton>
      </div>
    </Modal>
  )
}

export default DepositPoolModal
