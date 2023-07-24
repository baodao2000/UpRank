import { Button, Modal, Text, Grid, InjectedModalProps, useToast, Input } from '@pancakeswap/uikit'
import { useState, useEffect } from 'react'
import { getContract } from 'utils/contractHelpers'
import addresses from 'config/constants/contracts'
import refferalAbi from 'config/abi/refferal.json'
import { useDispatch } from 'react-redux'
import { setRefLink } from 'state/referral'
import { useSigner } from 'wagmi'
import { InjectedProps } from '@pancakeswap/uikit/src/widgets/Modal/types'
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'
import styled from 'styled-components'
import { ToastDescriptionWithTx } from 'components/Toast'
import useRegisterConfirmTransaction from 'hooks/useRegisterConfirmTransaction'
import { useTranslation } from '@pancakeswap/localization'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'

interface RegistersModalProps extends InjectedProps {}

const StyledInput = styled(Input)`
  outline: none;
  border-radius: 12px;
  background: var(--greyscale-grayscale-4, #2d2c33);
  &:focus:not(:disabled) {
    border: none;
  }
  padding: 12px 16px;
`
const Title = styled(Text)`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
`
const TextLabel = styled(Text)`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: rgba(226, 225, 229, 1);
  text-align: center;
`
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`
export const ModalCheckRegister = ({ onCheck, onDismiss }: { onCheck: () => void; onDismiss: () => void }) => {
  const { account, chainId } = useWeb3React()
  const dispatch = useDispatch()
  const { toastSuccess, toastError } = useToast()
  const [loading, setLoading] = useState(false)
  const { search } = window.location
  const query = new URLSearchParams(search)
  const referBy = query.get('ref')
  const baseRefUrl = `${window.location.origin}homepage?ref=`
  const { data: signer } = useSigner()
  const [referByWallet, setReferByWallet] = useState(null)
  const [referCode, setReferCode] = useState('')
  const [myCode, setMyCode] = useState('')
  const [showError, setShowError] = useState(false)
  // const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId;
  const CHAIN_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)
  const refferCT = getContract({ address: addresses.refferal[CHAIN_ID], abi: refferalAbi, chainId: CHAIN_ID, signer })
  const { t } = useTranslation()
  const saveRef = () => {
    if (referBy) {
      localStorage.setItem('saveAdd', JSON.stringify(referBy))
    }
  }
  const validateReferByWallet = async (e) => {
    setReferCode(e.target.value)
    const code = e.target.value

    const userInfosByCode = await refferCT.userInfosByCode(code.toLowerCase())
    if (userInfosByCode.user === '0x0000000000000000000000000000000000000000') setShowError(true)
    else {
      setShowError(false)
      setReferByWallet(userInfosByCode.user)
    }
  }
  const getRefferCode = async () => {
    if (referBy) {
      const userReferBy = await refferCT.userInfosByCode(referBy.toLowerCase())
      if (userReferBy.user === '0x0000000000000000000000000000000000000000') {
        setShowError(true)
      } else {
        setReferCode(referBy.slice(referBy?.length - 6, referBy?.length).toLocaleLowerCase())
      }
    } else {
      const ref = localStorage.getItem('saveAdd')
      if (JSON.parse(ref)) {
        const userReferByLocal = await refferCT.userInfosByCode(JSON.parse(ref).toLowerCase())
        if (userReferByLocal.user === '0x0000000000000000000000000000000000000000') {
          setShowError(true)
        } else {
          setReferCode(JSON.parse(ref).toLocaleLowerCase())
        }
      }
    }
  }
  const {
    isRegistting,
    isRegisterd,
    isRegisterConfirmed,
    isRegisterConfirming,
    handleRegister,
    handleRegisterConfirm,
  } = useRegisterConfirmTransaction({
    onRequiresRegister: async () => {
      return Promise.resolve(true)
    },
    onRegister: async () => {
      setLoading(true)
      let referByW = referByWallet
      if (!referByW) {
        if (referCode) {
          const userInfosByCode = await refferCT.userInfosByCode(referCode.toLowerCase())
          referByW = userInfosByCode.user
        }
        // else {
        //   const ref = localStorage.getItem('saveAdd')
        //   if (JSON.parse(ref)) {
        //     const userInfosByCode = await refferCT.userInfosByCode(JSON.parse(ref)?.toLowerCase())
        //     const txReceipt = await refferCT.register(userInfosByCode.user, myCode)
        //     if (txReceipt?.hash) {
        //       dispatch(setRefLink(`${baseRefUrl}${account}`))
        //       toastSuccess('Congratulations, you have successfully registered!')
        //     } else {
        //       toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
        //     }
        //   }
        // }
      }
      // console.log(referByW, myCode, getChildUpline)

      return refferCT.register(referByW, myCode)
    },
    onRegisterSuccess: async ({ receipt }) => {
      toastSuccess(
        t('Congratdataulations, you have successfully registered!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
      setLoading(false)
      onDismiss()
      onCheck()
    },
    onConfirm: (receipt) => {
      return receipt
    },
    onSuccess: async ({ receipt }) => {
      setLoading(false)
      return Promise.resolve(1)
    },
  })
  // const onRegister = async () => {
  //   try {
  //     setLoading(true)
  //     let referByW = referByWallet
  //     if (!referByW) {
  //       if (referCode) {
  //         const userInfosByCode = await refferCT.userInfosByCode(referCode.toLowerCase())
  //         referByW = userInfosByCode.user
  //       }
  //       // else {
  //       //   const ref = localStorage.getItem('saveAdd')
  //       //   if (JSON.parse(ref)) {
  //       //     const userInfosByCode = await refferCT.userInfosByCode(JSON.parse(ref)?.toLowerCase())
  //       //     const txReceipt = await refferCT.register(userInfosByCode.user, myCode)
  //       //     if (txReceipt?.hash) {
  //       //       dispatch(setRefLink(`${baseRefUrl}${account}`))
  //       //       toastSuccess('Congratulations, you have successfully registered!')
  //       //     } else {
  //       //       toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
  //       //     }
  //       //   }
  //       // }
  //     }
  //     // console.log(referByW, referBy, myCode)
  //     const txReceipt = await refferCT.register(referByW, myCode)
  //     if (txReceipt?.hash) {
  //       dispatch(setRefLink(`${baseRefUrl}${account}`))
  //       toastSuccess('Congratulations, you have successfully registered!')
  //     } else {
  //       toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
  //     }
  //     // }
  //     // }
  //     setLoading(false)
  //     onDismiss()
  //     onCheck()
  //   } catch (error) {
  //     console.log('onRegister error:', error)
  //     setLoading(false)
  //     toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
  //     onDismiss()
  //     onCheck()
  //   }
  // }

  useEffect(() => {
    saveRef()
    getRefferCode()
  }, [account])
  useEffect(() => {
    setMyCode(account.slice(account?.length - 6, account?.length).toLocaleLowerCase())
  }, [account])

  useEffect(() => {
    if (referBy) {
      setReferCode(referBy)
      const code = referBy

      refferCT.userInfosByCode(code.toLowerCase()).then((userInfosByCode) => {
        if (userInfosByCode.user === '0x0000000000000000000000000000000000000000') setShowError(true)
        else {
          setShowError(false)
          setReferByWallet(userInfosByCode.user)
        }
      })
    }
  }, [])
  return (
    <>
      {' '}
      {loading === true ? (
        <TrendyPageLoader />
      ) : (
        <Modal style={{ width: '90%', maxWidth: '434px', padding: '32px' }} title="" onDismiss={onDismiss}>
          <ModalContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Title>Register</Title>
              <TextLabel>You don&apos;t have an account yet! create a new one to play the game</TextLabel>
            </div>
            <div>
              <Text fontSize="12px" fontWeight="500" lineHeight="18px" marginBottom="12px">
                Refer code
              </Text>
              <StyledInput
                value={referCode}
                autoFocus={true}
                onChange={validateReferByWallet}
                placeholder={`refer code`}
              />
            </div>
            {showError && referCode && <span style={{ color: 'red' }}>Invalid code</span>}
            <Button
              style={{
                borderRadius: '8px',
                background: '#8544F5',
                boxShadow: '2px 2px 8px 16px rgba(0, 0, 0, 0.10)',
                color: 'rgba(255, 255, 255, 1)',
              }}
              disabled={loading || referCode === '' || showError}
              onClick={handleRegister}
            >
              Register Now
            </Button>
          </ModalContainer>
        </Modal>
      )}
    </>
  )
}
