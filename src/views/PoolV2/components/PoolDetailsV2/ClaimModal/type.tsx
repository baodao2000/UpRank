import { InjectedModalProps } from '@pancakeswap/uikit'
import { Pool } from 'views/PoolV2/util'

export interface ClaimPoolModalProps extends InjectedModalProps {
  pool: Pool
  account: string
  onSuccess: () => void
}
