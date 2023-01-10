import { json } from 'itty-router-extras'
import { getPoolsContract } from 'utils/contractHelpers'
import { formatEther } from '@ethersproject/units'
import { useState } from 'react'

export interface Pool {
  currentInterest: number
  enable: boolean
  maxLock: number
  minLock: number
  timeLock: number
  totalLock: number
  pid: number
  totalReward: number
  currentReward: number
  startTime: number
  userTotalLock: number
  rateBNB2USD: number
  unit?: string
}
export const timeDisplayLong = (seconds: number) => {
  let y = Math.floor(seconds / 31536000)
  let mo = Math.floor((seconds % 31536000) / 2628000)
  let d = Math.floor(((seconds % 31536000) % 2628000) / 86400)
  let h = Math.floor((seconds % (3600 * 24)) / 3600)
  let m = Math.floor((seconds % 3600) / 60)
  let s = Math.floor(seconds % 60)

  let yDisplay = y > 0 ? y + (y === 1 ? ' year ' : ' years ') : ''
  let moDisplay = mo > 0 ? mo + (mo === 1 ? ' month, ' : ' months ') : ''
  let dDisplay = d > 0 ? d + (d === 1 ? ' day ' : ' days ') : ''
  let hDisplay = h > 0 ? h + (h === 1 ? ' hour ' : ' hours ') : ''
  let mDisplay = m > 0 ? m + (m === 1 ? ' minute ' : ' minutes ') : ''
  let sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds ') : ''
  return yDisplay + moDisplay + dDisplay + hDisplay + mDisplay + sDisplay
}

export const timeDisplay = (seconds: number) => {
  let y = Math.floor(seconds / 31536000)
  let mo = Math.floor((seconds % 31536000) / 2628000)
  let d = Math.floor(((seconds % 31536000) % 2628000) / 86400)
  let h = Math.floor((seconds % (3600 * 24)) / 3600)
  let m = Math.floor((seconds % 3600) / 60)
  let s = Math.floor(seconds % 60)

  let yDisplay = y > 0 ? y + (y === 1 ? ' y ' : ' ys ') : ''
  let moDisplay = mo > 0 ? mo + (mo === 1 ? ' m, ' : ' ms ') : ''
  let dDisplay = d > 0 ? d + (d === 1 ? ' day ' : ' days ') : ''
  let hDisplay = h > 0 ? h + (h === 1 ? ' h ' : ' hs ') : ''
  let mDisplay = m > 0 ? m + (m === 1 ? ' min ' : ' mins ') : ''
  let sDisplay = s > 0 ? s + (s === 1 ? ' s' : ' secs ') : ''
  return yDisplay + moDisplay + dDisplay + hDisplay + mDisplay + sDisplay
}

export const shortenURL = (s: string, max: number) => {
  return s.length > max ? s.substring(0, max / 2 - 1) + '...' + s.substring(s.length - max / 2 + 2, s.length) : s
}

export const bnb2Usd = (bnb: number, chainId: number) => {
  const getPoolContract = getPoolsContract(chainId)
  const value = getPoolContract.bnb2USD(bnb).then((res) => {
    return res
  })
  return value
}
