import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Dropdown, Text, Input, Card, CardBody, Button, Heading, Toggle, Flex } from '@pancakeswap/uikit'
import { Select, InputNumber, Col, Row } from 'antd'
import 'antd/dist/antd.css'
import images from 'configs/images'
import moment from 'moment'
import numeral from 'numeral'
import CountUp from 'react-countup'

import AOS from 'aos'
import 'aos/dist/aos.css'
import Image from 'next/image'

const Title = styled(Heading)`
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 60px;
  margin-bottom: 20px;
  position: relative;

  @media (max-width: 1024px) {
    font-size: 42px;
    line-height: 42px;
  }
  @media (max-width: 575px) {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }
`
const StyledText = styled.p`
  font-weight: 700;
  color: #8145ff;
  display: inline;
  .hovreTooltip {
  }
  .hovreTooltip:hover {
    .tooltip {
      position: absolute;
      right: -10%;
      top: 50%;
      display: block;
      width: 372px;
      z-index: 10001;
      height: 160px;
      border-radius: 6px;
      background: black;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      padding: 10px;
      color: #fff;
    }
  }
  .tooltip {
    display: none;
  }
`

const TitleM = styled(Text)`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  color: rgba(173, 171, 178, 1);
  margin-top: 6px;
  margin-bottom: 30px;
`

const Wrapper = styled.div`
  * {
    font-family: Inter, sans-serif;
  }
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 90px;
  .ant-input-number-input {
    font-family: 'Helvetica Compressed';
    font-weight: 700;
  }
  @media (max-width: 796px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 575px) {
    margin-top: 40px;
  }
  

  
    
  }
`
const Table = styled.div`
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  max-width: 553px;
  margin-top: 60px;
  @media (max-width: 796px) {
    margin-top: 0;
    max-width: 100%;
  }
`
const ExchangePart = styled.div`
  flex-basis: calc(100% / 3);
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background: #0a0d10;

  @media screen and (max-width: 820px) {
    .onPC {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    text-align: center;
  }
`
const CryptoSelect = styled.div`
  margin-bottom: 16px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #141217;
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.49);
`
const SelectCustom = styled(Select)`
  width: 100%;
  position: relative;

  border-radius: 15px !important;
  background: rgba(20, 18, 23, 1) !important;
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.49) inset !important;
  border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12)) !important;
  padding: 16px 13px !important;
  .ant-select-selector {
    height: 49px !important;
    background: rgba(20, 18, 23, 1) !important;

    border: none !important;
  }
  .nameCry {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .depositNumb {
    height: 100%;
    margin-left: 56px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Helvetica, sans-serif';

    .number {
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      position: absolute;
      bottom: -2px;
      color: rgba(226, 225, 229, 1);
    }
  }
`
const InputContainer = styled.div`
  position: relative;
  border-radius: 16px;
  border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
  background: var(--greyscale-grayscale-3, #141217);
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.49) inset;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 820px) {
    margin-top: 4%;
  }
  .ant-input-number {
    background: #141217;
    width: 100%;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    border: none;
    color: rgba(226, 225, 229, 1);

    .ant-input-number-input-wrap {
      width: 80%;
      height: 40px;
      border-radius: 10px;
      font-size: 20px;
      margin-top: 10px;
    }
  }
`

const ChartPart = styled.div`
  height: 100%;
  flex-basis: calc(100% * 2 / 3);
  padding: 40px 0;
  border-radius: 24px;
  gap: 24px;
  background: var(--greyscale-blue, #150a27);
  .notOnPC {
    display: none;
  }
  @media screen and (max-width: 820px) {
    .notOnPC {
      margin-top: 5%;
      display: block;
    }
  }
`
const HeadingCustom = styled(Heading)`
  font-weight: 700;
  font-size: 48px;
  line-height: 59px;

  .style-countup {
    background: var(--primary-primary-gradient-2, linear-gradient(180deg, #7b3fe4 0%, #a726c1 100%));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 60px;
    font-style: normal;
    font-weight: 700;
    line-height: 72px;
    @media (max-width: 575px) {
      font-size: 36px;
      line-height: 44px;
    }
  }
  @media (max-width: 575px) {
    font-size: 36px;
    line-height: 44px;
  }
`

const ChartInfo = styled.div`
  display: flex;
  max-width: 499px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 56px;
  padding: 0 40px;
  @media (max-width: 575px) {
    gap: 24px;
  }
`

const WrapperInfoText = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  .price {
    color: #8544f5;
  }
`

const Chart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  transform: translateY(-14%);
  margin-top: 34px;
`

const StyledTextProject = styled(Text)`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  @media (max-width: 575px) {
    font-size: 20px;
    line-height: 30px;
  }
`
const ContentLeft = styled.div`
  margin-top: 30px;
  width: 60%;
  @media (max-width: 796px) {
    width: 100%;
  }
`

const ContentRight = styled.div`
  width: 40%;
  min-width: 360px;
  @media (max-width: 575px) {
    min-width: 100%;
  }
`
const ImgCoin = styled.img`
  width: 206px;
  height: 206px;
  @media (max-width: 575px) {
    width: 100px;
    height: 100px;
  }
`

const Items = [
  // {
  //   value: '13.81',
  //   label: 'ETHW',
  //   img: images.iconEthw,
  // },
  {
    value: 7.5,
    label: 'POLYGON',
    img: images.iconMatic,
  },
]

const TextRight = styled(Text)`
  position: absolute;
  right: 5%;
  color: #9665ff;
  text-align: start;
  top: 40%;
  @media (max-width: 575px) {
    font-size: 12px;
    line-height: 18px;
  }
  @media (max-width: 375px) {
    display: flex;
    flex-direction: column;
  }
`
const { Option } = Select

