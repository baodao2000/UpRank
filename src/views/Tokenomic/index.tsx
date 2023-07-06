import { useMatchBreakpoints } from '@pancakeswap/uikit'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #9e86ff 0%, #2b0864 111.24%);
  gap: 10px;
`
const OverviewText = styled.div`
  text-align: center;
  margin-top: 70px;
  font-family: Raleway, sans-serif;
  font-size: 48px;
  font-weight: 800;
  color: #95ffec;
  text-shadow: 1px 1px 6px #95ffec;
  letter-spacing: 0.04em;
  @media screen and (max-width: 575px) {
    font-size: 30px;
  }
`
const PoolText = styled.div`
  margin-top: 300px;
  font-family: Raleway;
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  letter-spacing: 0.04em;
  @media screen and (max-width: 575px) {
    font-size: 30px;
    margin-top: 100px;
  }
  @media screen and (max-width: 900px) {
    margin-top: 100px;
  }
  @media screen and (max-width: 1440px) {
    margin-top: 200px;
  }
`
const RankText = styled.div`
  margin-top: 50px;
  font-family: Raleway;
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  letter-spacing: 0.04em;
  @media screen and (max-width: 575px) {
    font-size: 30px;
    margin-top: 100px;
  }
  @media screen and (max-width: 900px) {
    margin-top: 100px;
  }
  @media screen and (max-width: 1440px) {
    margin-top: 50px;
  }
`
const BoxContain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 350px;
  height: 70px;
  border-radius: 8px;
  padding: 24px 32px 24px 32px;
  gap: 4px;
  box-shadow: 0px 4px 12px 0px #ffffff4f inset;
  background: linear-gradient(
    89.91deg,
    rgba(147, 255, 229, 0.06) -10.22%,
    rgba(230, 255, 251, 0.215) 24.44%,
    rgba(114, 255, 237, 0.175) 58.18%,
    rgba(183, 255, 248, 0.295) 81.81%,
    rgba(87, 255, 244, 0.27) 105.99%
  );
`
const SupplyText = styled.div`
  text-align: center;
  font-family: Poppins, sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 100%;
`
const ImageOverview = styled.div`
  margin-top: 40px;
`
const GetTrendText = styled.div`
  margin-top: 100px;
  font-family: Raleway, sans-serif;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
  letter-spacing: 0.04em;
  @media screen and (max-width: 575px) {
    font-size: 25px;
    margin-top: 50px;
  }
  @media screen and (max-width: 900px) {
    margin-top: 50px;
  }
  @media screen and (max-width: 900px) {
    margin-top: 50px;
  }
  @media screen and (max-width: 1440px) {
    margin-top: 50px;
  }
`
const ContainerBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1px;
  @media screen and (max-width: 575px) {
    flex-direction: column;
  }
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
`
const BoxOne = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  border-radius: 8px;
  width: 431px;
  height: 96px;
  padding: 16px;
  margin-top: 50px;
  transform: rotate(-12.75deg) skew(-10deg);
  background: linear-gradient(
      99.62deg,
      #8f92e9 6.45%,
      rgba(190, 192, 247, 0.96) 30.76%,
      rgba(200, 202, 246, 0.673081) 42.16%,
      rgba(151, 154, 219, 0.621643) 60.38%,
      #676ad5 104.82%
    ),
    linear-gradient(
      108.29deg,
      #f5fbf2 12.78%,
      rgba(245, 251, 242, 0) 35.95%,
      rgba(245, 251, 242, 0.19) 71.1%,
      #f5fbf2 87.02%
    );

  border: 3px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(
    108.29deg,
    #f5fbf2 12.78%,
    rgba(245, 251, 242, 0) 35.95%,
    rgba(245, 251, 242, 0.19) 71.1%,
    #f5fbf2 87.02%
  );
  //   box-shadow: 5px 1px 1px 5px rgba(139, 142, 227, 1);
  //   animation: mymove 5s infinite ;
  //    transition: box-shadow 0.3s ease-in-out;

  // @keyframes mymove {
  //   50% {box-shadow: 10px 20px 30px #676ad5;}
  @media screen and (max-width: 575px) {
    transform: none;
    width: 350px;
  }
  @media screen and (max-width: 900px) {
    transform: none;
  }
  @media screen and (max-width: 1100px) {
    transform: none;
  }
`
const BoxOneContain = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ffffff4f;
  align-items: center;
  display: flex;
  border: 3px solid
    linear-gradient(
      179.96deg,
      #f5fbf2 0.04%,
      rgba(245, 251, 242, 0.13) 60.6%,
      rgba(245, 251, 242, 0) 86.72%,
      rgba(245, 251, 242, 0.35) 99.96%
    );
  justify-content: center;
  transform: rotate(-1deg);

  background: radial-gradient(
    87.25% 105.06% at 14.12% -6.25%,
    rgba(205, 207, 255, 0.6) 0%,
    rgba(136, 139, 224, 0.264) 100%
  );

  box-shadow: 0px 4px 4px 0px rgba(255, 255, 255, 0.25) inset;

  @media screen and (max-width: 575px) {
    transform: none;
  }
