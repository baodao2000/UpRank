import { json } from 'itty-router-extras'
import { getPoolsV3Contract } from 'utils/contractHelpers'
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
  currentRewardV1: number
  currentRewardV2: number
  totalReward: number
  currentReward: number
  startTime: number
  userTotalLock: number
  rateBNB2USD: number
  currentInterestWithMine: number
  unit?: string
}
export interface Mine {
  totalMined: number
  claimed: number
  remain: number
  mineSpeed: number
  mineSpeedLevel: number
  startTime: number
  userClaimedMineLength: number
  unit?: string
  currentReward: number
  balanceTrend: number
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

  let yDisplay = y > 0 ? y + (y === 1 ? ' Y ' : ' Y ') : ''
  let moDisplay = mo > 0 ? mo + (mo === 1 ? ' M, ' : ' M ') : ''
  let dDisplay = d > 0 ? d + (d === 1 ? ' d ' : ' d ') : ''
  let hDisplay = h > 0 ? (h < 10 ? '0' + h + (h === 1 ? ':' : ':') : h + (h === 1 ? ':' : ':')) : ''
  let mDisplay = m > 0 ? (m < 10 ? '0' + m + (m === 1 ? ':' : ':') : m + (m === 1 ? ':' : ':')) : ''
  let sDisplay = s > 0 ? (s < 10 ? '0' + s : s) : ''
  return yDisplay + moDisplay + dDisplay + hDisplay + mDisplay + sDisplay
}

export const shortenURL = (s: string, max: number) => {
  return s.length > max ? s.substring(0, max / 2 - 1) + '...' + s.substring(s.length - max / 2 + 2, s.length) : s
}

export const bnb2Usd = (bnb: number, chainId: number) => {
  const getPoolContract = getPoolsV3Contract(chainId)
  const value = getPoolContract.bnb2USD(bnb).then((res) => {
    return res
  })
  return value
}
