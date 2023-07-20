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
import { useMatchBreakpoints } from "@pancakeswap/uikit";
import { Button } from "../Button";
import CakePrice from "../CakePrice/CakePrice";
import LangSelector from "../LangSelector/LangSelector";
import { ArrowForwardIcon, LogoWithTextIcon } from "../Svg";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { FooterProps } from "./types";
import NextLink from "next/link";
import Image from "next/image";

const FooterItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const TextLink = styled(Text)`
  margin: 8px 0;
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
  max-width: 1320px;
  margin: 0 auto;
  align-items: flex-start;
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
  const { isMobile, isTablet } = useMatchBreakpoints();

  return (
    <StyledFooter data-theme="dark" p={["40px 16px", null, "56px 40px 32px 40px"]} {...props}>
      <BlockListItem>
        <img src="./images/V3/Logo.png" />

        {items?.map((item) => (
          <StyledList key={item.label}>
            <StyledListItem>{item.label}</StyledListItem>

            {item.items?.map(({ label, href, image, isHighlighted = false, border }) => (
              <FooterItem key={href}>
                {image &&
                  (border ? (
                    <img
                      src={image}
                      style={{ marginRight: 12, width: 24, background: "#3b4858", borderRadius: "50%", fill: "black" }}
                    />
                  ) : (
                    <img src={image} style={{ marginRight: 12, width: 24 }} />
                  ))}
                {href ? (
                  <Link
                    data-theme="dark"
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    color={isHighlighted ? vars.colors.warning : "text"}
                    bold={false}
                  >
                    <TextLink>{label}</TextLink>
                  </Link>
                ) : (
                  <TextLink>{label}</TextLink>
                )}
              </FooterItem>
            ))}
          </StyledList>
        ))}
        <div style={{ width: "100%", height: "2px", backgroundColor: " rgba(255, 255, 255, 0.10)" }} />
        <Flex
          style={{
            width: "100%",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column-reverse" : "row",
            gap: "16px",
          }}
        >
          <Text
            style={{
              color: "var(--greyscale-grey-scale-text-seconday, #ADABB2)",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "28px",
            }}
          >
            © 2023 Trendydefi. All rights reserved.
          </Text>
          <Flex style={{ gap: "32px" }}>
            <img src="./images/githubV3.png" style={{ height: 35, width: 35 }} />
            <img src="./images/community.png" style={{ height: 35, width: 35 }} />
            <img src="./images/youtube.png" style={{ height: 35, width: 35 }} />
          </Flex>
        </Flex>
      </BlockListItem>
    </StyledFooter>
  );
};

export default MenuItem;
