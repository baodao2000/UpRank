import styled from 'styled-components'
import { Heading, Card } from '@pancakeswap/uikit'
import images from 'configs/images'

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
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
  width: 386px;
  height: auto;
  border-radius: 24px;
  border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
  background: var(--white-white-6, rgba(255, 255, 255, 0.06));
  backdrop-filter: blur(5.5px);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  img {
    width: 166px;
    height: 200px;
    margin-bottom: 24px;
  }
`

const WrapperImage = styled.div`
  text-align: center;
`

const StyledTitleCard = styled(Heading)`
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 38px;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 16px;
`

const DescCard = styled.p`
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  color: rgba(173, 171, 178, 1);
`

const Transparency = () => {
  const data = [
    {
      image: './images/V3/feature01.png',
      title: 'User are in full control',
      description:
        'Users have authority over their money, allowing them to deal safely without the need for confirmation from a third party.',
    },
    {
      image: './images/V3/feature02.png',
      title: 'DAO mechanism applied',

      description: 'Using the DAO mechanism to vote on the monthly profit',
    },
    {
      image: './images/V3/feature03.png',
      title: 'Audited by Certik',
      description:
        'TrendyDefi is audited by CertiK, Audits Platform for Industry-Leading Security. The Dev team is only permitted to adjust the interest rate depending on user vote results.',
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
