/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementType } from "react";
import { FlexProps } from "../Box";
import { DropdownMenuItemType } from "../DropdownMenu/types";

export type SubMenuItemsType = {
  label: string;
  labelItem: string;
  href: string;
  itemProps?: any;
  icon?: string;
  disabled?: boolean;
  isMobileOnly?: boolean;
  type?: DropdownMenuItemType;
};

export interface SubMenuItemsProps extends FlexProps {
  items: SubMenuItemsType[];
  activeItem?: string;
  isMobileOnly?: boolean;
}
