import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Referral from 'views/Referral'
import Mining from 'views/Mining'
import HomePage from 'views/HomePage1'
import Pools from 'views/PoolV2'
import Poolsv1 from 'views/Pools2'

import Tokenomic from 'views/Tokenomic'
import AirDrops from 'views/AirDrops'
import NotFound from 'views/NotFound'

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
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </>
  )
}
