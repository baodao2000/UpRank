import { Button, ButtonProps } from '@pancakeswap/uikit'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  width: 100%;
  background: linear-gradient(135deg, #105eec 0%, #061428 100%);
  opacity: 0.95;
  box-shadow: -6px -6px 24px rgba(85, 93, 131, 0.48), 8px 8px 22px rgba(54, 59, 87, 0.24),
    inset 1px 1px 1px rgba(38, 49, 105, 0.05), inset -1px -1px 4px rgba(83, 92, 136, 0.12);
  border-radius: 10px;
  color: #ffffff;
`

const ImportButton = ({ children, ...props }: ButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default ImportButton
