import { useEffect, useReducer, useRef, useCallback } from 'react'
import noop from 'lodash/noop'
import { useWeb3React } from '@pancakeswap/wagmi'
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import useCatchTxError from './useCatchTxError'

type LoadingState = 'idle' | 'loading' | 'success' | 'fail'

type Action =
  | { type: 'register_idle' }
  | { type: 'register_sending' }
  | { type: 'register_receipt' }
  | { type: 'register_error' }
  | { type: 'confirm_sending' }
  | { type: 'confirm_receipt' }
  | { type: 'confirm_error' }

interface State {
  registerState: LoadingState
  confirmState: LoadingState
}

const initialState: State = {
  registerState: 'idle',
  confirmState: 'idle',
}

const reducer = (state: State, actions: Action): State => {
  switch (actions.type) {
    case 'register_idle':
      return {
        ...state,
        registerState: 'idle',
      }
    case 'register_sending':
      return {
        ...state,
        registerState: 'loading',
      }
    case 'register_receipt':
      return {
        ...state,
        registerState: 'success',
      }
    case 'register_error':
      return {
        ...state,
        registerState: 'fail',
      }
    case 'confirm_sending':
      return {
        ...state,
        confirmState: 'loading',
      }
    case 'confirm_receipt':
      return {
        ...state,
        confirmState: 'success',
      }
    case 'confirm_error':
      return {
        ...state,
        confirmState: 'fail',
      }
    default:
      return state
  }
}

interface OnSuccessProps {
  state: State
  receipt: TransactionReceipt
}

interface RegisterConfirmTransaction {
  onRegister: () => Promise<TransactionResponse>
  onConfirm: (params?) => Promise<TransactionResponse>
  onRequiresRegister?: () => Promise<boolean>
  onSuccess: ({ state, receipt }: OnSuccessProps) => void
  onRegisterSuccess?: ({ state, receipt }: OnSuccessProps) => void
}

const useRegisterConfirmTransaction = ({
  onRegister,
  onConfirm,
  onRequiresRegister,
  onSuccess = noop,
  onRegisterSuccess = noop,
}: RegisterConfirmTransaction) => {
  const { account } = useWeb3React()
  const [state, dispatch] = useReducer(reducer, initialState)
  const handlePreRegister = useRef(onRequiresRegister)
  const { fetchWithCatchTxError } = useCatchTxError()

  const handleRegister = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(async () => {
      dispatch({ type: 'register_sending' })
      const tx = await onRegister()
      return tx
    })
    if (receipt?.status) {
      dispatch({ type: 'register_receipt' })
      onRegisterSuccess({ state, receipt })
    } else {
      dispatch({ type: 'register_error' })
      onSuccess({ state, receipt })
    }
  }, [onRegister, onRegisterSuccess, state, fetchWithCatchTxError])

  const handleRegisterConfirm = useCallback(
    async (params = {}) => {
      const receipt = await fetchWithCatchTxError(() => {
        dispatch({ type: 'confirm_sending' })
        return onConfirm(params)
      })
      if (receipt?.status) {
        dispatch({ type: 'confirm_receipt' })
        onSuccess({ state, receipt })
      } else {
        dispatch({ type: 'confirm_error' })
      }
    },
    [onConfirm, dispatch, onSuccess, state, fetchWithCatchTxError],
  )

  // Check if approval is necessary, re-check if account changes
  useEffect(() => {
    if (account && handlePreRegister.current) {
      handlePreRegister.current().then((requiresRegister) => {
        if (requiresRegister) {
          dispatch({ type: 'register_receipt' })
        } else {
          dispatch({ type: 'register_idle' })
        }
      })
    }
  }, [account, handlePreRegister, dispatch])

  return {
    isRegistting: state.registerState === 'loading',
    isRegisterd: state.registerState === 'success',
    isRegisterConfirming: state.confirmState === 'loading',
    isRegisterConfirmed: state.confirmState === 'success',
    hasRegisterFailed: state.registerState === 'fail',
    hasConfirmFailed: state.confirmState === 'fail',
    handleRegister,
    handleRegisterConfirm,
  }
}

export default useRegisterConfirmTransaction
