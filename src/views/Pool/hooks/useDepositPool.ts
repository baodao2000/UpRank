import { useCallback, useState } from 'react'
import { useAppDispatch } from 'state'
import { useTranslation } from '@pancakeswap/localization'
import BigNumber from 'bignumber.js'
import { useToast } from '@pancakeswap/uikit'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import { usePotterytVaultContract } from 'hooks/useContract'
import { useWeb3React } from '@pancakeswap/wagmi'
import { fetchPotteryUserDataAsync } from 'state/pottery'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import contracts from 'config/constants/contracts'
import poolsABI from 'config/abi/pools.json'
import { getContract } from '../../../utils/contractHelpers'
import { ChainId } from '../../../../packages/swap-sdk/src/constants'

export const useDepositPools = (amount: number, pid: number) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: isPending } = useCatchTxError()
  const [isRef, setIsRef] = useState(false)
  const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId
  const depositContract = getContract({
    address: contracts.pools[CHAIN_ID],
    abi: poolsABI,
    chainId: CHAIN_ID,
  })

  const handleDeposit = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => depositContract.deposit(amount, pid))

    if (receipt?.status) {
      toastSuccess(
        'Success!',
        //   <ToastDescriptionWithTx txHash={receipt.transactionHash} >
        //   {t('Your funds have been staked in the pool')}
        //     </ToastDescriptionWithTx>,
      )
      dispatch(fetchPotteryUserDataAsync(account))
    }
  }, [account, depositContract, amount, dispatch, fetchWithCatchTxError, toastSuccess])

  return { isPending, handleDeposit }
}
