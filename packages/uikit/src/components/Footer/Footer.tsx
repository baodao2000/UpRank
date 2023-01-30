import { vars } from "@pancakeswap/ui/css/vars.css";
import React from "react";
import { Box, Flex } from "../Box";
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
import { Text } from "@pancakeswap/uikit";
import { Button } from "../Button";
import CakePrice from "../CakePrice/CakePrice";
import LangSelector from "../LangSelector/LangSelector";
import { ArrowForwardIcon, LogoWithTextIcon } from "../Svg";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { FooterProps } from "./types";
import styled from "styled-components";
import images from "../../../../../src/configs/images";

const ListImgButton = styled.div`
  margin-top: 36px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3%;
  display: none;

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
const ListImgButtonMb = styled.div`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 30px;
  padding: 0 14%;
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
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
    <StyledFooter data-theme="isDark" p={["40px 16px", null, "56px 40px 32px 40px"]} {...props} justifyContent="center">
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
      <ListImgButtonMb>
        <a href="">
          <img src={images.apple} alt="" />
        </a>
        <a href="">
          <img src={images.chPlay} alt="" />
        </a>
        <a href="">
          <img src={images.android} alt="" />
        </a>
      </ListImgButtonMb>
      {/* <ListImgButton>
        <a href="">
          <img src={images.twitter} alt="" />
        </a>
        <a href="">
          <img src={images.telegram} alt="" />
        </a>
        <a href="">
          <img src={images.medium} alt="" />
        </a>
      </ListImgButton> */}

      {/* <Text>© 2022 TrendyDefi. All rights reserved.</Text> */}

      {/* <Flex flexDirection="column" width={["100%", null, "1200px;"]}>
        <StyledIconMobileContainer display={["block", null, "none"]}>
          <LogoWithTextIcon isDark width="130px" />
        </StyledIconMobileContainer>
        <Flex
          order={[2, null, 1]}
          flexDirection={["column", null, "row"]}
          justifyContent="space-between"
          alignItems="flex-start"
          mb={["42px", null, "36px"]}
        >
          {items?.map((item) => (
            <StyledList key={item.label}>
              <StyledListItem>{item.label}</StyledListItem>
              {item.items?.map(({ label, href, isHighlighted = false }) => (
                <StyledListItem key={label}>
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
                </StyledListItem>
              ))}
            </StyledList>
          ))}
          <Box display={["none", null, "block"]}>
            <LogoWithTextIcon isDark width="160px" />
          </Box>
        </Flex>
        <StyledSocialLinks order={[2]} pb={["42px", null, "32px"]} mb={["0", null, "32px"]} />
        <StyledToolsContainer
          data-theme="dark"
          order={[1, null, 3]}
          flexDirection={["column", null, "row"]}
          justifyContent="space-between"
        >
          <Flex order={[2, null, 1]} alignItems="center">
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
            <LangSelector
              currentLang={currentLang}
              langs={langs}
              setLang={setLang}
              color="textSubtle"
              dropdownPosition="top-right"
            />
          </Flex>
          <Flex order={[1, null, 2]} mb={["24px", null, "0"]} justifyContent="space-between" alignItems="center">
            <Box mr="20px">
              <CakePrice cakePriceUsd={cakePriceUsd} color="textSubtle" />
            </Box>
            <Button
              data-theme="light"
              as="a"
              href="https://pancakeswap.finance/swap?outputCurrency=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82&chainId=56"
              target="_blank"
              scale="sm"
              endIcon={<ArrowForwardIcon color="backgroundAlt" />}
            >
              {buyCakeLabel}
            </Button>
          </Flex>
        </StyledToolsContainer>
      </Flex>  */}
    </StyledFooter>
  );
};

export default MenuItem;
