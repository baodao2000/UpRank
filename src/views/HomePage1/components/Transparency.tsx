import styled from 'styled-components'
import { Heading, Card } from '@pancakeswap/uikit'
import images from 'configs/images'

const Wrapper = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  padding-bottom: 50px;
  .block {
    margin-top: 120px;
    @media screen and (max-width: 1024px) {
      margin-top: 100px;
    }
    @media screen and (max-width: 820px) {
      margin-top: 80px;
    }
    @media screen and (max-width: 414px) {
      margin-top: 60px;
    }
  }
`

const Title = styled(Heading)`
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.001em;
  color: #00f0e1;
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 40px;
    line-height: 46px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 48px;
    line-height: 60px;
  }
`

const ListTransparency = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 20px;
  row-gap: 20px;
`

const CardTransparency = styled.div`
  width: 358px;
  height: auto;
  background: linear-gradient(160.75deg, #00f0e1 -56.08%, #a6e5e1 121.17%);
  border: 1px solid #000000;
  box-shadow: 6px 10px 25px rgba(0, 0, 0, 0.1), inset 0px 4px 16px rgba(238, 190, 255, 0.63);
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 318px;
  }
`

const WrapperImage = styled.div`
  text-align: center;
`

const StyledTitleCard = styled(Heading)`
  font-weight: 700;
  font-size: 18px;
  line-height: 100%;
  color: #02736c;
  margin: 16px 0;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 24px;
    line-height: 120%;
    margin: 20px 0;
  }
`

const DescCard = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.001em;
  color: #4f4f4f;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 18px;
    line-height: 20px;
  }
`

const Transparency = () => {
  const data = [
    {
      image: images.trans1,
      title: 'DAO mechanism applied',
      description: 'Using the DAO mechanism to vote on the monthly profit',
    },
    {
      image: images.trans2,
      title: 'User are in full control',
      description: 'Using the DAO mechanism to vote on the monthly profit',
    },
    {
      image: images.trans3,
      title: 'User are in full control',
      description: 'Using the DAO mechanism to vote on the monthly profit',
    },
  ]
  return (
    <Wrapper className="block">
      <Title>Transparency & Security</Title>
      <ListTransparency>
        {data.map((item, index) => (
          <CardTransparency key={index}>
            <WrapperImage>
              <img src={item.image} alt="" />
            </WrapperImage>
            <StyledTitleCard>{item.title}</StyledTitleCard>
            <DescCard>{item.description}</DescCard>
          </CardTransparency>
        ))}
      </ListTransparency>
    </Wrapper>
  )
}

export default Transparency
