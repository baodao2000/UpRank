import styled from 'styled-components'
import { CloseIcon, Box, InjectedModalProps, ModalCloseButton } from '@pancakeswap/uikit'
import ImportButton from './ImportButton'

const WrapperModalImport = styled.div`
  background: linear-gradient(135deg, #535b85 0%, #43496a 100%);
  box-shadow: -6px -6px 24px rgba(85, 93, 131, 0.48), 8px 8px 22px rgba(54, 59, 87, 0.24),
    inset 1px 1px 1px rgba(38, 49, 105, 0.05), inset -1px -1px 4px rgba(83, 92, 136, 0.12);
  border-radius: 10px;
  width: 336px;
  height: 184px;
  position: relative;
  top: 0;
  z-index: 999;
`

const HeaderModal = styled.div`
  position: relative;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-shadow: 1px 1px 1px rgba(38, 43, 70, 0.32);
  padding: 16px;
`

const StyleIconClose = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
  cursor: pointer;
`

const BodyModal = styled.div`
  position: relative;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #d2d6ef;
  text-shadow: 1px 1px 1px rgba(38, 43, 70, 0.32);
  padding: 0 66px;
  margin-top: 10px;
`

const TextHeaderModal = styled.span<{ status }>`
  color: ${({ status }) => (status === 'Success' ? '#48FFDE' : '#F97771')};
`

interface ImportModalProps extends InjectedModalProps {
  status: string
  link: string
}

export default function ImportModal({ onDismiss = () => null, status, link }: ImportModalProps) {
  return (
    <WrapperModalImport>
      <HeaderModal>
        <TextHeaderModal status={status}>Import {status}</TextHeaderModal>
        <StyleIconClose>
          <ModalCloseButton onDismiss={onDismiss} />
        </StyleIconClose>
      </HeaderModal>
      <BodyModal>
        Check game balance at: {link}
        <Box mt="20px">
          <ImportButton onClick={onDismiss}>Ok</ImportButton>
        </Box>
      </BodyModal>
    </WrapperModalImport>
  )
}
