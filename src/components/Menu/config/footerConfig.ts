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
        label: t('About us'),
        // href: 'https://docs.pancakeswap.finance/brand',
      },
      {
        label: t('Documentation'),
        // href: 'https://medium.com/pancakeswap',
      },
      {
        label: t('Blog'),
        // href: 'https://docs.pancakeswap.finance/contact-us/telegram',
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
        label: 'Twitter',
        href: 'https://twitter.com/TrendyDefi',
        image: '/images/pools/twitter.svg',
      },
      {
        label: t('Facebook'),
        // href: 'https://docs.pancakeswap.finance',
        image: '/images/pools/facebook.svg',
      },
      {
        label: t('Telegram'),
        href: 'https://t.me/trendydefi',
        image: '/images/pools/telegram.svg',
      },
    ],
  },
  {
    label: t('Social'),
    items: [
      {
        label: t('Medium'),
        // href: 'https://docs.pancakeswap.finance/contact-us',
        isHighlighted: true,
        image: '/images/pools/medium.svg',
      },
      {
        label: t('Youtube'),
        // href: 'https://docs.pancakeswap.finance/brand',
        image: '/images/pools/youtube.svg',
      },
    ],
  },
]
