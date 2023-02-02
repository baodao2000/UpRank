import styled from 'styled-components'
import { Text, Button, Flex, Heading } from '@pancakeswap/uikit'
import images from 'configs/images'

const Wrapper = styled.div`
  background: linear-gradient(146.96deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(63.67deg, #7b3afd 11.76%, #5700e6 71.88%);
  border: 1px solid #000000;
  box-shadow: 6px 10px 25px rgba(0, 0, 0, 0.1), inset 0px 4px 16px rgba(238, 190, 255, 0.63);
  border-radius: 20px;
  padding: 40px 77px;
  min-height: 473px;
`

const StyledHeadingCard = styled(Heading)`
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 60px;
  text-align: center;
  letter-spacing: 0.001em;
  color: #ffffff;
`

const InfoCardBig = styled.div`
  margin: 100px 0;
  display: flex;
  justify-content: space-between;
`

const InfoLeft = styled.div``

const InfoRight = styled.div``

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const LabelItem = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  display: flex;
  color: #ffffff;
  margin: 0 10px;
`

const ValueItem = styled.span`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  color: #ffffff;
`

const GroupButtonVote = styled.div`
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const StyledButtonVote = styled(Button)`
  background: #ffffff;
  border: 0.5px solid rgba(88, 108, 158, 0.04);
  border-radius: 20px;
  color: #7a42f1;
  min-width: 141px;
  max-height: 41px;
`

const CardBig = () => {
  const dataleft = [
    {
      label: 'Start date:',
      value: '09/07/2022',
    },
    {
      label: 'Minimum votes:',
      value: '5000',
    },
    {
      label: 'Voting process:',
      value: '50%',
    },
  ]
  const dataright = [
    {
      label: 'End date:',
      value: '09/07/2022',
    },
    {
      label: 'Total votes:',
      value: '10000',
    },
  ]
  return (
    <Wrapper>
      <StyledHeadingCard>DAO Tittle</StyledHeadingCard>
      <InfoCardBig>
        <InfoLeft>
          {dataleft.map((item) => (
            <InfoItem key={item.label}>
              <img src={images.star} alt="" />
              <LabelItem>{item.label}</LabelItem>
              <ValueItem>{item.value}</ValueItem>
            </InfoItem>
          ))}
        </InfoLeft>
        <InfoRight>
          {dataright.map((item) => (
            <InfoItem key={item.label}>
              <img src={images.star} alt="" />
              <LabelItem>{item.label}</LabelItem>
              <ValueItem>{item.value}</ValueItem>
            </InfoItem>
          ))}
        </InfoRight>
      </InfoCardBig>
      <GroupButtonVote>
        <StyledButtonVote>Vote</StyledButtonVote>
        <StyledButtonVote>Unvote</StyledButtonVote>
      </GroupButtonVote>
    </Wrapper>
  )
}

export default CardBig
