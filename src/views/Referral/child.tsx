import styled from 'styled-components'
import { Heading, Text, Flex, Button, useToast, Input } from '@pancakeswap/uikit'
import React, { useState } from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import { getContract, getPoolsContract, getPoolsV2Contract } from 'utils/contractHelpers'
import addresses from 'config/constants/contracts'
import refferalAbi from 'config/abi/refferal.json'
import { useSigner } from 'wagmi'
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'
import TrendyPageLoader from 'components/Loader/TrendyPageLoader'
import { formatEther } from '@ethersproject/units'
import { ThreeDots } from 'views/Pool/components/DepositModal'
import CountUp from 'react-countup'

const CardReferral = styled.div`
  max-width: 1000px;
  //min-height: 300px;
  padding: 0 0 0 15px;
  width: 100%;
  margin: 0 auto 30px auto;
  height: auto;
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

const Table = styled.table`
  width: 100%;
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

export const copyText = (text) => {
  const el = document.createElement('textarea')
  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const Child = ({ referBy }) => {
  const { account, chainId } = useWeb3React()
  const [loadingPage, setLoadingPage] = React.useState(true)
  const [loadingTable, setLoadingTable] = React.useState(true)
  const { data: signer } = useSigner()
  const CHAIN_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)
  const getPoolContract = getPoolsContract(CHAIN_ID)
  const getPoolV2Contract = getPoolsV2Contract(CHAIN_ID)
  const refferCT = getContract({ address: addresses.refferal[CHAIN_ID], abi: refferalAbi, chainId: CHAIN_ID, signer })
  const [userIsRegister, setUserIsRegister] = React.useState(false)
  const [interest, setInterest] = React.useState(0)
  const [listChild, setListChild] = React.useState([])
  const [countPage, setCountPage] = React.useState(0)
  const [activePage, setActivePage] = React.useState(0)
  const [myCode, setMyCode] = useState('')
  const [totalItemChild, setTotalItemChild] = React.useState(0)
  const [acountChild, setAccountChild] = React.useState(() => {
    if (account) {
      return [account]
    }
    return []
  })
  const [total7Level, setTotal7Level] = React.useState(0)
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
    const data = await Promise.all([refferCT.getTotalUserByUp(referBy, limit, page), refferCT.userInfos(referBy)])
    const countPage = Math.ceil(Number(data[0].totalItem.toString()) / limit)
    const arr = data[0].list.map((item) => item.user)
    const list = await Promise.all(
      arr.map(async (item) => {
        const dataItem = await Promise.all([
          getPoolContract.volumeOntree(item),
          getPoolContract.userTotalLock(item),
          refferCT.userInfos(item),
        ])
        const dataItem2 = await Promise.all([
          getPoolV2Contract.volumeOntree(item),
          getPoolV2Contract.userTotalLock(item),
          refferCT.userInfos(item),
        ])
        return {
          account: item,
          volume: Number(formatEther(dataItem[0].add(dataItem2[0]))).toFixed(3),
          locked: Number(formatEther(dataItem[1].add(dataItem2[1]))).toFixed(3),
          child: Number(dataItem[2].totalRefer7.toString()),
        }
      }),
    )
    setTotalItemChild(Number(data[0].totalItem.toString()))
    setCountPage(countPage)
    setTotal7Level(data[1].totalRefer7.toString())
    setListChild(list.map((l) => ({ ...l, showChild: false })))
    setLoadingTable(false)
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
    // getTotalRefferChild(0, accountB)
    // setAccountChild([...acountChild, accountB])
    // setActivePage(0)
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
    getRefer()
    getUserInfo()
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
    if (!acountChild.length && account) {
      setAccountChild([...acountChild, account])
    } else {
      setAccountChild([account])
    }
  }, [account])

  const getRefer = async () => {
    const pool = await getPoolContract.pools(5)
    const interest = Number(Number(pool.commPercent.toString()) * 0.000001 * 100).toFixed(2)
    setInterest(Number(interest))
  }

  return (
    <>
      {loadingPage ? (
        <TrendyPageLoader />
      ) : (
        <CardReferral>
          {loadingTable ? (
            <ThreeDots style={{ textAlign: 'center' }} className="loading">
              Loading
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </ThreeDots>
          ) : (
            <Table>
              {listChild.map((item, index) => (
                <>
                  <tr key={index}>
                    <td>
                      <div
                        onClick={() => handleChangeChild(item.account)}
                        style={{
                          cursor: 'pointer',
                          color: item.child > 0 ? 'gold' : '#00f0e1',
                          textDecoration: 'underline',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          justifyContent: 'center',
                        }}
                      >
                        {item.account.substring(0, 2)}...{item.account.substring(item.account.length - 4)}
                        {item.child > 0 && <img src="/images/referral/plus.png" style={{ fill: 'white' }} />}
                      </div>
                    </td>
                    <td>
                      <CountUp
                        separator=","
                        start={0}
                        preserveValue
                        delay={0}
                        end={item.volume}
                        decimals={1}
                        duration={1}
                      />
                      $
                    </td>
                    <td>
                      <CountUp
                        separator=","
                        start={0}
                        preserveValue
                        delay={0}
                        end={item.locked}
                        decimals={1}
                        duration={1}
                      />
                    </td>
                  </tr>
                  {item.showChild && (
                    <tr key={index + '-' + index}>
                      <td colSpan={3} style={{ padding: 0 }}>
                        <Child referBy={item.account} />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </Table>
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
      )}
    </>
  )
}

export default Child
