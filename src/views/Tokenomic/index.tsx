import { useMatchBreakpoints } from '@pancakeswap/uikit'
import Image from 'next/image'
import React from 'react'
import { IOSView, isDesktop } from 'react-device-detect'
import { Global } from 'recharts'
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
  font-family: Raleway, sans-serif;
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  letter-spacing: 0.04em;
  @media screen and (max-width: 575px) {
    font-size: 30px;
    margin-top: 50px;
  }
  @media screen and (max-width: 900px) {
    margin-top: 100px;
  }
  @media screen and (max-width: 1440px) {
    margin-top: 170px;
  }
`
const RankText = styled.div`
  margin-top: 50px;
  font-family: Raleway, sans-serif;
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
  margin-bottom: 100px;
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
  @media screen and (max-width: 575px) {
    width: 350px;
  }
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

const GlobalTextContent = styled.div`
  font-family: Dosis;
  font-weight: 400;
  font-size: 18px;
  color: rgba(255, 255, 255, 1);
`
const GlobalPool = styled.div`
  position: relative;
`
const Table = styled.div`
  overflow: auto;
  height: 1930px;
  margin-top: 270px;
  left: 100px;
  padding: 24px 12px 24px 12px;
  border-radius: 15px;
  border: 1px;
  background: radial-gradient(
    100% 115.26% at 0% -2.74%,
    rgba(125, 128, 196, 0.7) 0%,
    rgba(71, 74, 155, 0.253633) 80.17%,
    rgba(164, 164, 164, 0.308) 100%
  );
  @media screen and (max-width: 1024px) {
    width: 1000px !important;
  }
  @media screen and (max-width: 768px) {
    width: 700px !important;
  }
  @media screen and (max-width: 575px) {
    width: 300px !important;
    margin-top: 600px;
  }
`
const TitleText = styled.div`
  font-family: Poppins, sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
`
const ContentText = styled.div`
  font-family: Poppins, sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: rgba(255, 255, 255, 1);
  text-align: right;
`
const data = [
  {
    day: 1,
    price: 1,
    speed: 0.001369863014,
    perDay: '',
    remain: 730,
    claim: 1,
  },
  {
    day: 2,
    price: 1.1,
    speed: 0.001245330012,
    perDay: 1,
    remain: 729,
    claim: 1,
  },
  {
    day: 3,
    price: 1.2,
    speed: 0.001369863014,
    perDay: 0.9090909091,
    remain: 728.0909091,
    claim: 1,
  },
  {
    day: 4,
    price: 1.3,
    speed: 0.00105374078,
    perDay: 0.8333333333,
    remain: 727.2575758,
    claim: 1,
  },
  {
    day: 5,
    price: 1.4,
    speed: 0.0009784735812,
    perDay: 0.7692307692,
    remain: 726.488345,
    claim: 1,
  },
  {
    day: 6,
    price: 1.5,
    speed: 0.0009132420091,
    perDay: 0.7142857143,
    remain: 725.7740593,
    claim: 1,
  },
  {
    day: 7,
    price: 1.6,
    speed: 0.0008561643836,
    perDay: 0.6666666667,
    remain: 725.1073926,
    claim: 1,
  },
  {
    day: 8,
    price: 1.7,
    speed: 0.0008058017728,
    perDay: 0.625,
    remain: 724.4823926,
    claim: 1,
  },
  {
    day: 9,
    price: 1.8,
    speed: 0.0007610350076,
    perDay: 0.5882352941,
    remain: 723.8941573,
    claim: 1,
  },
  {
    day: 10,
    price: 1.9,
    speed: 0.0007209805335,
    perDay: 0.5555555556,
    remain: 723.3386018,
    claim: 1,
  },
  {
    day: 11,
    price: 2.0,
    speed: 0.0006849315068,
    perDay: 0.5263157895,
    remain: 722.812286,
    claim: 1,
  },
  {
    day: 12,
    price: 2.1,
    speed: 0.0006523157208,
    perDay: 0.5,
    remain: 722.312286,
    claim: 1,
  },
  {
    day: 13,
    price: 2.2,
    speed: 0.0006226650062,
    perDay: 0.4761904762,
    remain: 721.8360955,
    claim: 1,
  },
  {
    day: 14,
    price: 2.3,
    speed: 0.0005955926147,
    perDay: 0.4545454545,
    remain: 721.38155,
    claim: 1,
  },
  {
    day: 15,
    price: 2.4,
    speed: 0.0005707762557,
    perDay: 0.4347826087,
    remain: 720.9467674,
    claim: 1,
  },
  {
    day: 16,
    price: 2.5,
    speed: 0.0005479452055,
    perDay: 0.4166666667,
    remain: 720.5301008,
    claim: 1,
  },
  {
    day: 17,
    price: 2.6,
    speed: 0.0005268703899,
    perDay: 0.4,
    remain: 0.3846153846,
    claim: 1,
  },
  {
    day: 18,
    price: 2.7,
    speed: 0.0005073566717,
    perDay: 0.3846153846,
    remain: 0.3703703704,
    claim: 1,
  },

  {
    day: 19,
    price: 2.8,
    speed: 0.0004892367906,
    perDay: 0.3703703704,
    remain: 0.3571428571,
    claim: 1,
  },
  {
    day: 20,
    price: 2.9,
    speed: 0.0004723665564,
    perDay: 0.3571428571,
    remain: 0.3448275862,
    claim: 1,
  },
  {
    day: 21,
    price: 3,
    speed: 0.0004566210046,
    perDay: 0.3448275862,
    remain: 0.3333333333,
    claim: 1,
  },
]
function Tokenomic() {
  const { isMobile, isTablet, isDesktop, isXl } = useMatchBreakpoints()

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
        <GlobalPool>
          <Image src="/images/poolGlobal.png" alt="" width={900} height={600} />
          <div
            style={{
              position: 'absolute',
              top: isMobile ? '250px' : isTablet ? '-10px' : '20px',
              left: isMobile ? '10px' : isTablet ? '1px' : '-30px',
              maxWidth: '400px',
            }}
          >
            <Image src="/images/box1.png" alt="" width={400} height={170} />
            <GlobalTextContent
              style={{
                position: 'absolute',
                left: isMobile ? '30px' : '20px',
                top: isMobile ? '35px' : '50px',
                padding: ' 0 30px',
                maxWidth: isMobile ? '300px' : '350px',
                width: '100%',
              }}
            >
              The regulation states that for every 1 dollar deposited, the user will receive a 20% conversion to TREND
              in contact mining.
            </GlobalTextContent>
          </div>
          <div
            style={{
              position: 'absolute',
              top: isMobile ? '400px' : isTablet ? '-10px' : '30px',
              left: isMobile ? '1px' : isTablet ? '400px' : '500px',
            }}
          >
            <Image src="/images/box2.png" alt="" width={550} height={250} />
            <GlobalTextContent
              style={{
                position: 'absolute',
                left: isMobile ? '40px' : isTablet ? '50px' : '60px',
                top: isMobile ? '40px' : isTablet ? '40px' : '40px',
                padding: ' 0 10px',
                maxWidth: isTablet ? '300px' : '300px',
                width: '100%',
                textAlign: 'right',
              }}
            >
              The claim speed of TREND per day is 1/730, which is equivalent to 2 years. However, it will be inversely
              proportional to the price of TREND on the pool.
            </GlobalTextContent>
          </div>

          <div
            style={{
              display: isMobile ? 'none' : 'flex',
              position: 'absolute',
              left: isMobile ? '10px' : isTablet ? '30px' : '60px',
              top: isMobile ? '600px' : '470px',
            }}
          >
            <Image
              src="/images/box3.png"
              alt=""
              width={isMobile ? 350 : isTablet ? 750 : 800}
              height={isMobile ? 100 : 110}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                left: '40px',
                top: '20px',
                padding: ' 0 30px',
                maxWidth: isMobile ? '300px' : isTablet ? '700px' : '800px',
                width: '100%',
              }}
            >
              <GlobalTextContent style={{ fontSize: '18px' }}>
                For example, when the price of TREND increases by 100% and doubles, the claiming rate would decrease by
                two times, resulting in a claiming rate of 1/1460 per day.
              </GlobalTextContent>
              <GlobalTextContent style={{ fontSize: '18px' }}>
                For example, if A has been gifted 730 TREND, they can claim 1 TREND per day. However, if the price of
                TREND is $2, then A can only claim 0.5 TREND per day.
              </GlobalTextContent>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              position: 'relative',
              top: isMobile ? '300px' : isTablet ? '50px' : '30px',
              left: isMobile ? '5px' : isTablet ? '30px' : '50px',
            }}
          >
            <div>
              <Image src="/images/box6.png" alt="" width={isMobile ? 360 : isTablet ? 370 : 400} height={110} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'absolute',
                  left: '80px',
                  top: '25px',
                  padding: ' 0 25px',
                  maxWidth: isMobile ? '320px' : '350px',
                  width: '100%',
                }}
              >
                <GlobalTextContent style={{ fontWeight: 700, fontSize: '27px' }}>Pool Standard</GlobalTextContent>
                <GlobalTextContent style={{ fontSize: '15px' }}>
                  Claim speed is increased by an additional{' '}
                  <span style={{ fontWeight: 700, fontSize: '25px' }}>0.25% </span>mean
                  <span style={{ fontWeight: 700, fontSize: '25px' }}> 1/730 * 1.25</span>
                </GlobalTextContent>
              </div>
            </div>
            <div style={{ marginTop: '3px' }}>
              <Image src="/images/box7png.png" alt="" width={isMobile ? 360 : isTablet ? 370 : 400} height={110} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'absolute',
                  left: isMobile ? '1px' : isTablet ? '370px' : '400px',
                  top: isMobile ? '135px' : '20px',
                  padding: ' 0 30px',
                  maxWidth: isMobile ? '350px' : isTablet ? '350px' : '400px',
                  width: '100%',
                }}
              >
                <GlobalTextContent style={{ fontSize: '15px' }}>
                  <GlobalTextContent style={{ fontWeight: 700, fontSize: '27px' }}>Pool Pro</GlobalTextContent>
                  Claim speed is increased by an additional{' '}
                  <span style={{ fontWeight: 700, fontSize: '25px' }}>0.25% </span>mean
                  <span style={{ fontWeight: 700, fontSize: '25px' }}> 1/730 * 1.25</span>
                </GlobalTextContent>
              </div>
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              left: isMobile ? '15px' : isTablet ? '40px' : '50px',
              top: isMobile ? '830px' : '750px',
            }}
          >
            <Image
              src="/images/box4.png"
              alt=""
              width={isMobile ? 350 : isTablet ? 730 : 800}
              height={isMobile ? 100 : 70}
            />
            <GlobalTextContent
              style={{
                position: 'absolute',
                left: isMobile ? '20px' : isTablet ? '30px' : '55px',
                top: isMobile ? '20px' : '25px',
                padding: ' 0 30px',
                maxWidth: '750px',
                width: '100%',
                fontSize: '20px',
              }}
            >
              The claim speed is determined by the highest pool that the user participates in .
            </GlobalTextContent>
          </div>
          <div
            style={{
              position: 'absolute',
              left: isMobile ? '15px' : isTablet ? '40px' : '50px',
              top: isMobile ? '930px' : '830px',
            }}
          >
            <Image
              src="/images/box5.png"
              alt=""
              width={isMobile ? 350 : isTablet ? 730 : 800}
              height={isMobile ? 150 : 90}
            />
            <GlobalTextContent
              style={{
                position: 'absolute',
                left: isMobile ? '10px' : isTablet ? '30px' : '55px',
                top: '20px',
                padding: ' 0 30px',
                maxWidth: isMobile ? '700px' : '750px',
                width: '100%',
                fontSize: '20px',
                lineHeight: isMobile ? '20px' : '25px',
              }}
            >
              When the user reaches the target level, for example Silver, the claim speed increases by x0.5 =&gt; every
              day claim <span style={{ fontWeight: 600, fontSize: '20px' }}>1/730 * 1.5 + (1/730 * 1.5 * 0.5)</span>
            </GlobalTextContent>
          </div>
        </GlobalPool>
        <Table
          style={{
            width: isMobile ? '300px' : isTablet ? '700px' : '1280px',
            overflow: 'auto',
          }}
        >
          <table>
            <tr style={{ gap: '10px', display: 'flex' }}>
              <th
                style={{
                  width: '140px',
                  height: '76px',
                  borderRadius: '8px',
                  border: '1px solid white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background:
                    'radial-gradient(101.36% 117.36% at 0% -2.74%, #7D84C4 0%, rgba(112, 110, 222, 0.73) 100%) ',
                }}
              >
                <TitleText>Day</TitleText>
              </th>
              <th
                style={{
                  width: '140px',
                  height: '76px',
                  borderRadius: '8px',
                  border: '1px solid white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background:
                    'radial-gradient(101.36% 117.36% at 0% -2.74%, #7D84C4 0%, rgba(112, 110, 222, 0.73) 100%) ',
                }}
              >
                <TitleText>TREND Price</TitleText>
              </th>
              <th
                style={{
                  width: '231px',
                  height: '76px',
                  borderRadius: '8px',
                  border: '1px solid white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background:
                    'radial-gradient(101.36% 117.36% at 0% -2.74%, #7D84C4 0%, rgba(112, 110, 222, 0.73) 100%) ',
                }}
              >
                <TitleText>Mine Speed</TitleText>
              </th>
              <th
                style={{
                  width: '231px',
                  height: '76px',
                  borderRadius: '8px',
                  border: '1px solid white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background:
                    'radial-gradient(101.36% 117.36% at 0% -2.74%, #7D84C4 0%, rgba(112, 110, 222, 0.73) 100%) ',
                }}
              >
                <TitleText> The number of 730 TREND claimed per day</TitleText>
              </th>
              <th
                style={{
                  width: '231px',
                  height: '76px',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid white',
                  background:
                    'radial-gradient(101.36% 117.36% at 0% -2.74%, #7D84C4 0%, rgba(112, 110, 222, 0.73) 100%) ',
                }}
              >
                <TitleText>Remained TREND per day</TitleText>
              </th>
              <th
                style={{
                  width: '231px',
                  height: '76px',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid white',
                  background:
                    'radial-gradient(101.36% 117.36% at 0% -2.74%, #7D84C4 0%, rgba(112, 110, 222, 0.73) 100%) ',
                }}
              >
                <TitleText>The number of USD claimed</TitleText>
              </th>
            </tr>
            {data.map((i) => (
              <tr style={{ gap: '10px', display: 'flex' }}>
                <td
                  style={{
                    marginTop: '10px',
                    width: '140px',
                    height: '76px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '17px',
                    alignItems: 'center',
                    background:
                      'radial-gradient(101.36% 117.36% at 0% -2.74%, rgba(135, 125, 196, 0.6) 0%, rgba(136, 168, 206, 0.411) 77.08%, rgba(136, 224, 214, 0.264) 100%) ',
                  }}
                >
                  <ContentText>{i.day}</ContentText>
                </td>
                <td
                  style={{
                    marginTop: '10px',

                    width: '140px',
                    height: '76px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '17px',
                    alignItems: 'center',
                    background:
                      'radial-gradient(101.36% 117.36% at 0% -2.74%, rgba(135, 125, 196, 0.6) 0%, rgba(136, 168, 206, 0.411) 77.08%, rgba(136, 224, 214, 0.264) 100%) ',
                  }}
                >
                  <ContentText>{i.price}</ContentText>{' '}
                </td>

                <td
                  style={{
                    marginTop: '10px',

                    width: '231px',
                    height: '76px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '17px',
                    alignItems: 'center',
                    background:
                      'radial-gradient(101.36% 117.36% at 0% -2.74%, rgba(135, 125, 196, 0.6) 0%, rgba(136, 168, 206, 0.411) 77.08%, rgba(136, 224, 214, 0.264) 100%) ',
                  }}
                >
                  <ContentText>{i.speed}</ContentText>
                </td>
                <td
                  style={{
                    marginTop: '10px',

                    width: '231px',
                    height: '76px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '17px',
                    alignItems: 'center',
                    background:
                      'radial-gradient(101.36% 117.36% at 0% -2.74%, rgba(135, 125, 196, 0.6) 0%, rgba(136, 168, 206, 0.411) 77.08%, rgba(136, 224, 214, 0.264) 100%) ',
                  }}
                >
                  <ContentText>{i.perDay}</ContentText>
                </td>
                <td
                  style={{
                    marginTop: '10px',

                    background:
                      'radial-gradient(101.36% 117.36% at 0% -2.74%, rgba(135, 125, 196, 0.6) 0%, rgba(136, 168, 206, 0.411) 77.08%, rgba(136, 224, 214, 0.264) 100%) ',
                    width: '231px',
                    height: '76px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '17px',
                    alignItems: 'center',
                  }}
                >
                  <ContentText>{i.remain}</ContentText>
                </td>
                <td
                  style={{
                    marginTop: '10px',

                    width: '231px',
                    height: '76px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '17px',
                    alignItems: 'center',
                    background:
                      'radial-gradient(101.36% 117.36% at 0% -2.74%, rgba(135, 125, 196, 0.6) 0%, rgba(136, 168, 206, 0.411) 77.08%, rgba(136, 224, 214, 0.264) 100%) ',
                  }}
                >
                  <ContentText>{i.claim}</ContentText>
                </td>
              </tr>
            ))}
          </table>
        </Table>
      </Container>
    </Wrapper>
  )
}

export default Tokenomic
