import { parseUnits } from '@ethersproject/units'
import {
  ButtonMenu,
  ButtonMenuItem,
  CloseIcon,
  Heading,
  IconButton,
  InjectedModalProps,
  ModalBody,
  ModalContainer,
  ModalHeader as UIKitModalHeader,
  ModalTitle,
} from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import { useBalance } from 'wagmi'
import WalletInfo from './WalletInfo'
import WalletTransactions from './WalletTransactions'
import WalletWrongNetwork from './WalletWrongNetwork'

export enum WalletView {
  WALLET_INFO,
  TRANSACTIONS,
  WRONG_NETWORK,
}

interface WalletModalProps extends InjectedModalProps {
  initialView?: WalletView
}

export const LOW_BNB_BALANCE = parseUnits('2', 'gwei')

const ModalHeader = styled(UIKitModalHeader)`
  // background: rgb(105 84 156 / 77%);
`

const Tabs = styled.div`
  background: linear-gradient(139.08deg, #171718 1.7%, rgba(86, 27, 211, 0.84) 108.66%);
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 16px 24px;
`

const WalletModal: React.FC<React.PropsWithChildren<WalletModalProps>> = ({
  initialView = WalletView.WALLET_INFO,
  onDismiss,
}) => {
  const [view, setView] = useState(initialView)
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { data, isFetched } = useBalance({ addressOrName: account })
  const hasLowNativeBalance = isFetched && data && data.value.lte(LOW_BNB_BALANCE)

  const handleClick = (newIndex: number) => {
    setView(newIndex)
  }

  const TabsComponent: React.FC<React.PropsWithChildren> = () => (
    <Tabs>
      <ButtonMenu scale="sm" variant="subtle" onItemClick={handleClick} activeIndex={view} fullWidth>
        <ButtonMenuItem>{t('Wallet')}</ButtonMenuItem>
        <ButtonMenuItem>{t('Transactions')}</ButtonMenuItem>
      </ButtonMenu>
    </Tabs>
  )

  return (
    <ModalContainer title={t('Welcome!')} $minWidth="320px" borderRadius={25}>
      <ModalHeader>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="white" />
        </IconButton>
      </ModalHeader>
      {view !== WalletView.WRONG_NETWORK && <TabsComponent />}
      <ModalBody
        p="24px"
        width="100%"
        background={'linear-gradient(139.08deg, #171718 1.7%, rgba(86, 27, 211, 0.84) 108.66%)'}
      >
        {view === WalletView.WALLET_INFO && (
          <WalletInfo hasLowNativeBalance={hasLowNativeBalance} onDismiss={onDismiss} />
        )}
        {view === WalletView.TRANSACTIONS && <WalletTransactions />}
        {view === WalletView.WRONG_NETWORK && <WalletWrongNetwork onDismiss={onDismiss} />}
      </ModalBody>
    </ModalContainer>
  )
}

export default WalletModal
