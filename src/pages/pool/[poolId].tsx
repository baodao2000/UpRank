import Pool from 'views/Pool2'
import { useRouter } from 'next/router'

const PoolDetail = () => {
  const poolId = useRouter().query.poolId as string
  return <>{poolId && <Pool poolId={poolId} />}</>
}
export default PoolDetail
