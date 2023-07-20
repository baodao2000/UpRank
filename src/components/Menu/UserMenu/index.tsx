import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import {
  Box,
  Flex,
  LogoutIcon,
  RefreshIcon,
  Text,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  UserMenuItem,
  UserMenuVariant,
} from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Trans from 'components/Trans'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useAuth from 'hooks/useAuth'
import Image from 'next/image'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useProfile } from 'state/profile/hooks'
import { usePendingTransactions } from 'state/transactions/hooks'
import { useAccount } from 'wagmi'
import ProfileUserMenuItem from './ProfileUserMenuItem'
import WalletModal, { WalletView } from './WalletModal'
import WalletUserMenuItem from './WalletUserMenuItem'

const UserMenu = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { chainId, isWrongNetwork } = useActiveChainId()
  const { logout } = useAuth()
  const { hasPendingTransactions, pendingNumber } = usePendingTransactions()
  const { isInitialized, isLoading, profile } = useProfile()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const [onPresentWrongNetworkModal] = useModal(<WalletModal initialView={WalletView.WRONG_NETWORK} />)
  const hasProfile = isInitialized && !!profile
  const avatarSrc = profile?.nft?.image?.thumbnail
  const [userMenuText, setUserMenuText] = useState<string>('')
  const [userMenuVariable, setUserMenuVariable] = useState<UserMenuVariant>('default')

  useEffect(() => {
    if (hasPendingTransactions) {
      setUserMenuText(t('%num% Pending', { num: pendingNumber }))
      setUserMenuVariable('pending')
    } else {
      setUserMenuText('')
      setUserMenuVariable('default')
    }
  }, [hasPendingTransactions, pendingNumber, t])

  const onClickWalletMenu = (): void => {
    if (isWrongNetwork) {
      onPresentWrongNetworkModal()
    } else {
      onPresentWalletModal()
    }
  }

  const UserMenuItems = () => {
    return (
      <>
        <WalletUserMenuItem isWrongNetwork={isWrongNetwork} onPresentWalletModal={onClickWalletMenu} />
        <UserMenuItem as="button" disabled={isWrongNetwork} onClick={onPresentTransactionModal}>
          <Flex alignItems="center" justifyContent="center" style={{ gap: '8px' }}>
            <Image src="/images/trans.png" width={15} height={15} alt="" />
            <Text> {t('Recent Transactions')}</Text>
          </Flex>
          {hasPendingTransactions && <RefreshIcon spin />}
        </UserMenuItem>
        <UserMenuItem>
          <NextLink href="/referral" passHref>
            <Flex alignItems="center" style={{ gap: '8px' }}>
              <Image src="/images/referral.png" width={15} height={15} alt="" />
              <Text> {t('Referral')}</Text>
            </Flex>
          </NextLink>
        </UserMenuItem>
        <UserMenuDivider />
        {/* <NextLink href={`/profile/${account?.toLowerCase()}`} passHref> */}
        {/*   <UserMenuItem as="a" disabled={isWrongNetwork || chainId !== ChainId.BSC}> */}
        {/*     {t('Your NFTs')} */}
        {/*   </UserMenuItem> */}
        {/* </NextLink> */}
        {/* <ProfileUserMenuItem */}
        {/*   isLoading={isLoading} */}
        {/*   hasProfile={hasProfile} */}
        {/*   disabled={isWrongNetwork || chainId !== ChainId.BSC} */}
        {/* /> */}
        <UserMenuItem as="button" onClick={logout}>
          <Flex alignItems="center" style={{ gap: '8px' }}>
            <Image src="/images/logout.png" width={15} height={15} alt="logout" />
            <Text> {t('Disconnect')}</Text>
          </Flex>
        </UserMenuItem>
      </>
    )
  }

  if (account) {
    return (
      <UIKitUserMenu account={account} avatarSrc={avatarSrc} text={userMenuText} variant={userMenuVariable}>
        {({ isOpen }) => (isOpen ? <UserMenuItems /> : null)}
      </UIKitUserMenu>
    )
  }

  if (isWrongNetwork) {
    return (
      <UIKitUserMenu text={t('Network')} variant="danger">
        {({ isOpen }) => (isOpen ? <UserMenuItems /> : null)}
      </UIKitUserMenu>
    )
  }

  return (
    <ConnectWalletButton style={{ background: 'linear-gradient(270.19deg, #6059FF 0.11%, #5F82FF 99.8%)' }} scale="sm">
      <Box display={['none', , , 'block']}>
        <Trans>Connect Wallet</Trans>
      </Box>
      <Box display={['block', , , 'none']}>
        <Trans>Connect</Trans>
      </Box>
    </ConnectWalletButton>
  )
}

export default UserMenu
