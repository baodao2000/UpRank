import { Text, Button, Flex, Heading } from '@pancakeswap/uikit'
import styled from 'styled-components'
import images from 'configs/images'
import CardBig from './components/CardBig'

const Wrapper = styled.div`
  /* background: url(${images.bgdao}) no-repeat;
  background-size: cover; */
`

const Container = styled.div`
  width: 100%;
  max-width: 1554px;
  padding: 0 20px;
  margin: 55px auto 0 auto;
  display: flex;
  align-items: center;
`

const ItemLeft = styled.div`
  max-width: 855px;
  width: 100%;
`

const DaoHeading = styled(Heading)`
  text-align: center;
  font-weight: 700;
  font-size: 32px;
  line-height: 60px;
  text-align: center;
  letter-spacing: 0.001em;
  color: #f9f9f9;
  margin-bottom: 30px;
`

const ItemRight = styled.div``

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`

const ButtonSwitch = styled.div``

const GroupCard = styled.div``

const CardItem = styled.div``
const Dao = () => {
  return (
    <Wrapper>
      <Container>
        <ItemLeft>
          <DaoHeading>Success/ Fail</DaoHeading>
          <CardBig />
        </ItemLeft>
        <ItemRight>
          <ButtonGroup>
            <ButtonSwitch></ButtonSwitch>
          </ButtonGroup>

          <GroupCard>
            <CardItem />
          </GroupCard>
        </ItemRight>
      </Container>
    </Wrapper>
  )
}

export default Dao