`
const BoxOneContainText = styled.div`
  font-family: Impact;
  font-weight: 400;
  font-size: 36px;
  line-height: 36px;
  align-items: center;
  letter-spacing: 0.04em;
  transform: rotate(-1);
  background: -webkit-linear-gradient(0deg, rgba(136, 234, 234, 0.2), rgba(136, 234, 234, 0.2)),
    linear-gradient(
      168.94deg,
      #f9ffff 26.97%,
      rgba(154, 254, 254, 0.298811) 57.93%,
      rgba(121, 254, 254, 0.23) 77.16%,
      rgba(203, 250, 250, 0.59) 94.98%
    );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const BoxOneText = styled.div`
  width: 260px;
  font-family: Poppins;
  font-weight: 600;
  font-size: 16px;
  line-height: 17.6px;
  letter-spacing: 0.04em;
`
const BoxTwo = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  border-radius: 8px;
  width: 431px;
  height: 96px;
  padding: 16px;
  margin-top: 20px;
  border: 3px solid;
  border-image-source: linear-gradient(
    1.29deg,
    #f5fbf2 12.78%,
    rgba(245, 251, 242, 0) 35.95%,
    rgba(245, 251, 242, 0.19) 71.1%,
    #f5fbf2 87.02%
  );
  background: linear-gradient(
      122.88deg,
      #8f92e9 3.11%,
      rgba(176, 178, 246, 0.710616) 16.24%,
      rgba(192, 194, 240, 0.673081) 24.11%,
      rgba(151, 154, 219, 0.621643) 43.85%,
      #676ad5 100.23%
    ),
    linear-gradient(
      108.29deg,
      #f5fbf2 12.78%,
      rgba(245, 251, 242, 0) 35.95%,
      rgba(245, 251, 242, 0.19) 71.1%,
      #f5fbf2 87.02%
    );

  border-image-slice: 1;
  // box-shadow: 5px 1px 1px 5px rgba(139, 142, 227, 1);

  //    transition: box-shadow 0.3s ease-in-out;

  //   animation: mymove 5s infinite;

  // @keyframes mymove {
  //   50% {box-shadow: 10px 20px 30px #676ad5;}
  @media screen and (max-width: 575px) {
    display: none;
  }
  @media screen and (max-width: 900px) {
    display: none;
  }
  @media screen and (max-width: 1100px) {
    display: none;
  }
`
const BoxTwoRes = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  border-radius: 8px;
  width: 431px;
  height: 96px;
  padding: 16px;
  margin-top: 20px;
  border: 3px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(
    108.29deg,
    #f5fbf2 12.78%,
    rgba(245, 251, 242, 0) 35.95%,
    rgba(245, 251, 242, 0.19) 71.1%,
    #f5fbf2 87.02%
  );
  background: linear-gradient(
      122.88deg,
      #8f92e9 3.11%,
      rgba(176, 178, 246, 0.710616) 16.24%,
      rgba(192, 194, 240, 0.673081) 24.11%,
      rgba(151, 154, 219, 0.621643) 43.85%,
      #676ad5 100.23%
    ),
    linear-gradient(
      108.29deg,
      #f5fbf2 12.78%,
      rgba(245, 251, 242, 0) 35.95%,
      rgba(245, 251, 242, 0.19) 71.1%,
      #f5fbf2 87.02%
    );

  @media screen and (max-width: 575px) {
    width: 350px;
    display: flex;
  }
  @media screen and (max-width: 1024px) {
    display: flex;
  }
  @media screen and (min-width: 1440px) {
    display: none;
  }
`
const BoxTwoContain = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ffffff4f;
  align-items: center;
  display: flex;
  justify-content: center;
  background: radial-gradient(
      87.25% 105.06% at 14.12% -6.25%,
      rgba(205, 207, 255, 0.6) 0%,
      rgba(136, 139, 224, 0.264) 100%
    )
    linear-gradient(
      179.96deg,
      #f5fbf2 0.04%,
      rgba(245, 251, 242, 0.13) 60.6%,
      rgba(245, 251, 242, 0) 86.72%,
      rgba(245, 251, 242, 0.35) 99.96%
    );
  box-shadow: 0px 4px 4px 0px rgba(255, 255, 255, 0.25) inset;
