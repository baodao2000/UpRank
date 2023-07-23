import Pool, { PoolDetailLayout } from 'views/PoolV2/components/PoolDetailsV2'
import { useRouter } from 'next/router'

const PoolDetailPage = () => {
  const poolId = useRouter().query.poolId as string
  return <>{poolId && <Pool poolId={poolId} />}</>
}
PoolDetailPage.Layout = PoolDetailLayout
export default PoolDetailPage
