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
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/pools">
            <Pools />
          </Route>
          <Route exact path="/pools_V1">
            <Poolsv1 />
          </Route>
          <Route exact path="/referral">
            <Referral />
          </Route>
          <Route exact path="/tokenomic">
            <Tokenomic />
          </Route>
          <Route exact path="/mining">
            <Mining />
          </Route>
          <Route exact path="/airdrop">
            <AirDrops />
          </Route>
          <Route exact path={`${poolBaseUrl}/:id/chainId=:chainId`}>
            <Pool />
          </Route>
          <Route exact path={`${poolBaseUrlV2}/:id/chainId=:chainId`}>
            <PoolV2 />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  )
}
