import { Button, ButtonProps } from '@pancakeswap/uikit'
import { useWallet } from 'hooks/useWallet'
import styled from 'styled-components'
// @ts-ignore
// eslint-disable-next-line import/extensions
import { useActiveHandle } from 'hooks/useEagerConnect.bmp.ts'
import Trans from './Trans'

const StyledButton = styled(Button)`
  * {
    font-family: 'Helvetica Rounded';
    font-size: 14px;
    text-transform: uppercase;
    height: 10px;
  }
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
