import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Home'),
        // href: 'https://docs.pancakeswap.finance/contact-us',
        isHighlighted: true,
      },
      {
        label: t('Gitbook'),
        href: 'https://trendydefi.gitbook.io/trendy-defi',
      },
      {
        label: t('Documentation'),
        href: 'https://trendydefi.com/TrendyDefi-Whitepaper.pdf',
      },
    ],
  },
  {
    label: t('Help'),
    items: [
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
    label: t('Developers'),
    items: [
      {
        label: 'Support on Polygon',
        href: 'https://polygon.technology',
        image: '/images/IconPoolsV2.svg',
      },
      {
        label: 'Twitter',
        href: 'https://twitter.com/TrendyDefi',
        image: '/images/TwitterV2.svg',
      },
      // {
      //   label: t('Facebook'),
      //   href: 'https://www.facebook.com/trendydefi',
      //   image: '/images/pools/facebook.svg',
      // },
      {
        label: t('Telegram'),
        href: 'https://t.me/trendydefi',
        image: '/images/TelegramV2.svg',
      },
      {
        label: t('Global Community'),
        href: 'https://t.me/trendydefiglobal',
        image: '/images/TelegramV2.svg',
      },
    ],
  },
  {
    label: t('Social'),
    items: [
      {
        label: 'Audit by Certik',
        href: 'https://trendydefi.com/REP-final.pdf',
        image: '/images/chains/certik-logo.png',
        border: true,
      },
      {
        label: 'Github',
        href: 'https://github.com/trendydefi',
        image: '/images/pools/Github.png',
        // border: true,
      },
      {
        label: t('Medium'),
        href: 'https://medium.com/@trendydefi',
        isHighlighted: true,
        image: '/images/pools/medium.svg',
      },
      {
        label: t('Youtube'),
        href: 'https://www.youtube.com/@trendydefi',
        image: '/images/pools/youtube.svg',
      },
    ],
  },
]
