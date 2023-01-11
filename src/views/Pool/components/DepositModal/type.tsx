import { InjectedModalProps } from '@pancakeswap/uikit'
import { Pool } from 'views/Pools2/util'

export enum ConfirmVoteView {
  MAIN = 'main',
  DETAILS = 'details',
}

export interface DepositPoolModalProps extends InjectedModalProps {
  pool: Pool
  account: string
  onSuccess: () => void
}
