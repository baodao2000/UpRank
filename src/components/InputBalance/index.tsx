import { Text, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import IconSow from 'components/Svg/IconSow'

const WrapperImportInput = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  background: linear-gradient(135deg, #424869 24.41%, #4a5178 81.64%);
  border-radius: 10px;
  z-index: 1;
`

const Container = styled.div`
  border-radius: 16px;
  background: linear-gradient(135deg, #105eec 0%, #061428 100%);
  box-shadow: inset 2px 2px 3px rgb(38 49 105 / 20%), inset -2px -2px 2px rgb(83 92 136 / 60%);
  border-radius: 10px;
`
const BottomInput = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: #d2d6ef;
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 10px;
`

const StyleInput = styled.input`
  color: #d2d6ef;
  width: 50%;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;

  ::placeholder {
    color: #d2d6ef;
  }
`

const TopInput = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`

const InfoInput = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`

const StyleSelect = styled.select`
  background-color: transparent;
  border: none;
  outline: none;
  color: #d2d6ef;
  font-size: 14px;
`

export default function InputBalance() {
  const data = [25, 50, 75, 100]

  return (
    <WrapperImportInput>
      <Container as="label">
        <TopInput>
          <Text fontSize={14} fontWeight={500} style={{ color: '#FFFFFF' }}>
            Input
          </Text>
          <Text fontSize={14} fontWeight={500} style={{ color: '#D2D6EF' }}>
            Balance: 0.000000
          </Text>
        </TopInput>
        <BottomInput>
          <StyleInput placeholder="0.00" />
          <InfoInput>
            <Flex justifyContent="space-between">
              <IconSow style={{ marginRight: 8 }} />
              <Text fontSize={14} fontWeight={500} style={{ color: '#D2D6EF', marginRight: 8 }}>
                SOW
              </Text>
              <StyleSelect name="import">
                {data.map((item) => (
                  <option key={item} value={item}>
                    {item}%
                  </option>
                ))}
              </StyleSelect>
            </Flex>
          </InfoInput>
        </BottomInput>
      </Container>
    </WrapperImportInput>
  )
}
