import styled, { DefaultTheme } from "styled-components";
import { InputProps, scales } from "./types";

interface StyledInputProps extends InputProps {
  theme: DefaultTheme;
}

/**
 * Priority: Warning --> Success
 */
const getBoxShadow = ({ isSuccess = false, isWarning = false, theme }: StyledInputProps) => {
  if (isWarning) {
    return theme.shadows.warning;
  }

  if (isSuccess) {
    return theme.shadows.success;
  }

  return theme.shadows.inset;
};

const getHeight = ({ scale = scales.MD }: StyledInputProps) => {
  switch (scale) {
    case scales.SM:
      return "32px";
    case scales.LG:
      return "48px";
    case scales.MD:
    default:
      return "40px";
  }
};

const Input = styled.input<InputProps>`
  background: linear-gradient(360deg, rgba(0, 254, 193, 0.58) -135.83%, rgba(11, 14, 14, 0) 123.33%);
  border-radius: 16px;
  box-shadow: inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1);
  color: #f4eeff;
  display: block;
  font-size: 16px;
  height: ${getHeight};
  outline: 0;
  padding: 0 16px;
  width: 100%;
  border: 1px solid #262130;

  &::placeholder {
    color: #d2d6ef;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
  }

  &:focus:not(:disabled) {
    border: 3px solid #009571;
  }
`;

Input.defaultProps = {
  scale: scales.MD,
  isSuccess: false,
  isWarning: false,
};

export default Input;
