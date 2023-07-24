import { Flex, Text, UserMenuItem, WarningIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import { FetchStatus } from 'config/constants/types'
import { LOW_BNB_BALANCE } from './WalletModal'

interface WalletUserMenuItemProps {
  isWrongNetwork: boolean
  onPresentWalletModal: () => void
}

const WalletUserMenuItem: React.FC<React.PropsWithChildren<WalletUserMenuItemProps>> = ({
  isWrongNetwork,
  onPresentWalletModal,
}) => {
  const { t } = useTranslation()
  const { balance, fetchStatus } = useGetBnbBalance()
  const hasLowBnbBalance = fetchStatus === FetchStatus.Fetched && balance.lte(LOW_BNB_BALANCE)

  return (
    <UserMenuItem as="button" onClick={onPresentWalletModal}>
      <Flex alignItems="center" justifyContent="flex-start" width="100%" flexDirection="row" style={{ gap: '5px' }}>
        <img width="16px" height="16px" src="/images/V3/iconWallet.png" />
        <Text fontSize="14px" fontWeight="400" lineHeight="22px" fontFamily="Inter, sans-serif">
          {t('Wallet')}
        </Text>
      </Flex>
    </UserMenuItem>
  )
}

export default WalletUserMenuItem
