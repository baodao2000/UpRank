import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { SubMenuItems } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

const SubMenu: React.FC<React.PropsWithChildren> = () => {
  const { pathname } = useRouter()
  const { t } = useTranslation()

  const subMenuItems = useMemo(() => {
    return [
      { label: t('Latest'), href: '/competition', labelItem: '' },
      { label: t('Finished'), href: '/competition/finished', labelItem: '' },
    ]
  }, [t])

  const activeSubItem = useMemo(() => {
    return subMenuItems.find((subMenuItem) => subMenuItem.href === pathname)?.href
  }, [subMenuItems, pathname])

  return <SubMenuItems items={subMenuItems} activeItem={activeSubItem} />
}

export default SubMenu
