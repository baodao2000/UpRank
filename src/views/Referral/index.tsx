import styled from 'styled-components'
import { Heading, Text, Flex, Button, useToast, Input, LinkExternal, useMatchBreakpoints } from '@pancakeswap/uikit'
import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { getContract, getPoolsContract, getPoolsV2Contract, getPoolsV4Contract } from 'utils/contractHelpers'
import addresses from 'config/constants/contracts'
import refferalAbi from 'config/abi/refferal.json'
import readTrendyAbi from 'config/abi/readTrendy.json'
import { useDispatch } from 'react-redux'
import { setRefLink } from 'state/referral'
import { useSigner } from 'wagmi'
import truncateHash from '@pancakeswap/utils/truncateHash'
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'
import moment from 'moment'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'
import { formatEther } from '@ethersproject/units'
import { NATIVE } from '../../../packages/swap-sdk/src/constants'
import { ThreeDots } from 'views/Pool/components/DepositModal'
import CountUp from 'react-countup'
import Child from './child'
import { shortenURL } from 'views/Pools2/util'
import { getBlockExploreLink } from 'utils'
import Image from 'next/image'
import { isTablet } from 'react-device-detect'

const Wrapper = styled.div`
  * {
    font-family: Inter, sans-serif;
  }
  width: 100%;
  max-width: 1320px;
  height: auto;
  min-height: 500px;
  margin-left: auto;
  margin-right: auto;
  padding: 96px 0;
  display: flex;
  gap: 32px;
  th {
    border-collapse: collapse;
  }
  th,
  td {
    padding: 10px;
    text-align: center;
  }
  @media screen and (max-width: 900px) {
    flex-direction: column;
    padding: 40px 0;
    width: 100%;
  }
  @media screen and (max-width: 575px) {
    flex-direction: column;
    padding: 40px 0;
    width: 100%;
  }
`

const ReferralPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: flex-start;
  gap: 48px;
  width: 78%;
  @media screen and (max-width: 1440px) {
    padding 0px 16px;
  width: 100%;

  }
  @media screen and (max-width: 900px) {
    padding 0px 16px;
  width: 100%;

  }
  @media screen and (max-width: 575px) {
    padding 0px 16px;
  width: 100%;

  }
`

const CardRegister = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 30px;
  width: 100%;
  height: auto;
  padding: 40px;
  border-radius: 16px;
  background: var(--greyscale-grayscale-3, #141217);
  box-shadow: 0px 64px 64px -48px rgba(15, 15, 15, 0.1);
  position: relative;
  .upto {
    position: absolute;
    top: -12%;
    right: -7%;
  }
  @media screen and (max-width: 575px) {
    padding: 40px 16px;
    .upto {
      position: relative;
      top: 0;
      right: 0;
      width: 343px;
    }
  }
`

const CardReferral = styled.div`
  max-width: 1220px;
  min-height: 300px;
  width: 100%;
  height: auto;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 16px;

  color: #e6e6e6;
  @media screen and (max-width: 1440px) {
    width: 75%;
  }
  @media screen and (max-width: 900px) {
    padding: 0 16px;
    width: 100%;
  }
  @media screen and (max-width: 575px) {
    padding: 0 16px;
    width: 100%;
  }
`
const FriendsList = styled.div`
  border-radius: 16px;
  background: var(--greyscale-grayscale-3, #141217);
  box-shadow: 0px 64px 64px -48px rgba(15, 15, 15, 0.1);
  display: flex;
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;
  gap: 48px;
  align-self: stretch;
  margin-top: 48px;
  @media screen and (max-width: 575px) {
    padding: 40px 16px;
    margin-top: 28px;
  }
`
const CardFriends = styled.div`
  display: flex;
  padding: 16px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 10px;
  border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
  background: var(--white-white-6, rgba(255, 255, 255, 0.06));
  backdrop-filter: blur(6px);
  width: 257px;
  @media screen and (max-width: 575px) {
    padding: 10px;
  }
`
const CardInfoUser = styled.div`
  width: 100%;
  height: auto;
  padding: 0 16px;
  @media screen and (max-width: 575px) {
    padding: 0 16px;
  }
`

const StyledHead = styled(Heading)`
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 56px; /* 125% */
  letter-spacing: -0.96px;
  background: var(--primary-primary-gradient-2, linear-gradient(180deg, #7b3fe4 0%, #a726c1 100%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 575px) {
    font-size: 24px;
    line-height: 32px;
  }
`

const StyledSubtitle = styled(Text)`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  margin-top: 24px;
  color: rgba(173, 171, 178, 1);
  @media screen and (max-width: 575px) {
    font-size: 16px;
    margin-top: 16px;
    line-height: 24px;
  }
  .title {
    color: white;
    font-weight: 700;
  }
`

const GroupLinkRef = styled.div`
  flex-direction: column;
  display: flex;
  gap: 48px;
  width: 100%;
`

const GroupSearchByCode = styled.div`
  .search {
    position: absolute;
    top: 20%;
    width: 24px;
    height: 24px;
    right: 2%;
    cursor: pointer;
  }
`

const WrapperLinkRef = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  border-radius: 16px;
  border: 1px solid var(--white-white-8, rgba(255, 255, 255, 0.08));
  background: var(--black-black-5, rgba(0, 0, 0, 0.05));
  padding: 32px;
  gap: 32px;
  @media screen and (max-width: 575px) {
    padding: 16px;
    width: 100%;
  }
`

const StyledLabelLinkRef = styled.label`
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 40px; /* 125% */
  letter-spacing: -0.96px;
  color: rgba(255, 255, 255, 1);
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 32px;
  }
