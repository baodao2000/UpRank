import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useRef } from "react";
import { useMatchBreakpoints } from "../../contexts";
import { Box } from "../Box";
import { DropdownMenuItemType } from "../DropdownMenu/types";
import MenuItem from "../MenuItem/MenuItem";
import { ChevronLeftIcon, ChevronRightIcon, OpenNewIcon } from "../Svg";
import StyledSubMenuItems, {
  LeftMaskLayer,
  RightMaskLayer,
  StyledSubMenuItemWrapper,
  SubMenuItemWrapper,
} from "./styles";
import { SubMenuItemsProps } from "./types";
import styled from "styled-components";
const Text = styled.div`
  font-size: 18px;
`;
const SUBMENU_CHEVRON_CLICK_MOVE_PX = 100;
const SUBMENU_SCROLL_DEVIATION = 3;

const SubMenuItems: React.FC<React.PropsWithChildren<SubMenuItemsProps>> = ({
  items = [],
  activeItem,
  isMobileOnly = false,
  ...props
}) => {
  const { isMobile } = useMatchBreakpoints();
  const scrollLayerRef = useRef<HTMLDivElement>(null);
  const chevronLeftRef = useRef<HTMLDivElement>(null);
  const chevronRightRef = useRef<HTMLDivElement>(null);
  const layerController = useCallback(() => {
    if (!scrollLayerRef.current || !chevronLeftRef.current || !chevronRightRef.current) return;
    const scrollLayer = scrollLayerRef.current;
    if (scrollLayer.scrollLeft === 0) chevronLeftRef.current.classList.add("hide");
    else chevronLeftRef.current.classList.remove("hide");
    if (scrollLayer.scrollLeft + scrollLayer.offsetWidth < scrollLayer.scrollWidth - SUBMENU_SCROLL_DEVIATION)
      chevronRightRef.current.classList.remove("hide");
    else chevronRightRef.current.classList.add("hide");
  }, []);
  useEffect(() => {
    layerController();
  }, [layerController]);
  return (
    <SubMenuItemWrapper $isMobileOnly={isMobileOnly} {...props}>
      {isMobile && items.length > 3 && (
        <LeftMaskLayer
          ref={chevronLeftRef}
          onClick={() => {
            if (!scrollLayerRef.current) return;
            scrollLayerRef.current.scrollLeft -= SUBMENU_CHEVRON_CLICK_MOVE_PX;
          }}
        >
          <ChevronLeftIcon />
        </LeftMaskLayer>
      )}
      {isMobile && items.length > 3 && (
        <RightMaskLayer
          ref={chevronRightRef}
          onClick={() => {
            if (!scrollLayerRef.current) return;
            scrollLayerRef.current.scrollLeft += SUBMENU_CHEVRON_CLICK_MOVE_PX;
          }}
        >
          <ChevronRightIcon />
        </RightMaskLayer>
      )}
      <StyledSubMenuItems
        justifyContent="center"
        pl={["12px", null, "0px"]}
        onScroll={debounce(layerController, 100)}
        ref={scrollLayerRef}
      >
        {items.map(({ label, labelItem, href, icon, itemProps, type, disabled }) => {
          const Icon = icon;
          const isExternalLink = type === DropdownMenuItemType.EXTERNAL_LINK;
          const linkProps = isExternalLink
            ? {
                as: "a",
                target: "_blank",
              }
            : {};

          const isActive = href === activeItem;

          return (
            label && (
              <StyledSubMenuItemWrapper key={label} mr="20px">
                <MenuItem
                  href={href}
                  scrollLayerRef={scrollLayerRef}
                  isActive={isActive}
                  isDisabled={disabled}
                  variant="subMenu"
                  {...itemProps}
                  {...linkProps}
                >
                  <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-start", gap: "10px" }}>
                    {Icon && <img style={{ width: "20px", height: "20px" }} src={icon} />}
                    <Text>{labelItem ? labelItem : label}</Text>
                    {isExternalLink && (
                      <Box display={["none", null, "flex"]} style={{ alignItems: "center" }} ml="4px">
                        <OpenNewIcon color="textSubtle" />
                      </Box>
                    )}
                  </div>
                </MenuItem>
              </StyledSubMenuItemWrapper>
            )
          );
        })}
      </StyledSubMenuItems>
    </SubMenuItemWrapper>
  );
};

export default SubMenuItems;
