import { useWeb3React } from '@pancakeswap/wagmi'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { poolBaseUrlV2 } from 'views/PoolV2/components/PoolDetailsV2/constants'

const PoolDetailPage = () => {
  const router = useRouter()
  const { account } = useWeb3React()
  useEffect(() => {
    if (account) {
      router.push(`${poolBaseUrlV2}`)
    }
  }, [])
}

export default PoolDetailPage
