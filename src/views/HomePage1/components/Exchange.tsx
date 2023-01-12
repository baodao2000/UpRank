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

const Title = styled(Heading)`
  text-align: center;
  font-weight: 800;
  font-size: 48px;
  line-height: 58px;
  margin-bottom: 24px;
  @media screen and (max-width: 500px) {
    font-size: 40px;
    line-height: 40px;
    margin-bottom: 15px;
    margin-left: 5%;
    margin-right: 5%;
  }
`
const StyledText = styled.p`
  color: #8145ff;
  display: inline;
`

const TitleM = styled(Text)`
  text-align: center;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  margin-bottom: 5%;
  margin-left: 20%;
  margin-right: 20%;
  @media screen and (max-width: 845px) {
    margin-left: 10%;
    margin-right: 10%;
    font-size: 24px;
    line-height: 28px;
  }
  @media screen and (max-width: 500px) {
    margin-left: 2%;
    margin-right: 2%;
    font-size: 24px;
    line-height: 28px;
  }
`
const Wrapper = styled.div`
  margin-top: 10%;
  @media screen and (max-width: 820px) {
    padding: 0 7%;
  }
  @media screen and (max-width: 500px) {
    margin-top: 15%;
    padding: 0 2%;
  }
`
const Table = styled.div`
  padding: 40px 84px;
  display: flex;
  box-shadow: red;
  border-radius: 8px;
  background: black;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`
const ExchangePart = styled.div`
  border-right: 1px solid;
  border-color: red;
  flex-basis: calc(100% / 3);
  padding: 20px 2%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  justify-content: space-between;
  background: black;

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
  margin-bottom: 26px;
  .ant-select {
    .ant-select-selector {
      height: 60px;
      border-radius: 10px;
      background: #d9d9d9;
    }
  }
`
const SelectCustom = styled(Select)`
  width: 100%;
  .nameCry {
    padding-top: 2%;
    @media (min-width: 500px) and (max-width: 820px) {
      padding-top: 1%;
    }
  }
  .depositNumb {
    margin-left: 20px;
    padding-top: 1%;
    @media (min-width: 500px) and (max-width: 820px) {
      padding-top: 0.5%;
      // text-align: left;
    }
    @media screen and (max-width: 500px) {
      text-align: left;
    }
  }
`
const InputContainer = styled.div`
  @media screen and (max-width: 820px) {
    margin-top: 4%;
  }
  .ant-input-number {
    background: #d9d9d9;
    width: 100%;
    border-radius: 10px;

    .ant-input-number-input-wrap {
      width: 80%;
      height: 40px;
      border-radius: 10px;
      font-size: 20px;
      margin-top: 10px;
    }
  }
`
const TextCustom = styled(Text)``

const ChartPart = styled.div`
  height: 100%;
  flex-basis: calc(100% * 2 / 3);
  padding: 20px 2%;
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
    color: #00ffc2;
  }
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  align-items: center;
  justify-content: center;
  width: 20%;
  img {
    width: 80%;
  }

  @media screen and (max-width: 415px) {
    align-items: center;
    width: 30%;
    img {
      width: auto;
    }
  }
`

const ChartInfo = styled.div`
  @media screen and (max-width: 820px) {
    text-align: center;
  }
`

const Chart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 5%;
  @media screen and (max-width: 415px) {
    gap: 0;
  }
