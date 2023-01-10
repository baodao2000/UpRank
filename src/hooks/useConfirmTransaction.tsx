import { useEffect, useReducer, useRef, useCallback } from 'react'
import noop from 'lodash/noop'
import { useWeb3React } from '@pancakeswap/wagmi'
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import useCatchTxError from './useCatchTxError'

type LoadingState = 'idle' | 'loading' | 'success' | 'fail'

type Action =
  | { type: 'approve_sending' }
  | { type: 'approve_receipt' }
  | { type: 'approve_error' }
  | { type: 'confirm_sending' }
  | { type: 'confirm_receipt' }
  | { type: 'confirm_error' }

interface State {
  approvalState: LoadingState
  confirmState: LoadingState
}

const initialState: State = {
  approvalState: 'idle',
  confirmState: 'idle',
}

const reducer = (state: State, actions: Action): State => {
  switch (actions.type) {
    case 'approve_sending':
      return {
        ...state,
        approvalState: 'loading',
      }
    case 'approve_receipt':
      return {
        ...state,
        approvalState: 'success',
      }
    case 'approve_error':
      return {
        ...state,
        approvalState: 'fail',
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

interface ConfirmTransaction {
  onConfirm: (params?) => Promise<TransactionResponse>
  onSuccess: ({ state, receipt }: OnSuccessProps) => void
}

const useConfirmTransaction = ({ onConfirm, onSuccess = noop }: ConfirmTransaction) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { fetchWithCatchTxError } = useCatchTxError()

  const handleConfirm = useCallback(
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

  return {
    isConfirming: state.confirmState === 'loading',
    isConfirmed: state.confirmState === 'success',
    hasConfirmFailed: state.confirmState === 'fail',
    handleConfirm,
  }
}

export default useConfirmTransaction
