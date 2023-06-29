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

interface RegistersModalProps extends InjectedProps {}

const StyledInput = styled(Input)`
  outline: none;
  border: 3px solid #009571;
  border-radius: 10px;
`
export const ModalCheckRegister: React.FC<React.PropsWithChildren<RegistersModalProps>> = ({ onDismiss }) => {
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
  const onRegister = async () => {
    try {
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
      // console.log(referByW, referBy, myCode)
      const txReceipt = await refferCT.register(referByW, myCode)
      if (txReceipt?.hash) {
        dispatch(setRefLink(`${baseRefUrl}${account}`))
        toastSuccess('Congratulations, you have successfully registered!')
      } else {
        toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
      }
      // }
      // }
      setLoading(false)
      onDismiss()
    } catch (error) {
      console.log('onRegister error:', error)
      setLoading(false)
      toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
      onDismiss()
    }
  }

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
  console.log(onDismiss)

  return (
    <Modal title="Register" onDismiss={onDismiss}>
      <Grid>
        <Text bold>
          You don&apos;t have an account yet!
          <br />
          create a new one to play the game
        </Text>
      </Grid>
      <br />
      <StyledInput value={referCode} autoFocus={true} onChange={validateReferByWallet} placeholder={`refer code`} />
      {showError && referCode && <span style={{ color: 'red' }}>Invalid code</span>}
      <br />
      <Button disabled={loading || referCode === '' || showError} onClick={onRegister}>
        {loading === true ? 'Register' : 'Register Now'}
      </Button>
    </Modal>
  )
}
