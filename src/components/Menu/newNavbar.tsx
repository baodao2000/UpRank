import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Referral from 'views/Referral'
import LayoutNew from './newMenu'
import Mining from 'views/Mining'
import HomePage from 'views/HomePage1'
import Pools from 'views/PoolV2'
import Tokenomic from 'views/Tokenomic'
import AirDrops from 'views/AirDrops'

export const NewNav = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutNew />}>
            <Route index element={<HomePage />} />
            <Route path="pools" element={<Pools />} />
            <Route path="referral" element={<Referral />} />
            <Route path="tokenomic" element={<Tokenomic />} />
            <Route path="mining" element={<Mining />} />

            <Route path="airdrop" element={<AirDrops />} />
            {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
