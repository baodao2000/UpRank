import { InjectedModalProps } from '@pancakeswap/uikit'
// import { Pool } from 'views/Pools/util'

export interface Pool {
  currentInterest: number
  enable: boolean
  minStake: number
  timeLock: number
  totalLock: number
  pid?: number
  totalReward: number
  currentReward: number
  startTime: number
  userTotalLock: number
  rateBNB2USD?: number
  unit?: string
}
export enum ConfirmVoteView {
  MAIN = 'main',
  DETAILS = 'details',
}

export interface DepositPoolModalProps extends InjectedModalProps {
  pool: Pool
  account: string
  reload: () => void
  onSuccess: () => void
}
