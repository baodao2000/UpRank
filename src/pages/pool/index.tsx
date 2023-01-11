import { useWeb3React } from '@pancakeswap/wagmi'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { poolBaseUrl } from 'views/Pools/constants'

const PoolDetailPage = () => {
  const router = useRouter()
  const { account } = useWeb3React()
  useEffect(() => {
    if (account) {
      router.push(`${poolBaseUrl}`)
    }
  }, [])
}

export default PoolDetailPage
