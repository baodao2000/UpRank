import Pool, { PoolDetailLayout } from 'views/Pool'
import { useRouter } from 'next/router'

const PoolDetailPage = () => {
  const poolId = useRouter().query.poolId as string
  return <>{poolId && <Pool />}</>
}
PoolDetailPage.Layout = PoolDetailLayout
export default PoolDetailPage
