import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Referral from 'views/Referral'
import MenuV2 from '../newMenu'
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
      <Routes>
        <Route path="/" element={<MenuV2 />}>
          <Route index element={<HomePage />} />
          <Route path="pools" element={<Pools />} />
          <Route path="pools_v1" element={<Poolsv1 />} />
          <Route path="referral" element={<Referral />} />
          <Route path="tokenomic" element={<Tokenomic />} />
          <Route path="mining" element={<Mining />} />

          <Route path="airdrop" element={<AirDrops />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
