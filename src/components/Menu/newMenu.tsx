import { Box, Logo, Menu, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { Outlet, Link } from 'react-router-dom'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import throttle from 'lodash/throttle'

import { useMenuItems } from './hooks/useMenuItems'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import useTheme from 'hooks/useTheme'
import { footerLinks } from './config/footerConfig'
import { languageList, useTranslation } from '@pancakeswap/localization'
import PhishingWarningBanner from 'components/PhishingWarningBanner'
import { usePhishingBannerManager } from 'state/user/hooks'
import { MENU_HEIGHT, MOBILE_MENU_HEIGHT } from '@pancakeswap/uikit/src/widgets/Menu/config'
import styled from 'styled-components'
import { CurrencyExchange } from 'components/Currency'
import Footer from '../../../packages/uikit/src/components/Footer/index'
import { useCakeBusdPrice } from 'hooks/useBUSDPrice'
import BottomNav from '@pancakeswap/uikit/src/components/BottomNav/index'
import UserMenu from './UserMenu'

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  //   min-height: 100vh;
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-bottom: 0;
  }
`

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  width: 100%;
`
const Wrapper = styled.div`
  width: 100%;
  background-color: black;
  overflow: hidden;
`
const Container = styled.div`
  position: relative;
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
  background-color: var(--black-black-60, rgba(0, 0, 0, 0.6));
`
const FixedContainer = styled.div<{ showMenu: boolean; height: number }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  //   left: 0;
  padding: 0 20px;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  z-index: 20;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledMenuItem = styled(Text)`
  color: var(--white-white, #fff);
  display: flex;
  align-items: center;

  /* Text lg/regular */
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 155.556% */
  img {
    width: 20px;
    height: 20px;
    margin: 0 10px;
  }
  width: 151px;
`
const StyledListItem = styled.div`
  display: flex;
  gap: 16px;
`
const LayoutNew = () => {
  const [showPhishingWarningBanner] = usePhishingBannerManager()
  const [showMenu, setShowMenu] = useState(true)

  const { pathname } = useRouter()
  const { isDark, setTheme } = useTheme()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const banner = showPhishingWarningBanner && typeof window !== 'undefined' && <PhishingWarningBanner />
  const { isMobile, isTablet } = useMatchBreakpoints()

  const totalTopMenuHeight = banner ? MENU_HEIGHT : MENU_HEIGHT
  const cakePriceUsd = useCakeBusdPrice({ forceMainnet: true })

  const menuItems = useMenuItems()

  const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

  const toggleTheme = useMemo(() => {
    return () => setTheme(isDark ? 'light' : 'dark')
  }, [setTheme, isDark])

  const getFooterLinks = useMemo(() => {
    return footerLinks(t)
  }, [t])

  const subLinks = activeMenuItem?.hideSubNav || activeSubMenuItem?.hideSubNav ? [] : activeMenuItem?.items
  const homeLink = menuItems.find((link) => link.label === 'Home')
  const refPrevOffset = useRef(typeof window === 'undefined' ? 0 : window.pageYOffset)

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight
      const isTopOfPage = currentOffset === 0
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true)
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true)
        } else {
          // Has scroll down
          setShowMenu(false)
        }
      }
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [totalTopMenuHeight])
  return (
    <Wrapper>
      <Container>
        <FixedContainer showMenu={showMenu} height={totalTopMenuHeight}>
          <Logo isDark={isDark} href={homeLink?.href ?? '/'} />
          <StyledListItem>
            <StyledMenuItem>
              <img src="images/V3/iconPool.svg" />
              <Link to="/pools">Pools</Link>
            </StyledMenuItem>

            <StyledMenuItem>
              <img src="images/V3/iconReferral.svg" />
              <Link to="/referral">Referral</Link>
            </StyledMenuItem>
            <StyledMenuItem>
              <img src="images/V3/iconTokenomic.svg" />
              <Link to="/tokenomic">Tokenomic</Link>
            </StyledMenuItem>
            <StyledMenuItem>
              <img src="images/V3/iconMinning.svg" />
              <Link to="/mining">Mining</Link>
            </StyledMenuItem>
            <StyledMenuItem>
              <img src="images/V3/gift.svg" />
              <Link to="/airdrop">Airdrop</Link>
            </StyledMenuItem>
          </StyledListItem>
          <UserMenu />
        </FixedContainer>
        <Outlet />

        <BodyWrapper mt={!subLinks ? '0' : '0'}>
          <CurrencyExchange />
          <Inner isPushed={false} showMenu={showMenu}>
            {/* {children} */}
            <Footer
              items={getFooterLinks}
              isDark={isDark}
              toggleTheme={toggleTheme}
              langs={languageList}
              setLang={setLanguage}
              currentLang={currentLanguage.code}
              cakePriceUsd={Number(cakePriceUsd)}
              buyCakeLabel={t('Buy CAKE')}
              mb={[`${MOBILE_MENU_HEIGHT}px`, null, '0px']}
            />
          </Inner>
        </BodyWrapper>

        {isMobile && (
          <BottomNav items={menuItems} activeItem={activeMenuItem?.href} activeSubItem={activeSubMenuItem?.href} />
        )}
        {isTablet && (
          <BottomNav items={menuItems} activeItem={activeMenuItem?.href} activeSubItem={activeSubMenuItem?.href} />
        )}
      </Container>
    </Wrapper>
  )
}

export default LayoutNew
