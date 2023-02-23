import { vars } from "@pancakeswap/ui/css/vars.css";
import React from "react";
import styled from "styled-components";
import { Box, Flex } from "../Box";
import { Text } from "../Text";
import { Link } from "../Link";
import {
  StyledFooter,
  StyledIconMobileContainer,
  StyledList,
  StyledListItem,
  StyledSocialLinks,
  StyledText,
  StyledToolsContainer,
} from "./styles";

import { Button } from "../Button";
import CakePrice from "../CakePrice/CakePrice";
import LangSelector from "../LangSelector/LangSelector";
import { ArrowForwardIcon, LogoWithTextIcon } from "../Svg";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { FooterProps } from "./types";
import NextLink from "next/link";
import images from "../../../../../src/configs/images";

const FooterItem = styled(StyledListItem)`
  display: flex;
  justify-content: flex-start;
`;

const ListImgButton = styled.div`
  margin-top: 36px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  row-gap: 20px;
  width: 100%;

  a {
    border: 1px solid #a6a6a6;
    border-radius: 7px;
    background: #0c0d10;
    mix-blend-mode: normal;
    img {
      border-radius: 7px;
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
  }
`;
const StyledTitle = styled(Text)`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.001em;
  color: #beb7b7;
  width: 300px;
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.001em;
    color: #beb7b7;
    font-weight: 700;
  }
`;

const BlockDownload = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 45px;
`;

const BlockListItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  row-gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({
  items,
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCakeLabel,
  ...props
}) => {
  return (
    <StyledFooter data-theme="dark" p={["40px 16px", null, "56px 40px 32px 40px"]} {...props}>
      <BlockDownload>
        <StyledTitle>
          So what are you waiting for? <span>Download here</span>
        </StyledTitle>
        <ListImgButton>
          <a href="">
            <img src={images.downloadIOS} alt="" />
          </a>
          <a href="">
            <img src={images.downloadPlay} alt="" />
          </a>
          <a href="">
            <img src={images.downloadAPK} alt="" />
          </a>
        </ListImgButton>
        {/* <ListImgButtonMb>
        <a href="">
          <img src={images.apple} alt="" />
        </a>
        <a href="">
          <img src={images.chPlay} alt="" />
        </a>
        <a href="">
          <img src={images.android} alt="" />
        </a>
      </ListImgButtonMb> */}
      </BlockDownload>
      <BlockListItem>
        {items?.map((item) => (
          <StyledList key={item.label}>
            {/* <StyledListItem>{item.label}</StyledListItem> */}
            {item.items?.map(({ label, href, image, isHighlighted = false }) => (
              <FooterItem key={href}>
                {image && (
                  <div style={{ width: 34 }}>
                    <img src={image} style={{ marginRight: 12 }} />
                  </div>
                )}
                {href ? (
                  <Link
                    data-theme="dark"
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    color={isHighlighted ? vars.colors.warning : "text"}
                    bold={false}
                  >
                    {label}
                  </Link>
                ) : (
                  <StyledText>{label}</StyledText>
                )}
              </FooterItem>
            ))}
          </StyledList>
        ))}
      </BlockListItem>
    </StyledFooter>
  );
};

export default MenuItem;
