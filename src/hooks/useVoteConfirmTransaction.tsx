import { useEffect, useReducer, useRef, useCallback } from 'react'
import noop from 'lodash/noop'
import { useWeb3React } from '@pancakeswap/wagmi'
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import useCatchTxError from './useCatchTxError'

type LoadingState = 'idle' | 'loading' | 'success' | 'fail'

type Action =
  | { type: 'vote_idle' }
  | { type: 'vote_sending' }
  | { type: 'vote_receipt' }
  | { type: 'vote_error' }
  | { type: 'confirm_sending' }
  | { type: 'confirm_receipt' }
  | { type: 'confirm_error' }

interface State {
  votevalState: LoadingState
  confirmState: LoadingState
}

const initialState: State = {
  votevalState: 'idle',
  confirmState: 'idle',
}

const reducer = (state: State, actions: Action): State => {
  switch (actions.type) {
    case 'vote_idle':
      return {
        ...state,
        votevalState: 'idle',
      }
    case 'vote_sending':
      return {
        ...state,
        votevalState: 'loading',
      }
    case 'vote_receipt':
      return {
        ...state,
        votevalState: 'success',
      }
    case 'vote_error':
      return {
        ...state,
        votevalState: 'fail',
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

interface VoteConfirmTransaction {
  onVote: () => Promise<TransactionResponse>
  onConfirm: (params?) => Promise<TransactionResponse>
  onRequiresVoteval?: () => Promise<boolean>
  onSuccess: ({ state, receipt }: OnSuccessProps) => void
  onVoteSuccess?: ({ state, receipt }: OnSuccessProps) => void
}

const useVoteConfirmTransaction = ({
  onVote,
  onConfirm,
  onRequiresVoteval,
  onSuccess = noop,
  onVoteSuccess = noop,
}: VoteConfirmTransaction) => {
  const { account } = useWeb3React()
  const [state, dispatch] = useReducer(reducer, initialState)
  const handlePreVote = useRef(onRequiresVoteval)
  const { fetchWithCatchTxError } = useCatchTxError()

  const handleVote = useCallback(
    async (params) => {
      const receipt = await fetchWithCatchTxError(async () => {
        dispatch({ type: 'vote_sending' })
        const tx = await onVote()
        return tx
      })
      if (receipt?.status) {
        dispatch({ type: 'vote_receipt' })
        onVoteSuccess({ state, receipt })
      } else {
        dispatch({ type: 'vote_error' })
        onSuccess({ state, receipt })
      }
    },
    [onVote, onVoteSuccess, state, fetchWithCatchTxError],
  )

  const handleConfirmVote = useCallback(
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

  // Check if voteval is necessary, re-check if account changes
  useEffect(() => {
    if (account && handlePreVote.current) {
      handlePreVote.current().then((requiresVote) => {
        if (requiresVote) {
          dispatch({ type: 'vote_receipt' })
        } else {
          dispatch({ type: 'vote_idle' })
        }
      })
    }
  }, [account, handlePreVote, dispatch])

  return {
    isVotting: state.votevalState === 'loading',
    isVoted: state.votevalState === 'success',
    isConfirmingVote: state.confirmState === 'loading',
    isConfirmedVote: state.confirmState === 'success',
    hasVoteFailed: state.votevalState === 'fail',
    hasConfirmFailed: state.confirmState === 'fail',
    handleVote,
    handleConfirmVote,
  }
}

export default useVoteConfirmTransaction
