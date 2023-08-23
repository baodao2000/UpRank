import { useTranslation } from '@pancakeswap/localization'
import { Box, Modal, useToast, Button, Input, Text, Checkbox } from '@pancakeswap/uikit'
import images from 'configs/images'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { trendyColors } from 'style/trendyTheme'
import useConfirmTransaction from 'hooks/useConfirmTransaction'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPriceV2'
import { usePoolsV4Contract } from 'hooks/useContract'
import { ToastDescriptionWithTx } from 'components/Toast'
import CountUp from 'react-countup'
import { ethers } from 'ethers'
import { useBalance } from 'wagmi'
import { formatBigNumber } from 'utils/formatBalance'
import { DepositPoolModalProps } from './type'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'

// STYLE
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  .amount {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 18px;
    line-height: 24px;
    @media (max-width: 575px) {
      flex-direction: column;
      gap: 0;
    }
  }
  .imagesvector {
    margin-top: 4px;
    margin-left: 4px;
    padding: 3px;
    display: flex;
    width: 16px;
    height: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: var(--white-white-8, rgba(255, 255, 255, 0.08));
  }
  position: relative;
  .imgMine {
    position: absolute;
    right: 0;
    top: 0;
    width: 70px;
    height: 70px;
  }
`
const depositInput = {
  borderRadius: '10px',
}
const CheckMine = styled.div`
  padding: 8px;
  height: 38px;
  border-radius: 8px;
  background: var(--primary-primary-gradient-2, linear-gradient(180deg, #7b3fe4 0%, #a726c1 100%));
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 24px;
  gap: 8px;
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
  font-size: 18px;
  margin: 10px 0;
`
const UserBalance = styled.div`
  span {
    font-size: 18px;
    font-weight: 500;
    // opacity: 0.6;
    color: #e2e1e5;
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
  border-radius: 4px;
  border: 1px solid var(--primary-primary-1, #8544f5);
  color: #fff;
  font-weight: 600;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  padding: 2px 12px;
  cursor: pointer;
  &.active {
    border-radius: 4px;
    border: 1px solid var(--primary-primary-1, #8544f5);
    background: var(--primary-primary-2, rgba(117, 60, 216, 0.8));
  }
`

const StyledButton = styled(Button)`
  border-radius: var(--border-radius-lg, 8px);
  background: var(--primary-primary-1, #8544f5);
  box-shadow: 2px 2px 8px 16px rgba(0, 0, 0, 0.1);
  max-height: 48px;
  width: 100%;
  color: rgba(255, 255, 255, 1);
`

const StyledInput = styled(Input)`
  margin-top: 24px;
  outline: none;
  border-radius: 12px;
  // border: 1px solid var(--primary-primary-1, #8544f5);
  background: var(--greyscale-grayscale-4, #2d2c33);
  &:focus:not(:disabled) {
    border: 3px solid #8544f5;
  }
`
const Title = styled(Text)`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
  margin-bottom: 20px;
`

const DepositPoolModal: React.FC<React.PropsWithChildren<DepositPoolModalProps>> = ({
  pool,
  account,
  chainId,
  onDismiss,
  onSuccess,
}) => {
  const { callWithGasPrice } = useCallWithGasPrice()
  const [confirmedTxHash, setConfirmedTxHash] = useState('')
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const minLockMatic =
    chainId === 137
      ? Number(Number(pool.minLock / pool.rateBNB2USD) + 0.01)
      : Number(Number(pool.minLock / pool.rateBNB2USD) + 0.0001)

  const maxLockMatic = Number(pool.maxLock / pool.rateBNB2USD).toFixed(4)
  const [amount, setAmount] = useState(minLockMatic.toFixed(4))
  const [isValidAmount, setIsValidAmount] = useState(true)
  const poolContract = usePoolsV4Contract()
  const handleAmountChange = (e: any) => {
    setAmount(e.target.value)
    checkAmount(e.target.value)
  }
  const [perActive, setPerActive] = useState(0)
  const { data, isFetched } = useBalance({ addressOrName: account })
  const userBalance = isFetched && data && data.value ? formatBigNumber(data.value, 4) : 0
  const [userTotal, setUserTotal] = useState(false)
  const [mine, setMine] = useState(false)
  const [checked, setChecked] = useState(true)
  // const checked = useRef(true)
  const [pid, setPid] = useState(pool.pid)
  const [isLoading, setIsLoading] = useState(true)
  const [disabledDiposit, setDisabledDeposit] = useState(false)
  const checkAmount = (value: any) => {
    if (value < Number((pool.minLock / pool.rateBNB2USD).toFixed(4))) {
      setIsValidAmount(false)
    } else setIsValidAmount(true)
  }

  const timeStamp = Math.floor(Date.now() / 1000)
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
      return callWithGasPrice(poolContract, 'deposit', [pool.pid], mine, {
        value: ethers.utils.parseUnits(amount.toString(), 'ether').toString(),
        gasLimit: Number(pool.pid) < 2 ? '1000000' : '2000000',
      })
    },
    onSuccess: async ({ receipt }) => {
      setConfirmedTxHash(receipt.transactionHash)
      toastSuccess(t('Deposit successfully !'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onDismiss()
      onSuccess()
    },
  })
  const checkUsers = async () => {
    if (!account) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
      const users = await poolContract.users(account, pid)
      const period = await poolContract.period()
      const startTime = users.startTime
      if (Number(startTime) > 0) {
        setChecked(users.isMine)
        setMine(users.isMine)
      } else {
        setChecked(true)
        setMine(true)
      }

      if (timeStamp - Number(users.startTime) >= 7 * Number(period) && Number(users.startTime) > 0) {
        setDisabledDeposit(true)
      }

      if (users.totalLock.toString() === '0') {
        setUserTotal(false)
      } else {
        setUserTotal(true)
      }
    }
  }
  const onChange = () => {
    setMine(!mine)
  }
  useEffect(() => {
    checkUsers()
  }, [account, pool.pid, checked])

  return (
    <>
      {isLoading === true ? (
        <TrendyPageLoader />
      ) : (
        <Modal
          style={{ padding: '32px', maxWidth: '500px' }}
          title={''}
          onDismiss={onDismiss}
          hideCloseButton={false}
          borderRadius={25}
          headerBackground="#24272A"
          background={'#24272A'}
        >
          <InputArea>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Title>Deposit</Title>
                <div className="imgMine">
                  {mine && pool.pid !== 0 ? <img style={{ width: '100%' }} src="/images/V3/cup.svg" alt="cup" /> : null}
                </div>
                <span>
                  <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '400', color: '#E2E1E5' }}>
                    {' '}
                    Amount:
                  </span>{' '}
                  <br></br>
                  <div className="amount">
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(pool.minLock)}
                        decimals={0}
                        duration={0.5}
                        style={{ color: '#8544F5', fontWeight: 600 }}
                        separator=","
                      />
                      <span style={{ color: '#8544F5', fontWeight: 600 }}>$</span>
                      <span style={{ color: '#8544F5' }}>{' ~ '}</span>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={minLockMatic}
                        decimals={4}
                        duration={0.5}
                        style={{ color: '#8544F5', fontWeight: 400 }}
                        separator=","
                      />{' '}
                      <img className="imagesvector" src={images.vector} alt="logo" width="12px" />
                    </div>
                    <span>to</span>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(pool.maxLock)}
                        decimals={0}
                        duration={0.5}
                        style={{ color: '#8544F5', fontWeight: 600 }}
                        separator=","
                      ></CountUp>
                      <span style={{ color: '#8544F5', fontWeight: 600 }}>$</span>
                      <span style={{ color: '#8544F5' }}>{' ~ '}</span>
                      <CountUp
                        start={0}
                        preserveValue
                        delay={0}
                        end={Number(pool.maxLock / pool.rateBNB2USD)}
                        decimals={4}
                        duration={0.5}
                        style={{ color: '#8544F5', fontWeight: 400 }}
                        separator=","
                      />{' '}
                      <img className="imagesvector" src={images.vector} alt="logo" width="12px" />
                    </div>
                  </div>
                </span>
                {/* <span className="bnb"></span> */}
                <UserBalance>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      fontWeight: '500',
                      fontSize: '18px',
                      lineHeight: '24px',
                    }}
                  >
                    <div>Balance: </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      {
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={Number(userBalance)}
                          decimals={4}
                          duration={0.5}
                          separator=","
                        ></CountUp>
                      }{' '}
                      <img className="imagesvector" src={images.vector} alt="logo" width="12px" />
                      {'  ~'}
                      {
                        <CountUp
                          start={0}
                          preserveValue
                          delay={0}
                          end={Number(userBalance) * pool.rateBNB2USD}
                          decimals={4}
                          duration={0.5}
                          separator=","
                        ></CountUp>
                      }
                      {'$'}
                    </div>
                  </div>
                </UserBalance>
                {mine === true && pool.pid !== 0 ? (
                  <UserBalance>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '4px',
                        fontWeight: '500',
                        fontSize: '18px',
                        lineHeight: '24px',
                      }}
                    >
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
                    </div>
                  </UserBalance>
                ) : (
                  <UserBalance>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '4px',
                        fontWeight: '500',
                        fontSize: '18px',
                        lineHeight: '24px',
                      }}
                    >
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
                    </div>
                  </UserBalance>
                )}
              </div>
            </div>

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
                  <input
                    id="switchMine"
                    defaultChecked={checked}
                    onChange={onChange}
                    disabled={userTotal}
                    className="checkBox"
                    type="checkBox"
                  />
                  <Text>Mine TREND</Text>
                  {mine ? <img src="/images/V3/check.svg" alt="check" /> : null}
                </CheckMine>
              )}
            </>
          ) : (
            <>
              {pool.pid.toString() === '0' ? null : (
                <>
                  <CheckMine>
                    <input
                      id="switchMine"
                      defaultChecked={checked}
                      onChange={onChange}
                      disabled={userTotal}
                      className="checkBox"
                      type="checkBox"
                    />
                    <Text>Mine TREND</Text>
                    {mine ? <img src="/images/V3/check.svg" alt="check" /> : null}
                  </CheckMine>
                </>
              )}
            </>
          )}

          {isValidAmount ? <></> : <Error>Amount is out of acceptable range !!</Error>}
          {disabledDiposit === false ? (
            <></>
          ) : (
            <Error>You have deposited more than 7 days, please choose another pool to join</Error>
          )}
          <div style={{ textAlign: 'center' }}>
            <StyledButton
              variant={!isValidAmount ? 'light' : 'primary'}
              disabled={isConfirming || (!isValidAmount ? true : false) || disabledDiposit}
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
      )}
    </>
  )
}

export default DepositPoolModal