const Exchange = (props) => {
  const [count, setCount] = useState(3)
  const [deposit, setDeposit] = useState(1000)
  const [period, setPeriod] = useState({ old: 2, current: 2 })
  const [percen, setPercen] = useState(0.07)
  const [price, setPrice] = useState(1)
  // const [symbol, setSymbol] = useState()
  let Date = moment().format('MMMM Do YYYY')

  const handleChange = (value) => {
    // setPercen(value);
    // console.log(value);
  }

  const onChange = (value: number) => {
    setDeposit(value)
    checkPercen(value)
  }

  const checkPercen = (input) => {
    switch (true) {
      case input >= 100 && input <= 1000: {
        setPercen(0.07)
        break
      }
      case input > 1000 && input <= 5000: {
        setPercen(0.075)
        break
      }
      case input > 5000 && input <= 10000: {
        setPercen(0.08)
        break
      }
      case input > 10000 && input <= 50000: {
        setPercen(0.085)
        break
      }
      case input > 50000 && input <= 100000: {
        setPercen(0.095)
        break
      }
      case input > 100000: {
        setPercen(0.105)
        break
      }
      default:
    }
  }

  const getExchange = async () => {
    const exchange = await fetch('https://api.binance.com/api/v1/ticker/price?symbol=MATICBUSD')
    const getData = await exchange.json()
    setPrice(getData.price)
    // setSymbol(getData.symbol)
  }

  useEffect(() => {
    getExchange()
    AOS.init({
      duration: 2000,
    })
    AOS.refresh()
  }, [])

  return (
    <Wrapper className="block" data-aos="fade-up">
      <ContentLeft>
        <Table>
          <Title color="mainColor" style={{ position: 'relative' }}>
            Calculate your crypto{' '}
            <StyledText>
              earnings
              <span className="hovreTooltip">
                <Image src="/images/info.svg" width={20} height={20} alt="" />
                <div className="tooltip">
                  Annual Percentage Yield (APY) as of the July 16th 2023. The APY may vary before or after the account
                  is created. This calculator is solely for illustration purposes and may not apply to our specific
                  situation. Calculated figures are rounded to the closest dollar and assume that principle and interest
                  stay on deposit. All interest rates are subject to change.
                </div>
              </span>{' '}
            </StyledText>
          </Title>
          <TitleM>
            Enter an amount, pick a cryptocurrency, and select a time frame to find out how much interest you can earn.
          </TitleM>
          <ExchangePart>
            <div>
              <CryptoSelect>
                <SelectCustom
                  bordered={false}
                  value={{
                    value: percen,
                    label: (
                      <Row>
                        <Col className="nameCry">
                          <img width="32px" height="32px" src={images.iconMatic} alt="" />
                        </Col>
                        <Col className="depositNumb">
                          <span>
                            <b style={{ fontSize: 20, color: 'rgba(226, 225, 229, 1)' }}>POLYGON</b>
                          </span>
                          <p className="number"> {numeral(percen * 100).format('0,0.0')}% (Monthly)</p>
                        </Col>
                      </Row>
                    ),
                  }}
                  onChange={handleChange}
                >
                  {Items.map((item) => (
                    <Option key={item.label} value={item.value}>
                      <div
                        style={{
                          borderRadius: '15px',
                        }}
                      >
                        <Row>
                          <Col style={{ paddingTop: '1%' }}>
                            <img src={`${item.img}`} alt="" />
                          </Col>
                          <Col style={{ marginLeft: '20px', fontWeight: 700 }}>
                            <p>
                              <b>{item.label}</b>
                            </p>
                            <span style={{ fontFamily: 'Helvetica, sans-serif' }}>
                              {numeral(percen * 100).format('0,0.0')}% (Monthly)
                            </span>
                          </Col>
                        </Row>
                      </div>
                    </Option>
                  ))}
                </SelectCustom>
              </CryptoSelect>

              <InputContainer>
                <img width="32px" height="32px" src="./images/V3/coin.png" alt="" />
                <InputNumber
                  bordered={false}
                  controls={false}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  min={0}
                  defaultValue={deposit}
                  onChange={onChange}
                />
                <TextRight>
                  approx. {numeral(deposit / price).format('0,0.00')} {` `} MATIC
                </TextRight>
              </InputContainer>
            </div>
          </ExchangePart>
        </Table>
      </ContentLeft>
      <ContentRight>
        <ChartPart>
          <ChartInfo>
            <ImgCoin src="./images/V3/Trans.gif" alt="" />
            <WrapperInfoText>
              <StyledTextProject style={{ display: 'inline', marginLeft: 10, color: 'rgba(173, 171, 178, 1)' }}>
                Projected {period.current} years interest
              </StyledTextProject>
              <HeadingCustom>
                <CountUp
                  separator=","
                  delay={3}
                  duration={1}
                  end={Number((deposit * (percen * 12 * period.current)).toFixed(2))}
                  prefix="$"
                  decimals={2}
                  className="style-countup"
                >
                  {numeral(deposit * (percen * 12 * period.current)).format('0,0.00')}
                </CountUp>
              </HeadingCustom>
              <Text
                textAlign="center"
                style={{ color: 'rgba(173, 171, 178, 1)', fontSize: 18, fontWeight: '600', lineHeight: '24px' }}
              >
                Calculated based on the current MATIC/USD price of{' '}
                <span className="price">${numeral(price).format('0,0.00')}</span>
              </Text>
            </WrapperInfoText>
          </ChartInfo>
          <img style={{ padding: ' 0 15px' }} width="100%" src="./images/V3/Indicator.png" />
          <Chart>
            <img width="80%" height="100%" src="./images/V3/Chart2.png" />
          </Chart>
        </ChartPart>
      </ContentRight>
    </Wrapper>
  )
}

export default Exchange
