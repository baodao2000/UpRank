import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { Box, Flex } from "../../../../components/Box";
import { ChevronDownIcon } from "../../../../components/Svg";
import { UserMenuProps, variants } from "./types";
import MenuIcon from "./MenuIcon";
import { UserMenuItem } from "./styles";
import { useMatchBreakpoints } from "../../../../contexts";

export const StyledUserMenu = styled(Flex)`
  align-items: center;
  background-color: #353547;
  * {
    font-family: Inter, sans-serif;
  }
  border-radius: 16px;
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  padding-left: 32px;
  padding-right: 8px;
  position: relative;

  &:hover {
    opacity: 0.65;
  }
  @media screen and (max-width: 575px) {
    background: none;
  }
`;

export const LabelText = styled.div`
  color: #d2d6ef;
  display: none;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 8px;
    margin-right: 4px;
  }
`;

const Menu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100px;
  background-color: #27262c;
  border: 1px solid #383241;
  border-radius: 16px;
  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  width: 375px;
  visibility: visible;
  z-index: 1001;
  * {
    font-family: Inter, sans-serif;
  }
  ${({ isOpen }) =>
    !isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
  `}
  ${({ isOpen }) =>
    isOpen &&
    `@media screen and (max-width: 1440px ) {
      right: 2%;
    top: 100%;
  }
  @media screen and (min-width:1450px ) {
    right: 0;
    top: 100%;
  }
  `}
  ${UserMenuItem}:first-child {
    border-radius: 8px 8px 0 0;
  }

  ${UserMenuItem}:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const UserMenu: React.FC<UserMenuProps> = ({
  account,
  text,
  avatarSrc,
  variant = variants.DEFAULT,
  children,
  disabled,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const accountEllipsis = account ? `${account.substring(0, 2)}...${account.substring(account.length - 4)}` : null;
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    strategy: "fixed",
    placement: "bottom-end",
    modifiers: [{ name: "offset", options: { offset: [0, 0] } }],
  });
  const { isMobile } = useMatchBreakpoints();

  useEffect(() => {
    const showDropdownMenu = () => {
      setIsOpen(true);
    };

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node;
      if (target && !tooltipRef?.contains(target)) {
        setIsOpen(false);
        evt.stopPropagation();
      }
    };

    targetRef?.addEventListener("mouseenter", showDropdownMenu);
    targetRef?.addEventListener("mouseleave", hideDropdownMenu);

    return () => {
      targetRef?.removeEventListener("mouseenter", showDropdownMenu);
      targetRef?.removeEventListener("mouseleave", hideDropdownMenu);
    };
  }, [targetRef, tooltipRef, setIsOpen]);

  return (
    <Flex alignItems="center" height="100%" ref={setTargetRef} {...props}>
      <StyledUserMenu
        onTouchStart={() => {
          setIsOpen((s) => !s);
        }}
      >
        {isMobile ? (
          <img width="24px" height="24px" src="/images/V3/menu.png" />
        ) : (
          <>
            <MenuIcon avatarSrc={avatarSrc} variant={variant} />
            <LabelText title={typeof text === "string" ? text || account : account}>
              {text || accountEllipsis}
            </LabelText>
            {!disabled && <ChevronDownIcon color="text" width="24px" />}
          </>
        )}
      </StyledUserMenu>
      {!disabled && (
        <Menu ref={setTooltipRef} {...attributes.popper} isOpen={isOpen}>
          <Box onClick={() => setIsOpen(false)}>{children?.({ isOpen })}</Box>
        </Menu>
      )}
    </Flex>
  );
};

export default UserMenu;
