import styled from "styled-components";
import { StyledMenuItemProps } from "./types";

export const StyledMenuItemContainer = styled.div<StyledMenuItemProps>`
  position: relative;
  @media screen and (min-width: 1440px) {
    margin: 10px 20px;
  }
`;

const StyledMenuItem = styled.a<StyledMenuItemProps>`
  position: relative;
  display: flex;
  align-items: center;
  color: #d2d6ef;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  // align-items: flex-start;
  flex-direction: row-reverse;
  font-family: Inter, sans-serif;
  background: ${({ $isActive }) => ($isActive ? "rgba(175, 137, 238, 0.20)" : "blackrgba(39,38,44,0.7)")};
  border-radius: ${({ $isActive }) => ($isActive ? "16px" : "16px")};
  background: ${({ $isActive }) => ($isActive ? "rgba(175, 137, 238, 0.20)" : "black")};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};

  ${({ $statusColor, theme }) =>
    $statusColor &&
    `
    &:after {
      content: "";
      border-radius: 100%;
      background: #1FC7D4;
      height: 8px;
      width: 8px;
      margin-left: 12px;
    }
  `}

  ${({ $variant }) =>
    $variant === "default"
      ? `
    padding: 0 16px;
    height: 48px;
  `
      : `
    padding:  20px 20px;
    height: 50px;
  `}

  &:hover {
    background: #353547;
    ${({ $variant }) => $variant === "default" && "border-radius: 16px;"};
  }
`;

export default StyledMenuItem;
