import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch, useParams } from 'react-router-dom'
import Referral from 'views/Referral'
import Mining from 'views/Mining'
import HomePage from 'views/HomePage1'
import Pools from 'views/PoolV2'
import Poolsv1 from 'views/Pools2'

import Tokenomic from 'views/Tokenomic'
import AirDrops from 'views/AirDrops'
import NotFound from 'views/NotFound'
import PoolV2 from 'views/PoolV2/components/PoolDetailsV2'
import { poolBaseUrlV2 } from 'views/PoolV2/components/PoolDetailsV2/constants'
import { useEffect } from 'react'
import { poolBaseUrl } from 'views/Pools/constants'
import Pool from 'views/Pool'

export const NewNav = () => {
  return (
    <>
      <div>
        <Switch>
          <Route path="/pools">
            <Pools />
          </Route>
          <Route path="/pools_V1">
            <Poolsv1 />
          </Route>
          <Route path="/referral">
            <Referral />
          </Route>
          <Route path="/tokenomic">
            <Tokenomic />
          </Route>
          <Route path="/mining">
            <Mining />
          </Route>
          <Route path="/airdrop">
            <AirDrops />
          </Route>
          <Route path={`${poolBaseUrl}/:id/chainId=:chainId`}>
            <Pool />
          </Route>
          <Route path={`${poolBaseUrlV2}/:id/chainId=:chainId`}>
            <PoolV2 />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </>
  )
}
