import { InjectedModalProps } from '@pancakeswap/uikit'
// import { Pool } from 'views/Pools/util'

export interface ClaimPoolModalProps extends InjectedModalProps {
  pool: any
  account: string
  reload: () => void
  onSuccess: () => void
}
