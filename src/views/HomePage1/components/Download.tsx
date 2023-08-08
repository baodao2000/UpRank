import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap/uikit'
import images from 'configs/images'

const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
  max-width: 100%;
  * {
    font-family: Inter, sans-serif;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 0;
  }
  @media only screen and (max-width: 375px) {
    margin-top: 10px;
  }
`
const StyledHeading = styled(Text)`
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 60px;
  max-width: 836px;
  text-align: center;
  margin: 20px 0;
  text-shadow: 0px 4px 20px rgba(43, 143, 241, 0.2);

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
const TextLabel = styled(Text)`
  max-width: 624px;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  color: rgba(173, 171, 178, 1);
  @media (max-width: 575px) {
    font-size: 18px;
    line-height: 28px;
  }
`
const Card = styled.div`
  display: flex;
  padding: 40px 30px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 108px;
  width: 100%;
  border-radius: 24px;
  border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
  background: var(--white-white-6, rgba(255, 255, 255, 0.06));
  margin-top: 60px;
  @media (max-width: 955px) {
    gap: 76px;
    flex-direction: column;
  }
  @media (max-width: 575px) {
    gap: 56px;
    padding: 20px 16px;
  }
`
const CardLeft = styled.div`
  @media (max-width: 955px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  @media (max-width: 575px) {
    align-items: start;
  }
`
const CardTitle = styled(Text)`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  color: rgba(252, 252, 253, 1);
  @media (max-width: 575px) {
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;
  }
`
const CardLabel = styled(Text)`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  color: rgba(103, 102, 110, 1);
  @media (max-width: 575px) {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }
`
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  gap: 24px;
  .imgA {
    display: flex;
    gap: 12px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .imgB {
    display: flex;
    gap: 25px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    @media (max-width: 575px) {
      gap: 12px;
    }
  }
`
const CardRight = styled.div`
  img {
    @media (max-width: 450px) {
      width: 100%;
      padding: 20px;
    }
  }
`
const Download = () => {
  return (
    <Wrapper>
      <img src="./images/V3/Logo.png" />
      <StyledHeading>Trust the Best & invest with Insurance</StyledHeading>
      <TextLabel>
        We&#39;ve developed a secure and reliable platform for users. The addition of property insurance products will
        heighten safety measures for investors.
      </TextLabel>
      <Card>
        <CardLeft>
          <CardTitle>Get started in seconds</CardTitle>
          <CardLabel>Download the Metamask or Trust Wallet apps, and connect your wallet to begin.</CardLabel>
          <CardContent>
            <div className="imgA">
              <div style={{ cursor: 'pointer' }} onClick={() => window.open('https://metamask.io/', '_blank')}>
                <img src="./images/V3/Metamask.svg" />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => window.open('https://trustwallet.com/', '_blank')}>
                <img src="./images/V3/TrustWallet.svg" />
              </div>
            </div>
            <div className="imgB">
              <img src="./images/V3/Googleplay.png" />
              <img src="./images/V3/Ios.png" />
              <img src="./images/V3/Appstore.png" />
            </div>
          </CardContent>
        </CardLeft>
        <CardRight>
          <img src="./images/V3/img.svg" />
        </CardRight>
      </Card>
    </Wrapper>
  )
}
export default Download
