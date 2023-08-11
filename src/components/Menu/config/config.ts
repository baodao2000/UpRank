import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  PoolIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  TrophyIcon,
  TrophyFillIcon,
  NftIcon,
  NftFillIcon,
  MoreIcon,
  VoteIcon,
  NewIcon,
  PoolV2Icon,
  MinningIcon,
  TokenomicIcon,
  ReferralIcon,
  AirDrop,
  TokenPocketIcon,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import { perpLangMap } from 'utils/getPerpetualLanguageCode'
import { perpTheme } from 'utils/getPerpetualTheme'
import { DropdownMenuItems } from '@pancakeswap/uikit/src/components/DropdownMenu/types'
import { SUPPORT_ONLY_BSC } from 'config/constants/supportChains'
import images from 'configs/images'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    // {
    //   label: t('Trade'),
    //   icon: SwapIcon,
    //   fillIcon: SwapFillIcon,
    //   href: '/swap',
    //   showItemsOnMobile: false,
    //   items: [
    //     {
    //       label: t('Swap'),
    //       href: '/swap',
    //     },
    //     // {
    //     //   label: t('Limit'),
    //     //   href: '/limit-orders',
    //     //   supportChainIds: SUPPORT_ONLY_BSC,
    //     //   image: '/images/decorations/3d-coin.png',
    //     // },
    //     {
    //       label: t('Liquidity'),
    //       href: '/liquidity',
    //     },
    //     // {
    //     //   label: t('Perpetual'),
    //     //   href: `https://perp.pancakeswap.finance/${perpLangMap(languageCode)}/futures/BTCUSDT?theme=${perpTheme(
    //     //     isDark,
    //     //   )}`,
    //     //   type: DropdownMenuItemType.EXTERNAL_LINK,
    //     // },
    //     // {
    //     //   label: t('Bridge'),
    //     //   href: 'https://bridge.pancakeswap.finance/',
    //     //   type: DropdownMenuItemType.EXTERNAL_LINK,
    //     // },
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: t('Import'),
    //   href: '/import',
    //   showItemsOnMobile: false,
    //   icon: SwapIcon,
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: t('Lottery'),
    //   href: '/lottery',
    //   showItemsOnMobile: false,
    //   icon: SwapIcon,
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
    {
      label: t('Pools'),
      showItemsOnMobile: false,
      href: '/pools',
      icon: PoolV2Icon,
      fillIcon: PoolV2Icon,
      items: [
        {
          label: t('Ver2.0'),
          labelItem: t('Ver2.0'),
          href: '/pools',
          icon: '/images/V3/iconNew.svg',
          image: '/images/V3/iconNew.svg',

          showItemsOnMobile: true,
          items: [].map((item) => addMenuItemSupported(item, chainId)),
        },
        {
          label: t('Ver1.0'),
          labelItem: t('Ver1.0'),
          href: '/pools_V1',
          showItemsOnMobile: false,
          items: [].map((item) => addMenuItemSupported(item, chainId)),
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },

    {
      label: t('Referral'),
      href: '/referral',
      showItemsOnMobile: false,
      icon: ReferralIcon,
      fillIcon: ReferralIcon,

      items: [].map((item) => addMenuItemSupported(item, chainId)),
    },
    // {
    //   label: t('Pools3'),
    //   href: '/poolv3',
    //   showItemsOnMobile: false,
    //   icon: NftIcon,
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
    {
      label: t('Tokenomic '),
      href: '/tokenomic',
      showItemsOnMobile: false,
      icon: TokenomicIcon,
      items: [].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Mining'),
      href: '/mining',
      showItemsOnMobile: false,
      icon: MinningIcon,
      items: [].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Airdrop'),
      href: '/airdrop',
      showItemsOnMobile: false,
      icon: AirDrop,
      items: [].map((item) => addMenuItemSupported(item, chainId)),
    },

    // {
    //   label: t('Voting'),
    //   href: '/vote',
    //   showItemsOnMobile: false,
    //   icon: TrophyIcon,
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },

    // {
    //   label: t('Dao'),
    //   href: '/dao',
    //   showItemsOnMobile: false,
    //   icon: SwapIcon,
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: t('Earn'),
    //   href: '/farms',
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   image: '/images/decorations/pe2.png',
    //   supportChainIds: SUPPORT_ONLY_BSC,
    //   items: [
    //     {
    //       label: t('Farms'),
    //       href: '/farms',
    //     },
    //     {
    //       label: t('Pools'),
    //       href: '/pools',
    //       supportChainIds: SUPPORT_ONLY_BSC,
    //     },
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },

    // {
    //   label: t('Win'),
    //   href: '/prediction',
    //   icon: TrophyIcon,
    //   fillIcon: TrophyFillIcon,
    //   supportChainIds: SUPPORT_ONLY_BSC,
    //   items: [
    //     {
    //       label: t('Trading Competition'),
    //       href: '/competition',
    //       image: '/images/decorations/tc.png',
    //       hideSubNav: true,
    //     },
    //     {
    //       label: t('Prediction (BETA)'),
    //       href: '/prediction',
    //       image: '/images/decorations/prediction.png',
    //     },
    //     {
    //       label: t('Lottery'),
    //       href: '/lottery',
    //       image: '/images/decorations/lottery.png',
    //     },
    //     {
    //       label: t('Pottery (BETA)'),
    //       href: '/pottery',
    //       image: '/images/decorations/lottery.png',
    //     },
    //   ],
    // },
    // {
    //   label: t('NFT'),
    //   href: `${nftsBaseUrl}`,
    //   icon: NftIcon,
    //   fillIcon: NftFillIcon,
    //   supportChainIds: SUPPORT_ONLY_BSC,
    //   image: '/images/decorations/nft.png',
    //   items: [
    //     {
    //       label: t('Overview'),
    //       href: `${nftsBaseUrl}`,
    //     },
    //     {
    //       label: t('Collections'),
    //       href: `${nftsBaseUrl}/collections`,
    //     },
    //     {
    //       label: t('Activity'),
    //       href: `${nftsBaseUrl}/activity`,
    //     },
    //   ],
    // },
    // {
    //   label: '',
    //   href: '/info',
    //   icon: MoreIcon,
    //   hideSubNav: true,
    //   items: [
    //     {
    //       label: t('Info'),
    //       href: '/info',
    //       supportChainIds: SUPPORT_ONLY_BSC,
    //     },
    //     {
    //       label: t('IFO'),
    //       href: '/ifo',
    //       supportChainIds: SUPPORT_ONLY_BSC,
    //       image: '/images/ifos/ifo-bunny.png',
    //     },
    //     {
    //       label: t('Voting'),
    //       href: '/voting',
    //       supportChainIds: SUPPORT_ONLY_BSC,
    //       image: '/images/voting/voting-bunny.png',
    //     },
    //     {
    //       type: DropdownMenuItemType.DIVIDER,
    //     },
    //     {
    //       label: t('Leaderboard'),
    //       href: '/teams',
    //       supportChainIds: SUPPORT_ONLY_BSC,
    //       image: '/images/decorations/leaderboard.png',
    //     },
    //     {
    //       type: DropdownMenuItemType.DIVIDER,
    //     },
    //     {
    //       label: t('Blog'),
    //       href: 'https://medium.com/pancakeswap',
    //       type: DropdownMenuItemType.EXTERNAL_LINK,
    //     },
    //     {
    //       label: t('Docs'),
    //       href: 'https://docs.pancakeswap.finance',
    //       type: DropdownMenuItemType.EXTERNAL_LINK,
    //     },
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
