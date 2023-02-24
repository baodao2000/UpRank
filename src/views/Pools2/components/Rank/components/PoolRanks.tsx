import styled from 'styled-components'
import { Heading, Flex, Text, Card, Button } from '@pancakeswap/uikit'

const ListPoolRanks = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  flex-wrap: wrap;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
`

export const ImageRank = styled.img`
  @media screen and (min-width: 1024px) {
    width: 80px;
  }
  @media (max-width: 1023px) {
    width: 70px;
  }
`

const CardPoolRanks = styled(Card)`
  width: 345px;
  height: auto;
  background: linear-gradient(153.15deg, #391e67 8.57%, #c4cff6 100%);
  box-shadow: 6px 10px 25px rgba(0, 0, 0, 0.1), inset 0px 4px 16px rgba(255, 233, 190, 0.63);
  border-radius: 20px;
  padding: 20px;
`

const CardHead = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  margin-bottom: 16px;
`

const HeadLeft = styled.div``

const HeadRight = styled.div``

const TitleHeadRight = styled(Heading)`
  font-weight: 700;
  font-size: 32px;
  line-height: 120%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: inherit;
  @media (max-width: 739px) {
    font-size: 22px;
  }
`

const MinMaxPrice = styled.div`
  display: flex;
  justify-content: space-between;
  color: inherit;
`

const MinMaxItem = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: inherit;
`

const CardBody = styled.div``

const ListInfoCard = styled.div``

const ItemInfoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const Label = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: #e6e6e6;

  @media (max-width: 739px) {
    font-size: 14px;
  }
`

const Value = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: #e6e6e6;

  @media (max-width: 739px) {
    font-size: 14px;
  }
`

const BorderCard = styled.div`
  border: 1px solid #595959;
  margin-top: 10px;
  margin-bottom: 15px;
`

const StyledButtonRank = styled(Button)`
  width: 143px;
  height: 40px;
  background: linear-gradient(
    178.36deg,
    #5c4a8a 1.4%,
    #d2cbef 1.41%,
    rgba(144, 126, 222, 0.62) 26.34%,
    #7b6fef 71.12%,
    #3c59f2 109.1%
  );
  box-shadow: 4px 4px 25px rgba(227, 227, 227, 0.25), 0px 4px 8px rgba(0, 0, 0, 0.25),
    inset 0px 4px 4px rgba(236, 236, 236, 0.25);
  border-radius: 22.5px;
`

const PoolRanks = ({ data }) => {
  const getColor = (title) => {
    switch (title) {
      case 'Silver':
        return '#e3e4ea'
      case 'Gold':
        return '#FBD397'
      case 'Titanium':
        return '#70b1cc'
      case 'Platinum':
        return '#d2d4dd'
      case 'Diamond':
        return '#85FCF5'
      default:
        return '#ffffff99'
    }
  }
  return (
    <ListPoolRanks>
      {data.map((item, index) => (
        <CardPoolRanks key={index}>
          <CardHead>
            <HeadLeft>
              <ImageRank src={item.image} alt="" />
            </HeadLeft>
            <HeadRight style={{ color: getColor(item.title) }}>
              <TitleHeadRight>{item.title}</TitleHeadRight>
              <progress
                className="file"
                value={item.process}
                max={item.max}
                style={{ margin: '4px 0', accentColor: getColor(item.title) }}
              />
              <MinMaxPrice>
                <MinMaxItem>{item.min}$</MinMaxItem>
                <MinMaxItem>{item.max}$</MinMaxItem>
              </MinMaxPrice>
            </HeadRight>
          </CardHead>
          <CardBody>
            <ItemInfoCard>
              <Label>Total:</Label>
              <Value>{item.total}$</Value>
            </ItemInfoCard>
            <ItemInfoCard>
              <Label>Current Reward:</Label>
              <Value>{item.currentReward}%</Value>
            </ItemInfoCard>
            <ItemInfoCard>
              <Label>Member:</Label>
              <Value>{item.member}</Value>
            </ItemInfoCard>
            <BorderCard />
            <ItemInfoCard>
              <Label>Your reward:</Label>
              <Value>{item.total}$</Value>
            </ItemInfoCard>
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <StyledButtonRank>Claim</StyledButtonRank>
            </div>
          </CardBody>
        </CardPoolRanks>
      ))}
    </ListPoolRanks>
  )
}

export default PoolRanks
