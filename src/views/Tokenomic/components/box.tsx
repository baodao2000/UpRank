import { Text } from '@pancakeswap/uikit'
import styled from 'styled-components'

const PoolText = styled.div`
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: 38px;
  background: var(--primary-primary-gradient-2, linear-gradient(180deg, #7b3fe4 0%, #a726c1 100%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 575px) {
    font-size: 24px;
  }
`

const PoolContent = styled(Text)`
  color: var(--greyscale-grey-scale-text-seconday, #adabb2);

  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  @media screen and (max-width: 575px) {
    width: 260px;
    font-size: 16px;
    line-height: 24px;
  }
`
const Container = styled.div`
  display: flex;
  margin-top: 80px;
  flex-direction: column;
  gap: 48px;
`

const Card = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  border-radius: 16px;
  background: var(--greyscale-grayscale-3, #141217);
  box-shadow: 0px 64px 64px -48px rgba(15, 15, 15, 0.1);
`
const BoxContain = styled.div`
  width: 210px;
  display: flex;
  padding: 16px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex: 1 0 0;
  border-radius: 10px;
  border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
  backdrop-filter: blur(6px);
  @media screen and (max-width: 575px) {
    width: 100px;
  }
`
const BoxContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-top: 24px;
  flex-wrap: wrap;
`
const BoxText = styled(Text)`
  color: var(--greyscale-grey-scale-text-seconday, #adabb2);

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`
const BoxTextContent = styled(Text)`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
`
const dataPool = [
  {
    title: 'Starter',
    label: '1',
    background: 'var(--black-black-20, rgba(0, 0, 0, 0.20))',
    text: '#8544F5',
    border: '1px solid var(--white-white-12, rgba(255, 255, 255, 0.12))',
  },
  {
    title: 'Standard',
    label: '+1.25',
    background: 'var(--white-white-6, rgba(255, 255, 255, 0.06))',
    text: '#8544F5',
    border: '1px solid var(--white-white-12, rgba(255, 255, 255, 0.12))',
  },
  {
    title: 'Pro',
    label: '+1.5',
    background: 'var(--white-white-6, rgba(255, 255, 255, 0.06))',
    text: '#8544F5',
    border: '1px solid var(--white-white-12, rgba(255, 255, 255, 0.12))',
  },
  {
    title: 'Advance',
    label: '+1.75',
    background: 'var(--white-white-6, rgba(255, 255, 255, 0.06))',
    text: '#8544F5',
    border: '1px solid var(--primary-primary-2, rgba(117, 60, 216, 0.80))',
  },
  {
    title: 'Premium',
    label: '+2',
    background: 'var(--primary-primary-2, rgba(117, 60, 216, 0.80))',
    text: '#fff',
    border: '3px solid var(--primary-high-light, #B210FF)',
  },
]
const dataRank = [
  {
    title: 'Silver',
    label: 'x0.5',
    background: 'var(--black-black-20, rgba(0, 0, 0, 0.20))',
    text: '#8544F5',
    border: '1px solid var(--white-white-12, rgba(255, 255, 255, 0.12))',
  },
  {
    title: 'Gold',
    label: 'x0.75',
    background: 'var(--white-white-6, rgba(255, 255, 255, 0.06))',
    text: '#8544F5',
    border: '1px solid var(--white-white-12, rgba(255, 255, 255, 0.12))',
  },
  {
    title: 'Titanium',
    label: 'x 1.0',
    background: 'var(--white-white-6, rgba(255, 255, 255, 0.06))',
    text: '#8544F5',
    border: '1px solid var(--white-white-12, rgba(255, 255, 255, 0.12))',
  },
  {
    title: 'Platinum',
    label: 'x1.25',
    background: 'var(--white-white-6, rgba(255, 255, 255, 0.06))',
    text: '#8544F5',
    border: '1px solid var(--primary-primary-2, rgba(117, 60, 216, 0.80))',
  },
  {
    title: 'Diamond',
    label: 'x1.5',
    background: 'var(--primary-primary-2, rgba(117, 60, 216, 0.80))',
    text: '#fff',
    border: '3px solid var(--primary-high-light, #B210FF)',
  },
]

function Box() {
  return (
    <Container>
      <Card>
        <PoolText>Mining Speed</PoolText>

        <PoolContent>The mining speed of the TREND token depends on the pool you choose to join.</PoolContent>
        <BoxContent>
          {dataPool.map((i, index) => (
            <BoxContain style={{ background: dataPool[index].background, border: dataPool[index].border }}>
              <BoxText>{i.title}</BoxText>
              <BoxTextContent style={{ color: dataPool[index].text }}>{i.label}</BoxTextContent>
            </BoxContain>
          ))}
        </BoxContent>
      </Card>
      <Card>
        <PoolText>Rank Instruction</PoolText>

        <PoolContent>
          To speed up the minting process and acquire tokens more quickly, increase your Rank level.
        </PoolContent>
        <BoxContent>
          {dataRank.map((i, index) => (
            <BoxContain style={{ background: dataPool[index].background, border: dataPool[index].border }}>
              <BoxText>{i.title}</BoxText>
              <BoxTextContent style={{ color: dataPool[index].text }}>{i.label}</BoxTextContent>
            </BoxContain>
          ))}
        </BoxContent>
      </Card>
    </Container>
  )
}

export default Box
