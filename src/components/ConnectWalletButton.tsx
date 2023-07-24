import { Button, ButtonProps } from '@pancakeswap/uikit'
import { useWallet } from 'hooks/useWallet'
import styled from 'styled-components'
// @ts-ignore
// eslint-disable-next-line import/extensions
import { useActiveHandle } from 'hooks/useEagerConnect.bmp.ts'
import Trans from './Trans'

const StyledButton = styled(Button)`
  * {
    font-family: Inter, sans-serif;
    font-size: 14px;
    text-transform: uppercase;
  }
  border-radius: var(--border-radius-lg, 8px);
  background: var(--primary-primary-1, #8544f5);
  /* light effect/boxShadow */
  box-shadow: 2px 2px 8px 16px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  display: flex;
  padding: 0px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-8, 8px);
  color: var(--white-white, #fff);
  height: 40px;
`

const ConnectWalletButton = ({ children, ...props }: ButtonProps) => {
  const handleActive = useActiveHandle()
  const { onPresentConnectModal } = useWallet()

  const handleClick = () => {
    if (typeof __NEZHA_BRIDGE__ !== 'undefined') {
      handleActive()
    } else {
      onPresentConnectModal()
    }
  }

  return (
    <StyledButton onClick={handleClick} {...props}>
      {children || <Trans>Connect Wallet</Trans>}
    </StyledButton>
  )
}

export default ConnectWalletButton