`

const ButtonCustom = styled(Button)`
  border: 1px solid #d2d2d2;
  color: #ffffff;
  background: #0a0d10;
  margin-top: 12px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &.active {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
  @media screen and (max-width: 500px) {
    font-size: 15px !important;
    width: 70%;
    height: 40px;
    padding: 0;
  }
`

const TextName = styled(Text)`
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  margin-bottom: 6px;
  color: #9665ff;

  @media screen and (max-width: 820px) {
    font-size: 20px;
  }
`

const ChartBase = styled.div`
  width: 42px;
  height: 3px;

  background: linear-gradient(180deg, #8145ff 0%, #00fec1 100%);
  border-radius: 8px;
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

const { Option } = Select

const Exchange = (props) => {
  const [count, setCount] = useState(3)
  const [deposit, setDeposit] = useState(1000)
  const [period, setPeriod] = useState({ old: 2, current: 2 })
  const [percen, setPercen] = useState(0.075)
  const [price, setPrice] = useState(1)
  // const [symbol, setSymbol] = useState()
  let Date = moment().format('MMMM Do YYYY')

  const handleChange = (value) => {
    // setPercen(value);
    // console.log(value);
  }

  const onChange = (value: number) => {
    // console.log(value);
    setDeposit(value)
    checkPercen(value)
  }

  const checkPercen = (input) => {
    switch (true) {
      case input >= 100 && input <= 1000: {
        setPercen(0.075)
        break
      }
      case input > 1000 && input <= 5000: {
        setPercen(0.085)
        break
      }
      case input > 5000 && input <= 10000: {
        setPercen(0.098)
        break
      }
      case input > 10000 && input <= 50000: {
        setPercen(0.112)
        break
      }
      case input > 50000 && input <= 100000: {
        setPercen(0.125)
        break
      }
      case input > 100000: {
        setPercen(0.138)
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
    <Wrapper data-aos="fade-up">
      <Title color="mainColor">
        Calculate your crypto <StyledText>earnings</StyledText>
      </Title>
      {/* <TitleM color="mainColor">
        Enter an amount, pick a cryptocurrency, and select a time frame to find out how much interest you can earn.
      </TitleM> */}
      <Table>
        <ExchangePart>
          <div>
            <CryptoSelect>
              <TextName color="mainColor" style={{ color: '' }}>
                Crypto
              </TextName>
              <SelectCustom
                value={{
                  value: percen,
                  label: (
                    <Row>
                      <Col className="nameCry">
                        <img src={images.iconMatic} />
                      </Col>
                      <Col className="depositNumb">
                        <p>
                          <b>POLYGON</b>
                        </p>
                        <p className="number" style={{ marginTop: '-10px' }}>
                          {' '}
                          {numeral(percen * 100).format('0,0.0')}% (Monthly)
                        </p>
                      </Col>
                    </Row>
                  ),
                }}
                onChange={handleChange}
              >
                {Items.map((item) => (
                  <Option key={item.label} value={item.value}>
                    <div>
                      <Row>
                        <Col style={{ paddingTop: '1%' }}>
                          <img src={`${item.img}`} />
                        </Col>
                        <Col style={{ marginLeft: '20px' }}>
                          <p>
                            <b>{item.label}</b>
                          </p>
                          <span>{numeral(percen * 100).format('0,0.0')}% (Monthly)</span>
                        </Col>
                      </Row>
                    </div>
                  </Option>
                ))}
              </SelectCustom>
            </CryptoSelect>

            <InputContainer>
              <TextName color="mainColor">Deposit Amount</TextName>
              <InputNumber
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                min={0}
                defaultValue={deposit}
                onChange={onChange}
              />
            </InputContainer>
            <Text style={{ color: '#9665FF' }}>
              approx. {numeral(deposit * price).format('0,0.00')} {` `} MATIC/USD
            </Text>
          </div>
          <TextCustom className="onPC" color="mainColor">
            Annual Percentage Yield (APY) as of {Date}. APY may change at any time before or after account is opened.
            This calculator is for illustrative purposes only and may not apply to your individual circumstances.
            Calculated values assume that principal and interest remain on deposit and are rounded to the nearest
            dollar. All APY’s are subject to change.
          </TextCustom>
        </ExchangePart>
        <ChartPart>
          <ChartInfo>
            <img src={images.chartIcon} />
            <Text
              color="mainColor"
              fontSize={28}
              fontWeight={700}
              style={{ display: 'inline', marginLeft: 10, color: '#FFFFFF' }}
            >
              Projected {period.current} years interest
            </Text>
            <HeadingCustom color="mainColor">
              <CountUp
                separator=","
                delay={3}
                duration={1}
                end={Number((deposit * (1 + percen * 12 * period.current)).toFixed(2))}
                prefix="$"
                decimals={2}
                className="style-countup"
              >
                {numeral(deposit * (1 + percen * 12 * period.current)).format('0,0.00')}
              </CountUp>
            </HeadingCustom>
            <Text color="mainColor" style={{ color: '#CED8E1' }}>
              Calculated based on the current MATIC/USD price of ${numeral(price).format('0,0.00')}
            </Text>
          </ChartInfo>
          <Chart>
            <Column>
              <img src={images.chart1up} alt="" />
              <ButtonCustom
                className={period.current === 1 ? 'active' : ''}
                variant="secondary"
                onClick={() => {
                  setPeriod((past) => ({ old: past.current, current: 1 }))
                }}
              >
                1 year
              </ButtonCustom>
            </Column>
            <Column>
              {period.current >= 2 ? (
                <img src={images.chart2up} />
              ) : period.current < period.old && !(period.old < 1) ? (
                <img src={images.chart2down} alt="" />
              ) : (
                // <img src={images.colbase} alt="" />
                <ChartBase />
              )}
              <ButtonCustom
                className={period.current === 2 ? 'active' : ''}
                variant="secondary"
                onClick={() => {
                  setPeriod((past) => ({ old: past.current, current: 2 }))
                }}
              >
                2 year
              </ButtonCustom>
            </Column>
            <Column>
              {period.current >= 3 ? (
                <img src={images.chart3up} />
              ) : period.current < period.old && !(period.old < 3) ? (
                <img src={images.chart3down} alt="" />
              ) : (
                // <img src={images.colbase} alt="" />
                <ChartBase />
              )}
              <ButtonCustom
                className={period.current === 3 ? 'active' : ''}
                variant="secondary"
                onClick={() => {
                  setPeriod((past) => ({ old: past.current, current: 3 }))
                }}
              >
                3 year
              </ButtonCustom>
            </Column>
            <Column>
              {period.current >= 4 ? (
                <img src={images.chart4up} />
              ) : period.current < period.old && !(period.old < 4) ? (
                <img src={images.chart4down} alt="" />
              ) : (
                // <img src={images.colbase} alt="" />
                <ChartBase />
              )}
              <ButtonCustom
                className={period.current === 4 ? 'active' : ''}
                variant="secondary"
                onClick={() => {
                  setPeriod((past) => ({ old: past.current, current: 4 }))
                }}
              >
                4 year
              </ButtonCustom>
            </Column>
          </Chart>
          <br />
          <TextCustom className="notOnPC" color="mainColor">
            Annual Percentage Yield (APY) as of {Date}. APY may change at any time before or after account is opened.
            This calculator is for illustrative purposes only and may not apply to your individual circumstances.
            Calculated values assume that principal and interest remain on deposit and are rounded to the nearest
            dollar. All APY’s are subject to change.
          </TextCustom>
        </ChartPart>
      </Table>
    </Wrapper>
  )
}

export default Exchange
