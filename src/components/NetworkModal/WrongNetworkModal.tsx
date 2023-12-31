import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import {
  ArrowForwardIcon,
  Button,
  Grid,
  Message,
  MessageText,
  Modal,
  Text,
  useMatchBreakpoints,
} from '@pancakeswap/uikit'
import { FlexGap } from 'components/Layout/Flex'
import { ChainLogo } from 'components/Logo/ChainLogo'
import useAuth from 'hooks/useAuth'
import { useSessionChainId } from 'hooks/useSessionChainId'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import Image from 'next/future/image'
import { Chain, useAccount, useNetwork } from 'wagmi'
import Dots from '../Loader/Dots'
import LogoMobile from 'components/Svg/LogoMobile'

// Where page network is not equal to wallet network
export function WrongNetworkModal({ currentChain, onDismiss }: { currentChain: Chain; onDismiss: () => void }) {
  const { switchNetworkAsync, isLoading, canSwitch } = useSwitchNetwork()
  const { chain } = useNetwork()
  const { logout } = useAuth()
  const { isConnected } = useAccount()
  const [, setSessionChainId] = useSessionChainId()
  const chainId = currentChain.id || ChainId.MATIC
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const switchText = t('Switch to %network%', { network: currentChain.name })

  return (
    <Modal
      style={{ width: isMobile ? '100%' : '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      title=""
      onDismiss={onDismiss}
    >
      <Text textAlign="center" fontSize="24px" fontWeight="700" margin="20px 0">
        You are in wrong network
      </Text>
      <Grid style={{ gap: '16px' }} maxWidth="336px">
        <Text>{t('This page is located for %network%.', { network: currentChain.name })}</Text>
        <Text>
          {t('You are under %network% now, please switch the network to continue.', { network: chain?.name ?? '' })}
        </Text>
        <div style={{ textAlign: 'center' }}>
          <img width="50px" height="50px" src="/images/logo-mobile.png" alt="" className="mobile-icon" />
        </div>
        <Message variant="warning" icon={false} p="8px 12px">
          <MessageText>
            <FlexGap gap="12px">
              <FlexGap gap="6px">
                <ChainLogo chainId={chain?.id} /> <ArrowForwardIcon color="#D67E0A" />
                <ChainLogo chainId={chainId} />
              </FlexGap>
              <span>{t('Switch network to continue.')}</span>
            </FlexGap>
          </MessageText>
        </Message>
        {canSwitch && (
          <Button isLoading={isLoading} onClick={() => switchNetworkAsync(chainId)}>
            {isLoading ? <Dots>{switchText}</Dots> : switchText}
          </Button>
        )}
        {isConnected && (
          <Button
            onClick={() =>
              logout().then(() => {
                setSessionChainId(chainId)
              })
            }
            variant="secondary"
          >
            {t('Disconnect Wallet')}
          </Button>
        )}
      </Grid>
    </Modal>
  )
}