`

const StyledLink = styled.div`
  width: 100%;
  border-radius: 12px;
  background: var(--greyscale-grayscale-4, #2d2c33);
  border: none;
  outline: none;
  color: black;
  font-size: 18px;
  flex-direction: row-reverse;
  min-height: 34px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 20px;
  padding: 12px 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    min-height: 44px;
  }
`

const StyledLinkCode = styled.div`
  width: 100%;
  max-width: 150px;
  background: #00f0e1;
  border-radius: 10px;
  border: none;
  outline: none;
  color: black;
  font-size: 18px;
  padding: 10px 10px;
  min-height: 34px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    min-height: 44px;
  }
`

const StyledButton = styled(Button)`
  background: rgb(217, 217, 217);
  font-weight: 500;
  color: rgb(98, 22, 176);
  margin-top: 30px;
  font-size: 16px;
  line-height: 20px;
  border-radius: 90px;
  width: 192px;
  border: 2px solid var(--greyscale-grey-scale-text-seconday, #adabb2);
  @media screen and (max-width: 575px) {
    margin-top: 0px;
  }
`

const StyledButtonSearch = styled.button`
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-top: 30px;
  font-size: 16px;
  line-height: 20px;
  border-radius: 90px;
  width: 192px;
  height: 56px;
  background: var(--greyscale-grayscale-3, #141217);
  /* depth/4 */
  box-shadow: 0px 64px 64px -48px rgba(15, 15, 15, 0.1);
`

const StyledIconRef = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

const ShowLinkRefPc = styled.span`
  display: none;
  word-break: break-all;
  color: #fff;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`

const ShowLinkRefMobile = styled.span`
  display: block;
  word-break: break-all;
  color: #fff;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`

const BlockInfo = styled.div`
display: flex;
padding: 40px;
flex-direction: column;
align-items: flex-start;
gap: 48px;
align-self: stretch;
  border-radius: 16px;
  margin-top: 48px;
background: var(--greyscale-grayscale-3, #141217);
/* depth/4 */
box-shadow: 0px 64px 64px -48px rgba(15, 15, 15, 0.10);
@media screen and (max-width: 575px ) {
  padding 40px 16px;
  margin-top: 28px;

}
`

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  color: #e6e6e6;
  border-radius: 10px;
  max-width: 286px;
  gap: 12px;
  border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
  background: var(--white-white-6, rgba(255, 255, 255, 0.06));
  backdrop-filter: blur(6px);
  padding: 16px 24px;
  @media screen and (max-width: 575px) {
    width: 145px;
    padding: 16px;
  }
`

const Table = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px;
  align-self: stretch;
  border-radius: 16px;
  border: 1px solid var(--white-white-8, rgba(255, 255, 255, 0.08));
  background: var(--black-black-5, rgba(0, 0, 0, 0.05));
  tr {
    width: 100%;
  }
  th {
    width: 251px;
    text-align: left;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    color: rgba(119, 126, 144, 1);
    @media screen and (max-width: 575px) {
      text-align: center;
    }
  }
  @media screen and (max-width: 575px) {
    padding: 0px;
  }
`

const ChildItem = styled.tr`
  word-break: break-all;
  width: 100%;
  td {
    width: 251px;
    text-align: left;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    color: rgba(255, 255, 255, 1);
  }
  @media screen and (max-width: 575px) {
    td {
      font-size: 14px;
    }
  }
`

const Label = styled(Text)`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: rgba(119, 126, 144, 1);
`

const Value = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  color: rgba(133, 68, 245, 1);
`

const GroupChangePage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`

const ButtonChangePage = styled.button`
  background: linear-gradient(
    178.36deg,
    #5c4a8a 1.4%,
    #d2cbef 1.41%,
    rgba(144, 126, 222, 0.62) 26.34%,
    #7b6fef 71.12%,
    #3c59f2 109.1%
  );
  border: none;
  outline: none;
  cursor: pointer;
`

const StyledItemChild = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: rgba(173, 171, 178, 1);
`
const StyledTotal = styled(Text)`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  color: rgba(133, 68, 245, 1);
`
const StyledLinkAccount = styled.a`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  color: rgba(133, 68, 245, 1);
`

const StyledInput = styled(Input)`
  outline: none;
  border-radius: 12px;
  background: var(--greyscale-grayscale-4, #2d2c33);
  padding: 12px 16px;
  height: 44px;
  &:focus:not(:disabled) {
    border: none;
  }
`

const StyledInputSearch = styled(Input)`
  outline: none;
  height: 48px;
  border-radius: 12px;
  background: var(--greyscale-grayscale-4, #2d2c33);
  padding: 12px 16px;

  &:focus:not(:disabled) {
    border: none;
  }
  ::placeholder {
    color: #67666e;
  }
`

const LinkItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  width: 100%;
`

const StyledHeadSearchUser = styled(Heading)`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 12px;
`

export const copyText = (text) => {
  const el = document.createElement('textarea')
  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}
const Menu = styled.div`
  max-width: 300px;
  width: 20%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: row;
    max-width: 100%;
    width: 100%;
    justify-content: space-between;
  }
  @media screen and (max-width: 575px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 100%;
    width: 100%;
    justify-content: space-around;
  }
`
const MenuItemActive = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 8px;
padding 8px 16px;
width: 292px;
img{
  width: 24px;
  height: 24px;
}
.title {
  font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 20px; 
color: rgba(252, 252, 253, 1);
}
@media screen and (max-width: 900px) {
  width: 20%;
  
}
@media screen and (max-width: 575px) {
  padding: 0 8px;
  width: 35%;
}
`
const MenuItemDisabled = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 8px;
padding 8px 16px;
img{
  width: 24px;
  height: 24px;
}
.title {
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
color: rgba(103, 102, 110, 1);
}
cursor: pointer;
@media screen and (max-width: 575px) {
  padding: 0 8px;
  width: 35%;
}
`
const StyledText = styled(Text)`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  color: rgba(173, 171, 178, 1);
`
const GroupLink = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  @media screen and (max-width: 575px) {
    flex-direction: column;
  }
`
const ButtonLink = styled.button`
  width: 192px;
  border-radius: 90px;
  border: 2px solid var(--greyscale-grey-scale-text-seconday, #adabb2);
  display: flex;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 1);
  background: rgba(20, 18, 23, 1);
  cursor: pointer;
`
const Step = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`
const TitleStep = styled(Text)`
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  color: rgba(255, 255, 255, 1);
`
const LabelStep = styled(Text)`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: rgba(173, 171, 178, 1);
`
const CardStep = styled.div`
  display: flex;
  margin-top: 24px;
  gap: 24px;
  justify-content: space-between;

  @media screen and (max-width: 575px) {
    flex-direction: column;
    align-items: center;
  }
`
const Card = styled.div`
  width: 340px;
  border-radius: 8px;
  background: var(--white-white-6, rgba(255, 255, 255, 0.06));
  padding: 29px 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  .imgStep {
    width: 48px;
    height: 48px;
  }
  @media screen and (max-width: 1440px) {
    width: 100%;
  }
`
const CardTitle = styled(Text)`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  color: rgba(255, 255, 255, 1);
`
const ProfilePage = styled.div``
const Item = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 575px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }
`
const ReferralInfo = styled.div`
  border-radius: 16px;
  border: 1px solid var(--white-white-8, rgba(255, 255, 255, 0.08));
  background: var(--black-black-5, rgba(0, 0, 0, 0.05));
  display: flex;
  padding: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`
const InfoTitle = styled(Text)`
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
`
const Group = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  @media screen and (max-width: 1440px) {
    flex-direction: row;
    flex-wrap: wrap;
    display: flex;
    justify-content: flex-start;
  }
  @media screen and (max-width: 900px) {
    flex-direction: row;
    flex-wrap: wrap;
    display: flex;
    justify-content: flex-start;
  }
  @media screen and (max-width: 575px) {
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    display: flex;
    gap: 16px;
  }
`
const Referral = () => {
  const [linkRef, setLinkRef] = React.useState('')
  const [showCopied, setShowCopied] = React.useState(false)
  const { account, chainId } = useWeb3React()
  // account='0x1ec0f8875B7fc2400a6F44788c6710959614e68A'
  const dispatch = useDispatch()
  const { toastSuccess, toastError } = useToast()
  const [loading, setLoading] = React.useState(false)
  const [loadingPage, setLoadingPage] = React.useState(true)
  const [loadingTable, setLoadingTable] = React.useState(true)
  const { search } = window.location
  const query = new URLSearchParams(search)
  const referBy = query.get('ref')
  const baseRefUrl = `${window.location.origin}homepage?ref=`
  const { data: signer } = useSigner()
  const CHAIN_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)
  const getPoolContract = getPoolsContract(CHAIN_ID)
  const getPoolV2Contract = getPoolsV2Contract(CHAIN_ID)
  const getPoolV4Contract = getPoolsV4Contract(CHAIN_ID)
  const refferCT = getContract({ address: addresses.refferal[CHAIN_ID], abi: refferalAbi, chainId: CHAIN_ID, signer })
  const readTrendyCT = getContract({
    address: addresses.readTrendy[CHAIN_ID],
    abi: readTrendyAbi,
    chainId: CHAIN_ID,
    signer,
  })
  const [userIsRegister, setUserIsRegister] = React.useState(false)
  const [interest, setInterest] = React.useState(0)
  const [listChild, setListChild] = React.useState([])
  const [listChildV1, setListChildV1] = React.useState([])

  const [countPage, setCountPage] = React.useState(0)
  const [activePage, setActivePage] = React.useState(0)
  const [myCode, setMyCode] = useState('')
  const [referByWallet, setReferByWallet] = useState(referBy)
  const [referCode, setReferCode] = useState('')
  const [showError, setShowError] = useState(true)
  const [userSearch, setUserSearch] = useState('')
  const [resultSearch, setResultSearch] = useState('')
  const [totalItemChild, setTotalItemChild] = React.useState(0)
  const [acountChild, setAccountChild] = React.useState(() => {
    if (account) {
      return [account]
    }
    return []
  })
  const [total7Level, setTotal7Level] = React.useState(0)
  const unit = chainId && NATIVE[chainId].symbol
  const [userInfos, setUserInfo] = React.useState({
    refferBy: '',
    date: 0,
    totalReffer: '',
    totalRefer7: '',
    directStaked: 0,
    totalStaked7: 0,
    totalComms: 0,
  })
  const { isMobile } = useMatchBreakpoints()

  const [tab, setTab] = useState(2)
  const getTotalRefferChild = async (page, accountChild) => {
    if (!account) {
      setLoadingPage(true)
    }
    setLoadingPage(false)
    const limit = 5
    const data = await Promise.all([
      refferCT.getTotalUserByUp(accountChild ? accountChild : account, limit, page),
      refferCT.userInfos(account ? account : accountChild),
    ])

    const countPage = Math.ceil(Number(data[0].totalItem.toString()) / limit)
    const arr = data[0].list.map((item) => item.user)
    // console.log(arr)
    const dataTrendy = await readTrendyCT.volumeOntree(arr)
    const dataTrendyV1 = await readTrendyCT.volumeOntreeV1(arr)

    setListChild(
      arr.map((item, i) => {
        return {
          account: item,
          volume: Number(formatEther(dataTrendy.volumes[i])).toFixed(3),
          locked: Number(formatEther(dataTrendy.userTotalLocks[i])).toFixed(3),
          child: Number(dataTrendy.totalRefers[i].toString()),
          showChild: false,
        }
      }),
    )
    setListChildV1(
      arr.map((item, i) => {
        return {
          account: item,
          volume: Number(formatEther(dataTrendyV1.volumes[i])).toFixed(3),
          locked: Number(formatEther(dataTrendyV1.userTotalLocks[i])).toFixed(3),
          child: Number(dataTrendyV1.totalRefers[i].toString()),
          showChild: false,
        }
      }),
    )
    // const list = await Promise.all(
    //   arr.map(async (item) => {
    //     const dataItem = await Promise.all([
    //       getPoolContract.volumeOntree(item),
    //       getPoolContract.userTotalLock(item),
    //       refferCT.userInfos(item),
    //     ])
    //     const dataItem2 = await Promise.all([
    //       getPoolV2Contract.volumeOntree(item),
    //       getPoolV2Contract.userTotalLock(item),
    //       refferCT.userInfos(item),
    //     ])
    //     return {
    //       account: item,
    //       volume: Number(formatEther(dataItem[0].add(dataItem2[0]))).toFixed(3),
    //       locked: Number(formatEther(dataItem[1].add(dataItem2[1]))).toFixed(3),
    //       child: Number(dataItem[2].totalRefer7.toString()),
    //     }
    //   }),
    // )
    setTotalItemChild(Number(data[0].totalItem.toString()))
    setCountPage(countPage)
    setTotal7Level(data[1].totalRefer7.toString())
    setLoadingTable(false)
  }

  const validateReferByWallet = async (e) => {
    setReferCode(e.target.value)
    const code = e.target.value

    const userInfosByCode = await refferCT.userInfosByCode(code.toLowerCase())
    if (userInfosByCode.user === '0x0000000000000000000000000000000000000000') setShowError(true)
    else {
      setShowError(false)
      setReferByWallet(userInfosByCode.user)
    }
  }

  const handleClickPage = (index) => {
    const limit = 5
    const skip = index * limit
    getTotalRefferChild(skip, acountChild[acountChild.length - 1])
    setActivePage(index)
  }

  const handleChangeChild = (accountB) => {
    setListChild(
      listChild.map((l) => {
        if (l.account.toLowerCase() === accountB.toLowerCase()) l.showChild = !l.showChild
        return l
      }),
    )
  }
  const handleChangeChildV1 = (accountB) => {
    setListChildV1(
      listChildV1.map((l) => {
        if (l.account.toLowerCase() === accountB.toLowerCase()) l.showChild = !l.showChild
        return l
      }),
    )
  }

  const handleChangePage = (index) => {
    if (typeof Number(index) !== 'number') {
      return
    }
    const limit = 5
    const skip = index * limit
    getTotalRefferChild(skip, acountChild[acountChild.length - 1])
    setActivePage(Number(index))
  }

  const getUserInfo = async () => {
    if (!account) {
      setLoadingPage(true)
    }
    setLoadingPage(false)
    const infos = await Promise.all([
      refferCT.userInfos(account),
      getPoolV4Contract.getChildren(account),
      getPoolV2Contract.getChildren(account),
      getPoolContract.volumeOntree(account),
      getPoolContract.remainComm(account),
    ])

    const user = {
      refferBy: infos[0].refferBy.toString(),
      date: Number(infos[0].dateTime.toString()) * 1000,
      totalReffer: infos[0].totalRefer.toString(),
      totalRefer7: infos[0].totalRefer7.toString(),
      directStaked: Number(infos[1].direct.toString()) + Number(infos[2].direct.toString()),
      totalStaked7: Number(Number(formatEther(infos[3])).toFixed(3)),
      totalComms: Number(Number(formatEther(infos[4]).toString()).toFixed(3)),
    }
    setUserInfo(user)
  }
  const getButtonChangePage = (limitButton) => {
    let arr = []
    const style = { background: '#00f0e1', color: 'black' }
    if (countPage === 1) {
      return null
    }
    if (countPage >= 4) {
      for (let i = 0; i < limitButton; i++) {
        arr.push(
          <ButtonChangePage key={i} onClick={() => handleClickPage(i)} style={activePage === i ? style : {}}>
            {i + 1}
          </ButtonChangePage>,
        )
      }
      arr.push(
        <input key={'a'} type="number" style={{ width: '40px' }} onChange={(e) => handleChangePage(e.target.value)} />,
      )
      arr.push(
        <ButtonChangePage
          key={countPage}
          style={activePage === countPage - 1 ? style : {}}
          onClick={() => handleClickPage(countPage - 1)}
        >
          {countPage - 1}
        </ButtonChangePage>,
      )
    } else {
      for (let i = 0; i < countPage; i++) {
        arr.push(
          <ButtonChangePage key={i} style={activePage === i ? style : {}} onClick={() => handleClickPage(i)}>
            {i + 1}
          </ButtonChangePage>,
        )
      }
    }
    return arr
  }

  const getData = () => {
    if (!account) {
      setLoadingPage(true)
    } else {
      setLoadingPage(false)
      const checkUserRegister = async () => {
        const isRegister = await refferCT.isReferrer(account)
        setUserIsRegister(isRegister)
      }
      checkUserRegister()
      getRefer()
      // getUserInfo()

      if (userIsRegister && account) {
        setLinkRef(getLinkRef())
      } else {
        setLinkRef('')
      }
      setLoadingPage(false)
    }
  }
  const handleBack = () => {
    const newArr = [...acountChild]
    newArr.pop()
    setAccountChild(newArr)
    getTotalRefferChild(0, newArr[newArr.length - 1])
  }

  React.useEffect(() => {
    getData()
  }, [account, userIsRegister, userInfos])

  React.useEffect(() => {
    if (!account) {
      return
    }
    getTotalRefferChild(0, account)
    setMyCode(account.slice(account.length - 6, account.length).toLocaleLowerCase())
    getRefferCode()
    getUserInfo()
    if (!acountChild.length && account) {
      setAccountChild([...acountChild, account])
    } else {
      setAccountChild([account])
    }
  }, [account])

  const getLinkRef = () => {
    const param = window.location.origin
    const text = `${param}?ref=${account.slice(account.length - 6, account.length).toLocaleLowerCase()}`
    // console.log(text)
    return text
  }

  const getRefferCode = async () => {
    if (referBy) {
      const userReferBy = await refferCT.userInfosByCode(referBy.toLowerCase())
      if (userReferBy.user === '0x0000000000000000000000000000000000000000') {
        setShowError(true)
      } else {
        setReferCode(referBy.slice(referBy?.length - 6, referBy?.length).toLocaleLowerCase())
      }
    } else {
      const ref = localStorage.getItem('saveAdd')
      if (JSON.parse(ref)) {
        const userReferByLocal = await refferCT.userInfosByCode(JSON.parse(ref).toLowerCase())
        if (userReferByLocal.user === '0x0000000000000000000000000000000000000000') {
          setShowError(true)
        } else {
          setReferCode(JSON.parse(ref).toLocaleLowerCase())
          setShowError(false)
        }
      }
    }
  }

  const getRefer = async () => {
    const pool = await getPoolContract.pools(5)
    const interest = Number(Number(pool.commPercent.toString()) * 0.000001 * 100).toFixed(2)
    setInterest(Number(interest))
  }
  const onRegister = async () => {
    try {
      let referByW = referByWallet
      if (!referByW) {
        if (referCode) {
          const userInfosByCode = await refferCT.userInfosByCode(referCode.toLowerCase())
          referByW = userInfosByCode.user
        }
      }
      const txReceipt = await refferCT.register(referByW, myCode)
      if (txReceipt?.hash) {
        dispatch(setRefLink(`${baseRefUrl}${account}`))
        toastSuccess('Congratulations, you have successfully registered!')
        setLinkRef(getLinkRef())
        setLoadingPage(true)
        getData()
      } else {
        toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
      }
      setLoading(false)
    } catch (error) {
      console.log('onRegister error:', error)
      setLoading(false)
      toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
    }
  }

  const handleRef = () => {
    if (userIsRegister) {
      const text = getLinkRef()
      copyText(text)
      setShowCopied(true)
    }
  }

  const handleCode = (text) => {
    copyText(text)
    setShowCopied(true)
  }

  const handleLeave = () => {
    setTimeout(() => {
      setShowCopied(false)
    }, 100)
  }

  const formatLinkRef = (ref, start, end) => {
    if (ref?.includes('0x')) {
      return truncateHash(ref, start, end)
    }
    return linkRef
  }

  const handleSearchUserCode = async () => {
    const userInfosByCode = await refferCT.userInfosByCode(userSearch.toLowerCase())
    if (userInfosByCode.user === '0x0000000000000000000000000000000000000000') {
      setResultSearch('Invalid code')
      return
    }
    setResultSearch(userInfosByCode.user)
  }

  const showResultSearch = () => {
    if (resultSearch === '') return null
    if (resultSearch === 'Invalid code')
      return <p style={{ color: 'red', marginTop: 20, textAlign: 'center' }}>Invalid code</p>
    return (
      <Text style={{ color: '#C5C5C5', marginTop: 40 }} ellipsis={true}>
        <LinkExternal
          fontSize={['14px', '16px', '18px', '20px', '22px']}
          href={getBlockExploreLink(resultSearch, 'address', CHAIN_ID)}
          ellipsis={true}
          style={{ color: '#00F0E1' }}
          color="#00F0E1"
        >
          {shortenURL(`${resultSearch}`, 16)}
        </LinkExternal>
      </Text>
    )
  }
  return (
    <>
      {loadingPage ? (
        <TrendyPageLoader />
      ) : (
        <Wrapper>
          <Menu>
            {tab === 1 ? (
              <MenuItemActive>
                <img src="./images/V3/person.png" />
                <Text className="title">Profile</Text>
              </MenuItemActive>
            ) : (
              <MenuItemDisabled onClick={() => setTab(1)}>
                <img src="./images/V3/personDisabled.png" />
                <Text className="title">Profile</Text>
              </MenuItemDisabled>
            )}

            {tab === 2 ? (
              <MenuItemActive>
                <img src="./images/V3/Line.png" />
                <Text className="title">Referrals</Text>
              </MenuItemActive>
            ) : (
              <MenuItemDisabled onClick={() => setTab(2)}>
                <img src="./images/V3/LineDisabled.png" />
                <Text className="title">Referrals</Text>
              </MenuItemDisabled>
            )}

            {tab === 3 ? (
              <MenuItemActive>
                <img src="./images/V3/group.png" />
                <Text className="title">Friend list ver2.0</Text>
              </MenuItemActive>
            ) : (
              <MenuItemDisabled onClick={() => setTab(3)}>
                <img src="./images/V3/groupDisabled.png" />
                <Text className="title">Friend list ver2.0</Text>
              </MenuItemDisabled>
            )}
            {tab === 4 ? (
              <MenuItemActive>
                <img src="./images/V3/group.png" />
                <Text className="title">Friend list ver1.0</Text>
              </MenuItemActive>
            ) : (
              <MenuItemDisabled onClick={() => setTab(4)}>
                <img src="./images/V3/groupDisabled.png" />
                <Text className="title">Friend list ver1.0</Text>
              </MenuItemDisabled>
            )}
          </Menu>
          {tab === 2 && (
            <ReferralPage>
              <div>
                <StyledHead>Referral Program</StyledHead>
                <StyledSubtitle>
                  Multiply gains, your Referrals defend. Refer Friends to Earn Massive Rewards Together.
                </StyledSubtitle>
                <img style={{ display: isMobile ? 'flex' : 'none' }} className="upto" src="./images/V3/upto.svg" />
              </div>
              <CardRegister>
                <img style={{ display: isMobile ? 'none' : 'flex' }} className="upto" src="./images/V3/upto.svg" />
                <GroupLinkRef>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <StyledText style={{ fontWeight: '700', color: 'white', fontSize: '28px' }}>
                      Referral Registration
                    </StyledText>
                    <StyledLabelLinkRef
                      style={{ fontSize: '14px', lineHeight: '20px', marginBottom: '0', marginTop: '12px' }}
                    >
                      Up to
                    </StyledLabelLinkRef>
                    <StyledLabelLinkRef>10%</StyledLabelLinkRef>
                  </div>
                  <WrapperLinkRef>
                    <Text
                      fontSize={['16px', '16px', '18px', '24px', '24px']}
                      fontWeight="600"
                      lineHeight="32px"
                      style={{ color: 'rgba(255, 255, 255, 1)' }}
                    >
                      {' '}
                      Invite friends to earn 10%
                    </Text>
                    <GroupLink>
                      <div style={{ width: isMobile ? '100%' : '50%' }}>
                        <StyledText
                          style={{ color: 'rgba(255, 255, 255, 1)', marginBottom: '12px' }}
                          color="rgba(255, 255, 255, 1)"
                        >
                          Referral link
                        </StyledText>
                        <StyledLink>
                          <LinkItem>
                            <ShowLinkRefPc>{formatLinkRef(linkRef, 50, 4)}</ShowLinkRefPc>
                            <ShowLinkRefMobile>{formatLinkRef(linkRef, 20, 4)}</ShowLinkRefMobile>
                            <StyledIconRef
                              id="iconRef"
                              src="/images/referral/copy.svg"
                              onClick={handleRef}
                              onMouseLeave={handleLeave}
                            />
                            <Tooltip
                              anchorId="iconRef"
                              content={userIsRegister ? (showCopied ? 'Copied' : 'Copy') : 'Please Register'}
                            />
                          </LinkItem>
                        </StyledLink>
                      </div>
                      {!userIsRegister && (
                        <>
                          <div style={{ width: isMobile ? '100%' : '50%' }}>
                            <StyledText
                              style={{ color: 'rgba(255, 255, 255, 1)', marginBottom: '12px' }}
                              color="rgba(255, 255, 255, 1)"
                            >
                              Referral code
                            </StyledText>
                            <StyledInput
                              value={referCode}
                              autoFocus={true}
                              onChange={validateReferByWallet}
                              placeholder={`refer code`}
                            />
                            {showError && referCode && <span style={{ color: 'red' }}>Invalid code</span>}
                          </div>
                          <StyledButton onClick={onRegister} disabled={userIsRegister || showError}>
                            Register
                          </StyledButton>
                        </>
                      )}
                    </GroupLink>
                    <div style={{ display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '100px', height: '1px', background: 'rgba(255, 255, 255, 0.10)' }}></div>
                      <Text fontSize="18px" fontWeight="500" lineHeight="20px">
                        Or
                      </Text>
                      <div style={{ width: '100px', height: '1px', background: 'rgba(255, 255, 255, 0.10)' }}></div>
                    </div>
                    <GroupSearchByCode>
                      <StyledHeadSearchUser>Search By Code</StyledHeadSearchUser>
                      <div style={{ position: 'relative' }}>
                        <StyledInputSearch
                          value={userSearch}
                          autoFocus={true}
                          onChange={(e) => setUserSearch(e.target.value)}
                          placeholder={`Enter code`}
                        />
                        <div onClick={handleSearchUserCode}>
                          <img className="search" src="./images/V3/search.png" />
                        </div>
                      </div>
                      {showResultSearch()}
                    </GroupSearchByCode>
                  </WrapperLinkRef>
                </GroupLinkRef>
                <ButtonLink onClick={() => setTab(3)}>Check my refer list</ButtonLink>
              </CardRegister>
              <Step>
                <TitleStep>Getting Started:</TitleStep>
                <LabelStep>Reveal to activate your up to 1,000 USDT trading fee rebate voucher</LabelStep>
                <CardStep>
                  <Card>
                    <img className="imgStep" src="./images/V3/Step1.png" />
                    <CardTitle>Step 1</CardTitle>
                    <LabelStep>Grab your referral link or code.</LabelStep>
                  </Card>
                  <Card>
                    <img className="imgStep" src="./images/V3/Step2.png" />
                    <CardTitle>Step 2</CardTitle>
                    <LabelStep>
                      Invite friends to sign up with your ref link or code and deposit more than $100 within 14 days of
                      registration.
                    </LabelStep>
                  </Card>
                  <Card>
                    <img className="imgStep" src="./images/V3/Step3.png" />
                    <CardTitle>Step 3</CardTitle>
                    <LabelStep>
                      You and your friend will both receive equal vouchers that rebate the trading fee.
                    </LabelStep>
                  </Card>
                </CardStep>
              </Step>
            </ReferralPage>
          )}
          {tab === 1 && (
            <ProfilePage>
              <CardInfoUser>
                <StyledHead>Profile</StyledHead>
                <StyledSubtitle>*Note</StyledSubtitle>
                <StyledSubtitle>
                  <span className="title">Total referrals:</span> The number of users signed up for Trendy DeFi using
                  your referral link. <b />
                </StyledSubtitle>
                <StyledSubtitle>
                  <span className="title">Refer Downline:</span> The group of users that you refers to either directly
                  or indirectly through your referral link or code.
                </StyledSubtitle>
                <StyledSubtitle>
                  <span className="title">Direct staked:</span> The tokens staked by users referred directly by your
                  referral link or code are typically considered part of the referrer&#39;s downline at the first level{' '}
                  <a href="https://trendydefi.gitbook.io/trendy-defi/staking-and-refferal/benefits-for-referral">
                    (F1)
                  </a>
                </StyledSubtitle>
                <StyledSubtitle>
                  <span className="title">7-level staked:</span> The amount of rewards is based on the total number of
                  referrals, up to a maximum of 10%. The rewards are divided into 7 levels.
                </StyledSubtitle>
                <BlockInfo>
                  <Item>
                    <InfoItem>
                      <Label>Total reffer</Label>
                      <Value>{userInfos.totalReffer}</Value>
                    </InfoItem>
                    <InfoItem>
                      <Label>Refer Downline</Label>
                      <Value>{userInfos.totalRefer7}</Value>
                    </InfoItem>
                    <InfoItem>
                      <Label>Direct staked</Label>
                      <Value>{userInfos.directStaked}</Value>
                    </InfoItem>
                    <InfoItem>
                      <Label>7 level staked</Label>
                      <Value>
                        <CountUp
                          separator=","
                          start={0}
                          preserveValue
                          delay={0}
                          end={userInfos.totalStaked7}
                          decimals={3}
                          duration={1}
                        />
                        $
                      </Value>
                    </InfoItem>
                  </Item>
                  <div style={{ width: '100%' }}>
                    <Label textAlign="right">Total commission</Label>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '100%',
                        marginTop: '12px',
                      }}
                    >
                      <Text fontSize="48px" fontWeight="600" lineHeight="60px" letterSpacing="-0.96px">
                        <CountUp
                          separator=","
                          start={0}
                          preserveValue
                          delay={0}
                          end={userInfos.totalComms}
                          decimals={3}
                          duration={1}
                        />
                      </Text>
                      <div
                        style={{
                          background: 'var(--white-white-6, rgba(255, 255, 255, 0.06))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backdropFilter: 'blur(6px)',
                          borderRadius: '12px',
                          padding: '8px',
                          width: '60px',
                        }}
                      >
                        <img width="40px" height="34px" src="./images/V3/Vector.png" />
                      </div>
                    </div>
                  </div>
                  <ReferralInfo>
                    <div>
                      <Label fontWeight="600">Referred by</Label>
                      <InfoTitle>{truncateHash(userInfos.refferBy, 6, 4)}</InfoTitle>
                    </div>
                    <div>
                      <Label fontWeight="600">Date</Label>
                      <InfoTitle>
                        {userInfos.date === 0 ? 0 : moment(Number(userInfos.date)).format('MMM Do YYYY')}
                      </InfoTitle>
                    </div>
                  </ReferralInfo>
                </BlockInfo>
              </CardInfoUser>
            </ProfilePage>
          )}
          {tab === 3 && (
            <CardReferral>
              <StyledHead>Referral Dashboard V2.0</StyledHead>
              <StyledSubtitle>
                Here, you can easily track the growth of your referral downline, monitor your direct staked amount, view
                a list of wallet addresses, and stay updated on the volume and token locked within the system.{' '}
              </StyledSubtitle>
              <FriendsList>
                {loadingTable ? (
                  <ThreeDots style={{ textAlign: 'center' }} className="loading">
                    Loading
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </ThreeDots>
                ) : (
                  <>
                    <Group>
                      <CardFriends style={{ width: isMobile ? '100%' : isTablet ? '100%' : '300px' }}>
                        <StyledItemChild>F{acountChild.length - 1}:</StyledItemChild>
                        <StyledLinkAccount
                          rel="noreferrer"
                          target="_blank"
                          href={process.env.NEXT_PUBLIC_SCAN + `/address/${acountChild[acountChild.length - 1]}`}
                        >
                          {truncateHash(acountChild[acountChild.length - 1], 16, 3)}
                        </StyledLinkAccount>
                      </CardFriends>
                      <CardFriends style={{ width: isMobile ? '147px' : isTablet ? '100%' : '300px' }}>
                        <StyledItemChild>Total of F{acountChild.length}</StyledItemChild>
                        <StyledTotal>{totalItemChild}</StyledTotal>
                      </CardFriends>
                      <CardFriends style={{ width: isMobile ? '147px' : isTablet ? '100%' : '300px' }}>
                        <StyledItemChild>Total refer downline</StyledItemChild>
                        <StyledTotal>{total7Level}</StyledTotal>
                      </CardFriends>
                    </Group>
                    <Table>
                      <tr>
                        <th>Friends</th>
                        <th>Volumn</th>
                        <th>Locked</th>
                      </tr>
                      {listChild.map((item, index) => (
                        <div key={index}>
                          <ChildItem key={index}>
                            <td>
                              <div
                                onClick={() => handleChangeChild(item.account)}
                                style={{
                                  cursor: 'pointer',
                                  color: item.child > 0 ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 1)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 4,
                                  fontSize: isMobile ? '14px' : '24px',
                                  fontWeight: '400',
                                }}
                              >
                                {item.account.substring(0, 2)}...{item.account.substring(item.account.length - 4)}
                                {item.child > 0 && <img src="/images/referral/plus.png" style={{ fill: 'white' }} />}
                              </div>
                            </td>
                            <td>
                              $
                              <CountUp
                                style={{ color: 'rgba(255, 255, 255, 1)', fontSize: isMobile ? '14px' : '24px' }}
                                separator=","
                                start={0}
                                preserveValue
                                delay={0}
                                end={item.volume}
                                decimals={3}
                                duration={1}
                              />
                            </td>
                            <td>
                              <CountUp
                                separator=","
                                start={0}
                                preserveValue
                                delay={0}
                                end={item.locked}
                                decimals={3}
                                duration={1}
                              />
                            </td>
                          </ChildItem>
                          {item.showChild && (
                            <ChildItem key={index + '-' + index}>
                              <td colSpan={3} style={{ padding: 0 }}>
                                <Child referBy={item.account} />
                              </td>
                            </ChildItem>
                          )}
                        </div>
                      ))}
                    </Table>
                  </>
                )}
                <GroupChangePage>
                  {acountChild.length > 1 ? (
                    <button type="button" onClick={handleBack} style={{ color: 'black' }}>
                      Back
                    </button>
                  ) : null}
                  {getButtonChangePage(2)}
                </GroupChangePage>
              </FriendsList>
            </CardReferral>
          )}
          {tab === 4 && (
            <CardReferral>
              <StyledHead>Referral Dashboard V1.0</StyledHead>
              <StyledSubtitle>
                Here, you can easily track the growth of your referral downline, monitor your direct staked amount, view
                a list of wallet addresses, and stay updated on the volume and token locked within the system.{' '}
              </StyledSubtitle>
              <FriendsList>
                {loadingTable ? (
                  <ThreeDots style={{ textAlign: 'center' }} className="loading">
                    Loading
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </ThreeDots>
                ) : (
                  <>
                    <Group>
                      <CardFriends style={{ width: isMobile ? '100%' : isTablet ? '100%' : '300px' }}>
                        <StyledItemChild>F{acountChild.length - 1}:</StyledItemChild>
                        <StyledLinkAccount
                          rel="noreferrer"
                          target="_blank"
                          href={process.env.NEXT_PUBLIC_SCAN + `/address/${acountChild[acountChild.length - 1]}`}
                        >
                          {truncateHash(acountChild[acountChild.length - 1], 16, 3)}
                        </StyledLinkAccount>
                      </CardFriends>
                      <CardFriends style={{ width: isMobile ? '147px' : isTablet ? '100%' : '300px' }}>
                        <StyledItemChild>Total of F{acountChild.length}</StyledItemChild>
                        <StyledTotal>{totalItemChild}</StyledTotal>
                      </CardFriends>
                      <CardFriends style={{ width: isMobile ? '147px' : isTablet ? '100%' : '300px' }}>
                        <StyledItemChild>Total refer downline</StyledItemChild>
                        <StyledTotal>{total7Level}</StyledTotal>
                      </CardFriends>
                    </Group>
                    <Table>
                      <tr>
                        <th>Friends</th>
                        <th>Volumn</th>
                        <th>Locked</th>
                      </tr>
                      {listChildV1.map((item, index) => (
                        <div key={index}>
                          <ChildItem key={index}>
                            <td>
                              <div
                                onClick={() => handleChangeChildV1(item.account)}
                                style={{
                                  cursor: 'pointer',
                                  color: item.child > 0 ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 1)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 4,
                                  fontSize: isMobile ? '14px' : '24px',
                                  fontWeight: '400',
                                }}
                              >
                                {item.account.substring(0, 2)}...{item.account.substring(item.account.length - 4)}
                                {item.child > 0 && <img src="/images/referral/plus.png" style={{ fill: 'white' }} />}
                              </div>
                            </td>
                            <td>
                              $
                              <CountUp
                                style={{ color: 'rgba(255, 255, 255, 1)', fontSize: isMobile ? '14px' : '24px' }}
                                separator=","
                                start={0}
                                preserveValue
                                delay={0}
                                end={item.volume}
                                decimals={3}
                                duration={1}
                              />
                            </td>
                            <td>
                              <CountUp
                                separator=","
                                start={0}
                                preserveValue
                                delay={0}
                                end={item.locked}
                                decimals={3}
                                duration={1}
                              />
                            </td>
                          </ChildItem>
                          {item.showChild && (
                            <ChildItem key={index + '-' + index}>
                              <td colSpan={3} style={{ padding: 0 }}>
                                <Child referBy={item.account} />
                              </td>
                            </ChildItem>
                          )}
                        </div>
                      ))}
                    </Table>
                  </>
                )}
                <GroupChangePage>
                  {acountChild.length > 1 ? (
                    <button type="button" onClick={handleBack} style={{ color: 'black' }}>
                      Back
                    </button>
                  ) : null}
                  {getButtonChangePage(2)}
                </GroupChangePage>
              </FriendsList>
            </CardReferral>
          )}
        </Wrapper>
      )}
    </>
  )
}

export default Referral
