import { InjectedModalProps } from '@pancakeswap/uikit'
import { Pool } from 'views/Pools2/util'

export interface ClaimPoolModalProps extends InjectedModalProps {
  pool: Pool
  account: string
  isV2: boolean
  onSuccess: () => void
}
