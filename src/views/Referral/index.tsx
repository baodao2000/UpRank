import styled from 'styled-components'
import { Heading, Text, Flex, Button, useToast, Input } from '@pancakeswap/uikit'
import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { getContract, getPoolsContract } from 'utils/contractHelpers'
import addresses from 'config/constants/contracts'
import refferalAbi from 'config/abi/refferal.json'
import { useDispatch } from 'react-redux'
import { setRefLink } from 'state/referral'
import { useSigner } from 'wagmi'
import truncateHash from '@pancakeswap/utils/truncateHash'
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'
import moment from 'moment'
import LoadingSection from 'views/Predictions/components/LoadingSection'
import { formatEther } from '@ethersproject/units'
import { NATIVE } from '../../../packages/swap-sdk/src/constants'
import { ThreeDots } from 'views/Pool/components/DepositModal'

const Wrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  height: auto;
  min-height: 500px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  th {
    border-top: 1px solid #e7e3eb;
    border-bottom: 1px solid #e7e3eb;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 10px;
    text-align: center;
  }
`

const ReferralPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
  margin-top: 32px;
  gap: 20px;
  margin-bottom: 30px;
`

const CardRegister = styled.div`
  max-width: 800px;
  width: 100%;
  height: auto;
  padding: 15px;
  border-radius: 20px;
  background: linear-gradient(153.15deg, rgb(124, 7, 216) 8.57%, rgba(129, 69, 255, 0.02) 100%);

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 30px 37px;
  }
`

const CardReferral = styled.div`
  max-width: 1000px;
  min-height: 300px;
  width: 100%;
  margin: 0 auto 30px auto;
  height: auto;
  padding: 15px;
  border-radius: 20px;
  background: linear-gradient(153.15deg, rgb(124, 7, 216) 8.57%, rgba(129, 69, 255, 0.02) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #e6e6e6;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 30px 37px;
  }
`

const CardInfoUser = styled.div`
  max-width: 600px;
  width: 100%;
  height: auto;
  padding: 15px;
  border-radius: 20px;
  background: linear-gradient(153.15deg, rgb(124, 7, 216) 8.57%, rgba(129, 69, 255, 0.02) 100%);

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 30px 37px;
  }
`

const StyledHead = styled(Heading)`
  text-align: center;
  font-weight: 700;
  color: #00f0e1;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 48px;
    line-height: 59px;
  }
`

const StyledSubtitle = styled(Text)`
  color: #e6e6e6;
  font-weight: 500;
  font-size: 20px;
  line-height: 144.5%;
  text-align: center;
`

const GroupLinkRef = styled.div`
  flex-direction: column;
  align-items: center;
  display: flex;
`

const WrapperLinkRef = styled.div`
  position: relative;
  max-width: 650px;
  width: 100%;
`

const StyledLabelLinkRef = styled.label`
  font-weight: 600;
  font-size: 24px;
  line-height: 144.5%;
  color: #e6e6e6;
  text-align: center;
  display: block;
  margin: 20px 0 12px 0;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 32px;
  }
`

const StyledLink = styled.div`
  width: 100%;
  background: #00f0e1;
  border-radius: 10px;
  border: none;
  outline: none;
  color: black;
  font-size: 18px;
  padding: 10px 10px 10px 50px;
  min-height: 34px;

  ${({ theme }) => theme.mediaQueries.md} {
    min-height: 44px;
  }
`

const StyledButton = styled(Button)`
  background: rgb(217, 217, 217);
  border-radius: 8px;
  font-weight: 800;
  color: rgb(98, 22, 176);
  margin-top: 30px;
  font-size: 16px;
  line-height: 17px;
`

const StyledIconRef = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  cursor: pointer;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 30px;
    height: 30px;
  }
`

const ShowLinkRefPc = styled.span`
  display: none;
  word-break: break-all;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`

const ShowLinkRefMobile = styled.span`
  display: block;
  word-break: break-all;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`

const BlockInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #e6e6e6;
`

const Table = styled.table`
  width: 100%;
`

const ChildItem = styled.tr`
  word-break: break-all;
`

const Label = styled.div`
  font-weight: 700;
  margin-right: 10px;
  font-size: 14px;
`

const Value = styled.div`
  word-break: break-all;
  font-size: 14px;
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
  font-size: 12px;
  margin-bottom: 10px;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
  }
`

const StyledLinkAccount = styled.a`
  font-size: 12px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #00f0e1;
  text-decoration: underline;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
  }
`

const StyledInput = styled(Input)`
  outline: none;
  border: 3px solid #009571;
  border-radius: '10px';
  margin-top: 10px;
  max-width: 650px;
`

