import React, { useContext } from "react";
import { MenuContext } from "../../widgets/Menu/context";
import { Flex } from "../Box";
import AnimatedIconComponent from "../Svg/AnimatedIconComponent";
import { StyledBottomNavItem, StyledBottomNavText } from "./styles";
import { BottomNavItemProps } from "./types";
import { useMatchBreakpoints } from "../../contexts";

const BottomNavItem: React.FC<React.PropsWithChildren<BottomNavItemProps>> = ({
  label,
  icon,
  fillIcon,
  href,
  showItemsOnMobile = false,
  isActive = false,
  disabled = false,
  ...props
}) => {
  const { linkComponent } = useContext(MenuContext);
  const { isMobile } = useMatchBreakpoints();

  const bottomNavItemContent = (
    <Flex flexDirection={isMobile ? "column" : "row"} justifyContent="center" alignItems="center" height="100%">
      {icon && (
        <AnimatedIconComponent
          icon={icon}
          width={isMobile ? "16px" : "30px"}
          // fillIcon={fillIcon}
          color={isActive ? "secondary" : "textSubtle"}
          isActive={isActive}
          activeBackgroundColor="backgroundAlt"
        />
      )}
      <StyledBottomNavText
        color={isActive ? "text" : "textSubtle"}
        fontWeight={isActive ? "600" : "400"}
        fontSize="16px"
      >
        {label}
      </StyledBottomNavText>
    </Flex>
  );

  return showItemsOnMobile ? (
    <StyledBottomNavItem style={{ opacity: disabled ? 0.5 : 1 }} type="button" {...props}>
      {bottomNavItemContent}
    </StyledBottomNavItem>
  ) : (
    <StyledBottomNavItem style={{ opacity: disabled ? 0.5 : 1 }} as={linkComponent} href={href} {...props}>
      {bottomNavItemContent}
    </StyledBottomNavItem>
  );
};

export default BottomNavItem;