`
const BoxTwoContainText = styled.div`
  font-family: Impact;
  font-weight: 400;
  font-size: 36px;
  line-height: 36px;
  align-items: center;
  letter-spacing: 0.04em;
  background: -webkit-linear-gradient(0deg, rgba(136, 234, 234, 0.2), rgba(136, 234, 234, 0.2)),
    linear-gradient(
      168.94deg,
      #f9ffff 26.97%,
      rgba(154, 254, 254, 0.298811) 57.93%,
      rgba(121, 254, 254, 0.23) 77.16%,
      rgba(203, 250, 250, 0.59) 94.98%
    );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const BoxTwoText = styled.div`
  width: 220px;
  font-family: Poppins;
  font-weight: 600;
  font-size: 16px;
  line-height: 17.6px;
  letter-spacing: 0.04em;
`
const BoxThree = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  border-radius: 8px;
  width: 431px;
  height: 96px;
  padding: 16px;
  margin-top: 50px;
  transform: rotate(12.75deg) skew(10deg);
  background: linear-gradient(
      122.88deg,
      #8f92e9 3.11%,
      rgba(176, 178, 246, 0.710616) 16.24%,
      rgba(192, 194, 240, 0.673081) 24.11%,
      rgba(151, 154, 219, 0.621643) 43.85%,
      #676ad5 100.23%
    ),
    linear-gradient(
      108.29deg,
      #f5fbf2 12.78%,
      rgba(245, 251, 242, 0) 35.95%,
      rgba(245, 251, 242, 0.19) 71.1%,
      #f5fbf2 87.02%
    );

  border: 3px solid;
  border-image-slice: 1;
  //     box-shadow: 5px 1px 1px 5px rgba(139, 142, 227, 1);

  //   animation: mymove 5s infinite alternate;
  //    transition: box-shadow 0.3s ease-in-out;

  // @keyframes mymove {
  //   50% {box-shadow: 10px 20px 30px #676ad5;}
  border-image-source: linear-gradient(
    108.29deg,
    #f5fbf2 12.78%,
    rgba(245, 251, 242, 0) 35.95%,
    rgba(245, 251, 242, 0.19) 71.1%,
    #f5fbf2 87.02%
  );
  @media screen and (max-width: 575px) {
    transform: none;
    width: 350px;
    margin-top: 150px;
  }
  @media screen and (max-width: 900px) {
    transform: none;
    margin-top: 150px;
  }
  @media screen and (max-width: 1100px) {
    transform: none;
    margin-top: 190px;
  }
`
const BoxThreeContain = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  border: 1px solid #ffffff4f;
  align-items: center;
  display: flex;
  justify-content: center;
  transform: rotate(12.75deg);
  background: radial-gradient(
      87.25% 105.06% at 14.12% -6.25%,
      rgba(205, 207, 255, 0.6) 0%,
      rgba(136, 139, 224, 0.264) 100%
    )
    linear-gradient(
      179.96deg,
      #f5fbf2 0.04%,
      rgba(245, 251, 242, 0.13) 60.6%,
      rgba(245, 251, 242, 0) 86.72%,
      rgba(245, 251, 242, 0.35) 99.96%
    );
  box-shadow: 0px 4px 4px 0px rgba(255, 255, 255, 0.25) inset;
  @media screen and (max-width: 575px) {
    transform: none;
  }
`
const BoxThreeContainText = styled.div`
  font-family: Impact;
  font-weight: 400;
  font-size: 36px;
  line-height: 36px;
  align-items: center;
  letter-spacing: 0.04em;
  transform: rotate(12.75deg);
  background: -webkit-linear-gradient(0deg, rgba(136, 234, 234, 0.2), rgba(136, 234, 234, 0.2)),
    linear-gradient(
      168.94deg,
      #f9ffff 26.97%,
      rgba(154, 254, 254, 0.298811) 57.93%,
      rgba(121, 254, 254, 0.23) 77.16%,
      rgba(203, 250, 250, 0.59) 94.98%
    );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const BoxThreeText = styled.div`
  width: 220px;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 17.6px;
  // letter-spacing: 0.04em;
`
const RankContent = styled.div`
  width: 802px;
  font-family: Raleway, sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: 0.04em;
  text-align: center;
  color: rgba(200, 200, 200, 1);
  @media screen and (max-width: 575px) {
    width: 370px;
    font-size: 15px;
  }
`
const PoolContent = styled.div`
  width: 680px;
  font-family: Raleway, sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: 0.04em;
  text-align: center;
  color: rgba(200, 200, 200, 1);
  @media screen and (max-width: 575px) {
    width: 370px;
    font-size: 15px;
  }
