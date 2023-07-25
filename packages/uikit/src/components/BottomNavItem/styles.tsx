import styled from "styled-components";
import { Text } from "../Text";

export const StyledBottomNavItem = styled.button`
  display: flex;
  border: 0;
  justify-content: center;
  background: transparent;
  cursor: pointer;
  height: 44px;
  gap: 10px;
  padding: 0 10px;
  &:hover {
    border-radius: 16px;
  }
  &:hover,
  &:hover div {
    background: #353547;
    border-radius: 12px;
  }
`;

export const StyledBottomNavText = styled(Text)`
  display: -webkit-box;
  overflow: hidden;
  user-select: none;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
`;
