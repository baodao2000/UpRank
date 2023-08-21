import React from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '../../../../packages/uikit/src/contexts'
import { Text } from '../../../../packages/uikit/src/components/Text'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 10px 0;
  background: #27262c;
  border-top: 1px solid #383241;
  padding-bottom: env(safe-area-inset-bottom);
  html[data-useragent*='TokenPocket_iOS'] & {
    padding-bottom: 45px;
  }
  z-index: 20;
  display: flex;
  justify-content: space-around;
`
const StyledBottomNavItem = styled.button`
  display: flex;
  border: 0;
  justify-content: center;
  background: transparent;
  cursor: pointer;
  height: 44px;
  gap: 10px;
  padding: 0 10px;
  &:hover {
    border-radius: 16px;
  }
  &:hover,
  &:hover div {
    background: #353547;
    border-radius: 12px;
  }
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`
const StyledBottomNavText = styled(Text)`
  display: -webkit-box;
  overflow: hidden;
  user-select: none;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
`
const BottomNavV2 = ({ data }) => {
  const { isMobile, isTablet } = useMatchBreakpoints()

  return (
    <Wrapper>
      {data.map((items, index) => (
        <Link key={index} style={{ display: index === 0 ? 'none' : 'flex' }} to={items.link}>
          <StyledBottomNavItem style={{ display: index === 0 ? 'none' : 'flex' }}>
            <img src={items.img} />
            <StyledBottomNavText>{items.label}</StyledBottomNavText>
          </StyledBottomNavItem>
        </Link>
      ))}
    </Wrapper>
  )
}
export default BottomNavV2
