import { Button, Modal, Text, Grid, InjectedModalProps, useToast } from '@pancakeswap/uikit'
import { useState } from 'react'
import { getContract } from 'utils/contractHelpers'
import addresses from 'config/constants/contracts'
import refferalAbi from 'config/abi/refferal.json'
import { useDispatch } from 'react-redux'
import { setRefLink } from 'state/referral'
import { useSigner } from 'wagmi'
import { InjectedProps } from '@pancakeswap/uikit/src/widgets/Modal/types'
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'

interface RegistersModalProps extends InjectedProps {}

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
  const [modalIsOpen, setModalIsOpen] = useState(true)
  // const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId;
  const CHAIN_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)
  const refferCT = getContract({ address: addresses.refferal[CHAIN_ID], abi: refferalAbi, chainId: CHAIN_ID, signer })

  const onRegister = async () => {
    try {
      setLoading(true)
      if (referBy) {
        const txReceipt = await refferCT.register(referBy)
        if (txReceipt?.hash) {
          dispatch(setRefLink(`${baseRefUrl}${account}`))
          toastSuccess('Congratulations, you have successfully registered!')
        } else {
          toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
        }
      } else {
        const ref = localStorage.getItem('saveAdd')
        if (ref?.includes('0x')) {
          const txReceipt = await refferCT.register(ref)
          if (txReceipt?.hash) {
            dispatch(setRefLink(`${baseRefUrl}${account}`))
            toastSuccess('Congratulations, you have successfully registered!')
          } else {
            toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
          }
        } else {
          const owner = await refferCT.owner()
          const txReceipt = await refferCT.register(owner)
          if (txReceipt?.hash) {
            dispatch(setRefLink(`${baseRefUrl}${account}`))
            toastSuccess('Congratulations, you have successfully registered!')
          } else {
            toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
          }
        }
      }
      setLoading(false)
      onDismiss()
    } catch (error) {
      console.log('onRegister error:', error)
      setLoading(false)
      toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
      onDismiss()
    }
  }

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
      <br />
      <Button disabled={loading} onClick={onRegister}>
        {loading === true ? 'Register' : 'Register Now'}
      </Button>
    </Modal>
  )
}