`
const RankImage = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
  @media screen and (max-width: 575px) {
    flex-direction: column;
  }
`
const GlobeImage = styled.div`
  width: 450px;
  height: 150px;
  position: relative;
`
const ButtonStake = styled.div`
  position: absolute;
  top: 170%;
  left: 53%;
  transform: translate(-50%, -50%);
  font-family: Poppins, sans-serif;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  align-items: center;
  display: flex;
  background: linear-gradient(167.91deg, #a3d8d5 13.8%, #cafbf8 26.11%, #f2fdff 37.78%, #cfeaeb 49.33%, #7bf7ff 89.87%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const ButtonContain = styled.div`
  background: linear-gradient(167.91deg, #a3d8d5 13.8%, #cafbf8 26.11%, #f2fdff 37.78%, #cfeaeb 49.33%, #7bf7ff 89.87%);
  boxshadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

function Tokenomic() {
  const { isMobile, isTablet } = useMatchBreakpoints()

  return (
    <Wrapper>
      <Container>
        <OverviewText>Tokenomic Overview</OverviewText>
        <BoxContain>
          <SupplyText>Supply: 21,000,000 TREND</SupplyText>
        </BoxContain>
        <ImageOverview>
          <Image
            src="/images/tokenomic.png"
            alt="tokenomic"
            width={isMobile ? 350 : isTablet ? 700 : 1000}
            height={isMobile ? 150 : isTablet ? 300 : 400}
          />
        </ImageOverview>

        <GetTrendText>
          How to get <span style={{ color: '#95ffec' }}> TREND</span> Token
        </GetTrendText>
        <BoxTwo>
          <BoxTwoContain>
            <Image src="/images/iconMining.png" width={35} height={40} style={{ filter: 'brightness(950%)' }} />
          </BoxTwoContain>
          <BoxTwoText>Earn profits and rewards by developing the Pool Standard system</BoxTwoText>
        </BoxTwo>

        <ContainerBox>
          <BoxOne>
            <BoxOneContain>
              <Image src="/images/iconMining.png" width={35} height={40} style={{ filter: 'brightness(950%)' }} />
            </BoxOneContain>
            <BoxOneText>Mint Trend Token through Pool Starter</BoxOneText>
          </BoxOne>
          <BoxTwoRes>
            <BoxTwoContain>
              <Image src="/images/iconMining.png" width={35} height={40} style={{ filter: 'brightness(950%)' }} />
            </BoxTwoContain>
            <BoxTwoText>Earn profits and rewards by developing the Pool Standard system</BoxTwoText>
          </BoxTwoRes>
          <GlobeImage>
            <Image src="/images/globefinal2.svg" alt="global" width={2600} height={2000} />

            <ButtonContain>
              <ButtonStake>
                STAKE NOW
                <span>
                  <Image src="/images/arrowIcon.png" alt="global" width={20} height={20} />
                </span>
              </ButtonStake>
            </ButtonContain>
          </GlobeImage>
          <BoxThree>
            <BoxOneContain>
              <Image src="/images/iconMining.png" width={35} height={40} style={{ filter: 'brightness(950%)' }} />
            </BoxOneContain>
            <BoxOneText>Engage in Bounty and Airdrop programs on Trendy DeFi community platforms</BoxOneText>
          </BoxThree>
        </ContainerBox>
        <PoolText>Pool’s mining speed</PoolText>
        <PoolContent>The mining speed of the TREND token depends on the highest pool you participate in.</PoolContent>
        <RankImage>
          <Image src="/images/starterPool.png" alt="rank" width={200} height={200} />
          <Image src="/images/standardPool.png" alt="rank" width={200} height={200} />
          <Image src="/images/proPool.png" alt="rank" width={200} height={200} />
          <Image src="/images/advancePool.png" alt="rank" width={200} height={200} />
          <Image src="/images/premiumPool.png" alt="rank" width={200} height={200} />
        </RankImage>

        <Image src="/images/+.png" alt="+" width={50} height={50} />
        <RankText>Rank Introduction</RankText>
        <RankContent>
          Supercharge your minting speed with Trendy DeFi! Increase your Rank level to accelerate the minting process
          and unlock faster token acquisition.
        </RankContent>
        <RankImage>
          <Image src="/images/silverRank.png" alt="rank" width={200} height={200} />
          <Image src="/images/goldRank.png" alt="rank" width={200} height={200} />
          <Image src="/images/titaniumRank.png" alt="rank" width={200} height={200} />
          <Image src="/images/platinumRank.png" alt="rank" width={200} height={200} />
          <Image src="/images/diamondRank.png" alt="rank" width={200} height={200} />
        </RankImage>
      </Container>
    </Wrapper>
  )
}

export default Tokenomic