const Referral = () => {
  const [linkRef, setLinkRef] = React.useState('')
  const [showCopied, setShowCopied] = React.useState(false)
  const { account, chainId } = useWeb3React()
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
  const [modalIsOpen, setModalIsOpen] = React.useState(true)
  // const CHAIN_ID = chainId === undefined ? ChainId.BSC_TESTNET : chainId;
  const CHAIN_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)
  const getPoolContract = getPoolsContract(CHAIN_ID)
  const refferCT = getContract({ address: addresses.refferal[CHAIN_ID], abi: refferalAbi, chainId: CHAIN_ID, signer })
  const [userIsRegister, setUserIsRegister] = React.useState(false)
  const [interest, setInterest] = React.useState(0)
  const [listChild, setListChild] = React.useState([])
  const [countPage, setCountPage] = React.useState(0)
  const [activePage, setActivePage] = React.useState(0)
  const [myCode, setMyCode] = useState('')
  const [referByWallet, setReferByWallet] = useState(referBy)
  const [referCode, setReferCode] = useState('')
  const [showError, setShowError] = useState(true)
  const [totalItemChild, setTotalItemChild] = React.useState(0)
  const [showInput, setShowInput] = useState(false)
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
    directStaked: '',
    totalStaked7: 0,
    totalComms: 0,
  })

  const getTotalRefferChild = async (page, accountChild) => {
    if (!account) {
      return
    }
    setLoadingTable(true)
    const limit = 5
    const data = await Promise.all([
      refferCT.getTotalUserByUp(accountChild ? accountChild : account, limit, page),
      refferCT.userInfos(accountChild ? accountChild : account),
    ])
    const countPage = Math.round(Number(data[0].totalItem.toString()) / limit)
    const arr = data[0].list.map((item) => item.user)
    const list = await Promise.all(
      arr.map(async (item) => {
        const dataItem = await Promise.all([getPoolContract.volumeOntree(item), getPoolContract.userTotalLock(item)])

        return {
          account: item,
          volume: Number(formatEther(dataItem[0])).toFixed(3),
          locked: Number(formatEther(dataItem[1])).toFixed(3),
        }
      }),
    )
    setTotalItemChild(Number(data[0].totalItem.toString()))
    setCountPage(countPage)
    setTotal7Level(data[1].totalRefer7.toString())
    setListChild(list)
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
    getTotalRefferChild(0, accountB)
    setAccountChild([...acountChild, accountB])
    setActivePage(0)
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
      return
    }
    const infos = await Promise.all([
      refferCT.userInfos(account),
      getPoolContract.directStaked(account),
      getPoolContract.volumeOntree(account),
      getPoolContract.remainComm(account),
    ])

    const user = {
      refferBy: infos[0].refferBy.toString(),
      date: Number(infos[0].dateTime.toString()) * 1000,
      totalReffer: infos[0].totalRefer.toString(),
      totalRefer7: infos[0].totalRefer7.toString(),
      directStaked: infos[1].toString(),
      totalStaked7: Number(Number(formatEther(infos[2])).toFixed(3)),
      totalComms: Number(Number(formatEther(infos[3]).toString()).toFixed(3)),
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
            {i}
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
            {i}
          </ButtonChangePage>,
        )
      }
    }
    return arr
  }

  const getData = () => {
    if (!account) {
      return
    }
    const checkUserRegister = async () => {
      if (account) {
        const isRegister = await refferCT.isReferrer(account)
        setUserIsRegister(isRegister)
      }
    }
    checkUserRegister()
    getRefer()
    getUserInfo()

    if (userIsRegister && account) {
      setLinkRef(getLinkRef())
    } else {
      setLinkRef('')
    }
    setLoadingPage(false)
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
  }, [account])

  React.useEffect(() => {
    if (!acountChild.length && account) {
      setAccountChild([...acountChild, account])
    }
    isShowInput()
  })

  const getLinkRef = () => {
    const param = window.location.origin
    const text = `${param}?ref=${account.slice(account.length - 6, account.length).toLocaleLowerCase()}`

    return text
  }

  const getRefer = async () => {
    const pool = await getPoolContract.pools(5)
    const interest = Number(Number(pool.commPercent.toString()) * 0.000001 * 100).toFixed(2)
    setInterest(Number(interest))
  }
  const onRegister = async () => {
    try {
      if (referBy) {
        const userInfosByCode = await refferCT.userInfosByCode(referBy.toLowerCase())
        const txReceipt = await refferCT.register(userInfosByCode.user, myCode)
        if (txReceipt?.hash) {
          dispatch(setRefLink(`${baseRefUrl}${account}`))
          toastSuccess('Congratulations, you have successfully registered!')
          setLinkRef(getLinkRef())
          setLoadingPage(true)
          getData()
        } else {
          toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
        }
      } else {
        const ref = JSON.parse(localStorage.getItem('saveAdd'))
        if (ref?.includes('0x')) {
          const userInfosByCode = await refferCT.userInfosByCode(ref.toLowerCase())
          const txReceipt = await refferCT.register(userInfosByCode.user, myCode)
          if (txReceipt?.hash) {
            dispatch(setRefLink(`${baseRefUrl}${account}`))
            toastSuccess('Congratulations, you have successfully registered!')
            setLinkRef(getLinkRef())
            setLoadingPage(true)
            getData()
          } else {
            toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
          }
        } else {
          const owner = await refferCT.owner()
          const txReceipt = await refferCT.register(referByWallet, myCode)
          if (txReceipt?.hash) {
            dispatch(setRefLink(`${baseRefUrl}${account}`))
            toastSuccess('Congratulations, you have successfully registered!')
            setLinkRef(getLinkRef())
            setLoadingPage(true)
            getData()
          } else {
            toastError('Please try again. Confirm the transaction and make sure you are paying enough gas!')
          }
        }
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
      const copyText = (text) => {
        const el = document.createElement('textarea')
        el.value = text
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
      }
      copyText(text)
      setShowCopied(true)
    }
  }

  const isShowInput = () => {
    const ref = localStorage.getItem('saveAdd')
    if (!referBy && !ref) {
      setShowInput(true)
    }
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

  return (
    <>
      {loadingPage ? (
        <LoadingSection />
      ) : (
        <Wrapper>
          <ReferralPage>
            <CardRegister>
              <StyledHead>Referral</StyledHead>
              <StyledSubtitle>Refer a friend and get reward together up to {interest}%</StyledSubtitle>
              <GroupLinkRef>
                <StyledLabelLinkRef>My Referral Link</StyledLabelLinkRef>
                <WrapperLinkRef>
                  <StyledIconRef
                    id="iconRef"
                    src="/images/referral/ref-icon.png"
                    onClick={handleRef}
                    onMouseLeave={handleLeave}
                  />
                  <Tooltip
                    anchorId="iconRef"
                    content={userIsRegister ? (showCopied ? 'Copied' : 'Copy') : 'Please Register'}
                  />
                  <StyledLink>
                    <ShowLinkRefPc>{formatLinkRef(linkRef, 50, 4)}</ShowLinkRefPc>
                    <ShowLinkRefMobile>{formatLinkRef(linkRef, 20, 4)}</ShowLinkRefMobile>
                  </StyledLink>
                </WrapperLinkRef>
                {showInput && !userIsRegister && (
                  <StyledInput
                    value={referCode}
                    autoFocus={true}
                    onChange={validateReferByWallet}
                    placeholder={`refer code`}
                  />
                )}
                {showError && showInput && referCode && <span style={{ color: 'red' }}>Invalid refer</span>}
                {showInput ? (
                  <StyledButton onClick={onRegister} disabled={userIsRegister || showError}>
                    Register
                  </StyledButton>
                ) : (
                  <StyledButton onClick={onRegister} disabled={userIsRegister}>
                    Register
                  </StyledButton>
                )}
              </GroupLinkRef>
            </CardRegister>
            <CardInfoUser>
              <StyledHead>Info User</StyledHead>
              <BlockInfo>
                <InfoItem>
                  <Label>Reffer by:</Label>
                  <Value>{userInfos.refferBy}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>Date refferd:</Label>
                  <Value>{userInfos.date === 0 ? 0 : moment(Number(userInfos.date)).format('MMM Do YYYY')}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>Total reffer:</Label>
                  <Value>{userInfos.totalReffer}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>Total reffer 7 level:</Label>
                  <Value>{userInfos.totalRefer7}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>Direct staked:</Label>
                  <Value>{userInfos.directStaked}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>Total 7 level staked:</Label>
                  <Value>{userInfos.totalStaked7}$</Value>
                </InfoItem>
                <InfoItem>
                  <Label>Total commission:</Label>
                  <Value>
                    {userInfos.totalComms}
                    {unit}
                  </Value>
                </InfoItem>
              </BlockInfo>
            </CardInfoUser>
          </ReferralPage>
          <CardReferral>
            <StyledHead>Friends list</StyledHead>
            {loadingTable ? (
              <ThreeDots style={{ textAlign: 'center' }} className="loading">
                Loading
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </ThreeDots>
            ) : (
              <>
                <Flex justifyContent="space-between">
                  <StyledLinkAccount
                    rel="noreferrer"
                    target="_blank"
                    href={`https://testnet.bscscan.com/address/${acountChild[acountChild.length - 1]}`}
                  >
                    F{acountChild.length - 1}: {truncateHash(acountChild[acountChild.length - 1], 6, 2)}
                  </StyledLinkAccount>
                  <StyledItemChild>
                    Total of F{acountChild.length}: {totalItemChild}
                  </StyledItemChild>
                  <StyledItemChild>Total refer downline: {total7Level}</StyledItemChild>
                </Flex>
                <Table>
                  <tr>
                    <th>Friends</th>
                    <th>Volumn</th>
                    <th>Locked</th>
                  </tr>
                  {listChild.map((item, index) => (
                    <ChildItem key={index}>
                      <td>
                        <div
                          onClick={() => handleChangeChild(item.account)}
                          style={{ cursor: 'pointer', color: '#00f0e1', textDecoration: 'underline' }}
                        >
                          {item.account}
                        </div>
                      </td>
                      <td>{item.volume}$</td>
                      <td>{item.locked}</td>
                    </ChildItem>
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
          </CardReferral>
        </Wrapper>
      )}
    </>
  )
}

export default Referral
