import { InjectedModalProps } from '@pancakeswap/uikit'
import { Mine, Pool } from 'views/PoolV2/util'

export interface ClaimPoolModalProps extends InjectedModalProps {
  // pool: Pool
  mine: Mine
  account: string
  onSuccess: () => void
}
