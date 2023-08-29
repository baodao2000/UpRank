import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('Home'),
    items: [
      {
        label: t('Pool'),
        href: '/pools',
      },
      // {
      //   label: t('Pools'),
      //   href: '/poolv3',
      // },
      {
        label: t('Referral'),
        href: '/referral',
      },
      {
        label: t('Tokenomic'),
        href: '/tokenomic',
      },
      {
        label: t('Mining'),
        href: '/mining',
      },
      {
        label: t('Airdrop'),
        href: '/airdrop',
      },
    ],
  },
  {
    label: t('Support'),
    items: [
      {
        label: t('Gitbook'),
        href: 'https://trendydefi.gitbook.io/trendy-defi',
      },
      {
        label: t('Documentation'),
        href: 'https://trendydefi.com/TrendyDefi-Whitepaper.pdf',
      },
      {
        label: t('Help Center'),
        // href: 'https://docs.pancakeswap.finance/contact-us/customer-support',
      },
      {
        label: t('FAQ'),
        // href: 'https://docs.pancakeswap.finance/help/troubleshooting',
      },
      {
        label: t('Chat Support'),
        // href: 'https://docs.pancakeswap.finance/get-started',
      },
    ],
  },
  {
    label: t('Social JOIN NOW'),
    items: [
      {
        label: 'Support on Polygon',
        href: 'https://polygon.technology',
        image: '/images/IconPoolsV2.svg',
      },
      {
        label: 'Audit by Certik',
        href: 'https://trendydefi.com/REP-final.pdf',
        image: '/images/chains/certik-logo.png',
        border: true,
      },
      {
        label: 'Twitter',
        href: 'https://twitter.com/TrendyDefi',
        image: '/images/V3/Logotwitter.svg',
      },
      // {
      //   label: t('Facebook'),
      //   href: 'https://www.facebook.com/trendydefi',
      //   image: '/images/pools/facebook.svg',
      // },
      {
        label: t('Telegram'),
        href: 'https://t.me/trendydefi',
        image: '/images/V3/Telegramicon.svg',
      },
      {
        label: t('Global Community'),
        href: 'https://t.me/trendydefiglobal',
        image: '/images/V3/Telegramicon.svg',
      },
      // {
      //   label: 'Github',
      //   href: 'https://github.com/trendydefi',
      //   image: '/images/pools/Github.png',
      //   // border: true,
      // },
      // {
      //   label: t('Medium'),
      //   href: 'https://medium.com/@trendydefi',
      //   isHighlighted: true,
      //   image: '/images/pools/medium.svg',
      // },
      // {
      //   label: t('Youtube'),
      //   href: 'https://www.youtube.com/@trendydefi',
      //   image: '/images/pools/youtube.svg',
      // },
    ],
  },
]
