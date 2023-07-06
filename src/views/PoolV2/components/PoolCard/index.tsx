// import { PropsWithChildren, useState, useEffect } from "react";
// import { DeserializedPool } from "state/types";
// import styled from "styled-components";
// import images from "configs/images";
// import { Button } from "@pancakeswap/uikit";
// import { trendyColors } from "style/trendyTheme";
// import Link from "next/link";
// import { poolBaseUrl } from "views/Pools/constants";
// import { getPoolsContract } from "utils/contractHelpers";
// import contracts from "config/constants/contracts";
// import { formatEther } from "@ethersproject/units";
// import multicall from "utils/multicall";

// const Card = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-end;
//   gap: 25px;
//   width: 400px;
//   min-width: 350px;
//   height: 456px;
//   border-radius: 30px;
//   border: 4px solid #41f3ff;
//   padding: 25px;
// `;
// const LogoAndName = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   width: 100%;
//   height: 100%;
//   align-items: center;
//   span {
//     font-size: 40px;
//     ling-height: 48px;
//     font-style: normal;
//     font-family: Inter;
//     color: #ffffff;
//     font-weight: 700;
//   }
//   img {
//     width: 100px;
//     height: 100px;
//   }
// `;
// const Info = styled.div`
//   width: 100%;
// `;
// const Reward = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   padding: 10px 0;
//   border-bottom: 1.5px solid #d9d9d9;
// `;
// const Time = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   padding: 10px 0;
//   border-bottom: 1.5px solid #d9d9d9;
// `;
// const Line = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   span {
//     font-family: "Inter";
//     font-style: normal;
//     font-weight: 600;
//     font-size: 20px;
//     line-height: 24px;
//     color: #ffffff;
//     &.value {
//       font-weight: 800;
//     }
//   }
//   &.time {
//     span {
//       font-size: 24px;
//       line-height: 29px;
//     }
//   }
// `;
// const PoolCard: React.FC<
//   PropsWithChildren<{ pool: any; account: string; chain: number}>
// > = ({ pool, account, chain }) => {

//   const poolsContract = getPoolsContract(chain);
//   //console.log(getPoolsContract(chain))
//   //const { sousId, stakingToken, earningToken, isFinished, userData, totalStaked } = pool
//   const [poolInfo, setPoolInfo] = useState(pool);
//   const getPool = async () => {
//     try {
//       const info = await poolsContract.pools(pool.key);
//       const claimFee = await poolsContract.claimFee();
//       //const currentReward = account ? await poolsContract.currentReward(pool.key, account) : 0;
//       setPoolInfo({
//         ...poolInfo,
//         currentInterest: Number(info.currentInterest.toString())/10000*365,
//         enable: info.enable,
//         maxLock: formatEther(info.maxLock ),
//         minLock: formatEther(info.minLock),
//         timeLock: info.timeLock.toString(),
//         totalLock: formatEther(info.totalLock),
//         claimFee: formatEther(claimFee),
//         //currentReward: formatEther(currentReward),
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   useEffect(() => {
//     getPool();
//   }, []);
//   return (
//     <Card
//       style={{ background: `linear-gradient(${poolInfo.backgroundColor})` }}
//     >
//       <LogoAndName>
//         <img src={poolInfo.logo} alt="logo" />
//         <span>{poolInfo.name}</span>
//       </LogoAndName>
//       <Info>
//         <Reward>
//           <Line>
//             <span>Min-Max Stake</span>
//             <span
//               className="value"
//               style={{
//                 backgroundColor: `rgba(255,255,255,0.8)`,
//                 borderRadius: "4px",
//                 padding: "0px 6px",
//                 border: `2px solid ${poolInfo.tagColor}`,
//                 color: `${poolInfo.tagColor}`,
//               }}
//             >
//               {poolInfo.minLock}-{poolInfo.maxLock}
//             </span>
//           </Line>
//           <Line>
//             <span>Interest</span>
//             <span className="value">{poolInfo.currentInterest} %</span>
//           </Line>
//           <Line>
//             <span>Time Lock</span>
//             <span className="value">{poolInfo.timeLock} secs</span>
//           </Line>
//           <Line>
//             <span>Claim Fee</span>
//             <span className="value">{poolInfo.claimFee}</span>
//           </Line>
//         </Reward>
//         <Time>
//           <Line className="time">
//             <span>Total Lock</span>
//             <span className="value">{poolInfo.totalLock}</span>
//           </Line>
//         </Time>
//       </Info>
//       <Link href={`${poolBaseUrl}/${poolInfo.key}`}>
//         <Button variant="primary" padding="1em" width="100%">
//           View Detail
//         </Button>
//       </Link>
//     </Card>
//   );
// };
// export default PoolCard;
