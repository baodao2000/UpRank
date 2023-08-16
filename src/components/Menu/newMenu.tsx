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
const StyledMenuItem = styled.div`
  position: relative;
  justify-content: center;
  color: var(--white-white, #fff);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 16px;
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
  height: 40px;

  &:hover {
    border-radius: var(--border-radius-lg, 8px);
    background: rgba(175, 137, 238, 0.2);
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
    .dropdown {
      display: flex;
    }
  }
  a:hover {
    color: #fff;
  }
  .dropdown {
    display: none;
  }
`
const StyledListItem = styled.div`
  display: flex;
  gap: 16px;
  .active {
    border-radius: var(--border-radius-lg, 8px);
    background: rgba(175, 137, 238, 0.2);
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  }
`
const DropdownMenu = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: rgb(39, 38, 44);
  border: 1px solid rgb(56, 50, 65);
  width: 180px;
  top: 60px;
  padding: 10px 0;
  border-radius: 20px;
  align-items: flex-start;
  gap: 10px;
`
const StyledDropdownMenu = styled.div`
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
  jutify-content: flex-start;
  max-width: 180px;
  &:hover {
    border-radius: var(--border-radius-lg, 8px);
    background: rgba(175, 137, 238, 0.2);
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  }
`
const StyledItemNav = styled.div`
  color: var(--white-white, #fff);
  display: flex;
  align-items: center;
  padding: 0px 16px;
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
  width: 130px;
  height: 40px;

  &:hover {
    border-radius: var(--border-radius-lg, 8px);
    background: rgba(175, 137, 238, 0.2);
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  }
`
const NavDropdownMenu = styled.div`
  display: flex;
  width: 860px;
  gap: 30px;
  margin: 60px auto;
  justify-content: center;
  .active {
    border-radius: var(--border-radius-lg, 8px);
    background: rgba(175, 137, 238, 0.2);
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  }
`
const data = [
  {
    img: '',
    link: '/home',
    label: 'Home',
    dropdownMenu: [],
  },
  {
    img: 'images/V3/iconPool.svg',
    link: '/pools',
    label: 'Pools',
    dropdownMenu: [
      {
        img: '/images/V3/iconNew.svg',
        link: 'pools',
        label: 'Ver2.0',
      },
      {
        img: '',
        link: '/pools_V1',
        label: 'Ver1.0',
      },
    ],
  },
  {
    img: 'images/V3/iconReferral.svg',
    link: '/referral',
    label: 'Referral',
    dropdownMenu: [],
  },
  {
    img: 'images/V3/iconTokenomic.svg',
    link: '/tokenomic',
    label: 'Tokenomic',
    dropdownMenu: [],
  },
  {
    img: 'images/V3/iconMinning.svg',
    link: '/mining',
    label: 'Minning',
    dropdownMenu: [],
  },
  {
    img: 'images/V3/gift.svg',
    link: '/airdrop',
    label: 'Airdrop',
    dropdownMenu: [],
  },
]
const MenuV2 = () => {
  const [showPhishingWarningBanner] = usePhishingBannerManager()
  const [showMenu, setShowMenu] = useState(true)
  const [classActive, setClassActive] = useState('')
  const [indexActive, setIndexActive] = useState(0)
  // const [indexDropdown , setIndexDropdown] = useState(0)
  const indexDropdown = useRef(0)
  const [isActive, setisActive] = useState(0)

  // console.log(indexDropdown.current);

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
  const linkActive = window.location.href

  const checkActive = (e, r) => {
    const linkActive = window.location.href

    localStorage.setItem('index', r)
    if (linkActive.indexOf(e) !== -1) {
      setClassActive('active')
      setIndexActive(r)
      indexDropdown.current = 0
    } else {
      setClassActive('')
    }
  }
  const checkIsActive = (index) => {
    indexDropdown.current = index
    localStorage.setItem('indexDropdown', index)
  }

  useEffect(() => {
    if (localStorage.getItem('index') !== 'home') {
      setIndexActive(Number(localStorage.getItem('index')))
      indexDropdown.current = Number(localStorage.getItem('indexDropdown'))
      setClassActive('active')
    } else if (localStorage.getItem('index') === 'home') {
      setClassActive('')
      setIndexActive(0)
    }
  }, [linkActive])
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
          <div onClick={() => localStorage.setItem('index', 'home')}>
            <Logo isDark={isDark} href={homeLink?.href ?? '/'} />
          </div>
          {/* <StyledListItem>
            <StyledMenuItem onClick={() => checkActive('/pools')}>
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
          </StyledListItem> */}
          <StyledListItem>
            {data.map((items, index) => (
              <>
                <StyledMenuItem
                  style={{ display: index === 0 ? 'none' : 'flex' }}
                  className={index === indexActive ? classActive : ''}
                  onClick={() => checkActive(items.link, index)}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={items.img} />
                    <Link to={items.link}>{items.label}</Link>
                  </div>
                  {items.dropdownMenu.length > 0 ? (
                    <DropdownMenu className="dropdown">
                      {items.dropdownMenu.map((i, k) => (
                        <StyledDropdownMenu
                          className={k === indexDropdown.current ? 'active' : ''}
                          onClick={() => checkIsActive(k)}
                        >
                          <Link to={i.link}>{i.label}</Link>
                          {i.img !== '' ? <img src={i.img} /> : null}
                        </StyledDropdownMenu>
                      ))}
                    </DropdownMenu>
                  ) : null}
                </StyledMenuItem>
              </>
            ))}
          </StyledListItem>
          <UserMenu />
        </FixedContainer>

        {data[indexActive].dropdownMenu.length > 0 && (
          <NavDropdownMenu>
            {data[indexActive].dropdownMenu.map((item, index) => (
              <StyledItemNav
                className={index === indexDropdown.current ? 'active' : ''}
                onClick={() => checkIsActive(index)}
              >
                <Link to={item.link}>{item.label}</Link>
                {item.img !== '' ? <img src={item.img} /> : null}
              </StyledItemNav>
            ))}
          </NavDropdownMenu>
        )}
        <div style={{ marginTop: '50px' }}>
          <Outlet />
        </div>

        <BodyWrapper mt={!subLinks ? '0' : '0'}>
          <CurrencyExchange />
          <Inner isPushed={false} showMenu={showMenu}>
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

export default MenuV2
